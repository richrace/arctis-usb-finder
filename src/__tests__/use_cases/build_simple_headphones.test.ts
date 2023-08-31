/* eslint-disable jest/no-mocks-import */
import KnownHeadphone from '../../models/known_headphone';
import Builder from '../../use_cases/headsets/builder';
jest.mock('../../use_cases/headsets/builder');
import BuildSimpleHeadphones from '../../use_cases/build_simple_headphones';
import deviceFactory from '../../__mocks__/device';
import MockUsbDevice from '../../__mocks__/usb_device';
import UsbDevice from '../../interfaces/usb_device';

describe('BuildSimpleHeadphones', () => {
  let headphone: UsbDevice;
  const bytes = [0x123, 0x456];
  const usecase = new BuildSimpleHeadphones();
  const knownHeadphone = new KnownHeadphone('Name', 454, bytes, 0, 0, 0, 3);

  beforeEach(() => {
    headphone = new MockUsbDevice(deviceFactory('path/of/something', 123, 454), knownHeadphone);
  });

  it('writes/reads to the USB device', () => {
    jest.spyOn(headphone, 'fetchInfo');

    usecase.execute([headphone]);

    expect(headphone.fetchInfo).toHaveBeenCalledWith(bytes);
  });

  it('calls the Builder to build the simple headphone', () => {
    const report = [0, 0, 0, 0, 0, 0];
    jest.spyOn(headphone, 'fetchInfo').mockReturnValue(report);

    usecase.execute([headphone]);

    expect(Builder.build).toHaveBeenCalledWith(report, 'Path ', knownHeadphone);
  });
});
