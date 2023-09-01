import Host from '../../utils/host';

describe('Host', () => {
  it('is true when running on a mac', () => {
    expect(Host.isMac()).toEqual(!Host.isWin() && !Host.isLinux());
  });

  it('is true when running on a windows', () => {
    expect(Host.isWin()).toEqual(!Host.isMac() && !Host.isLinux());
  });

  it('is true when running on a linux', () => {
    expect(Host.isLinux()).toEqual(!Host.isMac() && !Host.isWin());
  });
});
