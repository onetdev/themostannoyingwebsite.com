import questionVariants from './quiz-variants/en';

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
};
