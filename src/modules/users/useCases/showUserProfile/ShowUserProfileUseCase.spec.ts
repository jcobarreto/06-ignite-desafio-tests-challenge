import { InMemoryUsersRepository} from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);
  });

  it("should be able to list the user profile", async () => {
    const user = await createUserUseCase.execute({
      name: "Joao",
      email: "joao@gmail.com",
      password: "123456"
    });

    const findUser = await showUserProfileUseCase.execute(user.id || "test");
    expect(findUser.name).toBe("Joao");
  });

  it("shouldn't be able to show a profile of a non-existing user", async () => {
    expect(async () => {
      await showUserProfileUseCase.execute("testId");
    }).rejects.toBeInstanceOf(AppError);
  });
});
