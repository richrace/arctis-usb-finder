import HID from 'node-hid';

import KnownHeadphone from '../../../models/known_headphone';
import SimpleHeadphone from '../../../interfaces/simple_headphone';
import EasyBatteryBuilder from '../../../use_cases/headsets/easy_battery_builder';
import MapBatteryBuilder from '../../../use_cases/headsets/map_battery_builder';
jest.mock('../../../use_cases/headsets/easy_battery_builder');
jest.mock('../../../use_cases/headsets/map_battery_builder');
import Builder from '../../../use_cases/headsets/builder';
import DeviceToHeadphone from '../../../interfaces/device_to_headphone';

const path = 'Test Path';

describe('Builder', () => {
  describe('#build', () => {
    it('will build a SimpleHeadphone instance', () => {
      const report = [1, 2, 2, 90];
      const knownHeadphone = { name: 'name', batteryPercentIdx: 3, path: 'Test Path' } as KnownHeadphone;
      const hidDevice = {} as HID.Device;

      const deviceHash: DeviceToHeadphone = {
        report,
        hidDevice,
        headphone: knownHeadphone,
      };
      const simpleHeadphone = Builder.build(deviceHash);

      expect(simpleHeadphone).toEqual({
        modelName: 'name',
        batteryPercent: 90,
        path: 'Test Path',
        productId: undefined,
        vendorId: undefined,
        interfaceNum: undefined,
        usagePage: undefined,
        usage: undefined,
      } as unknown as SimpleHeadphone);
    });
  });

  describe('#new', () => {
    describe('when the known headphone has a specific builder available', () => {
      it('creates the Arctis7X builder', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7X_ProductID,
          } as KnownHeadphone,
        };
        new Builder(deviceHash);

        expect(EasyBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the Arctis7P builder with Arctis7_Plus_ProductID', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7_Plus_ProductID,
          } as KnownHeadphone,
        };
        new Builder(deviceHash);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the Arctis7P builder with Arctis7P_Plus_ProductID', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7P_Plus_ProductID,
          } as KnownHeadphone,
        };
        new Builder(deviceHash);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the Arctis7P builder with Arctis7X_Plus_ProductID', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7X_Plus_ProductID,
          } as KnownHeadphone,
        };
        new Builder(deviceHash);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the Arctis7P builder with Arctis7_Plus_Destiny_ProductID', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7_Plus_Destiny_ProductID,
          } as KnownHeadphone,
        };
        new Builder(deviceHash);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });
    });
  });

  describe('#execute', () => {
    describe('when the known headphone has a specific builder available', () => {
      it('uses the Arctis 7X builder', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7X_ProductID,
          } as KnownHeadphone,
        };
        const builder = new Builder(deviceHash);

        const spy = jest.spyOn(EasyBatteryBuilder.prototype, 'execute').mockReturnValue({} as SimpleHeadphone);

        builder.execute();

        expect(spy).toHaveBeenCalledWith([1, 2, 1, 2], {
          productId: KnownHeadphone.Arctis7X_ProductID,
        });
      });

      it('merges the specific builder output', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 50, 50],
          headphone: {
            productId: KnownHeadphone.Arctis7X_ProductID,
            path: 'Test Path',
          } as KnownHeadphone,
        };
        const builder = new Builder(deviceHash);

        jest.spyOn(EasyBatteryBuilder.prototype, 'execute').mockReturnValue({} as SimpleHeadphone);

        const spy = jest.spyOn(Object, 'assign');

        builder.execute();

        expect(spy).toHaveBeenCalledWith(
          {
            modelName: undefined,
            path: 'Test Path',
            productId: 4823,
            vendorId: undefined,
            interfaceNum: undefined,
            usagePage: undefined,
            usage: undefined,
          },
          {
            modelName: undefined,
            path: 'Test Path',
            productId: 4823,
            vendorId: undefined,
            interfaceNum: undefined,
            usagePage: undefined,
            usage: undefined,
          }
        );
      });
    });
  });
});
