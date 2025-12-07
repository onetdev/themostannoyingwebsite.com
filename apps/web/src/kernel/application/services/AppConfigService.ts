import config from '@/config';
import { AppConfig, AppConfigSchema } from '@/kernel/domain';

// TODO: Rather than importing config in here, we should configure singleton
//       during app start.
export class AppConfigService {
  getAll(): AppConfig {
    return AppConfigSchema.parse(config);
  }

  getPublicUrl() {
    return config.deploymentMeta.publicUrl;
  }

  getDefaultColorScheme() {
    return config.defaultColorScheme;
  }

  getDeploymentMeta() {
    return config.deploymentMeta;
  }
}
