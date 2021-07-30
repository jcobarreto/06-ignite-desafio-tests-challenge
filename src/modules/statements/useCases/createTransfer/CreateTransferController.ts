import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransferUseCase } from "./CreateTransferUseCase";

enum OperationType {
  TRANSFER = 'transfer'
}

class CreateTransferController {
  async handle(request: Request, response: Response) {
    const { amount, description } = request.body;
    const { id: sender_id } = request.user;
    const { receiver_id } = request.params;

    const splittedPath = request.originalUrl.split('/')
    const type = splittedPath[splittedPath.length - 1] as OperationType;

    const createTransfer = container.resolve(CreateTransferUseCase);

    const transfer = await createTransfer.execute({
      sender_id,
      receiver_id,
      type,
      amount,
      description
    });

    return response.status(201).json(transfer);
  }
}

export { CreateTransferController };
