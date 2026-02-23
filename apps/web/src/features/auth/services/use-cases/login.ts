import { AuthenticationData, AuthRepository } from '../../types';

export type LoginUseCaseParams = AuthenticationData & {
  captcha: string;
};

export async function login(repo: AuthRepository, payload: LoginUseCaseParams) {
  return repo.authenticate(payload);
}
