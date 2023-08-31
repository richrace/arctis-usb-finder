/* eslint-disable jest/no-mocks-import */
import { Device } from 'node-hid';
jest.mock('../../../utils/host');
import Host from '../../../utils/host';
import HidUsbDevice from '../../../adapters/human_interface_device/device';
import HeadphoneList from '../../../headphone_list';
import deviceFactory from '../../../__mocks__/device';
import KnownHeadphone from '../../../models/known_headphone';

class MockedHid {
  bytesWritten = false;
  bytesGiven: number[] = [];
  readSyncCalled = false;
  closeCalled = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  readTimeout(_timoutMS: number): number[] {
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
    const mockStaticMac = jest.fn().mockReturnValue(true);
    const mockStaticWin = jest.fn().mockReturnValue(false);
    Host.isMac = mockStaticMac;
    Host.isWin = mockStaticWin;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on Windows', () => {
    beforeEach(() => {
      const mockStaticMac = jest.fn().mockReturnValue(false);
      const mockStaticWin = jest.fn().mockReturnValue(true);
      Host.isMac = mockStaticMac;
      Host.isWin = mockStaticWin;
    });

    it('will avoid macOS specific logic', () => {
      const path = 'IOService:/AppleACPIPl...HIDDevice@14210000,0';
      const device: Device = deviceFactory(path);
      const knownHeadphone = HeadphoneList.find((h) => h.productId === KnownHeadphone.Arctis7X_ProductID);

      const usbDevice = new HidUsbDevice(device, knownHeadphone);

      expect(usbDevice.knownHeadphone).toEqual(knownHeadphone);
    });
  });

  describe('with a KnownHeadphone', () => {
    it('matches', () => {
      const path = 'IOService:/AppleACPIPl...HIDDevice@14210000,0';
      const device: Device = deviceFactory(path);
      const knownHeadphone = HeadphoneList.find((h) => h.productId === KnownHeadphone.Arctis7X_ProductID);

      const usbDevice = new HidUsbDevice(device, knownHeadphone);

      expect(usbDevice.knownHeadphone).toEqual(knownHeadphone);
    });

    it('will fetch with the correct bytes', () => {
      const path = 'IOService:/AppleACPIPl...HIDDevice@14210000,0';
      const device: Device = deviceFactory(path);
      const knownHeadphone = HeadphoneList.find((h) => h.productId === KnownHeadphone.Arctis7X_ProductID);

      const usbDevice = new HidUsbDevice(device, knownHeadphone);

      expect(usbDevice.fetchInfo()).toEqual([0, 1, 0, 1, 3]);
    });

    it("won't fetch with the missing bytes", () => {
      const path = 'IOService:/AppleACPIPl...HIDDevice@14210000,0';
      const device: Device = deviceFactory(path);
      const knownHeadphone = new KnownHeadphone('Name', KnownHeadphone.Arctis7X_ProductID, [], 1, 2, 3, 4);
      const usbDevice = new HidUsbDevice(device, knownHeadphone);

      expect(usbDevice.fetchInfo()).toEqual([]);
    });
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

    it('uses the HID Instance to read the USB device', () => {
      expect(hidUsbDevice.fetchInfo([0x12])).toEqual([0, 1, 0, 1, 3]);
      expect(mockedHidInstance.readSyncCalled).toBe(true);
    });

    it('uses the HID Instance to write the USB device', () => {
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

    it('has a path', () => {
      expect(hidUsbDevice.path()).toEqual(path);
    });
  });

  describe('when path is undefined and vendor ID is undefined', () => {
    it('does not create a HID instance', () => {
      const vendorId = 0;
      path = undefined;

      new HidUsbDevice(deviceFactory(path, vendorId));

      expect(hidSpy.HID).not.toHaveBeenCalled();
    });

    it('does not read anything on the HID device', () => {
      path = undefined;
      const vendorId = 0;
      const device = new HidUsbDevice(deviceFactory(path, vendorId));

      expect(device.fetchInfo([0x12])).toEqual([]);
      expect(mockedHidInstance.readSyncCalled).toBe(false);
    });

    it('does not write anything on the HID device', () => {
      path = undefined;
      const vendorId = 0;
      const device = new HidUsbDevice(deviceFactory(path, vendorId));

      device.fetchInfo([0x12]);

      expect(mockedHidInstance.bytesWritten).toBe(false);
      expect(mockedHidInstance.bytesGiven).toEqual([]);
    });
  });

  describe('when path is undefined and vendor ID and product ID are present', () => {
    it('tries to write to the device', () => {
      path = undefined;
      const device = new HidUsbDevice(deviceFactory(path));

      device.fetchInfo([0x12]);

      expect(mockedHidInstance.bytesWritten).toBe(true);
    });
  });
});
