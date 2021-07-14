import { InMemoryStatementsRepository} from "../../repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository} from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { GetBalanceUseCase } from "./GetBalanceUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let statementsRepositoryInMemory: InMemoryStatementsRepository;
let usersRepositoryInMemory: InMemoryUsersRepository;
let getBalanceUseCase: GetBalanceUseCase;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe("Create Balance", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    getBalanceUseCase = new GetBalanceUseCase(statementsRepositoryInMemory, usersRepositoryInMemory);
  });

  it("should be able to get a balance", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "Pedro",
      email: "pedro@gmail.com",
      password: "123456"
    });

    await statementsRepositoryInMemory.create({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "Deposit test"
    });

    await statementsRepositoryInMemory.create({
      user_id: user.id as string,
      type: OperationType.WITHDRAW,
      amount: 50,
      description: "Withdraw test"
    });

    const balance = await getBalanceUseCase.execute({
      user_id: user.id as string,
    });

    expect(balance.balance).toBe(50);
  });
});
