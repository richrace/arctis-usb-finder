import IUsbGateway from '../gateways/i_usb_gateway';
import HeadphoneList from '../headphone_list';
import IUsbDevice from '../models/i_usb_device';
import KnownHeadphone from '../models/known_headphone';

export default class FindHeadphones {
  constructor(private gateway: IUsbGateway) {}

  execute(): IUsbDevice[] {
    const devices = this.gateway.getUsbDevices();

    return devices.filter((device) => {
      return HeadphoneList.find((knownHeadphone: KnownHeadphone) => {
        return (
          knownHeadphone.vendorId === device.vendorId &&
          knownHeadphone.productId === device.productId
        );
      });
    });
  }
}
