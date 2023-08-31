/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import KnownHeadphone from '../../models/known_headphone';
import SimpleHeadphone from '../../interfaces/simple_headphone';
import SpecificBuilder from '../../interfaces/specific_builder';
import EasyBatteryBuilder from './easy_battery_builder';
import MapBatteryBuilder from './map_battery_builder';

export default class Builder {
  private specificBuilder: SpecificBuilder | undefined;

  static build(report: number[], path: string, knownHeadphone: KnownHeadphone): SimpleHeadphone {
    const builder = new Builder(report, path, knownHeadphone);
    const simpleHeadphone = builder.execute();

    return simpleHeadphone;
  }

  constructor(private report: number[], private path: string, private knownHeadphone: KnownHeadphone) {
    switch (this.knownHeadphone.productId) {
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
      case KnownHeadphone.Arctis9_ProductID:
      case KnownHeadphone.ArctisPro_Wirelress_ProductID:
        this.specificBuilder = new MapBatteryBuilder();
        break;
    }
  }

  execute(): SimpleHeadphone {
    let headphone = {
      modelName: this.knownHeadphone.name,
      vendorId: this.knownHeadphone.vendorId,
      productId: this.knownHeadphone.productId,
      path: this.path,
    } as SimpleHeadphone;

    if (this.specificBuilder) {
      headphone = Object.assign(this.specificBuilder.execute(this.report, this.knownHeadphone), headphone);
    }

    if (headphone.batteryPercent === undefined) {
      headphone.batteryPercent = this.report[this.knownHeadphone.batteryPercentIdx];
    }

    return headphone;
  }
}
