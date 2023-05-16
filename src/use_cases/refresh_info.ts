import KnownHeadphone from '../models/known_headphone';
import SimpleHeadphone from '../interfaces/simple_headphone';
import Builder from './headsets/builder';
import UsbGateway from '../interfaces/usb_gateway';
import * as Interfaces from '../interfaces/use_cases';

export default class RefreshInfo {
  constructor(
    private gateway: UsbGateway,
    private filterUseCase: Interfaces.SimpleHeadphoneToKnownHeadphone
  ) {}

  execute(rawHeadphones: SimpleHeadphone[]): SimpleHeadphone[] {
    const knownHeadphones = this.filterUseCase.execute(rawHeadphones);

    return this.refresh(knownHeadphones);
  }

  private refresh(knownHeadphones: KnownHeadphone[]): SimpleHeadphone[] {
    return knownHeadphones.reduce((refreshed: SimpleHeadphone[], known) => {
      const headphone = this.gateway.getHeadphoneByVendorIdAndProductId(
        known.vendorId,
        known.productId
      );

      if (Object.keys(headphone).length === 0 && headphone.constructor === Object) {
        return refreshed;
      }

      const report = headphone.fetchInfo(known.writeBytes);

      if (report.length > 0) {
        refreshed.push(Builder.build(report, known.path, known));
      }

      return refreshed;
    }, []);
  }
}
