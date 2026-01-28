import HID from 'node-hid';

import DeviceToHeadphone from '../interfaces/device_to_headphone';
import Host from '../utils/host';

export default function report(deviceHash: DeviceToHeadphone): DeviceToHeadphone {
  const { vendorId, productId } = deviceHash.hidDevice;
  const writeBytes = deviceHash.headphone?.writeBytes as number[];
  let device: HID.HID | undefined;

  const devicePath = deviceHash.headphone?.path;

  if (devicePath === undefined) {
    return deviceHash;
  }

  // Try to open by path first (more reliable with multiple devices)
  try {
    device = new HID.HID(devicePath);
  } catch {
    // skip
  }

  // Fallback to vendorId/productId if path didn't work
  try {
    if (device === undefined) {
      device = new HID.HID(vendorId, productId);
    }
  } catch {
    // skip
  }

  let report: number[] = [];

  if (device !== undefined) {
    try {
      device.write(writeBytes);
      report = device.readTimeout(500);
    } catch {
      // skip
    } finally {
      device.close();
    }
  }

  deviceHash.report = report;

  return deviceHash;
}
