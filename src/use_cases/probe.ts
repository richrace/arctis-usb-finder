import HID from 'node-hid';
import UsbDevice from '../interfaces/usb_device';
import KnownHeadphone from '../models/known_headphone';
import HidGateway from '../adapters/human_interface_device/gateway';
import HidDevice from '../adapters/human_interface_device/device';
import ProbeResult from '../interfaces/probe_result';

export default class Probe {
  private devices;

  constructor() {
    const gateway = new HidGateway(HID, HidDevice);
    this.devices = gateway.getUsbDevices();
  }

  testUnknownHeadset(headsets: UsbDevice[]): ProbeResult[] {
    return headsets.map((device: UsbDevice) => {
      const knownBytes = [
        [0x0, 0x20],
        [0x06, 0x12],
        [0x06, 0x18],
        [0x40, 0xaa],
        [0x00, 0xb0],
      ];
      let matchedReport, matchedBytes;

      console.log('Testing', device.realDevice().product);

      knownBytes.some((byteArray) => {
        const report = device.fetchInfo(byteArray);

        if (report.length > 0) {
          matchedBytes = byteArray;
          matchedReport = report;
          console.log('\tSuccess!');

          return true;
        }
      });

      return {
        device,
        matchedBytes,
        matchedReport,
      } as ProbeResult;
    });
  }

  steelseriesHeadsets(): UsbDevice[] {
    return this.devices.filter((device: UsbDevice) => {
      return device.vendorId === KnownHeadphone.ArctisVendorID;
    });
  }
}
