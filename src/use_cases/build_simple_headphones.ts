import FoundHeadphone from '../models/found_headphone';
import SimpleHeadphone from '../models/simple_headphone';
import Builder from './headsets/builder';

export default class BuildSimpleHeadphones {
  execute(foundHeadphones: FoundHeadphone[]): SimpleHeadphone[] {
    return foundHeadphones.map((headphone: FoundHeadphone) => {
      const report = headphone.device.fetchInfo(headphone.knownHeadphone.writeBytes);

      return Builder.build(report, headphone.knownHeadphone);
    }) as SimpleHeadphone[];
  }
}
