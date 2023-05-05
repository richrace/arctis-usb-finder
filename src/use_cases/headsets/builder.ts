/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import KnownHeadphone from '../../models/known_headphone';
import SimpleHeadphone from '../../models/simple_headphone';
import Arctis7xBuilder from './7x_builder';
import SpecificBuilder from './specific_builder';

export default class Builder {
  private specificBuilder: SpecificBuilder | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static build(report: number[], path: any, knownHeadphone: KnownHeadphone): SimpleHeadphone {
    const builder = new Builder(report, path, knownHeadphone);
    const simpleHeadphone = builder.execute();

    return simpleHeadphone;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private report: number[], private path: any, private knownHeadphone: KnownHeadphone) {
    switch (this.knownHeadphone.productId) {
      case KnownHeadphone.Arctis7XProductID:
        this.specificBuilder = new Arctis7xBuilder();
        break;
    }
  }

  execute(): SimpleHeadphone {
    let headphone = {
      modelName: this.knownHeadphone.name,
      batteryPercent: this.report[this.knownHeadphone.batteryPercentIdx],
      path: this.path
    } as SimpleHeadphone;

    if (this.specificBuilder) {
      headphone = Object.assign(
        this.specificBuilder.execute(this.report, this.knownHeadphone),
        headphone
      );
    }

    return headphone;
  }
}
