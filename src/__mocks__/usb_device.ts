import { Device } from 'node-hid';
import UsbDevice from '../models/usb_device';

export default class MockUsbDevice implements UsbDevice {
  bytesWritten = false;
  vendorId = 123;
  productId = 456;

  constructor(private rawDevice: Device) {
    if (this.rawDevice) {
      this.vendorId = rawDevice.vendorId;
      this.productId = rawDevice.productId;
    }
  }

  fetchInfo(bytes: number[]): number[] {
    let report: number[] = [];

    this.write(bytes);
    report = this.readSync();
    this.close();

    return report;
  }

  readSync(): number[] {
    return [0, 0, 0, 0, 0, 0];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  write(_bytes: number[]): void {
    this.bytesWritten = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  realDevice(): any {
    return this.rawDevice;
  }

  path(): string | undefined {
    return "Path ";
  }

  close(): void {
    true;
  }
}
