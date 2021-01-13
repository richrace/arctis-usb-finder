import IUsbDevice from '../models/i_usb_device';

export default interface IUsbGateway {
  getUsbDevices(): IUsbDevice[];
  // eslint-disable-next-line semi
}
