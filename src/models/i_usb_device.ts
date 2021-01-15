export default interface IUsbDevice {
  productId: number;
  vendorId: number;
  fetchInfo(bytes: number[]): number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  realDevice(): any;
  // eslint-disable-next-line semi
}
