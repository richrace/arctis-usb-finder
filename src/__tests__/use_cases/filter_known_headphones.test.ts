import KnownHeadphone from '../../models/known_headphone';
import SimpleHeadphone from '../../interfaces/simple_headphone';
import FilterKnownHeadphones from '../../use_cases/filter_known_headphones';

describe('FilterKnownHeadphones', () => {
  describe('#execute', () => {
    let useCase: FilterKnownHeadphones;
    let knownHeadphone: KnownHeadphone;

    beforeEach(() => {
      useCase = new FilterKnownHeadphones();

      knownHeadphone = {
        batteryPercentIdx: 3,
        chargingStatusIdx: 4,
        micStatusIdx: 5,
        name: 'Arctis 7X',
        path: 'Made up Arctis 7X@',
        productId: 4823,
        vendorId: 4152,
        writeBytes: [6, 18],
      };
    });

    it('will reject paths that are "undefined"', () => {
      expect(useCase.execute([{ path: undefined }] as SimpleHeadphone[])).toEqual([]);
    });

    it(`will reject paths that don't have a matching name`, () => {
      expect(useCase.execute([{ path: 'Arctis Pro X' }] as SimpleHeadphone[])).toEqual([]);
    });

    it('will return a matched headphone by path', () => {
      expect(useCase.execute([{ path: 'Made up Arctis 7X@' }] as SimpleHeadphone[])).toEqual([
        knownHeadphone,
      ]);
    });

    it('will return a matched headphone by a real path', () => {
      const realPath =
        'IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS06@14100000/USB2.0 Hub             @14100000/AppleUSB20Hub@14100000/AppleUSB20HubPort@14120000/SteelSeries Arctis 7X@14120000/SteelSeries Arctis 7X@3/AppleUserUSBHostHIDDevice';
      knownHeadphone.path = realPath;

      expect(
        useCase.execute([
          {
            path: realPath,
          },
        ] as SimpleHeadphone[])
      ).toEqual([knownHeadphone]);
    });
  });
});
