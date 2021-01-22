import FoundHeadphone from '../models/found_headphone';
import SimpleHeadphone from '../models/simple_headphone';

export default class BuildSimpleHeadphones {
  execute(foundHeadphones: FoundHeadphone[]): SimpleHeadphone[] {
    return foundHeadphones.map((headphone: FoundHeadphone) => {
      const report = headphone.device.fetchInfo(headphone.knownHeadphone.writeBytes);

      return {
        modelName: headphone.knownHeadphone.name,
        batteryPercent: report[headphone.knownHeadphone.batteryPercentIdx],
      } as SimpleHeadphone;
    }) as SimpleHeadphone[];
  }
}
