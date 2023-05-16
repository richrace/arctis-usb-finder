/* eslint-disable jest/no-mocks-import */
import UsbGateway from '../../interfaces/usb_gateway';
import UsbDevice from '../../interfaces/usb_device';
import HeadphoneList from '../../headphone_list';
import FindHeadphones from '../../use_cases/find_headphones';
import deviceFactory from '../../__mocks__/device';
import MockUsbDevice from '../../__mocks__/usb_device';

const matchingDevice = deviceFactory('IOService:/AppleACPIPl...HIDDevice@14210000,0', 4152, 0x12ad);

const notMatchingDevice = deviceFactory(
  'IOService:/AppleACPIPl...HIDDevice@14210000,0',
  10168,
  493
);

const notSupportedProductIdDevice = deviceFactory(
  'IOService:/AppleACPIPl...HIDDevice@14210000,0',
  4152,
  0x12d2
);

const matchingUsbDevice = new MockUsbDevice(matchingDevice);
const notMatchingUsbDevice = new MockUsbDevice(notMatchingDevice);
const notSupportedProductIdUsbDevice = new MockUsbDevice(notSupportedProductIdDevice);

class MockedGateway implements UsbGateway {
  getUsbDevices(): UsbDevice[] {
    return [notMatchingUsbDevice, matchingUsbDevice, notSupportedProductIdUsbDevice];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getHeadphoneByVendorIdAndProductId(_vendorId: number, _productId: number): UsbDevice {
    return {} as UsbDevice;
  }
}

describe('FindHeadphones', () => {
  it('filters based on Product/Vendor ID', () => {
    const gateway = new MockedGateway();
    const useCase = new FindHeadphones(gateway);

    expect(useCase.execute()).toEqual([
      {
        device: matchingUsbDevice,
        knownHeadphone: HeadphoneList[0],
      },
    ]);
  });
});
