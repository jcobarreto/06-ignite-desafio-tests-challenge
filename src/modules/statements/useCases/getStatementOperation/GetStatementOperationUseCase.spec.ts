import { InMemoryStatementsRepository} from "../../repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository} from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let statementsRepositoryInMemory: InMemoryStatementsRepository;
let usersRepositoryInMemory: InMemoryUsersRepository;
let getStatementOperationUseCase: GetStatementOperationUseCase;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe("Get Statement", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    getStatementOperationUseCase = new GetStatementOperationUseCase(usersRepositoryInMemory, statementsRepositoryInMemory);
  });

  it("should be able to get a statement operation", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "Jose",
      email: "jose@gmail.com",
      password: "123456"
    });

    const statement = await statementsRepositoryInMemory.create({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "Deposit test"
    });

    const statementOperation = await getStatementOperationUseCase.execute({
      user_id: user.id as string,
      statement_id: statement.id as string,
    });

    expect(statementOperation).toHaveProperty("id");
  });
});
