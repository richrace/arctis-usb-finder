import DeviceToHeadphone from '../../interfaces/device_to_headphone';
import SimpleHeadphone from '../../interfaces/simple_headphone';
import SpecificBuilder from '../../interfaces/specific_builder';
import KnownHeadphone from '../../models/known_headphone';
import Arctis9MapBatteryBuilder from './arctis9_map_battery_builder';
import EasyBatteryBuilder from './easy_battery_builder';
import MapBatteryBuilder from './map_battery_builder';

export default class Builder {
  private specificBuilder: SpecificBuilder | undefined;

  static build(deviceHash: DeviceToHeadphone): SimpleHeadphone {
    const builder = new Builder(deviceHash);
    const simpleHeadphone = builder.execute();

    return simpleHeadphone;
  }

  constructor(private deviceHash: DeviceToHeadphone) {
    const knownHeadphone = deviceHash.headphone as KnownHeadphone;

    switch (knownHeadphone.productId) {
      case KnownHeadphone.Arctis7X_ProductID:
      case KnownHeadphone.Arctis1W_ProductID:
      case KnownHeadphone.Arctis1X_ProductID:
        this.specificBuilder = new EasyBatteryBuilder();
        break;
      case KnownHeadphone.Arctis7P_Plus_ProductID:
      case KnownHeadphone.Arctis7X_Plus_ProductID:
      case KnownHeadphone.Arctis7_Plus_Destiny_ProductID:
      case KnownHeadphone.Arctis7_Plus_ProductID:
      case KnownHeadphone.ArctisNova7_ProductID:
      case KnownHeadphone.ArctisNova7X_ProductID:
      case KnownHeadphone.ArctisNova7P_ProductID:
      case KnownHeadphone.ArctisPro_Wirelress_ProductID:
        this.specificBuilder = new MapBatteryBuilder();
        break;
      case KnownHeadphone.Arctis9_ProductID:
        this.specificBuilder = new Arctis9MapBatteryBuilder();
        break;
    }
  }

  execute(): SimpleHeadphone {
    const { hidDevice } = this.deviceHash;
    const report = this.deviceHash.report as number[];
    const headphone = this.deviceHash.headphone as KnownHeadphone;

    let simpleHeadphone = {
      modelName: headphone.name,
      vendorId: headphone.vendorId,
      productId: headphone.productId,
      path: headphone.path,
      interfaceNum: hidDevice.interface,
      usagePage: hidDevice.usagePage,
      usage: hidDevice.usage,
    } as SimpleHeadphone;

    if (this.specificBuilder) {
      simpleHeadphone = Object.assign(this.specificBuilder.execute(report, headphone), simpleHeadphone);
    }

    if (simpleHeadphone.batteryPercent === undefined) {
      simpleHeadphone.batteryPercent = report[headphone.batteryPercentIdx];
    }

    return simpleHeadphone;
  }
}
