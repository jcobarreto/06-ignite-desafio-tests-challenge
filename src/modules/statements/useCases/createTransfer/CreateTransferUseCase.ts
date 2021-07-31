import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { ICreateTransferDTO } from "./ICreateTransferDTO";
import { CreateTransferError } from "./CreateTransferError";
import { ITransfersRepository } from "../../repositories/ITransfersRepository";

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

@injectable()
class CreateTransferUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository,

    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository
  ) {}

  async execute({ sender_id, receiver_id, type, amount, description }: ICreateTransferDTO) {
    const sender = this.usersRepository.findById(sender_id);
    const receiver = this.usersRepository.findById(receiver_id);

    if (!receiver) {
      throw new CreateTransferError.ReceiverNotFound();
    }

    if (sender === receiver) {
      throw new CreateTransferError.TransferSameUser();
    }

    const { balance } = await this.statementsRepository.getUserBalance({ user_id: sender_id });

    if (amount > balance) {
      throw new CreateTransferError.InsufficientFunds()
    }

    await this.statementsRepository.create({
      user_id: sender_id,
      type: OperationType.WITHDRAW,
      amount,
      description
    });

    await this.statementsRepository.create({
      user_id: receiver_id,
      type: OperationType.DEPOSIT,
      amount,
      description
    });

    const transfer = await this.transfersRepository.create({
      sender_id,
      receiver_id,
      type,
      amount,
      description
    });

    return transfer;
  }
}

export { CreateTransferUseCase };
