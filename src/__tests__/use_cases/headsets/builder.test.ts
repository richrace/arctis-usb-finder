import KnownHeadphone from '../../../models/known_headphone';
import SimpleHeadphone from '../../../interfaces/simple_headphone';
import Arctis7xBuilder from '../../../use_cases/headsets/7x_builder';
jest.mock('../../../use_cases/headsets/7x_builder');
import Builder from '../../../use_cases/headsets/builder';

describe('Builder', () => {
  describe('#build', () => {
    it('will build a SimpleHeadphone instance', () => {
      const report = [1, 2, 2, 90];
      const path = 'path';
      const knownHeadphone = { name: 'name', batteryPercentIdx: 3 } as KnownHeadphone;

      const simpleHeadphone = Builder.build(report, path, knownHeadphone);

      expect(simpleHeadphone).toEqual({
        modelName: 'name',
        batteryPercent: 90,
        path: 'path',
      } as SimpleHeadphone);
    });
  });

  describe('#new', () => {
    describe('when the known headphone has a specific builder available', () => {
      it('creates the specific builder', () => {
        new Builder([1, 2, 1, 2], 'path', {
          productId: KnownHeadphone.Arctis7X_ProductID,
        } as KnownHeadphone);

        expect(Arctis7xBuilder).toHaveBeenCalled();
      });
    });
  });

  describe('#execute', () => {
    describe('when the known headphone has a specific builder available', () => {
      it('uses the specific builder', () => {
        const path = 'path';
        const report = [1, 2, 1, 2];
        const knownHeadphone = {
          productId: KnownHeadphone.Arctis7X_ProductID,
        } as KnownHeadphone;
        const builder = new Builder(report, path, knownHeadphone);

        const spy = jest.spyOn(Arctis7xBuilder.prototype, 'execute').mockReturnValue({} as SimpleHeadphone);

        builder.execute();

        expect(spy).toHaveBeenCalledWith(report, knownHeadphone);
      });

      it('merges the specific builder output', () => {
        const report = [1, 2, 1, 2];
        const path = undefined;
        const knownHeadphone = {
          productId: KnownHeadphone.Arctis7X_ProductID,
        } as KnownHeadphone;
        const builder = new Builder(report, path, knownHeadphone);

        jest.spyOn(Arctis7xBuilder.prototype, 'execute').mockReturnValue({} as SimpleHeadphone);

        const spy = jest.spyOn(Object, 'assign');

        builder.execute();

        expect(spy).toHaveBeenCalledWith(
          {
            isMuted: undefined,
            isCharging: undefined,
            isDischarging: undefined,
            isConnected: undefined,
            productId: 4823,
            vendorId: undefined,
          },
          {
            modelName: undefined,
            batteryPercent: undefined,
            productId: 4823,
            vendorId: undefined,
          }
        );
      });
    });
  });
});
