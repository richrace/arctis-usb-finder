/* eslint-disable jest/no-mocks-import */
import { Device } from 'node-hid';
jest.mock('../../../utils/host');
import HidUsbGateway from '../../../adapters/human_interface_device/gateway';
import MockUsbDevice from '../../../__mocks__/usb_device';
import { MockDevice } from '../../../__mocks__/device';
import KnownHeadphone from '../../../models/known_headphone';
import UsbDevice from '../../../interfaces/usb_device';
import Host from '../../../utils/host';

const notUsedDevice = new MockDevice(
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

const isUsedDevice = new MockDevice(
  10168,
  493,
  'IOService:/AppleACPIPl...HIDDevice@14210000,0',
  '20002E8C',
  'ThingM',
  'blink(1) mk2',
  2,
  -1,
  65280,
  1
);

class MockHID {
  private driver?: string;

  getDriver(): string | undefined {
    return this.driver;
  }

  setDriverType(driver: string) {
    this.driver = driver;
  }

  devices(): Device[] {
    return [notUsedDevice, isUsedDevice];
  }
}

describe('UsbGateway', () => {
  const mockedHID = new MockHID();
  let gateway: HidUsbGateway;

  describe('on macOS', () => {
    beforeEach(() => {
      gateway = new HidUsbGateway(mockedHID, MockUsbDevice);
      const mockStaticMac = jest.fn().mockReturnValue(true);
      const mockStaticWin = jest.fn().mockReturnValue(false);
      Host.isMac = mockStaticMac;
      Host.isWin = mockStaticWin;
    });

    it('sets the driver type on the HID interface', () => {
      expect(mockedHID.getDriver()).toBe('hidraw');
    });

    it('finds attached USB devices', () => {
      const usbDevice = gateway.getUsbDevices()[0];

      expect(usbDevice.realDevice()).toEqual(notUsedDevice);
    });

    it('filters used attached USB devices', () => {
      const usbDevices = gateway.getUsbDevices();

      expect(usbDevices.length).toBe(1);
    });

    it('returns an array of connected USB devices if they are connected', () => {
      const headphones = [new KnownHeadphone('Headphone Name', 493, [0x01, 0x02], 1, 3, 3, 4)];
      const devices = gateway.getHeadphones(headphones) as UsbDevice[];

      expect(devices[0].productId).toEqual(493);
    });

    it('returns a connected USB device if it is connected', () => {
      const headphone = new KnownHeadphone('Headphone Name', 493, [0x01, 0x02], 1, 3, 3, 4);
      const device = gateway.getHeadphone(headphone) as UsbDevice;

      expect(device.productId).toEqual(493);
    });
  });

  describe('on Windows', () => {
    beforeEach(() => {
      gateway = new HidUsbGateway(mockedHID, MockUsbDevice);
      const mockStaticMac = jest.fn().mockReturnValue(false);
      const mockStaticWin = jest.fn().mockReturnValue(true);
      Host.isMac = mockStaticMac;
      Host.isWin = mockStaticWin;
    });

    it('finds attached USB devices', () => {
      const usbDevice = gateway.getUsbDevices()[0];

      expect(usbDevice.realDevice()).toEqual(notUsedDevice);
    });

    it('filters out macOS', () => {
      const headphone = new KnownHeadphone('Headphone Name', 493, [0x01, 0x02], 1, 3, -1, 3);
      const device = gateway.getHeadphone(headphone) as UsbDevice;

      expect(device.productId).toEqual(493);
    });

    it("returns undefined if it can't find any USB devices", () => {
      const headphone = new KnownHeadphone('Headphone Name', 111111, [0x01, 0x02], 1, 3, 3, 4);
      const device = gateway.getHeadphone(headphone) as UsbDevice;

      expect(device).toBeUndefined();
    });

    it('finds the correct headphone', () => {
      const headphone = new KnownHeadphone('Headphone Name', 493, [0x01, 0x02], 65280, 1, -1, 3);
      const device = gateway.getHeadphone(headphone) as UsbDevice;

      expect(device.productId).toEqual(493);
    });

    it('finds the correct headphone if usage and usagePage are 0', () => {
      const headphone = new KnownHeadphone('Headphone Name', 493, [0x01, 0x02], 0, 0, -1, 3);
      const device = gateway.getHeadphone(headphone) as UsbDevice;

      expect(device.productId).toEqual(493);
    });

    it('finds the correct headphone if usagePage is 0', () => {
      const headphone = new KnownHeadphone('Headphone Name', 493, [0x01, 0x02], 65280, 1, -1, 3);
      const device = gateway.getHeadphone(headphone) as UsbDevice;

      expect(device.productId).toEqual(493);
    });

    it('finds the correct headphone if usage is 0', () => {
      const headphone = new KnownHeadphone('Headphone Name', 493, [0x01, 0x02], 65280, 0, -1, 3);
      const device = gateway.getHeadphone(headphone) as UsbDevice;

      expect(device.productId).toEqual(493);
    });

    it('returns an array of connected USB devices if they are connected', () => {
      const headphones = [new KnownHeadphone('Headphone Name', 493, [0x01, 0x02], 65280, 1, -1, 3)];
      const devices = gateway.getHeadphones(headphones) as UsbDevice[];

      expect(devices[0].productId).toEqual(493);
    });
  });
});
