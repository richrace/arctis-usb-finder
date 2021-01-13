export default interface IUsbDevice {
  productId: number;
  vendorId: number;
  readSync(): number[];
  write(bytes: number[]): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  realDevice(): any;
  // eslint-disable-next-line semi
}
