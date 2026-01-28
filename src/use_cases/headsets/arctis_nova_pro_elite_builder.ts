import SimpleHeadphone from '../../interfaces/simple_headphone';
import SpecificBuilder from '../../interfaces/specific_builder';
import KnownHeadphone from '../../models/known_headphone';
import { calculateBattery } from '../../utils/battery_helpers';

// Nova Pro Wireless uses mapped battery values (0-8 range) for both batteries
export class ArctisNovaProWirelessBuilder implements SpecificBuilder {
  execute(report: number[], knownHeadphone: KnownHeadphone): SimpleHeadphone {
    if (report.length === 0) {
      return { isConnected: false } as SimpleHeadphone;
    }

    // Headset battery uses mapped 0-8 range
    let batteryPercent: number | undefined = calculateBattery(report[knownHeadphone.batteryPercentIdx], 0, 8);
    let batteryPercent2: number | undefined;
    let hasBattery2: boolean | undefined;

    // Read battery2 percentage (0-8 range mapped to 0-100)
    if (knownHeadphone.batteryPercentIdx2 !== undefined) {
      const rawBattery2 = report[knownHeadphone.batteryPercentIdx2];
      // Battery is present if raw value > 0 (charging/charged battery)
      // Index 5 presence detection doesn't work reliably for Nova Pro
      if (rawBattery2 > 0) {
        hasBattery2 = true;
        batteryPercent2 = calculateBattery(rawBattery2, 0, 8);
      }
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

    // Read battery2 percentage (direct 0-100 value)
    if (knownHeadphone.batteryPercentIdx2 !== undefined) {
      const rawBattery2 = report[knownHeadphone.batteryPercentIdx2];
      // Battery is present if raw value > 0 (charging/charged battery)
      if (rawBattery2 > 0) {
        hasBattery2 = true;
        batteryPercent2 = rawBattery2;
      }
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
