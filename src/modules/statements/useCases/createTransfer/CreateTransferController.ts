import { Request, Response } from "express";
import { CreateTransferUseCase } from "./CreateTransferUseCase";

class CreateTransferController {
  async handle(request: Request, response: Response) {
    const { amount, description } = request.body;
    const { token } = request.query;
    const { id } = request.params;
  }
}

export { CreateTransferController };
