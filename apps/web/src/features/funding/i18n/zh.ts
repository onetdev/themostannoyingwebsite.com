import type { FundingI18nShape } from '../types';

export default {
  description:
    '这个项目没有任何赞助商、金主爸爸、富婆、加密货币大鳄投资者、无聊的百万富翁，或神秘的战壕大衣慈善家。它纯粹依靠志愿工作、服务器账单以及源源不断的烤肉 + 咖啡开销运行——所有这些只会让财务黑洞越来越深。尽管如此，这个应用仍然是一个充满爱的项目。<br></br><br></br>如果你想支持我们的事业，并帮助这个网站变得更糟，任何金额都将受到高度赞赏。如果你没有余钱——老实说，在这种经济形势下，谁有呢？——你仍然可以通过分享这个应用并进一步传播烦恼来提供帮助。',
  donateLinkText: '捐赠信息在此',
  moneyUsageHeading: '钱都花在哪了？',
  moneyUsageDescription:
    '你的支持有助于补偿我在开发中投入的时间和精力，也有助于支付基础设施和工具成本（如托管、服务和开发工具）。捐赠只是为了让项目保持活力和可持续性。让我们往罐子里投钱吧！',
  topSupporters: '顶级支持者',
  topSupportersDescription:
    '一旦这个项目真正开始收到捐赠，真实的人就会出现在这里。所以，如果你希望出现在这个名单中，请联系我，以便我可以手动升级此页面或找出某种机制来实现这一点。',
  topSupporterKidney: '🥇 肾脏',
  topSupporterLiver: '🥈 肝脏',
  topSupporterHeart: '🥉 心脏',
  totalSupportReceived: '收到的支持总额',
  classicMethods: '传统方式',
  buyMeACoffee: '给我买杯咖啡',
  payPal: 'PayPal',
  cryptoMethods: '加密货币方式',
  alternativeOptionsLink: '点击此处查看其他支持方式 😏',
  disclaimer: '免责声明',
  disclaimerDetails:
    '本项目由居住在匈牙利的个人开发。任何财务支持或捐赠——包括加密货币——都是自愿的、最终的，并不授予你任何权利、服务或特殊访问权限。捐赠不可抵税。<br></br><br></br>不提供任何法律、税务或财务建议。如果你对捐赠或你自己的纳税义务有疑问，请咨询你所在司法管辖区的合资格专业人士。<br></br><br></br>收到的所有资金都按照适用的匈牙利税务法处理。',
  crypto: {
    network: '网络: {network}',
    copyAction: '复制地址',
    copyFeedback: '已复制！',
    bitcoin: '比特币 (BTC)',
    ethereum: '以太坊 (ETH)',
  },
  beggingBanner: {
    prefix: '🚨 需要支持：',
    linkText: '帮助我们生存 →',
    messages: {
      catJudging:
        '我虚构的猫正在审判我。她知道我再也买不起高级零食了。请帮我恢复尊严（以及她对我的看法）。',
      rentDue:
        '该交房租了。我的房东认为我对付款计划很有“创意”。上个月我用即兴舞蹈付的款。我现在需要真正的钱。',
      codeTherapy:
        '我的代码需要心理治疗。它是由胶带、祈祷和 2012 年的 Stack Overflow 答案拼凑而成的。帮我付 AI 代理的钱吧。',
      futureSelf:
        '过去的我许下了现在的我负担不起的承诺。未来的我会非常失望。帮我更具说服力地对自己撒谎吧。',
      pretendSuccessful:
        '哪怕只有一天，我想买东西的时候不先检查银行余额。你的捐赠能让梦想成真。悲哀的、物质主义的梦想。',
      validationNeeded:
        '我的治疗师说我太寻求外部认同了。但她懂什么？她又不是那个盯着零捐赠看的人。证明她是错的吧。',
      ramenUpgrade:
        '我想升级我的拉面。从“5 欧元 3 包”升级到“带蔬菜包的高级速食面”。这是一个谦虚的梦想。一个基于面条的梦想。',
    },
  },
} satisfies FundingI18nShape;
