/* eslint-disable jest/no-mocks-import */
import { Device } from 'node-hid';
import HidUsbDevice from '../../../adapters/human_interface_device/device';
import { deviceFactory } from '../../../__mocks__/device';

class MockedHid {
  bytesWritten = false;
  bytesGiven: number[] = [];
  readSyncCalled = false;
  closeCalled = false;

  readSync(): number[] {
    this.readSyncCalled = true;
    return [0, 1, 0, 1, 3];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  write(bytes: number[]): void {
    this.bytesGiven = bytes;
    this.bytesWritten = true;
  }

  close() {
    this.closeCalled = true;
  }
}

describe('HidUsbDevice', () => {
  let path: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let hidSpy: any;
  let mockedHidInstance: MockedHid;

  beforeEach(() => {
    mockedHidInstance = new MockedHid();
    hidSpy = jest.requireActual('node-hid');
    jest.spyOn(hidSpy, 'HID').mockReturnValue(mockedHidInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when path is present', () => {
    let hidUsbDevice: HidUsbDevice;
    let device: Device;

    beforeEach(() => {
      path = 'IOService:/AppleACPIPl...HIDDevice@14210000,0';
      device = deviceFactory(path);
      hidUsbDevice = new HidUsbDevice(device);
    });

    it('creates a HID instance when fetching info', () => {
      hidUsbDevice.fetchInfo([0x12]);
      expect(hidSpy.HID).toHaveBeenCalledWith(path);
    });

    it('closes the HID device when fetching info', () => {
      hidUsbDevice.fetchInfo([0x12]);
      expect(mockedHidInstance.closeCalled).toBe(true);
    });

    it('uses the HID intanance to read the USB device', () => {
      expect(hidUsbDevice.fetchInfo([0x12])).toEqual([0, 1, 0, 1, 3]);
      expect(mockedHidInstance.readSyncCalled).toBe(true);
    });

    it('uses the HID intanance to write the USB device', () => {
      const bytes = [0x12, 0x16];
      hidUsbDevice.fetchInfo(bytes);

      expect(mockedHidInstance.bytesWritten).toBe(true);
      expect(mockedHidInstance.bytesGiven).toBe(bytes);
    });

    it('can return the raw device', () => {
      expect(hidUsbDevice.realDevice()).toBe(device);
    });

    it('will have the VendorID', () => {
      expect(hidUsbDevice.vendorId).toEqual(10168);
    });

    it('will have the ProductID', () => {
      expect(hidUsbDevice.productId).toEqual(493);
    });
  });

  describe('when path is undefined', () => {
    it('does not create a HID instance', () => {
      path = undefined;

      new HidUsbDevice(deviceFactory(path));

      expect(hidSpy.HID).not.toHaveBeenCalled();
    });

    it('does not read anything on the HID device', () => {
      path = undefined;
      const device = new HidUsbDevice(deviceFactory(path));

      expect(device.fetchInfo([0x12])).toEqual([]);
      expect(mockedHidInstance.readSyncCalled).toBe(false);
    });

    it('does not write anything on the HID device', () => {
      path = undefined;
      const device = new HidUsbDevice(deviceFactory(path));

      device.fetchInfo([0x12]);

      expect(mockedHidInstance.bytesWritten).toBe(false);
      expect(mockedHidInstance.bytesGiven).toEqual([]);
    });
  });
});
