import { injectable } from 'inversify';
import config from '@/core/config';
import { type AppConfig, AppConfigSchema } from '@/schemas/app-config';

// TODO: Rather than importing config in here, we should configure singleton
//       during app start.
@injectable()
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

/**
 * Dependency-free accessor for the stateless config reader.
 *
 * Unlike the feature services, `AppConfigService` has no collaborators to
 * inject and is consumed from components that sit in the client bundle (e.g.
 * the footer reachable from `error.tsx`), so it deliberately does not resolve
 * through the server DI container — doing so would pull `server-only`
 * services across the client boundary.
 */
export function getAppConfigService(): AppConfigService {
  return new AppConfigService();
}
