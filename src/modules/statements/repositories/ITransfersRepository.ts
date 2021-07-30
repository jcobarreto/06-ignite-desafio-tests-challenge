import { Statement } from "../entities/Statement";
import { ICreateTransferDTO } from "../useCases/createTransfer/ICreateTransferDTO";
// import { IGetBalanceDTO } from "../useCases/getBalance/IGetBalanceDTO";
// import { IGetStatementOperationDTO } from "../useCases/getStatementOperation/IGetStatementOperationDTO";

export interface ITransfersRepository {
  create: (data: ICreateTransferDTO) => Promise<Statement>;
}
