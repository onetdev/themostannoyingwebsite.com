import 'reflect-metadata';
import config from '@/config';
import { AppConfigService } from './AppConfigService';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(() => {
    service = new AppConfigService();
  });

  it('should return all config', () => {
    const allConfig = service.getAll();
    expect(allConfig).toBeDefined();
    expect(allConfig.deploymentMeta).toEqual(config.deploymentMeta);
  });

  it('should return public url', () => {
    expect(service.getPublicUrl()).toBe(config.deploymentMeta.publicUrl);
  });

  it('should return default color scheme', () => {
    expect(service.getDefaultColorScheme()).toBe(config.defaultColorScheme);
  });

  it('should return deployment meta', () => {
    expect(service.getDeploymentMeta()).toEqual(config.deploymentMeta);
  });
});
