import UsbDevice from './usb_device';

interface ProbeResult {
  device: UsbDevice;
  matchedBytes: number[] | undefined;
  matchedReport: number[] | undefined;
}

export default ProbeResult;
