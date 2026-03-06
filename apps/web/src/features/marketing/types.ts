declare global {
  interface AppEvents {
    'wof:spin-completed': {
      prize: string;
    };
  }
}
