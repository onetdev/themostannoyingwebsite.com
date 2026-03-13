import type { UserI18nShape } from '../types';

export default {
  userPreferences: {
    title: '偏好设置',
    colorScheme: '主题 / 配色方案',
    darkMode: '深色模式',
    reducedMotion: '减少动态效果',
    reducedMotionHelp:
      '可以在你的操作系统/浏览器设置中更改，更改后可能需要重新加载页面。',
    enableSound: '声音',
    adultFilter: '过滤成人内容',
  },
  userGrants: {
    title: '同意与权限',
    permissionDisclaimer:
      '权限设置由浏览器管理，如果你想更改主题，可以从浏览器的网站设置中进行。',
    essentialCookies: '允许必要的 Cookie',
    notificationPermission: '通知权限',
    locationPermission: '位置权限',
  },
  optionalPainPoints: {
    title: '可选烦点',
    categories: {
      browser: '浏览器与标签页',
      visual: '视觉障碍',
      ads: '广告与变现',
      interactivity: '弹窗与交互',
    },
    screensaverTimeout: '超时时间',
    screensaverVariant: '变体',
    screensaverVariantOptions: {
      bouncingLogo: '反弹 Logo',
      maze: '3D 迷宫 95',
    },
    screensaverTimeoutOptions: {
      '15': '15 秒',
      '30': '30 秒',
      '60': '1 分钟',
      '300': '5 分钟',
      '900': '15 分钟',
    },
    gifts: {
      detectAdblocker: '检测广告拦截器',
      flaps: '背景广告页边',
      oneByOne: '逐个显示的广告块',
    },
    achievementNotifications: '成就通知',
    clipboardMarker: '剪贴板标记',
    contentPaywall: '内容付费墙',
    deadPixel: '坏点',
    disableContextMenu: '禁用右键菜单',
    exitPrompt: '退出提示',
    historySpam: '历史记录垃圾邮件',
    mockChat: '气泡聊天',
    newsletterModal: '新闻通讯弹窗',
    notifications: '通知',
    screensaver: '屏幕保护程序',
    pageTitleInactiveArrayPaged: '标签页不活跃时的备用标题',
    searchDelay: '虚假搜索延迟',
    wheelOfFortune: '幸运大转盘',
    stickyVideo: '粘性视频',
  },
  optionalPainPointsHints: {
    screensaver: '在指定的完全不活动时间后触发用户选择的屏幕保护程序。',
    gifts: {
      detectAdblocker: '如果检测到广告拦截器，显示一个巨大的红色横幅。',
      flaps: '在页面两侧显示广告页边，点击可跳转到不同页面。',
      oneByOne: '主要覆盖主页上的动画广告。',
    },
    achievementNotifications:
      '每当你解锁新成就时显示通知。进度始终在后台跟踪。',
    clipboardMarker: '当你从网站复制文本时添加“阅读更多请访问...”链接。',
    contentPaywall: '在某些内容上显示虚假的付费墙覆盖层，你仍然可以揭开内容。',
    deadPixel: '在屏幕上放置几个虚假的“坏点”来烦你。',
    disableContextMenu: '阻止你使用右键菜单并显示警告。',
    exitPrompt: '在尝试关闭标签页或离开时显示“你确定要离开吗？”提示。',
    historySpam:
      '在你的浏览器历史记录中填充虚假条目，让你无法轻易返回。这会让你很难回到搜索引擎结果页。',
    mockChat:
      '显示一个烦人的“人类”聊天气泡，只有在你关闭它时才会给你发消息，期间一直显示“对方正在输入”。',
    newsletterModal:
      '定期显示新闻通讯订阅弹窗，尤其是当页面从不活动状态恢复（切换标签页）时。',
    notifications: '请求通知权限并显示虚假通知。',
    pageTitleInactiveArrayPaged:
      '当标签页不活跃时，将标题更改为吸引注意的内容。',
    searchDelay: '为所有搜索添加虚长加载延迟。',
    wheelOfFortune: '显示一个虚假的“幸运大转盘”弹窗，给你完全没用的奖品。',
    stickyVideo: '显示一个在你滚动时跟随你的粘性视频播放器。',
  },
  mandatoryExperienceFlags: {
    title: '强制体验',
    impossibleLogin: '不可能完成的登录',
    impossibleSignup: '不可能完成的注册',
    impossiblePasswordReminder: '不可能完成的密码提醒',
    unreasonableContent: '不合理的內容',
    flaimYourPhone: 'Flaim 你的手机',
    fakeAiSubscription: '虚假 AI 订阅计划',
  },
  runtimeInfo: {
    title: '关于本次会话',
    disclaimer:
      '下面列出的信息作为当前浏览器会话的调试信息（如果你刷新页面，一切都会重置）。在幕后，这些值对发生什么以及如何发生也有巨大影响。',
    startedAgo: '会话开始于',
    visibilitySeconds: '专注时间',
    isDocumentVisible: '当前处于专注状态',
    navigationCount: '导航次数',
    userActivation: '初始用户操作',
    lastActivation: '最后一次用户活动',
    flaimSurveyResult: 'Flaim 调查结果',
    adblockerSuspected: '疑似使用广告拦截器',
    adblockerNotDetected: '未检测到广告拦截器',
  },
  myProfile: {
    notSupposedToBeHere: '嗯，你不应该在这里 😡',
  },
  notification: {
    modal: {
      title: '噢不，通知权限去哪了！？',
      description:
        '我们有时想给你发送通知。你可以从浏览器的设置中给予此网站通知权限。可以吗？ 🙏🥺🙏',
    },
  },
  painPreferences: {
    levelSettings: {
      label: '痛苦指数',
      rating: '疼痛评分',
      railTitle: '痛苦指数滑块轨道',
      clamps: {
        from_0: '纯真无邪',
        from_10: '有点古怪，不是吗？',
        from_20: '轻微烦人',
        from_30: '有一点点被诅咒',
        from_40: '以一种非常具体的方式令人不安',
        from_50: '恰到好处',
        from_60: '高于平均水平的耐心',
        from_70: '赤脚踩到狗屎',
        from_80: '边缘受虐狂',
        from_90: '噩梦？已订阅。',
        from_100: '极致痛苦',
      },
    },
  },
} satisfies UserI18nShape;
