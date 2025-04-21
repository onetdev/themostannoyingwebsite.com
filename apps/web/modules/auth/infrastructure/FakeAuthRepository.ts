import { AuthRepository } from '../domain/repositories/AuthRepository';

export const FakeAuthRepository: AuthRepository = {
  async login() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: false });
      }, 2000);
    });
  },

  async register() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: false });
      }, 2000);
    });
  },

  async passwordReminder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  },
};
