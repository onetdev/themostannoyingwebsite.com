import { type AuthRepository, type RegisterUseCaseParams } from '../../types';

export async function register(
  repo: AuthRepository,
  data: RegisterUseCaseParams,
) {
  return repo.createUser(data);
}
