import { type AuthRepository, type LoginUseCaseParams } from '../../types';

export async function login(repo: AuthRepository, payload: LoginUseCaseParams) {
  return repo.authenticate(payload);
}
