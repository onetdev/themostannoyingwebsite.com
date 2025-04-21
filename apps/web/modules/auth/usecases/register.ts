import { AuthRepository, RegisterUserType } from '../domain';

export async function register(repo: AuthRepository, data: RegisterUserType) {
  return repo.register(data);
}
