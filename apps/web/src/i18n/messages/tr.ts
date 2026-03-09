import achievements from '@/features/achievements/i18n/tr';
import auth from '@/features/auth/i18n/tr';
import humanVerification from '@/features/captcha/i18n/tr';
import commentVariants from '@/features/comments/i18n/generator/tr';
import comments from '@/features/comments/i18n/tr';
import content from '@/features/content/i18n/tr';
import disruptions from '@/features/disruptions/i18n/tr';
import funding from '@/features/funding/i18n/tr';
import marketing from '@/features/marketing/i18n/tr';
import monitoring from '@/features/monitoring/i18n/tr';
import subscription from '@/features/subscription/i18n/tr';
import support from '@/features/support/i18n/tr';
import user from '@/features/user/i18n/tr';
import common from './common/tr';
import metadata from './metadata/tr';

export default {
  // Feature or externals
  achievements,
  auth,
  comments,
  commentVariants,
  common,
  content,
  disruptions,
  funding,
  humanVerification,
  marketing,
  metadata,
  monitoring,
  subscription,
  support,
  user,

  // App level, shared translations
  app: {
    title: 'En Sinir Bozucu Web Sitesi',
    description:
      'Modern web sitelerinin o kadar çok iğrenç özelliğine sahip, kendinden menkul internetteki en sinir bozucu web sitesi ki, bir noktada kusabilirsiniz.',
    recruiting:
      'Burada gördüklerinizi genişletmek mi istiyorsunuz? Başlamak için <linkTag>GitHub</linkTag> depomuzu ziyaret edin.',
    aiDisclose:
      'Bu web sitesi yaratıcı içerik ve medya için üretken yapay zeka kullanmaktadır. Faydalı bilgilere olan herhangi bir benzerlik tamamen tesadüftür.',
    copyright: '© {year} En Sinir Bozucu Web Sitesi. Tüm hakları saklıdır.',
    dataStorageDisclaimer:
      'Önce Gizlilik: Hassas form girişlerini veya kullanıcı kimlik bilgilerini kalıcı olarak saklamıyoruz.',
    noWarranties:
      'Garanti verilmeksizin "olduğu gibi" sunulmaktadır. Kayıp zamanınızdan veya hayal kırıklığınızdan sorumlu değiliz.',
    privacyPolicyDisclaimer:
      'Bu belge, resmi İngilizce versiyonun bir çevirisidir. Herhangi bir tutarsızlık durumunda İngilizce versiyon geçerli olacaktır. Resmi versiyonu <linkTag>burada</linkTag> bulabilirsiniz.',
    cookieConsent:
      'Bu web sitesi, web sitemizde en iyi deneyimi yaşamanızı sağlamak için çerezleri kullanır. Ayrıca bu bir şakadır, bu yüzden özelliklerin çoğu hatalıdır veya bilerek çalışmaz. Deneyiminizi ve çerez ayarlarınızı ayarlar menüsünden özelleştirebilirsiniz.',
    exitPrompt:
      'Başınıza kötü şeyler gelmeden önce gitmeyi tekrar düşünürdüm. Emin misiniz?',
    readMoreAt: 'Daha fazlasını şurada okuyun:',
    virgin: {
      title: 'Tüm deneyimleri devre dışı bırak',
      description:
        "Tüm deneyimler şu anda devre dışı. Bu sayfayı sadece içerik için paylaşmak istiyorsanız bu URL'yi paylaşmanız yeterli. Fikrinizi değiştirirseniz, ayarlar menüsünden tüm deneyimleri tekrar etkinleştirebilirsiniz.",
    },
    toggleMenu: 'Menüyü aç/kapat',
    logo: 'MAW Logosu',
    logoAlt: '<the>en</the> <most>Sinir Bozucu</most> Web Sitesi',
    dismissBanner: "Banner'ı kapat",
    contactForm: {
      title: 'Resmi iletişim formu',
      subject: 'Konu',
      message: 'Mesaj',
      send: 'Gönder',
      placeholderSubject: 'Bu ne hakkında?',
      placeholderMessage: 'Mesajınızı buraya yazın...',
      alternative:
        'Alternatif olarak, bize doğrudan şu adresten ulaşabilirsiniz: <linkTag>{email}</linkTag>',
      intro:
        'Herhangi bir sorunuz veya geri bildiriminiz varsa bizimle iletişime geçmekten çekinmeyin.',
      reportIssues:
        "Herhangi bir teknik sorunla karşılaşırsanız veya yeni acı noktaları önermek isterseniz, lütfen <linkTag>bunları GitHub'da bildirin</linkTag>.",
    },
  },
  navigation: {
    home: 'Ana Sayfa',
    about: 'Hakkında',
    contact: 'İletişim',
    donate: 'Bağış Yap',
    login: 'Giriş Yap',
    logout: 'Çıkış Yap',
    signup: 'Kayıt Ol',
    passwordReminder: 'Şifre Hatırlatıcı',
    profile: 'Profil',
    settings: 'Ayarlar',
    search: 'Ara',
    privacyPolicy: 'Gizlilik Politikası',
    hotThings: 'Sıcak şeyler',
    dilf: 'DILF',
    plans: 'AI planları',
    personal: 'Kişisel',
    achievements: 'Başarımlar',
    admin: 'Yönetici',
    termsOfUse: 'Kullanım Koşulları',
  },
  userField: {
    consentNewsletter: 'Bülten almak istiyorum',
    consentPrivacyPolicy: 'Gizlilik politikasını kabul ediyorum',
    consentChildSoul: 'İlk doğan çocuğumun ruhu',
    countryCode: 'Ülke',
    dateOfBirth: 'Doğum tarihi',
    dateOfBirthYear: 'Yıl',
    dateOfBirthMonth: 'Ay',
    dateOfBirthDay: 'Gün',
    email: 'E-posta',
    firstName: 'Ad',
    gender: 'Cinsiyet',
    lastName: 'Soyad',
    nickname: 'Takma ad',
    password: 'Şifre',
    passwordStrength: 'Şifre gücü',
    passwordConfirmation: 'Şifre onayı',
    phoneNumber: 'Telefon numarası',
    phoneNumberCountryCode: 'Ülke kodu',
    phoneNumberAreaCode: 'Alan kodu',
    phoneNumberDecrease: 'Telefon numarasını azalt',
    phoneNumberIncrease: 'Telefon numarasını artır',
    rememberMe: 'Beni hatırla',
    username: 'Kullanıcı adı',
  },
  gender: {
    alien: 'Uzaylı',
    chymera: 'Kimera',
    cyborg: 'Siborg',
    female: 'Kadın',
    male: 'Erkek',
    other: 'Diğer',
    robot: 'Robot',
  },
  share: {
    modal: {
      title: 'Bu sayfayı paylaş',
      description:
        'Sefaleti yayın! Bu acı verici derecede iğrenç web sitesini arkadaşlarınıza da çektirdiğinizden emin olun — onları da beraberinizde aşağı çekebilecekken neden tek başınıza acı çekesiniz ki?',
    },
  },
  messages: {
    errors: {
      e404title: 'Hata 404',
      e404description: 'Sayfa bulunamadı, bu nasıl olabilir',
    },
    info: {},
  },
  contextMenu: {
    disabled: 'Hey, buraya sağ tıklayamazsın!',
  },
  language: {
    label: 'Dil',
  },
  themeSwitch: {
    label: 'Temayı değiştir',
    darkMode: 'Karanlık mod',
    lightMode: 'Aydınlık mod',
  },
} satisfies DeepPartial<AppTranslationShape>;
