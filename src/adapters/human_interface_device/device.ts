import { HID, Device } from 'node-hid';
import IUsbDevice from '../../models/i_usb_device';

export default class HidUsbDevice implements IUsbDevice {
  private rawDevice: Device;
  private hidDevice: HID | undefined;
  vendorId = 999999;
  productId = 999999;

  constructor(rawDevice: Device) {
    this.rawDevice = rawDevice;

    this.vendorId = rawDevice.vendorId;
    this.productId = rawDevice.productId;

    if (rawDevice.path) {
      this.hidDevice = new HID(rawDevice.path);
    }
  }

  readSync(): number[] {
    if (this.hidDevice) {
      return this.hidDevice.readSync();
    }

    return [];
  }

  write(bytes: number[]): void {
    if (this.hidDevice) {
      this.hidDevice.write(bytes);
    }
  }

  realDevice(): Device {
    return this.rawDevice;
  }
}
