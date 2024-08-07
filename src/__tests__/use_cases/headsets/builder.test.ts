import HID from 'node-hid';

import DeviceToHeadphone from '../../../interfaces/device_to_headphone';
import SimpleHeadphone from '../../../interfaces/simple_headphone';
import KnownHeadphone from '../../../models/known_headphone';
import Arctis9MapBatteryBuilder from '../../../use_cases/headsets/arctis9_map_battery_builder';
import ArctisNovaProBuilder from '../../../use_cases/headsets/arctis_nova_pro_builder';
import Builder from '../../../use_cases/headsets/builder';
import EasyBatteryBuilder from '../../../use_cases/headsets/easy_battery_builder';
import MapBatteryBuilder from '../../../use_cases/headsets/map_battery_builder';

jest.mock('../../../use_cases/headsets/arctis_nova_pro_builder');
jest.mock('../../../use_cases/headsets/arctis9_map_battery_builder');
jest.mock('../../../use_cases/headsets/easy_battery_builder');
jest.mock('../../../use_cases/headsets/map_battery_builder');

describe('Builder', () => {
  describe('#build', () => {
    it('will build a SimpleHeadphone instance', () => {
      const report = [1, 2, 2, 90];
      const knownHeadphone = { name: 'name', batteryPercentIdx: 3, path: 'Test Path' } as KnownHeadphone;
      const hidDevice = {} as HID.Device;

      const deviceHash: DeviceToHeadphone = {
        report,
        hidDevice,
        headphone: knownHeadphone
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
        usage: undefined
      } as unknown as SimpleHeadphone);
    });
  });

  describe('#new', () => {
    describe('when the known headphone has a specific builder available', () => {
      it('creates the EasyBatteryBuilder builder with Arctis7X_ProductID', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7X_ProductID
          } as KnownHeadphone
        };
        new Builder(deviceHash);

        expect(EasyBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the MapBatteryBuilder builder with Arctis7_Plus_ProductID', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7_Plus_ProductID
          } as KnownHeadphone
        };
        new Builder(deviceHash);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the MapBatteryBuilder builder with Arctis7P_Plus_ProductID', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7P_Plus_ProductID
          } as KnownHeadphone
        };
        new Builder(deviceHash);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the MapBatteryBuilder builder with Arctis7X_Plus_ProductID', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7X_Plus_ProductID
          } as KnownHeadphone
        };
        new Builder(deviceHash);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the MapBatteryBuilder builder with Arctis7_Plus_Destiny_ProductID', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7_Plus_Destiny_ProductID
          } as KnownHeadphone
        };
        new Builder(deviceHash);

        expect(MapBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the Arctis 9 builder with the Arctis9_ProductID', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 50, 1],
          headphone: {
            productId: KnownHeadphone.Arctis9_ProductID
          } as KnownHeadphone
        };
        new Builder(deviceHash);

        expect(Arctis9MapBatteryBuilder).toHaveBeenCalled();
      });

      it('creates the ArctisNovaProBuilder with the Arctis_Nova_Pro_Wireless_ProductID', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [0, 1, 1, 0, 1, 0, 4, 0, 8, 9, 10, 11, 12, 13, 14, 8, 16],
          headphone: {
            productId: KnownHeadphone.Arctis_Nova_Pro_Wireless_ProductID
          } as KnownHeadphone
        };
        new Builder(deviceHash);

        expect(ArctisNovaProBuilder).toHaveBeenCalled();
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
            productId: KnownHeadphone.Arctis7X_ProductID
          } as KnownHeadphone
        };
        const builder = new Builder(deviceHash);

        const spy = jest.spyOn(EasyBatteryBuilder.prototype, 'execute').mockReturnValue({} as SimpleHeadphone);

        builder.execute();

        expect(spy).toHaveBeenCalledWith([1, 2, 1, 2], {
          productId: KnownHeadphone.Arctis7X_ProductID
        });
      });

      it('uses the Arctis 7P builder', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 2],
          headphone: {
            productId: KnownHeadphone.Arctis7P_ProductID
          } as KnownHeadphone
        };
        const builder = new Builder(deviceHash);

        const spy = jest.spyOn(EasyBatteryBuilder.prototype, 'execute').mockReturnValue({} as SimpleHeadphone);

        builder.execute();

        expect(spy).toHaveBeenCalledWith([1, 2, 1, 2], {
          productId: KnownHeadphone.Arctis7X_ProductID
        });
      });

      it('merges the specific builder output', () => {
        const deviceHash: DeviceToHeadphone = {
          hidDevice: {} as HID.Device,
          report: [1, 2, 1, 50, 50],
          headphone: {
            productId: KnownHeadphone.Arctis7X_ProductID,
            path: 'Test Path'
          } as KnownHeadphone
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
            usage: undefined
          },
          {
            modelName: undefined,
            path: 'Test Path',
            productId: 4823,
            vendorId: undefined,
            interfaceNum: undefined,
            usagePage: undefined,
            usage: undefined
          }
        );
      });
    });
  });
});
