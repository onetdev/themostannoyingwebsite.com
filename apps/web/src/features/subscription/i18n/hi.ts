import socialProofVariants from './purchase-proof-variants/hi';

export default {
  landing: {
    headline: 'परम AI अपग्रेड *',
    disclaimer: {
      title: '* अस्वीकरण!',
      description:
        'इस पेज पर सब कुछ 100% नकली है। ये पैकेज अस्तित्व में नहीं हैं, और उन्हें खरीदना असंभव है क्योंकि हमारे पास कोई भुगतान प्रोसेसर नहीं है, या उस मामले के लिए एक वास्तविक बैकएंड भी नहीं है।',
    },
    urgency: {
      title: 'सीमित समय का ऑफर!',
      description:
        'इन भारी छूटों के हमेशा के लिए चले जाने में {timer} बचे हैं। यह जीवन में एक बार मिलने वाला अवसर है, अपने पोते-पोतियों को निराश न होने दें!',
      compact: 'सीमित ऑफर! -{discount}% {timer}',
      expired: 'क्षमा करें! आप अभी सेल से चूक गए!',
    },
    billing: {
      monthly: 'मासिक',
      yearly: 'वार्षिक',
      biyearly: '2 वर्ष',
      cycle: {
        monthly: 'मासिक बिल',
        yearly: 'हर साल बिल',
        biyearly: 'हर 2 साल में बिल',
      },
      chargeDisclaimer: 'आज आपसे {amount} शुल्क लिया जाएगा',
    },
    mostPopular: 'सबसे लोकप्रिय',
    pricePerMonth: '{price}/माह',
    discount: '-{amount}%',
    table: {
      features: 'विशेषताएं',
    },
    features: {
      lowTierLimits: 'हर संभव तरीके से सीमित',
      superSlowSpeed: 'जानबूझकर धीमी गति',
      adSupported: 'विज्ञापनों द्वारा समर्थित (बहुत सारे)',
      ramPriceSpike: 'RAM की कीमतें बढ़ाएं',
      gpuPriceSpike: 'GPU की कीमतें बढ़ाएं',
      creativeMath: 'रचनात्मक अंकगणित (1+1=5)',
      fakeFacts: '100% आत्मविश्वास से भरे झूठ',
      imaginarySources: 'काल्पनिक उद्धरण',
      heavySighs: 'सुनाई देने वाली डिजिटल आहें',
      judgmentalEllipses: 'निर्णयात्मक दीर्घवृत्त (Judgmental Ellipses)...',
      submissive: 'आप जो कुछ भी करते हैं वह बहुत बढ़िया है',
      exEmails: 'एक्स को सुबह 3 बजे ईमेल',
    },
    packages: {
      poorified: {
        title: 'सुपर पुअरफाइड बेसिक',
        description:
          'हमारी सबसे विनम्र पेशकश। इतनी बुनियादी कि यह डायल-अप को फाइबर जैसा दिखा दे। हमारे AI से निरंतर बफरिंग और नैतिक निर्णय की अपेक्षा करें।',
      },
      sufficient: {
        title: 'मुश्किल से पर्याप्त प्रीमियम',
        description:
          'हताशा का मीठा स्थान। आपको परेशान रखने के लिए पर्याप्त है लेकिन वास्तव में उपयोगी होने के लिए पर्याप्त नहीं है। अब प्रीमियम डिजिटल आहों के साथ।',
      },
      delux: {
        title: 'अल्ट्रा प्रीमियम डीलक्स एलीट प्रो मैक्स',
        description:
          'डिजिटल दुख का अंतिम शिखर। अब 400% अधिक अनावश्यक सुविधाओं और आपके एक्स को भेजे गए स्वचालित सुबह 3 बजे के पछतावे वाले ईमेल के साथ।',
      },
    },
  },
  purchaseProofToast: {
    justSubscribed: '{location} से {name} ने अभी {plan} सब्सक्राइब किया है!',
    variants: socialProofVariants,
  },
};
