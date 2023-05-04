export default class KnownHeadphone {
  readonly name: string;
  readonly vendorId: number;
  readonly productId: number;
  readonly batteryPercentIdx: number;
  readonly chargingStatusIdx: number | undefined;
  readonly micStatusIdx: number | undefined;
  readonly writeBytes: number[];

  public static ArctisVendorID = 4152;

  public static Arctis7_2019_ProductID = 0x12ad;
  public static Arctis7_2017_ProductID = 0x1260;
  public static ArctisProProductID = 0x1252;
  public static Arctis1WProductID = 0x12b3;
  public static Arctis9ProductID = 0x12c2;
  public static Arctis7XProductID = 0x12d7;
  public static Arctis7PPlusProductID = 0x2212;
  public static ArctisNova7ProductID = 0x2202;

  constructor(
    name: string,
    productId: number,
    batteryPercentIdx: number,
    writeBytes: number[],
    chargingStatusIdx?: number,
    micStatusIdx?: number,
    vendorId = KnownHeadphone.ArctisVendorID
  ) {
    this.name = name;
    this.productId = productId;
    this.batteryPercentIdx = batteryPercentIdx;
    this.writeBytes = writeBytes;
    this.chargingStatusIdx = chargingStatusIdx;
    this.micStatusIdx = micStatusIdx;
    this.vendorId = vendorId;
  }
}
