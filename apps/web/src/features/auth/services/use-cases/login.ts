import type { AuthRepository, LoginUseCaseParams } from '../../types';

export async function login(repo: AuthRepository, payload: LoginUseCaseParams) {
  return repo.authenticate(payload);
}
