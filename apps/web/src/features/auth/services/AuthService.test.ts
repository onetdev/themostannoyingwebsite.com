import 'reflect-metadata';
import { Container } from 'inversify';
import { type AuthRepository, DI } from '../types';
import { AuthService } from './AuthService';
import * as useCases from './use-cases';

jest.mock('./use-cases');

describe('AuthService', () => {
  let container: Container;
  let authService: AuthService;
  let mockRepo: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    container = new Container();
    mockRepo = {
      authenticate: jest.fn(),
      createUser: jest.fn(),
      passwordReminder: jest.fn(),
    };
    container.bind<AuthRepository>(DI.AuthRepository).toConstantValue(mockRepo);
    container.bind<AuthService>(AuthService).toSelf();
    authService = container.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should delegate to login use case', async () => {
      const data = {
        email: 'test@example.com',
        password: 'password',
        remember: true,
        captcha: '123',
      };
      await authService.login(data);
      expect(useCases.login).toHaveBeenCalledWith(mockRepo, data);
    });
  });

  describe('passwordReminder', () => {
    it('should delegate to passwordReminder use case', async () => {
      const data = { email: 'test@example.com', captcha: '123' };
      await authService.passwordReminder(data);
      expect(useCases.passwordReminder).toHaveBeenCalledWith(mockRepo, data);
    });
  });

  describe('register', () => {
    it('should delegate to register use case', async () => {
      const data = {
        email: 'test@example.com',
        password: 'password',
        passwordConfirmation: 'password',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe123',
        nickname: 'johndoe',
        gender: 'male' as const,
        dateOfBirth: new Date(1990, 0, 1),
        countryCode: 'US',
        consentPrivacyPolicy: true,
        consentNewsletter: true,
      };
      await authService.register(data);
      expect(useCases.register).toHaveBeenCalledWith(mockRepo, data);
    });
  });
});
