import FoundHeadphone from '../interfaces/found_headphone';
import SimpleHeadphone from '../interfaces/simple_headphone';
import Builder from './headsets/builder';

export default class BuildSimpleHeadphones {
  execute(foundHeadphones: FoundHeadphone[]): SimpleHeadphone[] {
    return foundHeadphones.map((headphone: FoundHeadphone) => {
      const report = headphone.device.fetchInfo(headphone.knownHeadphone.writeBytes);
      const path = headphone.device.path();

      return Builder.build(report, path, headphone.knownHeadphone);
    }) as SimpleHeadphone[];
  }
}
