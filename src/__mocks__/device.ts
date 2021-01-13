import { Device } from 'node-hid';

export default class MockDevice implements Device {
  vendorId: number;
  productId: number;
  path?: string;
  serialNumber?: string;
  manufacturer?: string;
  product?: string;
  release: number;
  interface: number;
  usagePage?: number;
  usage?: number;

  constructor(
    vendorId: number,
    productId: number,
    path: string | undefined,
    serialNumber: string,
    manufacturer: string,
    product: string,
    release: number,
    interface1: number,
    usagePage: number,
    usage: number
  ) {
    this.vendorId = vendorId;
    this.productId = productId;
    this.path = path;
    this.serialNumber = serialNumber;
    this.manufacturer = manufacturer;
    this.product = product;
    this.release = release;
    this.interface = interface1;
    this.usagePage = usagePage;
    this.usage = usage;
  }
}
