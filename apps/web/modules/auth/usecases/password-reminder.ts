import { AuthRepository } from '../domain';

export async function passwordReminder(
  repo: AuthRepository,
  data: { email: string },
) {
  await repo.passwordReminder(data);
}
