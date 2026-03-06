import achievements from '@/features/achievements/i18n/en';
import humanVerification from '@/features/captcha/i18n/en';
import comments from '@/features/comments/i18n/en';
import commentVariants from '@/features/comments/i18n/generator/en';
import content from '@/features/content/i18n/en';
import funding from '@/features/funding/i18n/en';
import marketing from '@/features/marketing/i18n/en';
import monitoring from '@/features/monitoring/i18n/en';
import subscription from '@/features/subscription/i18n/en';
import support from '@/features/support/i18n/en';
import settings from '@/features/user/i18n/en';
import metadata from './metadata/en';

export default {
  // Feature or externals
  achievements,
  content,
  comments,
  commentVariants,
  funding,
  humanVerification,
  marketing,
  metadata,
  monitoring,
  settings,
  subscription,
  support,

  // App level, shared translations
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
  messages: {
    errors: {
      e404title: 'Error 404',
      e404description: 'Page not found, how could this happen',
    },
    info: {},
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
  stickyVideoPlayer: {
    videoTitle: 'Sticky video player',
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
