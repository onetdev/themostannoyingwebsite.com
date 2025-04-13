declare module 'next/config' {
  type DeploymentMeta = {
    publicUrl: string;
    isLocalDevelopment: boolean;
    environment: 'development' | 'production' | 'preview';
    release?: string;
    contactEmail: string;
    githubUrl: string;
  };

  type ConfigTypes = () => {
    publicRuntimeConfig: DeploymentMeta;
  };

  declare const getConfig: ConfigTypes;

  export default getConfig;
}
