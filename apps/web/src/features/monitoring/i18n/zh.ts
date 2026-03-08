import type { MonitoringI18nShape } from '../types';

export default {
  auth: {
    title: '受限访问',
    description: '输入密码以访问调试仪表板。',
    passwordLabel: '密码',
    passwordPlaceholder: '••••••••',
    submit: '解锁调试模式',
  },
  logout: '登出',
  internalOnly: '仅限内部使用',
  tabs: {
    stores: 'Store 检查器',
    events: '事件测试器',
    config: '静态配置',
  },
  eventTester: {
    title: '事件总线测试器',
    commonEvents: '常用事件',
    eventTypeLabel: '事件类型',
    payloadLabel: '负载 (JSON)',
    dispatch: '派发事件',
  },
  eventHistory: {
    title: '事件历史',
    enable: '启用事件历史记录',
    clear: '清除历史记录',
    table: {
      timestamp: '时间戳',
      type: '类型',
      payload: '负载',
    },
    empty: '尚未捕获任何事件...',
    disabled: '事件历史记录已禁用。',
  },
  storeInspector: {
    runtime: '运行时 Store',
    monitoring: '监控 Store',
    painPreferences: '痛苦偏好 Store',
    achievements: '成就 Store',
    userPreferences: '用户偏好 Store',
    userGrants: '用户授权 Store',
    appConfig: '应用配置',
  },
} satisfies MonitoringI18nShape;
