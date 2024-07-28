import HID, { Device } from 'node-hid';

import ProbeResult from '../interfaces/probe_result';
import KnownHeadphone from '../models/known_headphone';
import Host from '../utils/host';

export default class Probe {
  readonly devices: Device[];

  constructor(private output: boolean = false) {
    this.devices = HID.devices().filter((d) => d.vendorId === KnownHeadphone.ArctisVendorID);
  }

  // Order in popularity of the most used write bytes. We can get a false positive.
  static knownBytes = [
    [0x00, 0xb0],
    [0x06, 0x18],
    [0x06, 0x12],
    [0x06, 0xb0],
    [0x0, 0x20],
    [0x40, 0xaa]
  ];

  testUnknownHeadset(): ProbeResult[] {
    const foundHeadphones = this.findHeadphones();

    const filteredFoundHeadphones = foundHeadphones.filter((result: ProbeResult) => {
      if (result.matchedReport === undefined) {
        return false;
      }

      return result.matchedReport.length > 0;
    });

    if (this.output) {
      this.outputMessage(filteredFoundHeadphones);
    }

    return filteredFoundHeadphones;
  }

  private findHeadphones(): ProbeResult[] {
    return this.devices.map((device) => {
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
            devicePath
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
            devicePath
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
            devicePath
          } as ProbeResult;
        }
      }

      let report: number[] = [];
      let matchedBytes;
      let matchedReport;

      Probe.knownBytes.some((bytes) => {
        console.log('\tWith', bytes);
        try {
          hidDevice.write(bytes);
          report = hidDevice.readTimeout(100);

          if (report.length > 0) {
            matchedBytes = bytes;
            matchedReport = report;
            console.log('\t\tSuccess!');

            return true;
          }

          console.log("\t\tCouldn't get report");
        } catch {
          console.log("\t\tCouldn't connect");
        }
      });

      return {
        deviceProductName: device.product,
        deviceProductId: device.productId,
        matchedBytes,
        matchedReport,
        devicePath
      } as ProbeResult;
    });
  }

  private outputMessage(probeResults: ProbeResult[]): void {
    console.log(' ');
    console.log(' ');

    if (probeResults.length === 0) {
      console.log('No devices found');
      return;
    }

    console.log('Use can use the following information to create a develop your own solution and create a PR.');
    console.log('Or please copy / paste the following information and create an issue on the GitHub repo.');
    console.log('Go to: https://github.com/richrace/arctis-usb-finder/');
    console.log('You can look for values changing when press mute/changing chat mixer/charging');
    console.log(' ');
    console.log(' ');
    console.log('Devices found:');
    console.log(' ');

    probeResults.forEach((result: ProbeResult) => {
      console.log(' ');
      console.log('Product:', result.deviceProductName);
      console.log('Product ID:', result.deviceProductId);
      console.log('Bytes:', result.matchedBytes);
      console.log('Report:', result.matchedReport);
      console.log('Path:', result.devicePath);
      console.log(' ');
    });
  }
}
