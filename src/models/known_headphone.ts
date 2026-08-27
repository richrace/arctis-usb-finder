interface KnownHeadphoneProps {
  name: string;
  productId: number;
  writeBytes: number[];
  usagePage: number;
  usage: number;
  interfaceNum: number;
  batteryPercentIdx: number;
  batteryPercentIdx2?: number;
  batteryPresentIdx2?: number; // Index indicating if base station battery is present (1=yes, 0=no)
  chargingStatusIdx?: number;
  micStatusIdx?: number;
  gameVolumeIdx?: number;
  chatVolumeIdx?: number;
}

export const KnownHeadphoneFactory = ({
  name,
  productId,
  writeBytes,
  usagePage,
  usage,
  interfaceNum,
  batteryPercentIdx,
  batteryPercentIdx2,
  batteryPresentIdx2,
  chargingStatusIdx,
  micStatusIdx,
  gameVolumeIdx,
  chatVolumeIdx
}: KnownHeadphoneProps): KnownHeadphone =>
  new KnownHeadphone(
    name,
    productId,
    writeBytes,
    usagePage,
    usage,
    interfaceNum,
    batteryPercentIdx,
    batteryPercentIdx2,
    batteryPresentIdx2,
    chargingStatusIdx,
    micStatusIdx,
    gameVolumeIdx,
    chatVolumeIdx
  );

export default class KnownHeadphone {
  static ArctisVendorID = 4152;

  static ArctisPro_Wireless_ProductID = 0x1290;

  static Arctis_Nova_Pro_Wireless_ProductID = 0x12e0;
  static Arctis_Nova_Elite_ProductID = 0x2244;

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
  static ArctisNova7X_V2_ProductID = 0x2258;
  static ArctisNova7P_ProductID = 0x220a;
  static ArctisNova7_Diablo_IV_ProductID = 0x223a;

  constructor(
    readonly name: string,
    readonly productId: number,
    readonly writeBytes: number[],
    readonly usagePage: number,
    readonly usage: number,
    readonly interfaceNum: number,
    readonly batteryPercentIdx: number,
    readonly batteryPercentIdx2?: number,
    readonly batteryPresentIdx2?: number,
    readonly chargingStatusIdx?: number,
    readonly micStatusIdx?: number,
    readonly gameVolumeIdx?: number,
    readonly chatVolumeIdx?: number,
    public path?: string,
    readonly vendorId = KnownHeadphone.ArctisVendorID
  ) {}
}
