export const Logger = {
  info(msg: string, ...args: any[]) {
    console.log(`%c[مِعراج] ${msg}`, 'color: #10b981; font-weight: bold;', ...args);
  },
  warn(msg: string, ...args: any[]) {
    console.warn(`[مِعراج] ${msg}`, ...args);
  },
  error(msg: string, ...args: any[]) {
    console.error(`[مِعراج] ${msg}`, ...args);
  },
};
