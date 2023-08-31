import { Device } from 'node-hid';
import UsbDevice from '../interfaces/usb_device';
import KnownHeadphone from '../models/known_headphone';

export default class MockUsbDevice implements UsbDevice {
  bytesWritten = false;
  vendorId: number;
  productId: number;
  productName: string;
  knownHeadphone: KnownHeadphone | undefined;

  constructor(private rawDevice: Device, knownHeadphone?: KnownHeadphone) {
    this.vendorId = rawDevice.vendorId;
    this.productId = rawDevice.productId;
    this.productName = `${rawDevice.product}`;
    this.knownHeadphone = knownHeadphone;
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
    return 'Path ';
  }

  close(): void {
    true;
  }

  connectToHID(): void {
    true;
  }
}
