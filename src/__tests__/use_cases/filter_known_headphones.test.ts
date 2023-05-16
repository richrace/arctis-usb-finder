import KnownHeadphone from '../../models/known_headphone';
import SimpleHeadphone from '../../interfaces/simple_headphone';
import FilterKnownHeadphones from '../../use_cases/filter_known_headphones';

describe('FilterKnownHeadphones', () => {
  describe('#execute', () => {
    it('will reject paths that are "undefined"', () => {
      const useCase = new FilterKnownHeadphones();

      expect(useCase.execute([{ path: undefined }] as SimpleHeadphone[])).toEqual([]);
    });

    it(`will reject paths that don't have a matching name`, () => {
      const useCase = new FilterKnownHeadphones();

      expect(useCase.execute([{ path: 'Arctis Pro X' }] as SimpleHeadphone[])).toEqual([]);
    });

    it('will return a matched headphone by path', () => {
      const useCase = new FilterKnownHeadphones();

      expect(useCase.execute([{ path: 'Arctis 7X' }] as SimpleHeadphone[])).toEqual([
        {
          batteryPercentIdx: 3,
          chargingStatusIdx: 4,
          micStatusIdx: 5,
          name: 'Arctis 7X',
          path: 'Arctis 7X',
          productId: 4823,
          vendorId: 4152,
          writeBytes: [6, 18],
        } as KnownHeadphone,
      ]);
    });

    it('will return a matched headphone by path with possible match', () => {
      const useCase = new FilterKnownHeadphones();

      expect(useCase.execute([{ path: 'Arctis 7' }] as SimpleHeadphone[])).toEqual([
        {
          batteryPercentIdx: 2,
          chargingStatusIdx: undefined,
          micStatusIdx: undefined,
          name: 'Arctis 7 2019',
          path: 'Arctis 7',
          productId: 4781,
          vendorId: 4152,
          writeBytes: [6, 24],
        } as KnownHeadphone,
        {
          batteryPercentIdx: 2,
          chargingStatusIdx: undefined,
          micStatusIdx: undefined,
          name: 'Arctis 7 2017',
          path: 'Arctis 7',
          productId: 4704,
          vendorId: 4152,
          writeBytes: [6, 24],
        } as KnownHeadphone,
        {
          batteryPercentIdx: 3,
          chargingStatusIdx: 4,
          micStatusIdx: 5,
          name: 'Arctis 7X',
          path: 'Arctis 7',
          productId: 4823,
          vendorId: 4152,
          writeBytes: [6, 18],
        } as KnownHeadphone,
      ]);
    });
  });
});
