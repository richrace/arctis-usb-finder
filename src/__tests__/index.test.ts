import UsbDevice from '../interfaces/usb_device';
import UsbGateway from '../interfaces/usb_gateway';
import SimpleHeadphone from '../interfaces/simple_headphone';

class MockedGateway implements UsbGateway {
  getUsbDevices(): UsbDevice[] {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getHeadphones(_headphoneList: KnownHeadphone[]): UsbDevice[] {
    return [] as UsbDevice[];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getHeadphone(_knownHeadphone: KnownHeadphone): UsbDevice | undefined {
    return {} as UsbDevice;
  }
}

let simpleHeadphones: SimpleHeadphone[] = [];

class MockedRefreshInfoUseCase {
  execute(simpleHeadphones: SimpleHeadphone[]): SimpleHeadphone[] {
    return simpleHeadphones;
  }
}

class MockedBuildUseCase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(_foundHeadphones: UsbDevice[]): SimpleHeadphone[] {
    return simpleHeadphones;
  }
}

jest.mock('../adapters/human_interface_device/gateway', () => MockedGateway);
jest.mock('../use_cases/refresh_info', () => MockedRefreshInfoUseCase);
jest.mock('../use_cases/build_simple_headphones', () => MockedBuildUseCase);
import * as SteelSeries from '../index';
import KnownHeadphone from '../models/known_headphone';

describe('Entry Point for API', () => {
  describe('#getHeadphones()', () => {
    describe('when we have no found headphones', () => {
      it('returns an empty list', () => {
        expect(SteelSeries.getHeadphones()).toEqual([]);
      });
    });

    describe('when we have a found headphone', () => {
      beforeEach(() => {
        simpleHeadphones = [{ modelName: 'Arctis 7X', batteryPercent: 90 } as SimpleHeadphone];
      });

      it('returns a SimpleHeadphone list', () => {
        expect(SteelSeries.getHeadphones()).toEqual([{ modelName: 'Arctis 7X', batteryPercent: 90 }]);
      });
    });
  });

  describe('#refreshHeadphones()', () => {
    beforeEach(() => {
      simpleHeadphones = [];
    });

    describe('when we have no found headphones', () => {
      it('returns an empty list', () => {
        expect(SteelSeries.refreshHeadphones(simpleHeadphones)).toEqual([]);
      });
    });

    describe('when we have a found headphone', () => {
      beforeEach(() => {
        simpleHeadphones = [{ modelName: 'Arctis 7X', batteryPercent: 90 } as SimpleHeadphone];
      });

      it('returns a SimpleHeadphone list', () => {
        expect(SteelSeries.refreshHeadphones(simpleHeadphones)).toEqual([
          { modelName: 'Arctis 7X', batteryPercent: 90 },
        ]);
      });
    });
  });
});
