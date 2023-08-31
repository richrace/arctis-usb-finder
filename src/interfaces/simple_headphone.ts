interface SimpleHeadphone {
  batteryPercent: number | undefined;
  modelName: string;
  vendorId: number;
  productId: number;
  isMuted: boolean | undefined;
  isConnected: boolean | undefined;
  isCharging: boolean | undefined;
  isDischarging: boolean | undefined;
  path: string | undefined;
}

export default SimpleHeadphone;
