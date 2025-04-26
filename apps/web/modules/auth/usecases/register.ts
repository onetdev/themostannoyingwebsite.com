import { AuthRepository, UserCreationType } from '../domain';

export type RegisterUserDto = UserCreationType & {
  captcha: string;
  passwordConfirmation: string;
};

export async function register(repo: AuthRepository, data: RegisterUserDto) {
  return repo.register(data);
}
