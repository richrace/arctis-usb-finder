import UsbGateway from '../interfaces/usb_gateway';
import HeadphoneList from '../headphone_list';
import FoundHeadphone from '../interfaces/found_headphone';
import KnownHeadphone from '../models/known_headphone';

export default class FindHeadphones {
  constructor(private gateway: UsbGateway) {}

  execute(): FoundHeadphone[] {
    const devices = this.gateway.getUsbDevices();

    return devices.reduce((matchedHeadphones: FoundHeadphone[], device) => {
      const matched = HeadphoneList.find((knownHeadphone: KnownHeadphone) => {
        return (
          knownHeadphone.vendorId === device.vendorId &&
          knownHeadphone.productId === device.productId
        );
      });

      if (matched) {
        matchedHeadphones.push({
          device: device,
          knownHeadphone: matched,
        } as FoundHeadphone);
      }

      return matchedHeadphones;
    }, []) as FoundHeadphone[];
  }
}
