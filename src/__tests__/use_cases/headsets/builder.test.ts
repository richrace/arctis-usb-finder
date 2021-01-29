import KnownHeadphone from '../../../models/known_headphone';
import SimpleHeadphone from '../../../models/simple_headphone';
import Arctis7xBuilder from '../../../use_cases/headsets/7x_builder';
jest.mock('../../../use_cases/headsets/7x_builder');
import Builder from '../../../use_cases/headsets/builder';

describe('Builder', () => {
  describe('#build', () => {
    it('will build a SimpleHeadphone instance', () => {
      const report = [1, 2, 2, 90];
      const knownHeadphone = { name: 'name', batteryPercentIdx: 3 } as KnownHeadphone;

      const simpleHeadphone = Builder.build(report, knownHeadphone);

      expect(simpleHeadphone).toEqual({
        modelName: 'name',
        batteryPercent: 90,
      } as SimpleHeadphone);
    });
  });

  describe('#new', () => {
    describe('when the known headphone has a specifc builder available', () => {
      it('creates the specific builder', () => {
        new Builder([1, 2, 1, 2], {
          productId: KnownHeadphone.Arctis7XProductID,
        } as KnownHeadphone);

        expect(Arctis7xBuilder).toHaveBeenCalled();
      });
    });
  });

  describe('#execute', () => {
    describe('when the known headphone has a specifc builder available', () => {
      it('uses the specifc builder', () => {
        const report = [1, 2, 1, 2];
        const knownHeadphone = {
          productId: KnownHeadphone.Arctis7XProductID,
        } as KnownHeadphone;
        const builder = new Builder(report, knownHeadphone);

        const spy = jest
          .spyOn(Arctis7xBuilder.prototype, 'execute')
          .mockReturnValue({} as SimpleHeadphone);

        builder.execute();

        expect(spy).toHaveBeenCalledWith(report, knownHeadphone);
      });

      it('merges the specifc builder output', () => {
        const report = [1, 2, 1, 2];
        const knownHeadphone = {
          productId: KnownHeadphone.Arctis7XProductID,
        } as KnownHeadphone;
        const builder = new Builder(report, knownHeadphone);

        jest.spyOn(Arctis7xBuilder.prototype, 'execute').mockReturnValue({} as SimpleHeadphone);

        const spy = jest.spyOn(Object, 'assign');

        builder.execute();

        expect(spy).toHaveBeenCalledWith(
          {
            isMuted: undefined,
            isCharging: undefined,
            isDischarging: undefined,
            isConnected: undefined,
          },
          {
            modelName: undefined,
            batteryPercent: undefined,
          }
        );
      });
    });
  });
});
