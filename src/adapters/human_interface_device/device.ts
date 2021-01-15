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
  }

  fetchInfo(writeBytes: number[]): number[] {
    let report: number[] = [];

    try {
      if (this.rawDevice.path) {
        this.hidDevice = new HID(this.rawDevice.path);
      }

      this.write(writeBytes);
      report = this.readSync();
    } finally {
      this.close();
    }

    return report;
  }

  realDevice(): Device {
    return this.rawDevice;
  }

  private readSync(): number[] {
    if (this.hidDevice) {
      return this.hidDevice.readSync();
    }

    return [];
  }

  private write(bytes: number[]): void {
    if (this.hidDevice) {
      this.hidDevice.write(bytes);
    }
  }

  private close(): void {
    if (this.hidDevice) {
      this.hidDevice.close();
    }
  }
}
