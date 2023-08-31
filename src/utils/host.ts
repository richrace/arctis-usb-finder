export default class Host {
  static isMac(): boolean {
    return process.platform === 'darwin';
  }

  static isWin(): boolean {
    return process.platform === 'win32';
  }

  static isLinux(): boolean {
    return process.platform === 'linux';
  }
}
