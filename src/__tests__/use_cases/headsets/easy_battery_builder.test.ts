import KnownHeadphone from '../../../models/known_headphone';
import EasyBatteryBuilder from '../../../use_cases/headsets/easy_battery_builder';

describe('EasyBatteryBuilder', () => {
  const builder = new EasyBatteryBuilder();
  let chargingStatusIdx: number | undefined = 4;
  let micStatusIdx: number | undefined = 5;
  let knownHeadphone = { chargingStatusIdx, micStatusIdx } as KnownHeadphone;
  let report: number[];

  it('knows when the device is muted', () => {
    report = [0, 1, 3, 90, 1, 1, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isMuted).toBe(true);
  });

  it('knows when the device is not muted', () => {
    report = [0, 1, 3, 90, 1, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isMuted).toBe(false);
  });

  it('knows if the device is charging', () => {
    report = [0, 1, 3, 90, 1, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isCharging).toBe(true);
    expect(simpleHeadphone.isConnected).toBe(true);
  });

  it('knows if the device is discharging', () => {
    report = [0, 1, 3, 90, 3, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isDischarging).toBe(true);
    expect(simpleHeadphone.isConnected).toBe(true);
  });

  it('knows if the device is not connected', () => {
    report = [0, 1, 3, 90, 0, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isConnected).toBe(false);
  });

  it("doesn't have a chargingStatusIdx", () => {
    chargingStatusIdx = undefined;
    knownHeadphone = { chargingStatusIdx, micStatusIdx } as KnownHeadphone;
    report = [0, 1, 3, 90, 0, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isCharging).toBe(undefined);
    expect(simpleHeadphone.isConnected).toBe(undefined);
    expect(simpleHeadphone.isDischarging).toBe(undefined);
  });

  it("doesn't have a micStatusIdx", () => {
    micStatusIdx = undefined;
    knownHeadphone = { chargingStatusIdx, micStatusIdx } as KnownHeadphone;
    report = [0, 1, 3, 90, 0, 0];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isMuted).toBe(undefined);
  });
});
