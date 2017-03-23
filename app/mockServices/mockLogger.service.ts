interface ILoggerService {
  get(name: string): any;
  log(...args: any[]): any;
  info(...args: any[]): any;
  debug(...args: any[]): any;
  warn(...args: any[]): any;
  error(...args: any[]): any;
}

export class LoggerService implements ILoggerService {

  public get(name: string) {
    return this;
  }

  public log(...args: any[]) {
    console.log(args);
  }

  public info(...args: any[]) {
    console.log(args);
  }

  public debug(...args: any[]) {
    console.log(args);
  }

  public warn(...args: any[]) {
    console.log(args);
  }

  public error(...args: any[]) {
    console.log(args);
  }
}
