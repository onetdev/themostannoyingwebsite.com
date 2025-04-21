import { AuthRepository } from '../domain';

export async function login(
  repo: AuthRepository,
  payload: { email: string; password: string },
) {
  return repo.login(payload);
}
