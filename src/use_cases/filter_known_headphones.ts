import KnownHeadphone from '../models/known_headphone';
import KnownHeadphones from '../headphone_list';
import SimpleHeadphone from '../interfaces/simple_headphone';
import * as Interfaces from '../interfaces/use_cases';

export default class FilterKnownHeadphones implements Interfaces.SimpleHeadphoneToKnownHeadphone {
  execute(rawHeadphones: SimpleHeadphone[]): KnownHeadphone[] {
    return rawHeadphones.reduce((knownHeadphones: KnownHeadphone[], rawHeadphone) => {
      KnownHeadphones.filter((known) => {
        if (rawHeadphone.path === undefined) {
          return knownHeadphones;
        }

        if (known.name.indexOf(rawHeadphone.path) !== -1) {
          known.path = rawHeadphone.path;
          knownHeadphones.push(known);
        }
      });

      return knownHeadphones;
    }, []) as KnownHeadphone[];
  }
}
