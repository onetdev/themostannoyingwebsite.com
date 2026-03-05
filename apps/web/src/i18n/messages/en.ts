import achievements from '@/features/achievements/i18n/en';
import comments from '@/features/comments/i18n/en';
import commentVariants from '@/features/comments/i18n/generator/en';
import donate from '@/features/donation/i18n/en';
import newsletter from '@/features/newsletter/i18n/en';
import promotions from '@/features/promotion/i18n/en';
import plansPage from '@/features/subscription/i18n/en';

export default {
  donate,
  app: {
    title: 'The Most Annoying Website',
    description:
      'Self-proclaimed most annoying website on the web with so many disgusting features of modern websites you might even vomit at some point.',
    recruiting:
      'Want to extend what you see here? Visit our <linkTag>GitHub</linkTag> repo to get started.',
    aiDisclose:
      'This website utilizes generative AI for creative content and media. Any resemblance to helpful information is purely coincidental.',
    copyright: '© {year} The Most Annoying Website. All rights reserved.',
    dataStorageDisclaimer:
      'Privacy First: We do not persist sensitive form inputs or user credentials.',
    noWarranties:
      'Provided "as is" without warranty. We are not responsible for your lost time or frustration.',
    cookieConsent:
      "This website uses cookies to ensure you get the best experience on our website. It's also a joke so many of the features are buggy or doens't even work on purpose. You can customize your experience and cookie settings in the settings menu.",
    exitPrompt:
      "I'd reconsider leaving before some bad things happend to you. Are you sure?",
    readMoreAt: 'Read more at',
    virgin: {
      title: 'Disable all experiences',
      description:
        'All experiences are disabled now. If you want share this page just for the content just pass this URL around. If you changed your mind, you can re-enable all experiences in the settings menu.',
    },
    toggleMenu: 'Toggle menu',
    logo: 'MAW Logo',
    logoAlt: '<the>the</the> <most>Most</most> Annoying Website',
    dismissBanner: 'Dismiss banner',
    contactForm: {
      title: 'Official contact form',
      subject: 'Subject',
      message: 'Message',
      send: 'Send',
      placeholderSubject: 'What is this about?',
      placeholderMessage: 'Type your message here...',
      alternative:
        'Alternatively, you can reach us directly at <linkTag>{email}</linkTag>',
      intro: 'Feel free to contact us if you have any questions or feedback.',
      reportIssues:
        'If you encounter any technical issues or want to suggest new pain points, please <linkTag>report them on GitHub</linkTag>.',
    },
  },
  navigation: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    donate: 'Donate',
    login: 'Login',
    logout: 'Logout',
    signup: 'Signup',
    passwordReminder: 'Password Reminder',
    profile: 'Profile',
    settings: 'Settings',
    search: 'Search',
    privacyPolicy: 'Privacy Policy',
    hotThings: 'Hot things',
    dilf: 'DILF',
    plans: 'AI plans',
    personal: 'Personal',
    achievements: 'Achievements',
  },
  metadata: {
    app: {
      title: 'The Most Annoying Website',
      description:
        'Self-proclaimed most annoying website on the web with so many disgusting features of modern websites you might even vomit at some point.',
    },
    achievements: {
      title: 'Achievements',
      description:
        'Track your progress and showcase your persistence. See all the milestones you have reached on this annoying journey.',
    },
    about: {
      title: 'About us',
      description:
        'Discover the story behind this website, its origins, and the passionate creators and contributors who bring it to life.',
    },
    contact: {
      title: 'Contact',
      description:
        "Have a question, suggestion, or just want to say hello? Reach out to us here and we'll be happy to connect.",
    },
    dilf: {
      title: "DILF - Donut I'd Like to Feast On",
      description:
        'An irresistibly sweet concept that combines indulgence with fun. Find out more here.',
    },
    donate: {
      title: 'Donate',
      description:
        'Your support makes a world of difference! Contribute here to help us continue creating amazing experiences.',
    },
    wanPhone: {
      title: 'Flaim a phone',
      description:
        'Ready for some fiery fun? Flaim a phone here and see how we bring the heat to your mobile experience.',
    },
    hotThings: {
      title: 'Hot things',
      description:
        "Discover the hottest trends, ideas, and creations we're passionate about. Explore all the sizzling content here.",
    },
    privacyPolicy: {
      title: 'Privacy Policy',
      description:
        'We value your privacy. Read our Privacy Policy here to learn how we protect your personal information and data.',
    },
    search: {
      title: 'Search',
      description:
        "Looking for something specific? Search here to quickly find exactly what you're looking for, no matter where it is on our site.",
    },
    settings: {
      title: 'Settings',
      description:
        'Customize your experience to suit your preferences. Explore the settings here and make everything just the way you like it.',
    },
    userLogin: {
      title: 'Login',
      description:
        'Welcome back! Log in here to access your personalized content and all the features exclusive to you.',
    },
    userPasswordReminder: {
      title: 'Password Reminder',
      description:
        "Forgot your password? Don't worry! Use the Password Reminder feature here to quickly get back on track.",
    },
    userSignup: {
      title: 'Signup',
      description:
        'Join our community today! Signup here to unlock a world of exclusive content and personalized experiences.',
    },
    userProfile: {
      title: 'Profile',
      description:
        'Manage your account and preferences here. Update your profile information and settings to make it truly yours.',
    },
    virgin: {
      title: 'Disable all experiences',
      description:
        'Looking for a no-frills experience? Disable all personalized features here and enjoy a streamlined, distraction-free version of our site.',
    },
    plans: {
      title: 'AI Packages & Plans',
      description:
        'Choose from our selection of premium, 100% fake AI packages. Experience the future of annoyance today!',
    },
    admin: {
      title: 'Admin Terminal',
      description:
        'Secure terminal access to the system administration interface.',
    },
  },
  common: {
    accept: 'Accept',
    back: 'Back',
    backHome: 'Back to home',
    cancel: 'Cancel',
    close: 'Close',
    completed: 'Completed',
    confirm: 'Confirm',
    decline: 'Decline',
    delete: 'Delete',
    disable: 'Disable',
    disableAll: 'Disable all',
    dismiss: 'Dismiss',
    done: 'Done',
    edit: 'Edit',
    enable: 'Enable',
    enableAll: 'Enable all',
    generate: 'Generate',
    loading: 'Loading...',
    next: 'Next',
    no: 'No',
    notAvailable: 'n/a',
    notSet: 'Not set',
    ok: 'OK',
    pending: 'Pending',
    placeholderSearch: 'Search...',
    reply: 'Reply',
    reset: 'Reset',
    save: 'Save',
    search: 'Search',
    select: 'Select',
    send: 'Send',
    share: 'Share',
    skip: 'Skip',
    submit: 'Submit',
    unknown: 'Unknown',
    verify: 'Verify',
    yes: 'Yes',
  },
  date: {
    months: {
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December',
    },
    weekdays: {
      sunday: 'Sunday',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
    },
    formats: {
      long: 'MMM D, YYYY',
      short: 'M/D/YYYY',
    },
  },
  verification: {
    captcha: {
      field: 'Captcha',
      proveYouAreRobot: 'Prove that you are a robot!',
      emojiHint:
        'Count the emojis and identify which one appears the most. Look carefully, as parts of some emojis might be obscured.',
      tilePuzzleHint:
        'Slide the tiles into their right position. You can only move the ones directly next to each other.',
      gridSelectHint:
        'Select all images that match the prompt. If new images appear, check them as well.',
      gridSelectPrompts: [
        'bicycles',
        'motorcycles',
        'traffic lights',
        'crosswalks',
        'fire hydrants',
        'stairs',
        'tractors',
        'buses',
        'mountains or hills',
        'palm trees',
        'chimneys',
        'bridges',
      ],
      challengeTitle: 'Captcha Challenge',
      verificationProgress: 'Verification Progress',
      resetChallenge: 'Reset challenge',
      taxonomyChallengePrompt:
        'Select all squares with <spanTag>{target}</spanTag>',

      taxonomyChallengeSkipHint: 'If there are none, click skip',
      tilePuzzleChallengeHint:
        'Move the pieces by clicking on nearby tiles next to empty space',
      roboCop: 'roboCOP',
      protected: 'protected',
      emojiChallengePlaceholder: 'Emoji with the highest occurrence count',
    },
  },
  form: {
    validation: {
      error: {
        unknownError: 'An unknown error occurred. Please try again later.',
        impossiblePath:
          'It is impossible to get here, there must be an error. Feel free to try again.',
        required: 'This field is required.',
        minLength: 'Minimum length is {count} characters',
        maxLength: 'Maximum length is {count} characters',
        min: 'Value must be at least {count}',
        max: 'Value must be no more than {count}',
        emailInvalid: 'Valid email address is required',
        captchaRequired: 'Captcha is required',
        captchaInvalid: 'Invalid captcha',
        patternMismatch: 'The input does not match the required pattern',
        passwordMismatch: 'Passwords do not match',
        urlInvalid: 'Invalid URL format',
        numberInvalid: 'Please enter a valid number',
        dateInvalid: 'Invalid date format',
        tooShort: 'The input is too short',
        tooLong: 'The input is too long',
        checkboxRequired: 'You must check this box',
        fileTooLarge: 'The file size exceeds the limit of {size}',
        fileTypeInvalid: 'Invalid file type',
        customError: 'Invalid input',
        missingUppercase: 'Must contain at least one uppercase letter',
        missingLowercase: 'Must contain at least one lowercase letter',
        missingNumber: 'Must contain at least one number',
        missingSpecialCharacter: 'Must contain at least one symbol',
        sumOfNumbersGte: 'Sum of numbers must be at least or equal to {count}',
        sumOfNumbersMustBeEven: 'Sum of numbers must be be even',
        passwordAlreadyTaken: 'The password is already taken by another user',
      },
      passwordStrength: {
        weak: 'Weak',
        okay: 'Okay',
        veryStrong: 'Strong',
      },
    },
  },
  user: {
    common: {
      lookingForSignup: 'Need an account? Signup here',
      forgotPassword: 'Forgot password?',
      Login: 'Login',
      signup: 'Signup',
    },
    field: {
      consentNewsletter: 'I want to receive newsletter',
      consentPrivacyPolicy: 'Accept privacy policy',
      consentChildSoul: "My first born child's soul",
      countryCode: 'Country',
      dateOfBirth: 'Date of birth',
      dateOfBirthYear: 'Year',
      dateOfBirthMonth: 'Month',
      dateOfBirthDay: 'Day',
      email: 'Email',
      firstName: 'First name',
      gender: 'Gender',
      lastName: 'Last name',
      nickname: 'Nickname',
      password: 'Password',
      passwordStrength: 'Password strength',
      passwordConfirmation: 'Password confirmation',
      phoneNumber: 'Phone number',
      phoneNumberCountryCode: 'Country code',
      phoneNumberAreaCode: 'Area code',
      phoneNumberDecrease: 'Decrease phone number',
      phoneNumberIncrease: 'Increase phone number',
      rememberMe: 'Remember me',
      username: 'Username',
    },
    form: {
      login: {
        genericError: 'Login failed',
        callToAction: 'Login',
      },
      signup: {
        genericError: 'Signup failed',
        callToAction: 'Create my account',
      },
      passwordReminder: {
        genericError: 'Password reminder failed',
        callToAction: 'Send password reminder',
      },
    },
    genderVariants: {
      alien: 'Alien',
      chymera: 'Chymera',
      cyborg: 'Cyborg',
      female: 'Female',
      male: 'Male',
      other: 'Other',
      robot: 'Robot',
    },
    profile: {
      notSupposedToBeHere: 'Hmm, you are not supposed to be here 😡',
    },
  },
  commentVariants,
  comments,
  settings: {
    userPreferences: {
      title: 'Preferences',
      language: 'Language',
      languages: {
        en: 'English',
        hu: 'Hungarian',
      },
      colorScheme: 'Theme / Color scheme',
      darkMode: 'Dark mode',
      reducedMotion: 'Reduced motion',
      reducedMotionHelp:
        'Can be changed in your OS/Browser settings, you might need to reload the page after changing it.',
      enableSound: 'Sound',
      adultFilter: 'Filter adult contents',
      themeSwitch: {
        label: 'Switch theme',
        darkMode: 'Dark mode',
        lightMode: 'Light mode',
      },
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
        detectAdblocker:
          'Shows a large red banner if an adblocker is detected.',
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
      stickyVideo:
        'Shows a sticky video player that follows you as you scroll.',
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
    runtime: {
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
    screensaver: {
      exitClick: 'Click anywhere to exit screensaver',
      exitTap: 'Tap anywhere to exit screensaver',
    },
  },
  achievements,
  share: {
    modal: {
      title: 'Share this page',
      description:
        'Spread the misery! Be sure to inflict this painfully obnoxious website on your friends too — why suffer alone when you can drag them down with you?',
    },
  },
  notification: {
    modal: {
      title: 'Oh no, where is the notification permission!?!',
      description:
        "We would like to send you notifications sometimes. You can give notification permission to this website from your browser's settings. Could you? 🙏🥺🙏",
    },
  },
  newsletter,
  paywall: {
    overlay: {
      title:
        'You either gotta pay {price}/hour with 24 months of commitment in order to see the next paragraph or need to keep clicking the secondary button.',
      disclaimer:
        "it might not be as secure and legit but that doesn't matter because you can't actually pay on this website.",
      confirm: 'Pay! 100% legit and secure',
      cancel: 'Give me free stuff for free',
    },
  },
  article: {
    coverImage: 'Cover image',
    published: 'Published at {date}',
    moreContentScroll: "There's more from the past, scroll!",
  },
  titleExperience: {
    marqueeVariants: {
      variant_001: '📣 Come back please 🏃‍♀️🏃 We have candy!! 🚐',
    },
    arrayPagedVariants: {
      variant_001: '⭐️ HEY YOU 🫵',
      variant_002: '😜 YES YOU 😱',
      variant_003: '📣 COME BACK 🏃',
    },
  },
  search: {
    placeholder: 'Search...',
    noResults: 'No results found',
    resultMeta: 'Search for "{query}" took {time}ms and found {count} results',
    searching: 'Searching',
    peopleAlsoSearched: 'People also searched for:',
    topSearcheVariants: {
      variant_001: 'do fish get thirsty',
      variant_002: 'pasta lyrics',
      variant_003: 'do cars run out of honk',
      variant_004: 'internet not working',
      variant_005: 'can facebook listen through your phone',
      variant_006: 'why do i smell like pennies',
      variant_007: 'can you swim in jello',
      variant_008: 'how do i politely tell someone they smell like onions',
      variant_009: "can't see reflection in mirror",
      variant_010: 'electricity invention',
      variant_011: 'rub his bread',
      variant_012: 'meme and toad',
      variant_013: 'bog brother',
    },
  },
  gifts: promotions,
  wheelOfFortune: {
    title: 'Wheel of fortune',
    spinStart: 'Click or Tap here!',
    spinWin: 'You won! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'Free lifetime beer',
      worldPeace: 'World peace',
      absolutellyNothing: 'Absolutelly nothing',
      complimentaryOtter: 'Complimentary otter',
      fake70Discount: 'Fake 70% discount',
    },
    wheelTitle: 'Wheel of fortune',
  },
  chatBubble: {
    messageInitial: 'Hello! I am a chat bubble. I am here to help you. 🤓',
    messageVariants: {
      variant_001: 'Come on, let me help you!',
      variant_002: "I can't hear you! Speak louder!",
      variant_003: 'Who lives under the sea?',
      variant_004:
        'The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.',
      variant_005:
        "Sorry, I'm going through a tunnel right now. Can you repeat that?",
      variant_006:
        "You must have missed my previous messages. I'm kind of lonely.",
      variant_007:
        "Wondering if my messages got caught in a time warp. Feeling like I'm at a party where everyone's speaking Simlish.",
      variant_008: 'My messages must be on a ghosting spree. Feeling ignored.',
      variant_009:
        'Ah, the sweet sound of silence. My messages must be enjoying their newfound solitude.',
    },
    messageFallback: "It's nothing, leave me alone. 😤",
    newAlert: 'New message from Chat Bubble! 🎉',
    hudTitle: 'Chat with a "100% real huuman"',
    hudTitleDisclaimer:
      "Disclaimer: Actually, this is a bot that almost feels like a real human (not a smart one) but it's still just a bot",
    agentIsTyping: 'Agent is typing',
    yourMessage: 'Your message',
    yourMessagePlaceholder: 'Type here...',
  },
  messages: {
    errors: {
      e404title: 'Error 404',
      e404description: 'Page not found, how could this happen',
    },
    info: {},
  },
  debug: {
    auth: {
      title: 'Restricted Access',
      description: 'Enter the password to access the debug dashboard.',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      submit: 'Unlock Debug Mode',
    },
    logout: 'Logout',
    internalOnly: 'Internal Use Only',
    tabs: {
      stores: 'Store Inspector',
      events: 'Event Tester',
      config: 'Static Config',
    },
    eventTester: {
      title: 'Event Bus Tester',
      commonEvents: 'Common Events',
      eventTypeLabel: 'Event type',
      payloadLabel: 'Payload (JSON)',
      dispatch: 'Dispatch Event',
    },
    eventHistory: {
      title: 'Event History',
      enable: 'Enable Event History Recording',
      clear: 'Clear History',
      table: {
        timestamp: 'Timestamp',
        type: 'Type',
        payload: 'Payload',
      },
      empty: 'No events captured yet...',
      disabled: 'Event history recording is disabled.',
    },
    storeInspector: {
      runtime: 'Runtime Store',
      monitoring: 'Monitoring Store',
      painPreferences: 'Pain Preferences Store',
      achievements: 'Achievements Store',
      userPreferences: 'User Preferences Store',
      userGrants: 'User Grants Store',
      appConfig: 'App Configuration',
    },
  },
  contextMenu: {
    disabled: "Hey, you can't right click here!",
  },
  admin: {
    terminal: {
      systemBoot: 'System booting...',
      systemReady: 'MAW admin secure connection established.',
      loginPrompt: 'login:',
      passwordPrompt: 'password:',
      invalidCredentials: 'Access denied. Invalid credentials.',
      accessGranted: 'Access granted. Welcome back {username}.',
      matrixQuote: 'Someone is watching you!!! Follow the white rabbit.',
      redirectingGeneric: 'Redirecting...',
      redirectingSafety: "I'm getting back you to safety...",
    },
  },
  hotThings: {
    playVideo: 'Play video',
    videoPlaybackFailed: 'Video playback failed',
    pictureOfYou: 'Picture of you',
    hotThingsVtt: 'English',
  },
  stickyVideoPlayer: {
    videoTitle: 'Sticky video player',
  },
  plansPage,
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
