import HID, { Device } from 'node-hid';

import ProbeResult from '../interfaces/probe_result';
import Host from '../utils/host';

export default class Probe {
  readonly devices: Device[];

  constructor() {
    this.devices = HID.devices().filter((d) => d.vendorId === 4152);
  }

  testUnknownHeadset() {
    // Order in popularity of the most used write bytes. We can get a false positive.
    const knownBytes = [
      [0x00, 0xb0],
      [0x06, 0x18],
      [0x06, 0x12],
      [0x0, 0x20],
      [0x40, 0xaa],
    ];

    const foundHeadphones = this.devices.map((device) => {
      console.log('Probing', device.product);

      const devicePath = device.path;

      let hidDevice: HID.HID;

      if (Host.isWin()) {
        if (devicePath === undefined) {
          console.log("\tCouldn't connect");
          return {
            deviceProductName: device.product,
            deviceProductId: device.productId,
            matchedBytes: undefined,
            matchedReport: undefined,
            devicePath,
          } as ProbeResult;
        }
        try {
          hidDevice = new HID.HID(devicePath);
        } catch {
          console.log("\tCouldn't connect");
          return {
            deviceProductName: device.product,
            deviceProductId: device.productId,
            matchedBytes: undefined,
            matchedReport: undefined,
            devicePath,
          } as ProbeResult;
        }
      } else {
        try {
          hidDevice = new HID.HID(device.vendorId, device.productId);
        } catch {
          console.log("\tCouldn't connect");
          return {
            deviceProductName: device.product,
            deviceProductId: device.productId,
            matchedBytes: undefined,
            matchedReport: undefined,
            devicePath,
          } as ProbeResult;
        }
      }

      let report: number[] = [];
      let matchedBytes;
      let matchedReport;

      knownBytes.some((bytes) => {
        console.log('\tWith', bytes);
        try {
          hidDevice.write(bytes);
          report = hidDevice.readTimeout(100);

          if (report.length > 0) {
            matchedBytes = bytes;
            matchedReport = report;
            console.log('\tSuccess!');

            return true;
          }
        } catch {
          // skip
        }
      });

      return {
        deviceProductName: device.product,
        deviceProductId: device.productId,
        matchedBytes,
        matchedReport,
        devicePath,
      } as ProbeResult;
    });

    return foundHeadphones.filter((result: ProbeResult) => {
      if (result.matchedReport === undefined) {
        return false;
      }

      return result.matchedReport.length > 0;
    });
  }
}
