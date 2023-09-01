import HID from 'node-hid';

interface ProbeResult {
  device: HID.Device;
  matchedBytes: number[] | undefined;
  matchedReport: number[] | undefined;
}

export default ProbeResult;
