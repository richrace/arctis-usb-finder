import KnownHeadphone from '../../models/known_headphone';
import SimpleHeadphone from '../../interfaces/simple_headphone';
import SpecificBuilder from '../../interfaces/specific_builder';

export default class EasyBatteryBuilder implements SpecificBuilder {
  execute(report: number[], knownHeadphone: KnownHeadphone): SimpleHeadphone {
    let isMuted, isCharging, isDischarging, isConnected;

    const batteryPercent = report[knownHeadphone.batteryPercentIdx];

    if (knownHeadphone.micStatusIdx) {
      isMuted = report[knownHeadphone.micStatusIdx] === 1;
    }

    if (knownHeadphone.chargingStatusIdx) {
      switch (report[knownHeadphone.chargingStatusIdx]) {
        case 0: // Not Connected
          isConnected = false;
          isCharging = undefined;
          isDischarging = undefined;
          break;
        case 1: // Charging
          isConnected = true;
          isCharging = true;
          isDischarging = false;
          break;
        case 3: // Discharging
          isConnected = true;
          isCharging = false;
          isDischarging = true;
          break;
      }
    }

    return { batteryPercent, isMuted, isCharging, isDischarging, isConnected } as SimpleHeadphone;
  }
}
