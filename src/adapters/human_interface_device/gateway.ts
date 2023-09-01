/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Device } from 'node-hid';
import UsbGateway from '../../interfaces/usb_gateway';
import UsbDevice from '../../interfaces/usb_device';
import KnownHeadphone from '../../models/known_headphone';
import Host from '../../utils/host';
import HeadphoneList from '../../headphone_list';

export default class HidUsbGateway implements UsbGateway {
  private usbProvider;
  private usbModel;

  constructor(usbProvider: any, usbModel: any) {
    this.usbProvider = usbProvider;
    this.usbModel = usbModel;

    this.usbProvider.setDriverType('hidraw');
  }

  getUsbDevices(): UsbDevice[] {
    return this.usbProvider
      .devices()
      .filter((device: Device) => {
        if (Host.isMac()) {
          return device.usage !== 1;
        } else {
          return true;
        }
      })
      .map((device: Device) => {
        const foundHeadphone = HeadphoneList.find((headphone) => {
          return headphone.vendorId === device.vendorId && headphone.productId === device.productId;
        });
        return new this.usbModel(device, foundHeadphone);
      });
  }

  getHeadphones(): UsbDevice[] {
    const foundHeadphones = HeadphoneList.map((headphone) => {
      return this.getHeadphone(headphone);
    }).filter((h) => h !== undefined);

    return foundHeadphones as UsbDevice[];
  }

  getHeadphone(knownHeadphone: KnownHeadphone): UsbDevice | undefined {
    const device = this.usbProvider
      .devices(KnownHeadphone.ArctisVendorID, knownHeadphone.productId)
      .find((device: Device) => {
        // macOS doesn't seem to use the interface
        if (Host.isMac()) {
          return true;
        }

        // Windows handles it different
        if (Host.isWin()) {
          // console.log('usage', device.usage, 'usagePage', device.usagePage);
          if (device.usage === 0 || device.usagePage === 0) {
            return (
              knownHeadphone.usage === device.usage &&
              knownHeadphone.usagePage === device.usagePage &&
              knownHeadphone.interfaceNum === device.interface
            );
          }
        }

        return knownHeadphone.interfaceNum === device.interface;
      });

    if (device === undefined) {
      return undefined;
    }

    return new this.usbModel(device, knownHeadphone);
  }
}
