import { AuthRepository, CreateUserData } from '../../domain/repositories';

export type RegisterUseCaseParams = CreateUserData;

export async function register(
  repo: AuthRepository,
  data: RegisterUseCaseParams,
) {
  return repo.createUser(data);
}
