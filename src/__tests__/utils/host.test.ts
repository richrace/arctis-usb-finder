import Host from '../../utils/host';

describe('Host', () => {
  it('is true when running on a mac', () => {
    expect(Host.isMac()).toEqual(!Host.isWin());
  });

  it('is true when running on a windows', () => {
    expect(Host.isWin()).toEqual(!Host.isMac());
  });
});
