import onlySpamsVariants from './only-spams-variants';
import questionVariants from './quiz-variants';

export default {
  dilf: {
    title: 'DILF',
    fullTitle: "DILF - Donut I'd Like to Feast On",
    description:
      "If you're searching for the tastiest, hottest, singlest and most irresistible donuts in your area, you're in the perfect place. Are you ready to take on the challenge of finding your true love? Click on any of the donuts here to discover which one is meant for you.",
    flapLeft: 'DILF. Hot single donuts in your area',
    flapRight: 'DILF. Tastiest donuts in your proximity',
    finderOverlayTitle: 'Find you donut',
  },
  wanPhone: {
    title: "Congratulations! You've wan a phone! Flaim now!",
    survey: {
      questionVariants,
      description:
        'Fill out this quick survey and you might have a chance to flaim your new phone! Be precise and quick but not too quick.',
      result: {
        cheatDetected: {
          text: 'Cheating detected! You are not allowed to flaim your phone.',
          callToAction: 'Back to home',
        },
        completed: {
          text: 'Thank you for participating! Unfortunatelly phone cannot be flaimed at this time.',
          callToAction: 'Back to home',
        },
        lost: {
          text: 'Shoot, you missed a few answers. What a shame!',
          callToAction: 'Back to home',
        },
        timeout: {
          text: 'Sorry, looks like you have not finished the survey in time.',
          callToAction: 'Back to home',
        },
      },
    },
  },
  suspectBar: {
    title: 'Adblocker suspected!',
    description:
      "It looks like you're using an ad blocker. That's a bit odd, innit? You're missing out big time! Please consider turning it off. Until then, you'll see this huge red banner at the bottom every time you visit this site. And please don't close it using the OK button, either. Cheers!",
  },
  newsletterModal: {
    title: 'Join our newsletter!',
    description:
      "Our premium newsletter brings an insane amount of value right to your inbox. Don't miss out on insights that make a real difference!",
    placeholder: 'Enter your email',
    onlySpamsLabel: 'I also want to receive OnlySpams (Recommended)',
    onlySpamsDetails: '(details)',
    initialConfirm: 'Subscribe',
    initialCancel: "Don't Subscribe",
    useFormActions: 'Please use the relevant button instead',
    confirmations: {
      confirmation_001: {
        text: "We're disappointed to see that you may not have had enough time to fully consider this important and challenging decision.",
        confirm: 'I thought about it, I still want to',
        cancel: 'You are right, cancel',
      },
      confirmation_002: {
        text: 'We are sorry to see you subscribing, can we treat you with the joys of not being a subscriber at all?',
        confirm: 'No thanks',
        cancel: 'I need my treat!',
      },
      confirmation_003: {
        text: 'Have you considered skipping this newsletter?',
        confirm: 'No',
        cancel: 'Yes',
      },
      confirmation_004: {
        text: 'Subscribing to this newsletter might have adverse side effects. Are you still in?',
        confirm: 'I accept side effects',
        cancel: 'Get me out of here',
      },
    },
  },
  wheelOfFortune: {
    title: 'Wheel of fortune',
    spinStart: 'Click or Tap here!',
    spinWin: 'You won! {prize}',
    prizeVariants: {
      freeLifetimeBeer: 'Free lifetime beer',
      worldPeace: 'World peace',
      absolutelyNothing: 'Absolutelly nothing',
      complimentaryOtter: 'Complimentary otter',
      fake70Discount: 'Fake 70% discount',
    },
    wheelTitle: 'Wheel of fortune',
  },
  onlySpams: {
    title: 'OnlySpams - Premium Newsletter',
    description:
      "Join the world's most exclusive circle of inbox enthusiasts. We don't just send emails; we send emotions, opportunities, and very specific medical advice.",
    testimonials: {
      title: 'What our "Subscribers" say',
      verified: 'Verified',
      items: onlySpamsVariants.testimonials,
    },
    samples: {
      title: 'Sample Value-Adds',
      sender: 'Sender:',
      subject: 'Subject:',
      folder: 'Folder:',
      spam: 'SPAM',
      cta: "I'M INTERESTED",
      items: onlySpamsVariants.samples,
    },
    subscribe: 'Subscribe Now',
  },
};
