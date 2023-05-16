import UsbDevice from './usb_device';

export default interface UsbGateway {
  getUsbDevices(): UsbDevice[];
  getHeadphoneByVendorIdAndProductId(vendorId: number, productId: number): UsbDevice;
  // eslint-disable-next-line semi
}
