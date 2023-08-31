import { HID, Device } from 'node-hid';
import UsbDevice from '../../interfaces/usb_device';
import Host from '../../utils/host';
import KnownHeadphone from '../../models/known_headphone';

export default class HidUsbDevice implements UsbDevice {
  private hidDevice: HID | undefined;
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

  fetchInfo(bytes?: number[]): number[] {
    let report: number[] = [];
    let writeBytesTrue: number[] = [];

    if (bytes) {
      writeBytesTrue = bytes;
    }

    if (this.knownHeadphone) {
      writeBytesTrue = this.knownHeadphone.writeBytes as number[];
    }

    if (writeBytesTrue.length === 0) {
      return report;
    }

    try {
      this.connectToHID();

      this.write(writeBytesTrue);
      report = this.readSync();
    } finally {
      this.close();
    }

    return report;
  }

  realDevice(): Device {
    return this.rawDevice;
  }

  path(): string | undefined {
    return this.rawDevice.path;
  }

  // There's two ways you can have a HID connection.
  //  1. From the `HID.devices()` method with everything auto filled in or
  //  2. We need to make a connection from the `vendorId` and `productId`
  //
  // This logic ensures we have an useable HID connection
  private connectToHID(): void {
    if (this.rawDevice !== undefined && this.rawDevice.path) {
      this.hidDevice = new HID(this.rawDevice.path);
    } else if (this.vendorId !== undefined && this.vendorId !== 0) {
      if (Host.isMac()) {
        try {
          this.hidDevice = this.createNewHIDByVendorIdAndProductId();
        } catch (e) {
          // This happens if the device (USB Dongle) has been removed
          // console.debug(e);
        }
      }
    }
  }

  private readSync(): number[] {
    if (this.hidDevice) {
      return this.hidDevice.readTimeout(100);
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

  private createNewHIDByVendorIdAndProductId(): HID {
    return new HID(this.vendorId, this.productId);
  }
}
