import KnownHeadphone from '../../models/known_headphone';
import SimpleHeadphone from '../../models/simple_headphone';
import SpecificBuilder from './specific_builder';

export default class Arctis7xBuilder implements SpecificBuilder {
  execute(report: number[], knownHeadphone: KnownHeadphone): SimpleHeadphone {
    let isMuted, isCharging, isDischarging, isConnected;

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

    return { isMuted, isCharging, isDischarging, isConnected } as SimpleHeadphone;
  }
}
