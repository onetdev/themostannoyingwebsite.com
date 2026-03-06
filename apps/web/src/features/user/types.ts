declare global {
  interface AppEvents {
    'admin-auth:login': {
      username: string;
    };
  }
}
