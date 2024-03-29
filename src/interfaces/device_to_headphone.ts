import { Device } from 'node-hid';

import KnownHeadphone from '../models/known_headphone';

interface DeviceToHeadphone {
  hidDevice: Device;
  headphone: KnownHeadphone | undefined;
  report: number[] | undefined;
}

export default DeviceToHeadphone;
