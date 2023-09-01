import SimpleHeadphone from './simple_headphone';
import KnownHeadphone from '../models/known_headphone';

interface SpecificBuilder {
  execute(report: number[], knownHeadphone: KnownHeadphone): SimpleHeadphone;
}

export default SpecificBuilder;
