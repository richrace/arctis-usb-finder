import { Device } from 'node-hid';

export default function deviceFactory(path?: string, vendorId = 10168, productId = 493): MockDevice {
  return new MockDevice(
    vendorId,
    productId,
    path,
    '20002E8C',
    'ThingM',
    'blink(1) mk2',
    2,
    -1,
    65280,
    1
  );
};

export class MockDevice implements Device {
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
