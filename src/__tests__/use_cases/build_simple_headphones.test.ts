/* eslint-disable jest/no-mocks-import */
import FoundHeadphone from '../../models/found_headphone';
import KnownHeadphone from '../../models/known_headphone';
import BuildSimpleHeadphones from '../../use_cases/build_simple_headphones';
import { deviceFactory } from '../../__mocks__/device';
import MockUsbDevice from '../../__mocks__/usb_device';

describe('BuildSimpleHeadphones', () => {
  const bytes = [0x123, 0x456];
  const usecase = new BuildSimpleHeadphones();
  let found: FoundHeadphone;

  beforeEach(() => {
    found = {
      device: new MockUsbDevice(deviceFactory('path/of/something', 123, 454)),
      knownHeadphone: new KnownHeadphone('Name', 454, 3, bytes),
    } as FoundHeadphone;
  });

  it('writes/reads to the USB device', () => {
    jest.spyOn(found.device, 'fetchInfo');

    usecase.execute([found]);

    expect(found.device.fetchInfo).toHaveBeenCalledWith(bytes);
  });

  it('returns the read battery percent', () => {
    const batteryPercent = 90;

    jest
      .spyOn(found.device, 'fetchInfo')
      .mockReturnValue([0, 1, 2, batteryPercent, 5]);

    const result = usecase.execute([found]);

    expect(result[0].batteryPercent).toBe(batteryPercent);
  });
});
