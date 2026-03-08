import type { MarketingI18nShape } from '../types';
import questionVariants from './quiz-variants/zh';

export default {
  dilf: {
    title: 'DILF',
    fullTitle: 'DILF - 我想大口享用的甜甜圈',
    description:
      '如果你正在寻找你所在地区最美味、最火爆、最单身且最不可抗拒的甜甜圈，那么你来对地方了。你准备好接受寻找真爱的挑战了吗？点击这里的任何一个甜甜圈，发现哪一个才是你的真命天圈。',
    flapLeft: 'DILF。你附近的热门单身甜甜圈',
    flapRight: 'DILF。你附近最美味的甜甜圈',
    finderOverlayTitle: '找到你的甜甜圈',
  },
  wanPhone: {
    title: '恭喜！你中了一台手机！现在就领奖 (Flaim)！',
    survey: {
      questionVariants,
      description:
        '填写这个快速调查，你可能有机会领取 (Flaim) 你的新手机！要准确且迅速，但不要太快。',
      result: {
        cheatDetected: {
          text: '检测到作弊！你不被允许领取 (Flaim) 你的手机。',
          callToAction: '返回首页',
        },
        completed: {
          text: '感谢参与！很遗憾，目前无法领取 (Flaim) 手机。',
          callToAction: '返回首页',
        },
        lost: {
          text: '哎呀，你漏掉了几个答案。真遗憾！',
          callToAction: '返回首页',
        },
        timeout: {
          text: '抱歉，看来你没能及时完成调查。',
          callToAction: '返回首页',
        },
      },
    },
  },
  suspectBar: {
    title: '疑似使用广告拦截器！',
    description:
      '看来你正在使用广告拦截器。这有点奇怪，不是吗？你错过了大好机会！请考虑将其关闭。在此之前，每次访问此网站时，你都会在底部看到这个巨大的红色横幅。也请不要使用“确定”按钮关闭它。回见！',
  },
  newsletterModal: {
    title: '加入我们的新闻通讯！',
    description:
      '我们的高级新闻通讯将疯狂的价值直接送到你的收件箱。不要错过那些能产生真正影响的见解！',
    placeholder: '输入你的电子邮件',
    initialConfirm: '订阅',
    initialCancel: '不订阅',
    useFormActions: '请使用相关的按钮代替',
    confirmations: {
      confirmation_001: {
        text: '我们很遗憾看到你可能没有足够的时间充分考虑这个重要且具有挑战性的决定。',
        confirm: '我想过了，我还是要订阅',
        cancel: '你说的对，取消',
      },
      confirmation_002: {
        text: '我们很遗憾看到你订阅，我们能让你享受完全不当订阅者的快乐吗？',
        confirm: '不，谢谢',
        cancel: '我需要我的快乐！',
      },
      confirmation_003: {
        text: '你有没有考虑过跳过这个新闻通讯？',
        confirm: '没有',
        cancel: '是的',
      },
      confirmation_004: {
        text: '订阅这个新闻通讯可能会有不利的副作用。你还要继续吗？',
        confirm: '我接受副作用',
        cancel: '带我离开这里',
      },
    },
  },
  wheelOfFortune: {
    title: '幸运大转盘',
    spinStart: '点击或点击此处！',
    spinWin: '你赢了！{prize}',
    prizeVariants: {
      freeLifetimeBeer: '终身免费啤酒',
      worldPeace: '世界和平',
      absolutelyNothing: '绝对什么都没有',
      complimentaryOtter: '赠送的水獭',
      fake70Discount: '虚假的 7 成折扣',
    },
    wheelTitle: '幸运大转盘',
  },
} satisfies MarketingI18nShape;
