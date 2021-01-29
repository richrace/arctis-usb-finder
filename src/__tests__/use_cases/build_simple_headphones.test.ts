/* eslint-disable jest/no-mocks-import */
import FoundHeadphone from '../../models/found_headphone';
import KnownHeadphone from '../../models/known_headphone';
import Builder from '../../use_cases/headsets/builder';
jest.mock('../../use_cases/headsets/builder');
import BuildSimpleHeadphones from '../../use_cases/build_simple_headphones';
import { deviceFactory } from '../../__mocks__/device';
import MockUsbDevice from '../../__mocks__/usb_device';

describe('BuildSimpleHeadphones', () => {
  const bytes = [0x123, 0x456];
  const usecase = new BuildSimpleHeadphones();
  let found: FoundHeadphone;
  const knownHeadphone = new KnownHeadphone('Name', 454, 3, bytes);

  beforeEach(() => {
    found = {
      device: new MockUsbDevice(deviceFactory('path/of/something', 123, 454)),
      knownHeadphone: knownHeadphone,
    } as FoundHeadphone;
  });

  it('writes/reads to the USB device', () => {
    jest.spyOn(found.device, 'fetchInfo');

    usecase.execute([found]);

    expect(found.device.fetchInfo).toHaveBeenCalledWith(bytes);
  });

  it('calls the Builder to build the simple headphone', () => {
    const report = [1, 2, 3, 4];
    jest.spyOn(found.device, 'fetchInfo').mockReturnValue(report);

    usecase.execute([found]);

    expect(Builder.build).toHaveBeenCalledWith(report, knownHeadphone);
  });
});
