import KnownHeadphone from '../../../models/known_headphone';
import ArctisNovaEliteBuilder from '../../../use_cases/headsets/arctis_nova_pro_elite_builder';

describe('ArctisNovaEliteBuilder', () => {
  const builder = new ArctisNovaEliteBuilder();
  const batteryPercentIdx = 6;
  const chargingStatusIdx = 15;

  let knownHeadphone = { chargingStatusIdx, batteryPercentIdx } as KnownHeadphone;
  let report: number[];

  it('knows if the device is charging', () => {
    report = [0, 1, 1, 0, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 2, 16];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isCharging).toBeTruthy();
    expect(simpleHeadphone.isDischarging).toBeFalsy();
    expect(simpleHeadphone.isConnected).toBe(true);
  });

  it('knows the battery (Nova Elite uses direct percentage)', () => {
    // Nova Elite reports battery as direct percentage (0-100), not mapped 0-4 range
    report = [0, 1, 1, 0, 1, 0, 75, 0, 8, 9, 10, 11, 12, 13, 14, 8, 16];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.batteryPercent).toBe(75);
    expect(simpleHeadphone.isDischarging).toBeTruthy();
    expect(simpleHeadphone.isCharging).toBeFalsy();
  });

  it('knows it`s not connected by chargingStatusIdx', () => {
    report = [0, 1, 1, 0, 1, 0, 0, 0, 8, 9, 10, 11, 12, 13, 14, 1, 16];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.isConnected).toBeFalsy();
    expect(simpleHeadphone.batteryPercent).toBeUndefined();
    expect(simpleHeadphone.isDischarging).toBeUndefined();
    expect(simpleHeadphone.isCharging).toBeUndefined();
  });

  it('knows it is not connected', () => {
    knownHeadphone = { batteryPercentIdx } as KnownHeadphone;
    report = [];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.isConnected).toBeFalsy();
    expect(simpleHeadphone.batteryPercent).toBeUndefined();
  });
});
