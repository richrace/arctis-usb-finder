import KnownHeadphone from '../../../models/known_headphone';
import Arctis9MapBatteryBuilder from '../../../use_cases/headsets/arctis9_map_battery_builder';

describe('Arctis9MapBatteryBuilder', () => {
  const builder = new Arctis9MapBatteryBuilder();
  const batteryPercentIdx = 3;
  const chargingStatusIdx = 4;

  let knownHeadphone = { chargingStatusIdx, batteryPercentIdx } as KnownHeadphone;
  let report: number[];

  it('knows if the device is charging', () => {
    report = [0, 1, 1, 125, 1, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isCharging).toBeTruthy();
    expect(simpleHeadphone.isDischarging).toBeFalsy();
    expect(simpleHeadphone.isConnected).toBe(true);
  });

  it('knowns the battery', () => {
    report = [0, 1, 1, 141, 0, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.batteryPercent).toBe(75);
    expect(simpleHeadphone.isDischarging).toBeTruthy();
    expect(simpleHeadphone.isCharging).toBeFalsy();
  });

  it('knows it is not connected', () => {
    knownHeadphone = { batteryPercentIdx } as KnownHeadphone;
    report = [];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.isConnected).toBeFalsy();
    expect(simpleHeadphone.batteryPercent).toBeUndefined();
  });
});
