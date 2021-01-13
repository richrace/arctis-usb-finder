/* eslint-disable jest/no-mocks-import */
import IUsbGateway from '../../gateways/i_usb_gateway';
import IUsbDevice from '../../models/i_usb_device';
import FindHeadphones from '../../use_cases/find_headphones';
import MockDevice from '../../__mocks__/device';
import MockUsbDevice from '../../__mocks__/usb_device';

const matchingDevice = new MockDevice(
  4152,
  0x12d7,
  'IOService:/AppleACPIPl...HIDDevice@14210000,0',
  '20002E8C',
  'ThingM',
  'blink(1) mk2',
  2,
  -1,
  65280,
  0
);

const notMatchingDevice = new MockDevice(
  10168,
  493,
  'IOService:/AppleACPIPl...HIDDevice@14210000,0',
  '20002E8C',
  'ThingM',
  'blink(1) mk2',
  2,
  -1,
  65280,
  0
);

const notSupportedProductIdDevice = new MockDevice(
  4152,
  0x12d2,
  'IOService:/AppleACPIPl...HIDDevice@14210000,0',
  '20002E8C',
  'ThingM',
  'blink(1) mk2',
  2,
  -1,
  65280,
  0
);

const matchingUsbDevice = new MockUsbDevice(matchingDevice);
const notMathcingUsbDevice = new MockUsbDevice(notMatchingDevice);
const notSupportedProductIdUsbDevice = new MockUsbDevice(
  notSupportedProductIdDevice
);

class MockedGateway implements IUsbGateway {
  getUsbDevices(): IUsbDevice[] {
    return [
      notMathcingUsbDevice,
      matchingUsbDevice,
      notSupportedProductIdUsbDevice,
    ];
  }
}

describe('FindHeadphones', () => {
  it('filters based on Product/Vendor ID', () => {
    const gateway = new MockedGateway();
    const useCase = new FindHeadphones(gateway);

    expect(useCase.execute()).toEqual([matchingUsbDevice]);
  });
});
