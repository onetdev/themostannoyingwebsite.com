import {
  type AuthRepository,
  type PasswordReminderUseCaseParams,
} from '../../types';

export async function passwordReminder(
  repo: AuthRepository,
  data: PasswordReminderUseCaseParams,
) {
  return await repo.passwordReminder(data);
}
