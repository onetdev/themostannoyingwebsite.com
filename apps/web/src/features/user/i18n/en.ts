export default {
  userPreferences: {
    title: 'Preferences',
    colorScheme: 'Theme / Color scheme',
    darkMode: 'Dark mode',
    reducedMotion: 'Reduced motion',
    reducedMotionHelp:
      'Can be changed in your OS/Browser settings, you might need to reload the page after changing it.',
    enableSound: 'Sound',
    adultFilter: 'Filter adult contents',
  },
  userGrants: {
    title: 'Consent and permissions',
    permissionDisclaimer:
      'Permission settings are managed by the browser, if you want to change theme you can do it from the site settings in your browser.',
    essentialCookies: 'Allow essential cookies',
    notificationPermission: 'Notification permission',
    locationPermission: 'Location permission',
  },
  optionalPainPoints: {
    title: 'Optional pain points',
    categories: {
      browser: 'Browser & Tab',
      visual: 'Visual Obstructions',
      ads: 'Advertising & Monetization',
      interactivity: 'Popups & Interactivity',
    },
    screensaverTimeout: 'Timeout',
    screensaverVariant: 'Variant',
    screensaverVariantOptions: {
      bouncingLogo: 'Bouncing Logo',
      maze: '3D Maze 95',
    },
    screensaverTimeoutOptions: {
      '15': '15 seconds',
      '30': '30 seconds',
      '60': '1 minute',
      '300': '5 minutes',
      '900': '15 minutes',
    },
    gifts: {
      detectAdblocker: 'Detect adblocker',
      flaps: 'Background ad flaps',
      oneByOne: 'One by one ad blocks',
    },
    achievementNotifications: 'Achievement notifications',
    clipboardMarker: 'Clipboard marker',
    contentPaywall: 'Content paywall',
    deadPixel: 'Dead pixel',
    disableContextMenu: 'Disable context (right click) menu',
    exitPrompt: 'Exit prompt',
    historySpam: 'History spam',
    mockChat: 'Bubble chat',
    newsletterModal: 'Newsletter popup modal',
    notifications: 'Notifications',
    screensaver: 'Screensaver',
    pageTitleInactiveArrayPaged: 'Alternative title when tab is inactive',
    searchDelay: 'Fake search delay',
    wheelOfFortune: 'Wheel of fortune',
    stickyVideo: 'Sticky video',
  },
  optionalPainPointsHints: {
    screensaver:
      'Triggers a user selected screensaver after the specified period of total inactivity.',
    gifts: {
      detectAdblocker: 'Shows a large red banner if an adblocker is detected.',
      flaps:
        'Shows ad flaps on the sides of the page that can be clicked and leads to different pages.',
      oneByOne: 'Mainly covered an animated advertisement on the home page.',
    },
    achievementNotifications:
      'Displays a notification whenever you unlock a new achievement. Progress is always tracked in the background.',
    clipboardMarker:
      'Adds a "Read more at..." link when you copy text from the website.',
    contentPaywall:
      'Shows a fake paywall overlay on some content, you can still reveal the content.',
    deadPixel: 'Places a few fake "dead" pixels on your screen to annoy you.',
    disableContextMenu:
      'Prevents you from using the right-click menu and displays an alert instead.',
    exitPrompt:
      'Shows a "Are you sure you want to leave?" prompt when trying to close the tab or navigate away.',
    historySpam:
      "Fills your browser history with fake entries so you can't easily go back. This can make it inconvinient to get back to search engine results.",
    mockChat:
      'Shows an annoying "human" chat bubble that only messages you when you close it and it constantly displays "agent is writing" in the meantime.',
    newsletterModal:
      'Periodically shows a newsletter subscription modal, especially when page comes back from inactivity (switching tabs).',
    notifications:
      'Asks for notification permissions and shows fake notifications.',
    pageTitleInactiveArrayPaged:
      'Changes the tab title to something attention-grabbing when the tab is inactive.',
    searchDelay: 'Adds a fake, long loading delay to all searches.',
    wheelOfFortune:
      'Shows a fake "Wheel of Fortune" modal that gives you absolute useless prizes.',
    stickyVideo: 'Shows a sticky video player that follows you as you scroll.',
  },
  mandatoryExperienceFlags: {
    title: 'Mandatory experience',
    impossibleLogin: 'Impossible login',
    impossibleSignup: 'Impossible signup',
    impossiblePasswordReminder: 'Impossible password reminder',
    unreasonableContent: 'Unreasonable content',
    flaimYourPhone: 'Flaim your phone',
    fakeAiSubscription: 'Fake AI subscription plans',
  },
  runtimeInfo: {
    title: 'About this session',
    disclaimer:
      'Information listed below serves as debug information for the current browser session (if you refresh the page, everything will reset). Behind the scenes these valeus also have huge impact on what and how happens.',
    startedAgo: 'Session started',
    visibilitySeconds: 'Time spent in focus',
    isDocumentVisible: 'Currently in focus',
    navigationCount: 'Navigation count',
    userActivation: 'Initial user action',
    lastActivation: 'Last user activity',
    flaimSurveyResult: 'Flaim survey result',
    adblockerSuspected: 'Adblocker suspected',
    adblockerNotDetected: 'Adblocker not detected',
  },
  myProfile: {
    notSupposedToBeHere: 'Hmm, you are not supposed to be here 😡',
  },
  notification: {
    modal: {
      title: 'Oh no, where is the notification permission!?!',
      description:
        "We would like to send you notifications sometimes. You can give notification permission to this website from your browser's settings. Could you? 🙏🥺🙏",
    },
  },
  painPreferences: {
    levelSettings: {
      label: 'Pain level',
      railTitle: 'Pain level slider rail',
      clamps: {
        from_0: 'Innocent',
        from_10: "It's a bit odd, innit?",
        from_20: 'Mildly annoying',
        from_30: 'A wee bit cursed',
        from_40: 'Unsettling in a very specific way',
        from_50: 'Just the right amount',
        from_60: 'Higher-than-average tolerance',
        from_70: 'Stepping in dog excrement barefoot',
        from_80: 'Borderline masochistic',
        from_90: 'Nightmares? Subscribed.',
        from_100: 'Max Pain',
      },
    },
  },
};
