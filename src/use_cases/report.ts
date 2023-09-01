import HID from 'node-hid';

import DeviceToHeadphone from '../interfaces/device_to_headphone';
import Host from '../utils/host';

export default function report(deviceHash: DeviceToHeadphone): DeviceToHeadphone {
  const { vendorId, productId } = deviceHash.hidDevice;
  const writeBytes = deviceHash.headphone?.writeBytes as number[];
  let device: HID.HID;

  if (Host.isWin()) {
    const devicePath = deviceHash.headphone?.path;

    if (devicePath === undefined) {
      return deviceHash;
    }

    device = new HID.HID(devicePath);
  } else {
    device = new HID.HID(vendorId, productId);
  }

  let report: number[] = [];

  try {
    device.write(writeBytes);
    report = device.readTimeout(100);
  } finally {
    device.close();
  }

  deviceHash.report = report;

  return deviceHash;
}
