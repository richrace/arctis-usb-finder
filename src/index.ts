import HID from 'node-hid';

import HeadphoneList from './headphone_list';
import DeviceToHeadphone from './interfaces/device_to_headphone';
import SimpleHeadphone from './interfaces/simple_headphone';
import BuildSimpleHeadphones from './use_cases/build_simple_headphones';
import report from './use_cases/report';

export default class ArctisUsbFinder {
  devices: DeviceToHeadphone[] = [];

  simpleHeadphones(): SimpleHeadphone[] {
    const simpleBuilder = new BuildSimpleHeadphones();

    return simpleBuilder.execute(this.devices);
  }

  loadHeadphones() {
    this.findHeadphones();
    this.devices.map(report);
  }

  refreshHeadphones() {
    this.devices.map(report);
  }

  private findHeadphones() {
    const hidDevices = HID.devices();

    this.devices = hidDevices
      .map((hidDevice): DeviceToHeadphone => {
        return {
          hidDevice,
          report: [],
          headphone: HeadphoneList.find((headphone) => {
            const result = hidDevice.vendorId === headphone.vendorId && hidDevice.productId === headphone.productId;

            if (result === false) return false;

            if (headphone.usagePage !== 0 && headphone.usage !== 0) {
              return (
                hidDevice.usagePage === headphone.usagePage &&
                hidDevice.usage === headphone.usage &&
                hidDevice.interface === headphone.interfaceNum
              );
            }

            return hidDevice.interface === headphone.interfaceNum;
          }),
        };
      })
      .filter((hash) => {
        if (hash.headphone) {
          hash.headphone.path = hash.hidDevice.path;

          return true;
        }
      });

    return this.devices;
  }
}
