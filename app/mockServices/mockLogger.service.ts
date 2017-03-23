export class LoggerService {

  public $get () {
    return this;
  }

  public log (msg: string) {
    console.log(msg);
  };
}


