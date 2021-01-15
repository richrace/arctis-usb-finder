import IUsbDevice from './i_usb_device';
import KnownHeadphone from './known_headphone';

export default interface FoundHeadphone {
  device: IUsbDevice;
  knownHeadphone: KnownHeadphone;
  // eslint-disable-next-line semi
}
