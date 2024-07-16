export default class KnownHeadphone {
  static ArctisVendorID = 4152;

  static ArctisPro_Wireless_ProductID = 0x1290;
  static Arctis7_2017_ProductID = 0x1260;
  static Arctis7_2019_ProductID = 0x12ad;
  static ArctisPro_2019_ProductID = 0x1252;
  static ArctisPro_GameDac_ProductID = 0x1280;

  static Arctis1W_ProductID = 0x12b3;
  static Arctis1X_ProductID = 0x12b6;
  static Arctis7X_ProductID = 0x12d7;
  static Arctis7P_ProductID = 0x12d5;

  static Arctis9_ProductID = 0x12c2;

  static Arctis7_Plus_ProductID = 0x220e;
  static Arctis7_Plus_Destiny_ProductID = 0x2236;
  static Arctis7P_Plus_ProductID = 0x2212;
  static Arctis7X_Plus_ProductID = 0x2216;

  static ArctisNova7_ProductID = 0x2202;
  static ArctisNova7X_ProductID = 0x2206;
  static ArctisNova7P_ProductID = 0x220a;

  constructor(
    readonly name: string,
    readonly productId: number,
    readonly writeBytes: number[],
    readonly usagePage: number,
    readonly usage: number,
    readonly interfaceNum: number,
    readonly batteryPercentIdx: number,
    readonly chargingStatusIdx?: number,
    readonly micStatusIdx?: number,
    public path?: string,
    readonly vendorId = KnownHeadphone.ArctisVendorID
  ) {}
}
