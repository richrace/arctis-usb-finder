import { Device } from 'node-hid';
import UsbDevice from '../interfaces/usb_device';

export default class MockUsbDevice implements UsbDevice {
  bytesWritten = false;
  vendorId;
  productId;

  constructor(private rawDevice: Device, vendorId?: number, productId?: number) {
    this.vendorId = vendorId || rawDevice.vendorId;
    this.productId = productId || rawDevice.productId;
  }

  fetchInfo(bytes: number[]): number[] {
    let report: number[] = [];

    this.connectToHID();

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

  connectToHID(): void {
    true;
  }
}
