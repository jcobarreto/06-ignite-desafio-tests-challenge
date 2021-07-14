import { InMemoryStatementsRepository} from "../../repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository} from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let createStatementUseCase: CreateStatementUseCase;
let statementsRepositoryInMemory: InMemoryStatementsRepository;
let usersRepositoryInMemory: InMemoryUsersRepository;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe("Create statements", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementsRepositoryInMemory);
  });

  it("should be able to create a deposit", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "Pedro",
      email: "pedro@gmail.com",
      password: "123456"
    });

    const deposit = await createStatementUseCase.execute({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "Deposit test"
    });

    expect(deposit).toHaveProperty("id");
  });

  it("should be able to create a withdraw", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "Paulo",
      email: "paulo@gmail.com",
      password: "123456"
    });

    await createStatementUseCase.execute({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "Deposit test"
    });

    const withdraw = await createStatementUseCase.execute({
      user_id: user.id as string,
      type: OperationType.WITHDRAW,
      amount: 40,
      description: "Withdraw test"
    });

    expect(withdraw).toHaveProperty("id");
  });
});
