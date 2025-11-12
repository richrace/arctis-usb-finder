import KnownHeadphone from '../../../models/known_headphone';
import MapBatteryChatmixBuilder from '../../../use_cases/headsets/map_battery_chatmix_builder';

describe('MapBatteryChatmixBuilder', () => {
  const builder = new MapBatteryChatmixBuilder();
  const batteryPercentIdx = 2;
  const gameVolumeIdx = 4;
  const chatVolumeIdx = 5;

  let chargingStatusIdx: number | undefined = 3;
  let knownHeadphone = { chargingStatusIdx, gameVolumeIdx, chatVolumeIdx } as KnownHeadphone;
  let report: number[];

  it('knows if the device is charging', () => {
    report = [0, 1, 1, 1, 100, 100];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isCharging).toBe(true);
    expect(simpleHeadphone.isConnected).toBe(true);
  });

  it('knows if the device is discharging', () => {
    report = [0, 1, 3, 3, 100, 100];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isDischarging).toBe(true);
    expect(simpleHeadphone.isConnected).toBe(true);
  });

  it('knows if the device is not connected', () => {
    report = [0, 1, 0, 0, 100, 100];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isConnected).toBe(false);
  });

  it("doesn't have a chargingStatusIdx", () => {
    chargingStatusIdx = undefined;
    knownHeadphone = { chargingStatusIdx } as KnownHeadphone;
    report = [0, 1, 3, 90, 100, 100];

    const simpleHeadphone = builder.execute(report, knownHeadphone);

    expect(simpleHeadphone.isCharging).toBe(undefined);
    expect(simpleHeadphone.isConnected).toBe(undefined);
    expect(simpleHeadphone.isDischarging).toBe(undefined);
  });

  it('knows the battery', () => {
    knownHeadphone = { batteryPercentIdx } as KnownHeadphone;
    report = [0, 1, 3, 90, 100, 100];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.batteryPercent).toBe(75);
  });

  it('has 100% of the battery', () => {
    knownHeadphone = { batteryPercentIdx } as KnownHeadphone;
    report = [0, 5, 5, 90, 100, 100];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.batteryPercent).toBe(100);
  });

  // New tests for gameVolume and chatVolume
  it('knows the game volume', () => {
    knownHeadphone = { gameVolumeIdx } as KnownHeadphone;
    report = [0, 1, 3, 90, 80, 100];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.gameVolume).toBe(80);
  });

  it('knows the chat volume', () => {
    knownHeadphone = { chatVolumeIdx } as KnownHeadphone;
    report = [0, 1, 3, 90, 100, 50];

    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.chatVolume).toBe(50);
  });

  it('knows both game and chat volume', () => {
    knownHeadphone = { gameVolumeIdx, chatVolumeIdx } as KnownHeadphone;
    report = [0, 1, 3, 90, 100, 0];
    const simpleHeadphone = builder.execute(report, knownHeadphone);
    expect(simpleHeadphone.gameVolume).toBe(100);
    expect(simpleHeadphone.chatVolume).toBe(0);
  });

});
