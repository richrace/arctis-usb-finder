import KnownHeadphone from '../models/known_headphone';
import UsbDevice from './usb_device';

interface UsbGateway {
  getUsbDevices(): UsbDevice[];
  getHeadphones(headphoneList: KnownHeadphone[]): UsbDevice[];
  getHeadphone(knownHeadphone: KnownHeadphone): UsbDevice | undefined;
}

export default UsbGateway;
