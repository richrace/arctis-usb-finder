import KnownHeadphone from '../models/known_headphone';
import SimpleHeadphone from './simple_headphone';

export interface SimpleUseCase {
  execute(): SimpleHeadphone[];
}

export interface SimpleHeadphoneToKnownHeadphone {
  execute(simpleHeadphones: SimpleHeadphone[]): KnownHeadphone[];
}
