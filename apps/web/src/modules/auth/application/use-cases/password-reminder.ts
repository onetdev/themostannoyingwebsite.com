import {
  AuthRepository,
  PasswordReminderData,
} from '../../domain/repositories';

export type PasswordReminderUseCaseParams = PasswordReminderData & {
  captcha: string;
};

export async function passwordReminder(
  repo: AuthRepository,
  data: PasswordReminderUseCaseParams,
) {
  return await repo.passwordReminder(data);
}
