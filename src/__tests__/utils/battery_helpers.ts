import { map } from '../../utils/battery_helpers';

const maxBattery = 0x04;
const minBattery = 0x00;

describe('map', () => {
  it('will return 0', () => {
    const result = map(0x00, minBattery, maxBattery, 0, 100);
    expect(result).toEqual(0);
  });

  it('will return 25', () => {
    const result = map(0x01, minBattery, maxBattery, 0, 100);
    expect(result).toEqual(25);
  });

  it('will return 50', () => {
    const result = map(0x02, minBattery, maxBattery, 0, 100);
    expect(result).toEqual(50);
  });

  it('will return 75', () => {
    const result = map(0x03, minBattery, maxBattery, 0, 100);
    expect(result).toEqual(75);
  });

  it('will return 100', () => {
    const result = map(0x04, minBattery, maxBattery, 0, 100);
    expect(result).toEqual(100);
  });
});
