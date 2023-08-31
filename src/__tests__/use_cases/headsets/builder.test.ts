import KnownHeadphone from '../../../models/known_headphone';
import SimpleHeadphone from '../../../interfaces/simple_headphone';
import EasyBatteryBuilder from '../../../use_cases/headsets/easy_battery_builder';
import MapBatteryBuilder from '../../../use_cases/headsets/map_battery_builder';
jest.mock('../../../use_cases/headsets/easy_battery_builder');
jest.mock('../../../use_cases/headsets/map_battery_builder');
import Builder from '../../../use_cases/headsets/builder';

const path = 'Test Path';

describe('Builder', () => {
  describe('#build', () => {
    it('will build a SimpleHeadphone instance', () => {
      const report = [1, 2, 2, 90];
      const knownHeadphone = { name: 'name', batteryPercentIdx: 3 } as KnownHeadphone;

      const simpleHeadphone = Builder.build(report, path, knownHeadphone);

      expect(simpleHeadphone).toEqual({
        modelName: 'name',
        batteryPercent: 90,
        path: 'Test Path',
        productId: undefined,
        vendorId: undefined,
      } as unknown as SimpleHeadphone);
    });
  });

  describe('#new', () => {
    describe('when the known headphone has a specific builder available', () => {
      it('creates the Arctis7X builder', () => {
        new Builder([1, 2, 1, 2], path, {
          productId: KnownHeadphone.Arctis7X_ProductID,
        } as KnownHeadphone);

        expect(EasyBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the Arctis7P builder with Arctis7_Plus_ProductID', () => {
        new Builder([1, 2, 1, 2], path, {
          productId: KnownHeadphone.Arctis7_Plus_ProductID,
        } as KnownHeadphone);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the Arctis7P builder with Arctis7P_Plus_ProductID', () => {
        new Builder([1, 2, 1, 2], path, {
          productId: KnownHeadphone.Arctis7P_Plus_ProductID,
        } as KnownHeadphone);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the Arctis7P builder with Arctis7X_Plus_ProductID', () => {
        new Builder([1, 2, 1, 2], path, {
          productId: KnownHeadphone.Arctis7X_Plus_ProductID,
        } as KnownHeadphone);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the Arctis7P builder with Arctis7_Plus_Destiny_ProductID', () => {
        new Builder([1, 2, 1, 2], path, {
          productId: KnownHeadphone.Arctis7_Plus_Destiny_ProductID,
        } as KnownHeadphone);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });
    });
  });

  describe('#execute', () => {
    describe('when the known headphone has a specific builder available', () => {
      it('uses the Arctis 7X builder', () => {
        const report = [1, 2, 1, 2];
        const knownHeadphone = {
          productId: KnownHeadphone.Arctis7X_ProductID,
        } as KnownHeadphone;
        const builder = new Builder(report, path, knownHeadphone);

        const spy = jest.spyOn(EasyBatteryBuilder.prototype, 'execute').mockReturnValue({} as SimpleHeadphone);

        builder.execute();

        expect(spy).toHaveBeenCalledWith(report, knownHeadphone);
      });

      it('merges the specific builder output', () => {
        const report = [1, 2, 1, 2];
        const knownHeadphone = {
          productId: KnownHeadphone.Arctis7X_ProductID,
        } as KnownHeadphone;
        const builder = new Builder(report, path, knownHeadphone);

        jest.spyOn(EasyBatteryBuilder.prototype, 'execute').mockReturnValue({} as SimpleHeadphone);

        const spy = jest.spyOn(Object, 'assign');

        builder.execute();

        expect(spy).toHaveBeenCalledWith(
          {
            isMuted: undefined,
            isCharging: undefined,
            isDischarging: undefined,
            isConnected: undefined,
            path: 'Test Path',
            productId: 4823,
            vendorId: undefined,
          },
          {
            modelName: undefined,
            batteryPercent: undefined,
            path: 'Test Path',
            productId: 4823,
            vendorId: undefined,
          }
        );
      });
    });
  });
});
