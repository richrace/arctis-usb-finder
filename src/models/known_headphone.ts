export default class KnownHeadphone {
  static ArctisVendorID = 4152;

  static Arctis7_2019_ProductID = 0x12ad;
  static Arctis7_2017_ProductID = 0x1260;
  static ArctisProProductID = 0x1252;
  static Arctis1WProductID = 0x12b3;
  static Arctis9ProductID = 0x12c2;
  static Arctis7XProductID = 0x12d7;
  static Arctis7PPlusProductID = 0x2212;
  static ArctisNova7ProductID = 0x2202;
  static ArctisNova7XProductID = 0x2206;

  constructor(
    readonly name: string,
    readonly productId: number,
    readonly batteryPercentIdx: number,
    readonly writeBytes: number[],
    readonly chargingStatusIdx?: number,
    readonly micStatusIdx?: number,
    public path?: string,
    readonly vendorId = KnownHeadphone.ArctisVendorID
  ) {}
}
