import { AuthRepository } from '../domain';

export type PasswordReminderDto = {
  email: string;
  captcha: string;
};

export async function passwordReminder(
  repo: AuthRepository,
  data: PasswordReminderDto,
) {
  await repo.passwordReminder(data);
}
