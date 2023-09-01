import HeadphoneList from '../headphone_list';
import KnownHeadphone from '../models/known_headphone';

describe('HeadphoneList', () => {
  it('returns an array', () => {
    expect(Array.isArray(HeadphoneList)).toBe(true);
  });

  describe('the first element', () => {
    it('contains a name', () => {
      const firstElement = HeadphoneList[0] as KnownHeadphone;
      expect(firstElement.name).toBe('Arctis Pro Wireless');
    });
  });
});
