import { AuthRepository, UserCreationType } from '../domain';

export type RegisterDto = UserCreationType & {
  captcha: string;
  passwordConfirmation: string;
};

export async function register(repo: AuthRepository, data: RegisterDto) {
  return repo.register(data);
}
