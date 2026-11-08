export type WishCategory = 'all' | 'family' | 'friends' | 'professional' | 'shlokas';

export type MotifType = 'lotus' | 'kalash' | 'diya' | 'peacock' | 'ganesha';

export interface DiwaliWish {
  id: string;
  serial: string;
  category: Exclude<WishCategory, 'all'>;
  categoryLabel: string;
  motif: MotifType;
  sanskritLine?: string;
  wishText: string;
  defaultRecipient?: string;
}

export interface SacredDiya {
  id: number;
  name: string;
  sanskrit: string;
  meaning: string;
  blessingToast: string;
  positionLabel: string;
  isCenterpiece?: boolean;
}

export interface CardThemeConfig {
  id: 'marigold-gold' | 'sindoor-velvet' | 'peacock-sapphire' | 'ivory-parchment';
  name: string;
  subtitle: string;
  bgGradient: string;
  canvasStops: [string, string, string];
  borderPrimary: string;
  borderSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  badgeBg: string;
  isLight?: boolean;
}

export interface PanchangDay {
  dayNumber: number;
  title: string;
  traditionalName: string;
  sanskritTitle: string;
  tithi: string;
  muhuratWindow: string;
  significance: string;
  ritualHighlight: string;
  specialWish: string;
  accentHex: string;
}

export interface CommunityDiyaPost {
  id: string;
  senderName: string;
  location: string;
  message: string;
  blessingTag: string;
  timestamp: string;
  flameColor: 'gold' | 'sindoor' | 'peacock';
  likes: number;
}

export const SACRED_DIYAS: SacredDiya[] = [
  {
    id: 1,
    name: 'Aarogya Deepam',
    sanskrit: 'आरोग्यं भास्करादिच्छेत्',
    meaning: 'Vitality & Radiant Health',
    blessingToast: 'Lit Aarogya Deepam — May Lord Dhanvantari bless your home with vibrant health and longevity.',
    positionLabel: 'West Sanctum',
  },
  {
    id: 2,
    name: 'Vidya & Buddhi Deepam',
    sanskrit: 'ॐ गं गणपतये नमः',
    meaning: 'Wisdom & Auspicious Clarity',
    blessingToast: 'Lit Vidya Deepam — May Lord Ganesha remove every obstacle and illuminate your intellect.',
    positionLabel: 'Northwest Arch',
  },
  {
    id: 3,
    name: 'Sneh & Kutumb Deepam',
    sanskrit: 'वसुधैव कुटुम्बकम्',
    meaning: 'Family Harmony & Togetherness',
    blessingToast: 'Lit Kutumb Deepam — May warmth, laughter, and sweet bonds fill every corner of your home.',
    positionLabel: 'Inner Left Altar',
  },
  {
    id: 4,
    name: 'Mahalakshmi Akhand Deepam',
    sanskrit: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद',
    meaning: 'Supreme Grace, Abundance & Eternal Light',
    blessingToast: 'Lit the Royal Akhand Deepam — May Goddess Mahalakshmi shower boundless prosperity and serenity upon you!',
    positionLabel: 'Sanctum Centerpiece',
    isCenterpiece: true,
  },
  {
    id: 5,
    name: 'Shanti & Abhaya Deepam',
    sanskrit: 'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः',
    meaning: 'Inner Peace & Fearlessness',
    blessingToast: 'Lit Shanti Deepam — May calm resilience and serene joy abide in your heart throughout the year.',
    positionLabel: 'Inner Right Altar',
  },
  {
    id: 6,
    name: 'Kirti & Siddhi Deepam',
    sanskrit: 'शुभं करोति कल्याणमारोग्यं धनसंपदा',
    meaning: 'Creative Mastery & Fulfillment',
    blessingToast: 'Lit Siddhi Deepam — May every noble endeavor you begin this Samvat blossom into triumph.',
    positionLabel: 'Northeast Arch',
  },
  {
    id: 7,
    name: 'Nava-Aarambh Deepam',
    sanskrit: 'तमसो मा ज्योतिर्गमय',
    meaning: 'Luminous New Beginnings',
    blessingToast: 'Lit Nava-Aarambh Deepam — From darkness unto light, may fresh hope dawn on every horizon.',
    positionLabel: 'East Sanctum',
  },
];

export const DIWALI_WISHES: DiwaliWish[] = [
  {
    id: 'wish-1',
    serial: '#DW-01',
    category: 'family',
    categoryLabel: 'Family & Elders',
    motif: 'kalash',
    sanskritLine: 'शुभं करोति कल्याणम् आरोग्यं धनसंपदा',
    wishText:
      'May the sacred glow of earthen diyas bless our family with unwavering good health, sweet togetherness, and the timeless grace of Goddess Lakshmi. Wishing you a luminous and blessed Deepavali.',
    defaultRecipient: 'Respected Maa, Papa & Family',
  },
  {
    id: 'wish-2',
    serial: '#DW-02',
    category: 'family',
    categoryLabel: 'Family & Elders',
    motif: 'ganesha',
    sanskritLine: 'आयुष्मान् भव सौभाग्यवान् भव',
    wishText:
      'With folded hands and a grateful heart, we seek your blessings this Deepavali. Your wisdom is the guiding lamp of our courtyard—may your days always shine with peace, comfort, and joyful laughter.',
    defaultRecipient: 'Dearest Elders & Grandparents',
  },
  {
    id: 'wish-3',
    serial: '#DW-03',
    category: 'family',
    categoryLabel: 'Family & Elders',
    motif: 'lotus',
    sanskritLine: 'दीपोत्सवः सर्वसुखप्रदः स्यात्',
    wishText:
      'From the aroma of fresh marigold garlands at the threshold to the warmth of homemade mithai, every Diwali memory is brighter with you. May our home remain forever bathed in love and golden light.',
    defaultRecipient: 'My Beloved Family',
  },
  {
    id: 'wish-4',
    serial: '#DW-04',
    category: 'friends',
    categoryLabel: 'Friends & Joy',
    motif: 'diya',
    sanskritLine: 'आनन्दमयः दीपावली उत्सवः',
    wishText:
      'May your life sparkle brighter than a sky full of phuljharis, your worries vanish like camphor in sacred fire, and your plate stay endlessly stacked with warm kaju katli! Happy Diwali, my friend!',
    defaultRecipient: 'My Dearest Friend',
  },
  {
    id: 'wish-5',
    serial: '#DW-05',
    category: 'friends',
    categoryLabel: 'Friends & Joy',
    motif: 'peacock',
    sanskritLine: 'स्नेहदीपः सदा प्रज्वलतु',
    wishText:
      'True friends are the lamps that never flicker even in the fiercest winds. Thank you for lighting up my year with laughter, loyalty, and unforgettable moments. Wishing you a dazzling Festival of Lights!',
    defaultRecipient: 'To a Cherished Friend',
  },
  {
    id: 'wish-6',
    serial: '#DW-06',
    category: 'friends',
    categoryLabel: 'Friends & Joy',
    motif: 'lotus',
    sanskritLine: 'उत्साहः सर्वदा वर्धताम्',
    wishText:
      'Here’s to vibrant rangolis at midnight, endless rounds of chai and card games, and dreams that soar higher than golden lanterns. May this Diwali bring adventure, prosperity, and pure joy to your doorstep!',
    defaultRecipient: 'Dear Friends & Kindred Spirits',
  },
  {
    id: 'wish-7',
    serial: '#DW-07',
    category: 'friends',
    categoryLabel: 'Friends & Joy',
    motif: 'diya',
    sanskritLine: 'मंगलमयी दीपावली',
    wishText:
      'Even across miles and time zones, the warmth of a single lit diya connects our hearts. Sending you a courtyard full of golden light, sweet blessings, and radiant cheer this Deepavali.',
    defaultRecipient: 'To Someone Special Near in Heart',
  },
  {
    id: 'wish-8',
    serial: '#DW-08',
    category: 'professional',
    categoryLabel: 'Professional & Clients',
    motif: 'kalash',
    sanskritLine: 'शुभ लाभ • ऋद्धि सिद्धि',
    wishText:
      'As we illuminate the lamps of a new Samvat year, we extend our sincere gratitude for your trust and partnership. May this Deepavali usher in visionary growth, enduring success, and shared prosperity.',
    defaultRecipient: 'Esteemed Partners & Colleagues',
  },
  {
    id: 'wish-9',
    serial: '#DW-09',
    category: 'professional',
    categoryLabel: 'Professional & Clients',
    motif: 'ganesha',
    sanskritLine: 'कार्येषु सिद्धिः सर्वदा',
    wishText:
      'Wishing you and your organization a season of brilliant milestones and harmonious collaboration. May Lord Ganesha bless every new venture with clarity, resilience, and extraordinary accomplishment.',
    defaultRecipient: 'Valued Clients & Leadership Team',
  },
  {
    id: 'wish-10',
    serial: '#DW-10',
    category: 'professional',
    categoryLabel: 'Professional & Clients',
    motif: 'peacock',
    sanskritLine: 'तेजस्वि नावधीतमस्तु',
    wishText:
      'It is a privilege to build and innovate alongside leaders of such integrity. May the Festival of Lights illuminate fresh horizons for your team and bring warmth and abundance to your families.',
    defaultRecipient: 'Respected Mentors & Collaborators',
  },
  {
    id: 'wish-11',
    serial: '#DW-11',
    category: 'shlokas',
    categoryLabel: 'Poetic & Shlokas',
    motif: 'diya',
    sanskritLine: 'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥',
    wishText:
      '“Lead us from the unreal to the Real; lead us from darkness unto Eternal Light; lead us from the transient to the Immortal.” May the inner lamp of wisdom awaken within you this sacred Amavasya night.',
    defaultRecipient: 'Seeker of Light & Wisdom',
  },
  {
    id: 'wish-12',
    serial: '#DW-12',
    category: 'shlokas',
    categoryLabel: 'Poetic & Shlokas',
    motif: 'lotus',
    sanskritLine: 'दीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः । दीपो हरतु मे पापं सन्ध्यादीप नमोऽस्तु ते ॥',
    wishText:
      '“The light of the lamp is the Supreme Spirit; the flame dissolves all sorrow and shadow.” Just as one clay diya kindles a thousand others without losing its radiance, may your kindness illuminate the world.',
    defaultRecipient: 'With Sacred Deepavali Reverence',
  },
  {
    id: 'wish-13',
    serial: '#DW-13',
    category: 'shlokas',
    categoryLabel: 'Poetic & Shlokas',
    motif: 'kalash',
    sanskritLine: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके । महालक्ष्मि नमस्तुभ्यं नमस्तुभ्यं सुरेश्वरि ॥',
    wishText:
      'May the eight forms of Ashta-Lakshmi—wealth of spirit, knowledge, courage, nourishment, patience, victory, progeny, and abundance—grace your threshold upon petals of sacred lotus.',
    defaultRecipient: 'To You & Your Blessed Household',
  },
  {
    id: 'wish-14',
    serial: '#DW-14',
    category: 'family',
    categoryLabel: 'Family & Elders',
    motif: 'peacock',
    sanskritLine: 'गृहे लक्ष्मीः सदा तिष्ठतु',
    wishText:
      'May the golden clang of temple bells, the fragrance of sandalwood incense, and the soft shimmer of silk and brass fill our family courtyard with boundless contentment this Deepavali.',
    defaultRecipient: 'Dearest Brothers, Sisters & Kin',
  },
  {
    id: 'wish-15',
    serial: '#DW-15',
    category: 'shlokas',
    categoryLabel: 'Poetic & Shlokas',
    motif: 'ganesha',
    sanskritLine: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
    wishText:
      'Radiant as ten million rising suns, may Lord Vigneshwara clear every shadow from your path and inscribe Shubh & Labh upon the ledger of your life this auspicious Deepavali.',
    defaultRecipient: 'With Auspicious Blessings',
  },
];

export const CARD_THEMES: CardThemeConfig[] = [
  {
    id: 'marigold-gold',
    name: 'Marigold Zari Leaf',
    subtitle: 'Midnight Velvet & 24K Gold Foil',
    bgGradient: 'linear-gradient(155deg, #1E0E2E 0%, #11071B 52%, #24101C 100%)',
    canvasStops: ['#1E0E2E', '#11071B', '#24101C'],
    borderPrimary: '#FFB703',
    borderSecondary: '#FB8500',
    textPrimary: '#FDFBF7',
    textSecondary: '#E7D4B5',
    accentColor: '#FFB703',
    badgeBg: 'rgba(255, 183, 3, 0.14)',
  },
  {
    id: 'sindoor-velvet',
    name: 'Royal Sindoor Silk',
    subtitle: 'Banarasi Crimson & Antique Brass',
    bgGradient: 'linear-gradient(155deg, #3D0B19 0%, #220610 55%, #160512 100%)',
    canvasStops: ['#3D0B19', '#220610', '#160512'],
    borderPrimary: '#FFD166',
    borderSecondary: '#E63946',
    textPrimary: '#FFF9F2',
    textSecondary: '#F2C6B8',
    accentColor: '#FFD166',
    badgeBg: 'rgba(230, 57, 70, 0.22)',
  },
  {
    id: 'peacock-sapphire',
    name: 'Peacock Nilaya Night',
    subtitle: 'Jaipur Sapphire & Emerald Gold',
    bgGradient: 'linear-gradient(155deg, #072232 0%, #091526 55%, #120B24 100%)',
    canvasStops: ['#072232', '#091526', '#120B24'],
    borderPrimary: '#4CC9F0',
    borderSecondary: '#FFB703',
    textPrimary: '#F7FCFF',
    textSecondary: '#B8DCE8',
    accentColor: '#FFB703',
    badgeBg: 'rgba(17, 138, 178, 0.24)',
  },
  {
    id: 'ivory-parchment',
    name: 'Tanjore Ivory Kharita',
    subtitle: 'Raw Silk Parchment & Kumkum Ink',
    bgGradient: 'linear-gradient(155deg, #FDF8EE 0%, #F5E8CE 55%, #ECD7B2 100%)',
    canvasStops: ['#FDF8EE', '#F5E8CE', '#ECD7B2'],
    borderPrimary: '#B45309',
    borderSecondary: '#991B1B',
    textPrimary: '#271105',
    textSecondary: '#5C3418',
    accentColor: '#991B1B',
    badgeBg: 'rgba(180, 83, 9, 0.12)',
    isLight: true,
  },
];

export const PANCHANG_DAYS: PanchangDay[] = [
  {
    dayNumber: 1,
    title: 'Dhanteras',
    traditionalName: 'Dhantrayodashi • Wealth & Wellbeing',
    sanskritTitle: 'धनत्रयोदशी • धन्वन्तरि जयंती',
    tithi: 'Kartika Krishna Trayodashi',
    muhuratWindow: '18:31 IST – 20:27 IST (Pradosh Kaal)',
    significance:
      'Celebrates the emergence of Lord Dhanvantari from the cosmic ocean bearing the chalice of Amrit, and honors Goddess Lakshmi for auspicious wealth and healing.',
    ritualHighlight: 'Lighting 13 Yamadeepams facing South & welcoming sacred brass, gold, or earthen vessels.',
    specialWish:
      'On this sacred Dhanteras, may Lord Dhanvantari bestow robust health and Goddess Kubera-Lakshmi fill your granary and spirit with enduring abundance.',
    accentHex: '#FFB703',
  },
  {
    dayNumber: 2,
    title: 'Choti Diwali',
    traditionalName: 'Naraka Chaturdashi • Triumph of Light',
    sanskritTitle: 'नरक चतुर्दशी • रूप चौदस',
    tithi: 'Kartika Krishna Chaturdashi',
    muhuratWindow: '05:08 IST – 06:23 IST (Abhyanga Snan)',
    significance:
      'Commemorates the victory of divine wisdom over tyranny and the cleansing of stagnation before the grand festival of Amavasya.',
    ritualHighlight: 'Dawn ubtan ritual bath, crafting intricate floral rangolis, and lighting 14 corner lamps.',
    specialWish:
      'May every shadow of doubt dissolve before the dawn of Choti Diwali, leaving your home radiant with serenity, beauty, and joyful anticipation.',
    accentHex: '#FB8500',
  },
  {
    dayNumber: 3,
    title: 'Badi Diwali',
    traditionalName: 'Lakshmi-Ganesha Pujan • Festival of Lights',
    sanskritTitle: 'दीपावली महापर्व • लक्ष्मी पूजन',
    tithi: 'Kartika Amavasya',
    muhuratWindow: '18:52 IST – 20:48 IST (Sthir Lagna)',
    significance:
      'The sovereign night of lights welcoming Lord Rama’s return to Ayodhya and invoking Mahalakshmi & Vigneshwara into purified, lamp-lit courtyards.',
    ritualHighlight: 'Shodashopachara Lakshmi-Ganesha Puja, account book (Chopda) consecration & lighting 108 diyas.',
    specialWish:
      'Shubh Deepavali! On this sacred Amavasya crowned by ten thousand golden flames, may Goddess Mahalakshmi permanently grace your courtyard with peace and prosperity.',
    accentHex: '#E63946',
  },
  {
    dayNumber: 4,
    title: 'Govardhan Puja',
    traditionalName: 'Annakut & Bali Pratipada (Bestu Varas)',
    sanskritTitle: 'गोवर्धन पूजा • अन्नकूट महोत्सव',
    tithi: 'Kartika Shukla Pratipada',
    muhuratWindow: '06:34 IST – 08:49 IST & 15:22 IST – 17:36 IST',
    significance:
      'Honors nature’s shelter and cosmic gratitude as Lord Krishna lifted Mount Govardhan, while marking the auspicious Vikram Samvat New Year.',
    ritualHighlight: 'Offering the 56-delicacy Chhappan Bhog (Annakut) and inaugurating new Samvat dreams.',
    specialWish:
      'Nutan Varshabhinandan & Happy Govardhan Puja! May the new Samvat year overflow with nature’s bounty, sweet harvests, and sacred gratitude.',
    accentHex: '#10B981',
  },
  {
    dayNumber: 5,
    title: 'Bhai Dooj',
    traditionalName: 'Yama Dwitiya • Sacred Sibling Bond',
    sanskritTitle: 'भाई दूज • यम द्वितीया',
    tithi: 'Kartika Shukla Dwitiya',
    muhuratWindow: '13:12 IST – 15:28 IST (Aparahna Muhurat)',
    significance:
      'Celebrates the eternal bond of protection and affection between brothers and sisters, inspired by Yamuna welcoming her brother Yama with tilak and aarti.',
    ritualHighlight: 'Applying ceremonial kumkum-akshat tilak, waving the brass aarti thali, and sharing festive sweets.',
    specialWish:
      'Happy Bhai Dooj! May the sacred tilak of affection always protect, uplift, and keep our bond as warm and bright as the lamps of Deepavali.',
    accentHex: '#118AB2',
  },
];

export const INITIAL_WALL_BLESSINGS: CommunityDiyaPost[] = [
  {
    id: 'wall-1',
    senderName: 'Arundhati & Vikramaditya Rathore',
    location: 'Jaipur, Rajasthan',
    message:
      'Lighting a lamp from the Pink City! May every home across the world experience peace, warm hospitality, and the golden blessings of Maa Lakshmi.',
    blessingTag: 'Sukh & Samriddhi',
    timestamp: 'Just now',
    flameColor: 'gold',
    likes: 48,
  },
  {
    id: 'wall-2',
    senderName: 'Dr. Meenakshi Iyer & Family',
    location: 'Bengaluru, Karnataka',
    message:
      'Tamaso Ma Jyotirgamaya — May kindness, scientific curiosity, and harmony illuminate our communities this Deepavali season.',
    blessingTag: 'Vidya & Shanti',
    timestamp: '12 mins ago',
    flameColor: 'peacock',
    likes: 34,
  },
  {
    id: 'wall-3',
    senderName: 'Rohan, Kabir & Naina Kapoor',
    location: 'London, United Kingdom',
    message:
      'Celebrating away from home with homemade besan ladoos and brass diyas on the windowsill. Sending heartfelt hugs and bright wishes to all!',
    blessingTag: 'Kutumb Sneh',
    timestamp: '29 mins ago',
    flameColor: 'sindoor',
    likes: 62,
  },
  {
    id: 'wall-4',
    senderName: 'Siddharth & Devika Deshmukh',
    location: 'Mumbai, Maharashtra',
    message:
      'From our sea-facing balcony studded with kandils to yours—may this new Samvat bring courageous beginnings and abundant joy!',
    blessingTag: 'Nava-Aarambh',
    timestamp: '1 hr ago',
    flameColor: 'gold',
    likes: 51,
  },
  {
    id: 'wall-5',
    senderName: 'Ananya Chatterjee',
    location: 'Kolkata & Singapore',
    message:
      'Fourteen lamps for Kali Puja and a courtyard of alpona and marigold! Wishing everyone luminous health and artistic inspiration.',
    blessingTag: 'Aarogya & Shakti',
    timestamp: '2 hrs ago',
    flameColor: 'sindoor',
    likes: 39,
  },
  {
    id: 'wall-6',
    senderName: 'Acharya Vishwanath Sharma',
    location: 'Varanasi, Uttar Pradesh',
    message:
      'As ten thousand earthen lamps float upon Mother Ganga, we pray for universal harmony: Sarve Bhavantu Sukhinah, Sarve Santu Niramayah.',
    blessingTag: 'Vishwa Kalyan',
    timestamp: '3 hrs ago',
    flameColor: 'gold',
    likes: 94,
  },
];
