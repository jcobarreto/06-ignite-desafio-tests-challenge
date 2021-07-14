import { InMemoryUsersRepository} from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate the user", async () => {
    const user = await createUserUseCase.execute({
      name: "Joao",
      email: "joao@gmail.com",
      password: "123456"
    });

    expect(async () => await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    }));
  });

  it("shouldn't not be able to authenticate a non-existing user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "paulo@gmail.com",
        password: "fakePassword"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't not be able to authenticate a user with the wrong password", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Jose",
        email: "jose@gmail.com",
        password: "123456"
      });

      await authenticateUserUseCase.execute({
        email: "jose@gmail.com",
        password: "wrongPassword"
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
