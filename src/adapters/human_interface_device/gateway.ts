/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Device } from 'node-hid';
import IUsbGateway from '../../gateways/i_usb_gateway';
import IUsbDevice from '../../models/i_usb_device';

export default class HidUsbGateway implements IUsbGateway {
  private usbProvider;
  private usbModel;

  constructor(usbProvider: any, usbModel: any) {
    this.usbProvider = usbProvider;
    this.usbModel = usbModel;

    this.usbProvider.setDriverType('libusb');
  }

  getUsbDevices(): IUsbDevice[] {
    return this.usbProvider
      .devices()
      .filter((device: Device) => device.usage !== 1)
      .map((device: Device) => new this.usbModel(device));
  }
}
