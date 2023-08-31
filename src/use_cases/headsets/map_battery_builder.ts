import KnownHeadphone from '../../models/known_headphone';
import SimpleHeadphone from '../../interfaces/simple_headphone';
import SpecificBuilder from '../../interfaces/specific_builder';
import map from '../../utils/map';

export default class MapBatteryBuilder implements SpecificBuilder {
  execute(report: number[], knownHeadphone: KnownHeadphone): SimpleHeadphone {
    let isCharging, isDischarging, isConnected;

    const batteryPercent = this.calculateBattery(report[knownHeadphone.batteryPercentIdx]);

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

    return { batteryPercent, isCharging, isDischarging, isConnected } as SimpleHeadphone;
  }

  private calculateBattery(batteryPercent: number): number {
    const maxBattery = 0x04;
    const minBattery = 0x00;

    if (batteryPercent > maxBattery) {
      return 100;
    }

    return map(batteryPercent, minBattery, maxBattery, 0, 100);
  }
}
