export default class KnownHeadphone {
  readonly name: string;
  readonly vendorId: number;
  readonly productId: number;
  readonly batteryPercentIdx: number;
  readonly chargingStatusIdx: number | undefined;
  readonly micStatusIdx: number | undefined;
  readonly writeBytes: number[];

  constructor(
    name: string,
    vendorId: number,
    productId: number,
    batteryPercentIdx: number,
    writeBytes: number[],
    chargingStatusIdx?: number,
    micStatusIdx?: number
  ) {
    this.name = name;
    this.vendorId = vendorId;
    this.productId = productId;
    this.batteryPercentIdx = batteryPercentIdx;
    this.writeBytes = writeBytes;
    this.chargingStatusIdx = chargingStatusIdx;
    this.micStatusIdx = micStatusIdx;
  }
}
