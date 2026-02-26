import type { AuthRepository } from '../../types';
import { login } from './login';
import { passwordReminder } from './passwordReminder';
import { register } from './register';

describe('Auth Use Cases', () => {
  const mockRepo: jest.Mocked<AuthRepository> = {
    authenticate: jest.fn(),
    createUser: jest.fn(),
    passwordReminder: jest.fn(),
  };

  describe('login', () => {
    it('should call repo.authenticate with the provided payload', async () => {
      const payload = {
        email: 'test@example.com',
        password: 'password',
        remember: true,
        captcha: '123',
      };
      await login(mockRepo, payload);
      expect(mockRepo.authenticate).toHaveBeenCalledWith(payload);
    });
  });

  describe('passwordReminder', () => {
    it('should call repo.passwordReminder with the provided data', async () => {
      const data = { email: 'test@example.com', captcha: '123' };
      await passwordReminder(mockRepo, data);
      expect(mockRepo.passwordReminder).toHaveBeenCalledWith(data);
    });
  });

  describe('register', () => {
    it('should call repo.createUser with the provided data', async () => {
      const data = {
        email: 'test@example.com',
        password: 'password',
        passwordConfirmation: 'password',
        firstName: 'John',
        lastName: 'Doe',
        nickname: 'johndoe',
        gender: 'male' as const,
        dateOfBirth: { year: 1990, month: 1, day: 1 },
        consentPrivacyPolicy: true,
        consentNewsletter: true,
        consentChildSoul: true,
      };
      await register(mockRepo, data);
      expect(mockRepo.createUser).toHaveBeenCalledWith(data);
    });
  });
});
