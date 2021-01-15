import UsbDevice from '../models/usb_device';

export default interface UsbGateway {
  getUsbDevices(): UsbDevice[];
  // eslint-disable-next-line semi
}
