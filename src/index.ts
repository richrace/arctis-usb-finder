import HID from 'node-hid';
import HidGateway from './adapters/human_interface_device/gateway';
import HidDevice from './adapters/human_interface_device/device';
import BuildSimpleHeadphones from './use_cases/build_simple_headphones';
import RefreshInfo from './use_cases/refresh_info';
import SimpleHeadphone from './interfaces/simple_headphone';
import FilterKnownHeadphones from './use_cases/filter_known_headphones';

export function getHeadphones(): SimpleHeadphone[] {
  const gateway = new HidGateway(HID, HidDevice);
  const buildUseCase = new BuildSimpleHeadphones();

  const headphones = gateway.getHeadphones();

  return buildUseCase.execute(headphones);
}

export function refreshHeadphones(simpleHeadphones: SimpleHeadphone[]): SimpleHeadphone[] {
  const gateway = new HidGateway(HID, HidDevice);
  const filterToKnownHeadphones = new FilterKnownHeadphones();
  const useCase = new RefreshInfo(gateway, filterToKnownHeadphones);

  return useCase.execute(simpleHeadphones);
}
