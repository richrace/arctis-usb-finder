import KnownHeadphone from '../../models/known_headphone';
import SimpleHeadphone from '../../models/simple_headphone';

export default interface SpecificBuilder {
  execute(report: number[], knownHeadphone: KnownHeadphone): SimpleHeadphone;
  // eslint-disable-next-line semi
}
