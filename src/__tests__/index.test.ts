import IUsbDevice from '../models/i_usb_device';
import IUsbGateway from '../gateways/i_usb_gateway';
import FoundHeadphone from '../models/found_headphone';
import SimpleHeadphone from '../models/simple_headphone';

class MockedGateway implements IUsbGateway {
  getUsbDevices(): IUsbDevice[] {
    return [];
  }
}
class MockedFindUseCase {
  execute(): IUsbDevice[] {
    return [];
  }
}

let simpleHeadphones: SimpleHeadphone[] = [];
class MockedBuildUseCsase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(_foundHeadphones: FoundHeadphone[]): SimpleHeadphone[] {
    return simpleHeadphones;
  }
}

jest.mock('../adapters/human_interface_device/gateway', () => MockedGateway);
jest.mock('../use_cases/find_headphones', () => MockedFindUseCase);
jest.mock('../use_cases/build_simple_headphones', () => MockedBuildUseCsase);
import getHeadphones from '../index';

describe('TempName', () => {
  describe('when we have no found headphones', () => {
    it('returns an empty list', () => {
      expect(getHeadphones()).toEqual([]);
    });
  });

  describe('when we have a found headphone', () => {
    beforeEach(() => {
      simpleHeadphones = [
        { modelName: 'Arctis 7X', batteryPercent: 90 } as SimpleHeadphone,
      ];
    });

    it('returns a SimpleHeadphone list', () => {
      expect(getHeadphones()).toEqual([
        { modelName: 'Arctis 7X', batteryPercent: 90 },
      ]);
    });
  });
});
