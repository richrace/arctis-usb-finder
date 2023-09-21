export const map = (x: number, in_min: number, in_max: number, out_min: number, out_max: number): number =>
  Math.floor(((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min);

export const calculateBattery = (batteryPercent: number, minBattery = 0x00, maxBattery = 0x04): number => {
  if (batteryPercent > maxBattery) {
    return 100;
  }

  return map(batteryPercent, minBattery, maxBattery, 0, 100);
};
