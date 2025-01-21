declare module 'next/config' {
  type EnvConfig = {
    publicUrl: string;
    isLocalDevelopment: boolean;
    environment: 'development' | 'production' | 'preview';
    release?: string;
  };

  type SharedConfig = {
    contactEmail: string;
    githubUrl: string;
  };

  type ConfigTypes = () => {
    publicRuntimeConfig: SharedConfig & {
      env: EnvConfig;
    };
  };

  declare const getConfig: ConfigTypes;

  export default getConfig;
}
