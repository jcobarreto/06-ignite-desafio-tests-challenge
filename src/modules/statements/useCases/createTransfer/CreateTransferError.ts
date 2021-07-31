import { AppError } from "../../../../shared/errors/AppError";

export namespace CreateTransferError {
  export class SenderNotFound extends AppError {
    constructor() {
      super('Sender not found!', 404);
    }
  }

  export class ReceiverNotFound extends AppError {
    constructor() {
      super('Receiver not found!', 404);
    }
  }

  export class TransferSameUser extends AppError {
    constructor() {
      super('The Sender and Receiver cannot be the same user!', 404);
    }
  }

  export class InsufficientFunds extends AppError {
    constructor() {
      super('Insufficient funds!', 400);
    }
  }
}
