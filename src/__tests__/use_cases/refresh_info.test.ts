/* eslint-disable jest/no-mocks-import */
import RefreshInfo from '../../use_cases/refresh_info';
import UsbGateway from '../../interfaces/usb_gateway';
import UsbDevice from '../../interfaces/usb_device';
import KnownHeadphone from '../../models/known_headphone';
import SimpleHeadphone from '../../interfaces/simple_headphone';
import * as Interfaces from '../../interfaces/use_cases';
import MockUsbDevice from '../../__mocks__/usb_device';
import deviceFactory from '../../__mocks__/device';

let knownHeadphones: KnownHeadphone[] = [];
const bytes = [0x123, 0x456];

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

class MockedFilterUseCase implements Interfaces.SimpleHeadphoneToKnownHeadphone {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(_simpleHeadphones: SimpleHeadphone[]): KnownHeadphone[] {
    return knownHeadphones;
  }
}

describe('RefreshInfo', () => {
  let gateway: UsbGateway;
  let useCase: RefreshInfo;
  let filterUseCase: Interfaces.SimpleHeadphoneToKnownHeadphone;
  const exampleHeadphones = [
    {
      isMuted: false,
      isCharging: false,
      isDischarging: true,
      isConnected: true,
      modelName: 'Arctis 7X',
      batteryPercent: 58,
      path: 'Not a real USB HID path',
      productId: 4823,
      vendorId: 4125,
    },
  ];

  describe('execute', () => {
    beforeEach(() => {
      gateway = new MockedGateway();
      filterUseCase = new MockedFilterUseCase();
      useCase = new RefreshInfo(gateway, filterUseCase);
    });

    it('will return a SimpleHeadphone object', () => {
      const found: UsbDevice = new MockUsbDevice(deviceFactory('path/of/something', bytes[0], bytes[1]));
      const knownHeadphone = new KnownHeadphone('Name', 0x12d7, bytes, 3, 1, 1, 3);
      knownHeadphones = [knownHeadphone];

      jest.spyOn(gateway, 'getHeadphone').mockReturnValue(found);
      jest.spyOn(found, 'fetchInfo');

      useCase.execute(exampleHeadphones);

      expect(found.fetchInfo).toHaveBeenCalledWith(bytes);
    });

    it('will not return a SimpleHeadphone object if the report is empty', () => {
      const found: UsbDevice = new MockUsbDevice(deviceFactory('path/of/something', bytes[0], bytes[1]));
      const knownHeadphone = new KnownHeadphone('Name', 0x12d7, [0x45, 0x43], 3, 3, 3, 3);
      knownHeadphones = [knownHeadphone];

      jest.spyOn(gateway, 'getHeadphone').mockReturnValue(found);
      jest.spyOn(found, 'fetchInfo');

      useCase.execute(exampleHeadphones);

      expect(found.fetchInfo).not.toHaveBeenCalledWith(bytes);
    });

    it('will not return a SimpleHeadphone object if it has not matched', () => {
      knownHeadphones = [];

      jest.spyOn(gateway, 'getHeadphone').mockReturnValue({} as UsbDevice);

      expect(useCase.execute(exampleHeadphones)).toHaveLength(0);
    });
  });
});
