export default {
  modal: {
    title: 'Join our newsletter!',
    description:
      "Our premium newsletter brings an insane amount of value right to your inbox. Don't miss out on insights that make a real difference!",
    placeholder: 'Enter your email',
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
};
