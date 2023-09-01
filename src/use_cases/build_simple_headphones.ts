import DeviceToHeadphone from '../interfaces/device_to_headphone';
import SimpleHeadphone from '../interfaces/simple_headphone';
import Builder from './headsets/builder';

export default class BuildSimpleHeadphones {
  execute(deviceHashes: DeviceToHeadphone[]): SimpleHeadphone[] {
    return deviceHashes.map((deviceHash: DeviceToHeadphone) => {
      return Builder.build(deviceHash);
    });
  }
}
