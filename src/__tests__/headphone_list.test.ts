import HeadphoneList from '../headphone_list';
import KnownHeadphone from '../models/known_headphone';

describe('HeadphoneList', () => {
  it('returns an array', () => {
    expect(Array.isArray(HeadphoneList)).toBe(true);
  });

  describe('the first element', () => {
    let firstElement: KnownHeadphone;

    beforeEach(() => {
      firstElement = HeadphoneList[0];
    });

    it('contains a name', () => {
      expect(firstElement.name).toBe('Arctis Pro Wireless');
    });
  });
});
