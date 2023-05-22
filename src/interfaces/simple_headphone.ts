export default interface SimpleHeadphone {
  batteryPercent: number;
  modelName: string;
  vendorId: number;
  productId: number;
  isMuted: boolean | undefined;
  isConnected: boolean | undefined;
  isCharging: boolean | undefined;
  isDischarging: boolean | undefined;
  path: string | undefined;

  // eslint-disable-next-line semi
}
