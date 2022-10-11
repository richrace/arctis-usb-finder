import HID from 'node-hid';
import FindHeadphones from './use_cases/find_headphones';
import HidGateway from './adapters/human_interface_device/gateway';
import HidDevice from './adapters/human_interface_device/device';
import BuildSimpleHeadphones from './use_cases/build_simple_headphones';
import SimpleHeadphone from './models/simple_headphone';

export function getHeadphones(): SimpleHeadphone[] {
  const gateway = new HidGateway(HID, HidDevice);
  const findHeadphonesUsecase = new FindHeadphones(gateway);
  const buildUsecase = new BuildSimpleHeadphones();

  return buildUsecase.execute(findHeadphonesUsecase.execute());
}
