import KnownHeadphone from '../../models/known_headphone';

describe('KnownHeadphone', () => {
  let headphone: KnownHeadphone;
  const name = 'Test Name';
  const vendorId = 4125;
  const productId = 0x12ad;
  const writeBytes = [0x12, 0x45];
  const usagePage = 1;
  const usage = 1;
  const interfaceNum = 1;
  const batteryPercentIdx = 1;
  const chargingStatusIdx = 1;
  const micStatusIdx = 1;
  const path =
    'IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS06@14100000/USB2.0 Hub           ' +
    '  @14100000/AppleUSB20Hub@14100000/AppleUSB20HubPort@14120000/SteelSeries Arctis 7X@14120000/SteelSeries Arctis ' +
    '7X@3/AppleUserUSBHostHIDDevice';

  beforeEach(() => {
    headphone = new KnownHeadphone(
      name,
      productId,
      writeBytes,
      usagePage,
      usage,
      interfaceNum,
      batteryPercentIdx,
      chargingStatusIdx,
      micStatusIdx,
      path,
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

  it('contains a path', () => {
    expect(headphone.path).toBe(path);
  });
});
