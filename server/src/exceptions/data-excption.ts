import { Errors } from "../utils/errors";


export class DataException {

  constructor(
    private errorCode: string,
    private message: string,
    private details?: object
  ) {
  }

  public toString(): string {
    `errorCode is ${this.errorCode}, message is ${this.message}, details is ${this.details}`;
    return JSON.stringify(this);
  }
}

export class InvalidDataException extends DataException {
  constructor(details?: object) {
    super(Errors.INVALID_DATA, "The data is invalid", details);
  }
}
