import UsbDevice from './usb_device';
import KnownHeadphone from '../models/known_headphone';

export default interface FoundHeadphone {
  device: UsbDevice;
  knownHeadphone: KnownHeadphone;
  // eslint-disable-next-line semi
}
