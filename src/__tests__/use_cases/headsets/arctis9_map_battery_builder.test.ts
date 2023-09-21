import KnownHeadphone from '../../../models/known_headphone';
import Arctis9MapBatteryBuilder from '../../../use_cases/headsets/arctis9_map_battery_builder';

describe('Arctis9MapBatteryBuilder', () => {
  const builder = new Arctis9MapBatteryBuilder();
  const batteryPercentIdx = 2;
  const chargingStatusIdx = 4;

  let knownHeadphone = { chargingStatusIdx } as KnownHeadphone;
  let report: number[];

  it('knows if the device is charging', () => {
    report = [0, 1, 1, 1, 1, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isCharging).toBe(true);
    expect(simpleHeadphone.isDischarging).toBe(false);
    expect(simpleHeadphone.isConnected).toBe(true);
  });

  it('knowns the battery', () => {
    knownHeadphone = { batteryPercentIdx } as KnownHeadphone;
    report = [0, 1, 3, 90, 0, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.batteryPercent).toBe(75);
  });
});
