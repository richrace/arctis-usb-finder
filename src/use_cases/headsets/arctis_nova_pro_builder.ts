import SimpleHeadphone from '../../interfaces/simple_headphone';
import SpecificBuilder from '../../interfaces/specific_builder';
import KnownHeadphone from '../../models/known_headphone';
import { calculateBattery } from '../../utils/battery_helpers';

export default class ArctisNovaProBuilder implements SpecificBuilder {
  execute(report: number[], knownHeadphone: KnownHeadphone): SimpleHeadphone {
    if (report.length === 0) {
      return { isConnected: false } as SimpleHeadphone;
    }

    let batteryPercent: number | undefined = calculateBattery(report[knownHeadphone.batteryPercentIdx], 0x00, 0x08);

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

    return { batteryPercent, isConnected, isCharging, isDischarging } as SimpleHeadphone;
  }
}
