import { AuthRepository } from '../domain';

export type LoginDto = {
  email: string;
  password: string;
  captcha: string;
  remember: boolean;
};

export async function login(repo: AuthRepository, payload: LoginDto) {
  return repo.login(payload);
}
