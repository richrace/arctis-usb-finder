import SimpleHeadphone from '../../interfaces/simple_headphone';
import SpecificBuilder from '../../interfaces/specific_builder';
import KnownHeadphone from '../../models/known_headphone';
import { calculateBattery } from '../../utils/battery_helpers';

// Nova Pro Wireless uses mapped battery values (0-4 range) for base station battery
export class ArctisNovaProWirelessBuilder implements SpecificBuilder {
  execute(report: number[], knownHeadphone: KnownHeadphone): SimpleHeadphone {
    if (report.length === 0) {
      return { isConnected: false } as SimpleHeadphone;
    }

    // Headset battery uses mapped 0-4 range
    let batteryPercent: number | undefined = calculateBattery(report[knownHeadphone.batteryPercentIdx]);
    let batteryPercent2: number | undefined;
    let hasBattery2: boolean | undefined;

    // Check if base station battery is present (index 5: 1=present, 0=not present)
    if (knownHeadphone.batteryPresentIdx2 !== undefined) {
      hasBattery2 = report[knownHeadphone.batteryPresentIdx2] === 1;
    }

    // Base station battery also uses mapped 0-4 range
    if (knownHeadphone.batteryPercentIdx2 !== undefined) {
      batteryPercent2 = calculateBattery(report[knownHeadphone.batteryPercentIdx2]);
    }

    let isConnected = false;
    let isCharging: boolean | undefined;
    let isDischarging: boolean | undefined;

    if (knownHeadphone.chargingStatusIdx) {
      switch (report[knownHeadphone.chargingStatusIdx]) {
        case 1:
          // Not wirelessly connected - base station can't read headset battery via USB charge cable
          // Clear batteryPercent since it's always 0 (unknown) in this state
          isConnected = false;
          isCharging = undefined;
          isDischarging = undefined;
          batteryPercent = undefined;
          break;
        case 2:
        case 4: // wired charging while wirelessly connected
          isConnected = true;
          isCharging = true;
          isDischarging = false;
          break;
        case 8:
          isConnected = true;
          isCharging = false;
          isDischarging = true;
          break;
      }
    }

    return { batteryPercent, batteryPercent2, hasBattery2, isConnected, isCharging, isDischarging } as SimpleHeadphone;
  }
}

// Nova Elite uses direct percentage values (0-100) for both batteries
export default class ArctisNovaEliteBuilder implements SpecificBuilder {
  execute(report: number[], knownHeadphone: KnownHeadphone): SimpleHeadphone {
    if (report.length === 0) {
      return { isConnected: false } as SimpleHeadphone;
    }

    // Nova Elite reports battery as direct percentage (0-100)
    let batteryPercent: number | undefined = report[knownHeadphone.batteryPercentIdx];
    let batteryPercent2: number | undefined;
    let hasBattery2: boolean | undefined;

    // Check if base station battery is present (index 5: 1=present, 0=not present)
    if (knownHeadphone.batteryPresentIdx2 !== undefined) {
      hasBattery2 = report[knownHeadphone.batteryPresentIdx2] === 1;
    }

    // batteryPercent2: undefined = no battery slot, 0 = error/dead battery, 1-100 = normal
    if (knownHeadphone.batteryPercentIdx2 !== undefined) {
      batteryPercent2 = report[knownHeadphone.batteryPercentIdx2];
    }

    let isConnected = false;
    let isCharging: boolean | undefined;
    let isDischarging: boolean | undefined;

    if (knownHeadphone.chargingStatusIdx) {
      switch (report[knownHeadphone.chargingStatusIdx]) {
        case 1:
          isConnected = false;
          isCharging = undefined;
          isDischarging = undefined;
          batteryPercent = undefined;
          break;
        case 2:
          isConnected = true;
          isCharging = true;
          isDischarging = false;
          break;
        case 8:
          isConnected = true;
          isCharging = false;
          isDischarging = true;
          break;
      }
    }

    return { batteryPercent, batteryPercent2, hasBattery2, isConnected, isCharging, isDischarging } as SimpleHeadphone;
  }
}
