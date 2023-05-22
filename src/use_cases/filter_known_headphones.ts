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

        const regex = new RegExp(`(Steel\\s*?Series\\s*?${known.name}\\@)|(${known.name})\\@`, 'i');

        if (regex.test(rawHeadphone.path)) {
          known.path = rawHeadphone.path;
          knownHeadphones.push(known);
        }
      });

      return knownHeadphones;
    }, []) as KnownHeadphone[];
  }
}
