import KnownHeadphone from '../../models/known_headphone';

describe('KnownHeadphone', () => {
  let headphone: KnownHeadphone;
  const name = 'Test Name';
  const vendorId = 4125;
  const productId = 0x12ad;
  const batteryPercentIdx = 1;
  const writeBytes = [0x12, 0x45];
  const chargingStatusIdx = 1;
  const micStatusIdx = 1;

  beforeEach(() => {
    headphone = new KnownHeadphone(
      name,
      productId,
      batteryPercentIdx,
      writeBytes,
      chargingStatusIdx,
      micStatusIdx,
      vendorId
    );
  });

  it('contains a name', () => {
    expect(headphone.name).toBe(name);
  });

  it('contains a vendorId', () => {
    expect(headphone.vendorId).toBe(vendorId);
  });

  it('contains a productId', () => {
    expect(headphone.productId).toBe(productId);
  });
  it('contains a batteryPercentIdx', () => {
    expect(headphone.batteryPercentIdx).toBe(batteryPercentIdx);
  });

  it('contains writeBytes', () => {
    expect(headphone.writeBytes).toBe(writeBytes);
  });

  it('contains a chargingStatusIdx', () => {
    expect(headphone.chargingStatusIdx).toBe(chargingStatusIdx);
  });

  it('contains a micStatusIdx', () => {
    expect(headphone.micStatusIdx).toBe(micStatusIdx);
  });
});
