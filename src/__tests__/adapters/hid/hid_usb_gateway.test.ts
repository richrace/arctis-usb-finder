/* eslint-disable jest/no-mocks-import */
import { Device } from 'node-hid';
import UsbGateway from '../../../adapters/hid/hid_usb_gateway';
import MockUsbDevice from '../../../__mocks__/usb_device';
import MockDevice from '../../../__mocks__/device';

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
  let gateway: UsbGateway;

  beforeEach(() => {
    gateway = new UsbGateway(mockedHID, MockUsbDevice);
  });

  it('sets the driver type on the HID interface', () => {
    expect(mockedHID.getDriver()).toBe('libusb');
  });

  it('finds attached USB devices', () => {
    const usbDevice = gateway.getUsbDevices()[0];

    expect(usbDevice.realDevice()).toEqual(notUsedDevice);
  });

  it('filters used attached USB devices', () => {
    const usbDevices = gateway.getUsbDevices();

    expect(usbDevices.length).toBe(1);
  });
});
