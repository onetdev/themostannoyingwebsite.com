import { AuthRepository, PasswordReminderData } from '../../types';

export type PasswordReminderUseCaseParams = PasswordReminderData & {
  captcha: string;
};

export async function passwordReminder(
  repo: AuthRepository,
  data: PasswordReminderUseCaseParams,
) {
  return await repo.passwordReminder(data);
}
