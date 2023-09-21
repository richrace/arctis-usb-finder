import SimpleHeadphone from '../../interfaces/simple_headphone';
import SpecificBuilder from '../../interfaces/specific_builder';
import KnownHeadphone from '../../models/known_headphone';
import { calculateBattery } from '../../utils/battery_helpers';

export default class Arctis9MapBatteryBuilder implements SpecificBuilder {
  execute(report: number[], knownHeadphone: KnownHeadphone): SimpleHeadphone {
    let isCharging, isDischarging;

    const batteryPercent = calculateBattery(report[knownHeadphone.batteryPercentIdx]);
    const isConnected = true;

    if (knownHeadphone.chargingStatusIdx && report[knownHeadphone.chargingStatusIdx] === 0x01) {
      isCharging = true;
      isDischarging = false;
    } else {
      isCharging = false;
      isDischarging = true;
    }

    return { batteryPercent, isCharging, isDischarging, isConnected } as SimpleHeadphone;
  }
}
