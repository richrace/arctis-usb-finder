import KnownHeadphone from '../models/known_headphone';

interface UsbDevice {
  productId: number;
  vendorId: number;
  productName: string;
  knownHeadphone: KnownHeadphone | undefined;
  fetchInfo(byteArray?: number[]): number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  realDevice(): any;
  path(): string | undefined;
}

export default UsbDevice;
