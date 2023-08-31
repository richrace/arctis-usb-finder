import SimpleHeadphone from '../interfaces/simple_headphone';
import UsbDevice from '../interfaces/usb_device';
import KnownHeadphone from '../models/known_headphone';
import Builder from './headsets/builder';

export default class BuildSimpleHeadphones {
  execute(foundHeadphones: UsbDevice[]): SimpleHeadphone[] {
    return foundHeadphones.map((headphone: UsbDevice) => {
      const knownHeadphone = headphone.knownHeadphone as KnownHeadphone;
      const path = headphone.path();
      const report = headphone.fetchInfo(knownHeadphone.writeBytes);

      return Builder.build(report, path as string, knownHeadphone);
    }) as SimpleHeadphone[];
  }
}
