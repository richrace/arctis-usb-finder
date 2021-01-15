/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Device } from 'node-hid';
import UsbGateway from '../../gateways/usb_gateway';
import UsbDevice from '../../models/usb_device';

export default class HidUsbGateway implements UsbGateway {
  private usbProvider;
  private usbModel;

  constructor(usbProvider: any, usbModel: any) {
    this.usbProvider = usbProvider;
    this.usbModel = usbModel;

    this.usbProvider.setDriverType('libusb');
  }

  getUsbDevices(): UsbDevice[] {
    return this.usbProvider
      .devices()
      .filter((device: Device) => device.usage !== 1)
      .map((device: Device) => new this.usbModel(device));
  }
}
