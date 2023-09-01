import KnownHeadphone from '../../../models/known_headphone';
import MapBatteryBuilder from '../../../use_cases/headsets/map_battery_builder';

describe('MapBatteryBuilder', () => {
  const builder = new MapBatteryBuilder();
  const batteryPercentIdx = 2;

  let chargingStatusIdx: number | undefined = 3;
  let knownHeadphone = { chargingStatusIdx } as KnownHeadphone;
  let report: number[];

  it('knows if the device is charging', () => {
    report = [0, 1, 1, 1, 1, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isCharging).toBe(true);
    expect(simpleHeadphone.isConnected).toBe(true);
  });

  it('knows if the device is discharging', () => {
    report = [0, 1, 3, 3, 3, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isDischarging).toBe(true);
    expect(simpleHeadphone.isConnected).toBe(true);
  });

  it('knows if the device is not connected', () => {
    report = [0, 1, 0, 0, 0, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isConnected).toBe(false);
  });

  it("doesn't have a chargingStatusIdx", () => {
    chargingStatusIdx = undefined;
    knownHeadphone = { chargingStatusIdx } as KnownHeadphone;
    report = [0, 1, 3, 90, 0, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isCharging).toBe(undefined);
    expect(simpleHeadphone.isConnected).toBe(undefined);
    expect(simpleHeadphone.isDischarging).toBe(undefined);
  });

  it('knowns the battery', () => {
    knownHeadphone = { batteryPercentIdx } as KnownHeadphone;
    report = [0, 1, 3, 90, 0, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.batteryPercent).toBe(75);
  });

  it('has 100% of the battery', () => {
    knownHeadphone = { batteryPercentIdx } as KnownHeadphone;
    report = [0, 5, 5, 90, 0, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.batteryPercent).toBe(100);
  });
});
