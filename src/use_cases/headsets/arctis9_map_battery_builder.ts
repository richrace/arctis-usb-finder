import SimpleHeadphone from '../../interfaces/simple_headphone';
import SpecificBuilder from '../../interfaces/specific_builder';
import KnownHeadphone from '../../models/known_headphone';
import { calculateBattery } from '../../utils/battery_helpers';

export default class Arctis9MapBatteryBuilder implements SpecificBuilder {
  execute(report: number[], knownHeadphone: KnownHeadphone): SimpleHeadphone {
    if (report.length === 0) {
      return { isConnected: false } as SimpleHeadphone;
    }

    const batteryPercent = calculateBattery(report[knownHeadphone.batteryPercentIdx], 0x64, 0x9a);
    const isConnected = true;
    let isCharging: boolean | undefined;
    let isDischarging: boolean | undefined;

    if (knownHeadphone.chargingStatusIdx) {
      if (report[knownHeadphone.chargingStatusIdx]) {
        isCharging = true;
        isDischarging = false;
      } else {
        isCharging = false;
        isDischarging = true;
      }
    }

    return { batteryPercent, isConnected, isCharging, isDischarging } as SimpleHeadphone;
  }
}
