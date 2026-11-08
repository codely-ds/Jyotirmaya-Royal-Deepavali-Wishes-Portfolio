import React, { useState, useEffect } from 'react';
import {
  Flame,
  Sparkles,
  Volume2,
  VolumeX,
  Wand2,
  BookOpen,
  Calendar,
  Compass,
  Heart,
} from 'lucide-react';
import {
  SACRED_DIYAS,
  DIWALI_WISHES,
  INITIAL_WALL_BLESSINGS,
  DiwaliWish,
  PanchangDay,
  CommunityDiyaPost,
  MotifType,
} from './data/diwaliData';
import {
  InteractiveDiyaSvg,
  RangoliMandalaSvg,
  MarigoldToranHeader,
  MotifEmblemSvg,
} from './components/DiwaliMotifs';
import {
  AmbientSparkleCanvas,
  triggerSparkBurst,
} from './components/AmbientSparkleCanvas';
import { WishesPortfolioSection } from './components/WishesPortfolioSection';
import {
  GreetingCardStudio,
  StudioCardState,
} from './components/GreetingCardStudio';
import { PanchangAndWallSection } from './components/PanchangAndWallSection';
import { soundEngine } from './utils/soundChimes';

export function App() {
  // Interactive 7 Sacred Diyas State (Start with 3 lit including the centerpiece #4 so the page immediately glows, inviting the user to light the rest!)
  const [litDiyaIds, setLitDiyaIds] = useState<number[]>([3, 4, 5]);
  const [activeDiyaToast, setActiveDiyaToast] = useState<string>(
    'Click any unlit terracotta diya on the altar below to kindle its sacred flame & reveal its blessing.'
  );
  const [activeDiyaSanskrit, setActiveDiyaSanskrit] = useState<string>(
    'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद'
  );

  // Sound & Sparkler Cursor Toggles
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [sparklerCursor, setSparklerCursor] = useState<boolean>(true);

  // Greeting Card Studio State
  const [cardState, setCardState] = useState<StudioCardState>({
    recipient: 'Respected Maa, Papa & Family',
    sender: 'With Love, Aarav & Ananya',
    message: DIWALI_WISHES[0].wishText,
    sanskritHeader: '॥ श्री गणेशाय नमः • शुभ दीपावली ॥',
    showSanskrit: true,
    themeId: 'marigold-gold',
    motif: 'kalash',
  });

  // Studio Handoff Banner Notification
  const [studioBannerNotice, setStudioBannerNotice] = useState<string | null>(null);

  // Community Diya Wall Posts State (with localStorage persistence)
  const [wallPosts, setWallPosts] = useState<CommunityDiyaPost[]>(() => {
    try {
      const saved = localStorage.getItem('jyotirmaya_diya_wall_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_WALL_BLESSINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('jyotirmaya_diya_wall_v1', JSON.stringify(wallPosts));
    } catch {
      // ignore
    }
  }, [wallPosts]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.enabled = next;
    if (next) {
      soundEngine.playSparkleTick();
    }
  };

  // Toggle a single sacred diya on the Hero Altar
  const handleToggleDiya = (
    diyaId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const diyaObj = SACRED_DIYAS.find((d) => d.id === diyaId);
    const isCurrentlyLit = litDiyaIds.includes(diyaId);

    if (isCurrentlyLit) {
      setLitDiyaIds((prev) => prev.filter((id) => id !== diyaId));
      if (diyaObj) {
        setActiveDiyaToast(
          `${diyaObj.name} paused — Click again anytime to re-ignite its sacred flame.`
        );
      }
    } else {
      const nextLit = [...litDiyaIds, diyaId];
      setLitDiyaIds(nextLit);
      soundEngine.playDiyaIgnite(diyaId);
      triggerSparkBurst({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 3,
        count: nextLit.length === 7 ? 60 : 36,
        grand: nextLit.length === 7,
      });

      if (diyaObj) {
        setActiveDiyaSanskrit(diyaObj.sanskrit);
        setActiveDiyaToast(
          nextLit.length === 7
            ? '✦ Purnatva! All 7 Sacred Courtyard Diyas are now ablaze with Mahalakshmi’s golden radiance! ✦'
            : diyaObj.blessingToast
        );
      }
    }
  };

  // Light All 7 Sacred Diyas at once with Maha-Aarti Chime & Grand Sparkler Burst
  const handleLightAllDiyas = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (litDiyaIds.length === SACRED_DIYAS.length) {
      // Reset to just centerpiece so user can enjoy lighting them again
      setLitDiyaIds([4]);
      setActiveDiyaToast(
        'Sanctum reset to the single Akhand Deepam — Kindle each surrounding lamp with your intention.'
      );
      return;
    }

    setLitDiyaIds(SACRED_DIYAS.map((d) => d.id));
    soundEngine.playGrandIllumination();
    triggerSparkBurst({
      x: rect.left + rect.width / 2,
      y: rect.top,
      grand: true,
    });
    setActiveDiyaSanskrit('ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः');
    setActiveDiyaToast(
      '✦ Maha-Deepotsava! All 7 Sacred Lamps are lit — May boundless prosperity, wisdom, and peace illuminate your home! ✦'
    );
  };

  // Load a curated wish into the Custom Card Studio & scroll smoothly
  const handleSelectWishForStudio = (wish: DiwaliWish) => {
    setCardState((prev) => ({
      ...prev,
      recipient: wish.defaultRecipient || prev.recipient,
      message: wish.wishText,
      motif: wish.motif,
      sanskritHeader: wish.sanskritLine
        ? `॥ ${wish.sanskritLine} ॥`
        : prev.sanskritHeader,
      showSanskrit: true,
    }));
    setStudioBannerNotice(`Loaded Blessing ${wish.serial} (${wish.categoryLabel}) into the Royal Card Studio`);
    setTimeout(() => setStudioBannerNotice(null), 4000);

    const el = document.getElementById('card-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Load a Panchang Day wish into the Custom Card Studio
  const handleUsePanchangWish = (day: PanchangDay) => {
    setCardState((prev) => ({
      ...prev,
      message: day.specialWish,
      sanskritHeader: `॥ ${day.sanskritTitle} ॥`,
      showSanskrit: true,
    }));
    setStudioBannerNotice(`Loaded ${day.title} Blessing into the Royal Card Studio`);
    setTimeout(() => setStudioBannerNotice(null), 4000);

    const el = document.getElementById('card-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add a post to the Community Diya Wall
  const handleAddWallPost = (
    newPost: Omit<CommunityDiyaPost, 'id' | 'timestamp' | 'likes'>
  ) => {
    const created: CommunityDiyaPost = {
      ...newPost,
      id: `wall-${Date.now()}`,
      timestamp: 'Just now',
      likes: 1,
    };
    setWallPosts((prev) => [created, ...prev]);
  };

  // Pin directly from Card Studio to Community Diya Wall
  const handlePublishStudioCardToWall = (
    sender: string,
    message: string,
    motif: MotifType
  ) => {
    const motifToColor: Record<MotifType, 'gold' | 'sindoor' | 'peacock'> = {
      diya: 'gold',
      kalash: 'gold',
      lotus: 'sindoor',
      ganesha: 'sindoor',
      peacock: 'peacock',
    };
    handleAddWallPost({
      senderName: sender,
      location: 'Royal Card Studio',
      message,
      blessingTag: 'Royal Patrika Blessing',
      flameColor: motifToColor[motif] || 'gold',
    });

    setTimeout(() => {
      const wallEl = document.getElementById('community-wall');
      if (wallEl) {
        wallEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 350);
  };

  const handleLikeWallPost = (id: string) => {
    setWallPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const litCount = litDiyaIds.length;
  const ambientGlowIntensity = 0.08 + (litCount / 7) * 0.22;

  return (
    <div className="min-h-screen bg-[#0C0612] text-[#FDFBF7] relative selection:bg-[#FFB703]/30 selection:text-[#FFD166]">
      {/* Ambient Floating Embers & Interactive Phuljhari Sparkler Canvas */}
      <AmbientSparkleCanvas
        litCount={litCount}
        sparklerCursorEnabled={sparklerCursor}
      />

      {/* Dynamic Ambient Radial Diya Illumination Backdrop */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 28%, rgba(255, 183, 3, ${ambientGlowIntensity}) 0%, rgba(230, 57, 70, ${
            ambientGlowIntensity * 0.45
          }) 38%, rgba(12, 6, 18, 0.96) 78%)`,
        }}
      />

      {/* Top Ornamental Marigold & Mango-Leaf Bandhanwar Toran */}
      <div className="relative z-20">
        <MarigoldToranHeader />
      </div>

      {/* Floating Glass Pill Navigation Bar (Single Navigation Pattern, Max 4 Anchor Links) */}
      <header className="sticky top-4 z-40 px-4">
        <nav
          aria-label="Primary Navigation"
          className="max-w-[780px] mx-auto rounded-full kumkum-glass border border-[#FFB703]/35 px-3 sm:px-5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.75)] flex items-center justify-between gap-2"
        >
          {/* Brand Logo */}
          <a
            href="#courtyard"
            className="flex items-center gap-2 text-[#FDFBF7] hover:text-[#FFD166] transition-colors shrink-0"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFB703] to-[#E63946] flex items-center justify-center text-[#0C0612] shadow-[0_0_15px_rgba(255,183,3,0.5)]">
              <Flame className="w-4 h-4 fill-current" />
            </span>
            <div className="hidden sm:block">
              <span className="font-serif-royal text-xl font-bold tracking-wide text-gold-foil block leading-none">
                Jyotirmaya
              </span>
              <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#D8C3A5] block">
                Deepavali Portfolio
              </span>
            </div>
          </a>

          {/* 4 Section Anchor Links */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
            <a
              href="#courtyard"
              className="px-2.5 sm:px-3 py-1.5 rounded-full text-[#D8C3A5] hover:text-[#FDFBF7] hover:bg-[#FFB703]/15 transition-all flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-[#FFB703]" />
              <span>Light a Diya</span>
            </a>
            <a
              href="#wishes-portfolio"
              className="px-2.5 sm:px-3 py-1.5 rounded-full text-[#D8C3A5] hover:text-[#FDFBF7] hover:bg-[#FFB703]/15 transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#FFB703]" />
              <span>Wishes</span>
            </a>
            <a
              href="#card-studio"
              className="px-2.5 sm:px-3 py-1.5 rounded-full text-[#D8C3A5] hover:text-[#FDFBF7] hover:bg-[#FFB703]/15 transition-all flex items-center gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#FFB703]" />
              <span>Card Studio</span>
            </a>
            <a
              href="#community-wall"
              className="px-2.5 sm:px-3 py-1.5 rounded-full text-[#D8C3A5] hover:text-[#FDFBF7] hover:bg-[#FFB703]/15 transition-all hidden md:flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#FFB703]" />
              <span>Panchang & Wall</span>
            </a>
          </div>

          {/* Live Lit Diyas Pill + Chime Audio Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="px-2.5 py-1 rounded-full bg-[#FFB703]/15 border border-[#FFB703]/40 font-mono-tech text-[11px] font-semibold text-[#FFD166] flex items-center gap-1"
              title="Sacred Courtyard Diyas Lit"
            >
              <span>🪔</span>
              <span>{litCount}/7</span>
            </span>

            <button
              onClick={toggleSound}
              title={
                soundEnabled
                  ? 'Temple Bell Chimes Enabled (Click to Mute)'
                  : 'Temple Bell Chimes Muted (Click to Enable)'
              }
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-[#FFB703]/15 border-[#FFB703]/40 text-[#FFD166]'
                  : 'bg-[#180C24] border-[#FFB703]/15 text-[#9B8265]'
              }`}
              aria-label="Toggle temple bell sound chimes"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Toast Notification when loading a wish into Card Studio */}
      {studioBannerNotice && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl kumkum-glass border border-[#FFB703] px-5 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#FFB703] shrink-0" />
          <p className="text-xs sm:text-sm font-medium text-[#FDFBF7]">
            {studioBannerNotice}
          </p>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="relative z-10">
        {/* HERO SECTION: THE ROYAL COURTYARD OF LIGHT */}
        <section
          id="courtyard"
          className="relative pt-8 pb-20 md:pt-12 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center overflow-hidden"
        >
          {/* Rotating Concentric SVG Rangoli Mandala Behind Hero */}
          <RangoliMandalaSvg
            litCount={litCount}
            className="w-[460px] h-[460px] sm:w-[640px] sm:h-[640px] absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 -z-10"
          />

          {/* Pre-Title Auspicious Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#180C24]/90 border border-[#FFB703]/40 shadow-[0_0_25px_rgba(255,183,3,0.2)] mb-6">
            <span className="font-devanagari text-xs sm:text-sm text-[#FFB703] font-semibold">
              ✦ शुभ दीपावली
            </span>
            <span className="text-[#9B8265]">•</span>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#D8C3A5]">
              FESTIVAL OF LIGHTS • SAMVAT 2026
            </span>
            <span className="text-[#FFB703]">✦</span>
          </div>

          {/* Hero Display Headline */}
          <h1
            className="font-serif-royal font-bold tracking-tight text-[#FDFBF7] max-w-4xl mx-auto mb-5"
            style={{
              fontSize: 'clamp(2.65rem, 5.6vw + 0.8rem, 5.1rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            May a Thousand{' '}
            <span className="text-gold-shimmer italic font-semibold">
              Sacred Lamps
            </span>{' '}
            Illuminate Your Path
          </h1>

          {/* Poetic Subheadline & Sanskrit Mantra */}
          <p className="font-devanagari text-sm sm:text-base text-[#FFB703] tracking-wider mb-3">
            ॥ तमसो मा ज्योतिर्गमय — Lead us from darkness into eternal light ॥
          </p>
          <p className="text-[#D8C3A5] text-base sm:text-lg max-w-[65ch] mx-auto leading-relaxed mb-10">
            Welcome to <strong className="text-[#FDFBF7] font-semibold">Jyotirmaya</strong>, a
            candlelit heritage portfolio of heartfelt Deepavali blessings, Vedic shlokas, and an
            artisan Royal Patrika greeting studio. Kindle the seven sacred diyas below to awaken the
            courtyard.
          </p>

          {/* INTERACTIVE 7-DIYA SACRED ALTAR THALI */}
          <div className="relative max-w-4xl mx-auto mb-8">
            <div className="zari-card rounded-[32px] p-6 sm:p-8 md:p-10 relative overflow-hidden">
              {/* Top Altar Status Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pb-6 mb-6 border-b border-[#FFB703]/20">
                <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#FFD166]">
                  <Sparkles className="w-4 h-4 text-[#FFB703]" />
                  <span>Interactive Sapta-Deepam Sanctum Altar</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#D8C3A5]">
                    Illumination Level:
                  </span>
                  <div className="flex items-center gap-1">
                    {SACRED_DIYAS.map((d) => (
                      <span
                        key={d.id}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          litDiyaIds.includes(d.id)
                            ? 'bg-[#FFB703] shadow-[0_0_8px_#FFB703] scale-110'
                            : 'bg-[#331947]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 7 Sculpted Diyas Arranged in a Ceremonial Arc */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 items-end justify-items-center py-2">
                {SACRED_DIYAS.map((diya) => {
                  const isLit = litDiyaIds.includes(diya.id);
                  return (
                    <button
                      key={diya.id}
                      type="button"
                      onClick={(e) => handleToggleDiya(diya.id, e)}
                      className={`group relative flex flex-col items-center p-2.5 rounded-2xl border transition-all duration-300 cursor-pointer w-full ${
                        diya.isCenterpiece
                          ? 'col-span-2 sm:col-span-4 lg:col-span-1 order-first lg:order-none -mt-2'
                          : ''
                      } ${
                        isLit
                          ? 'bg-[#FFB703]/10 border-[#FFB703]/50 shadow-[0_0_25px_rgba(255,183,3,0.18)]'
                          : 'bg-[#0C0612]/50 border-[#FFB703]/15 hover:border-[#FFB703]/45'
                      }`}
                    >
                      <InteractiveDiyaSvg
                        isLit={isLit}
                        isCenterpiece={diya.isCenterpiece}
                        size={diya.isCenterpiece ? 'lg' : 'md'}
                        flameColor={diya.isCenterpiece ? 'gold' : 'gold'}
                        className="group-hover:scale-105 transition-transform"
                      />

                      <span
                        className={`mt-2 font-serif-royal font-bold leading-tight text-center ${
                          diya.isCenterpiece
                            ? 'text-base sm:text-lg text-[#FFD166]'
                            : 'text-sm text-[#FDFBF7]'
                        }`}
                      >
                        {diya.name.replace(' Deepam', '')}
                      </span>
                      <span className="text-[10px] text-[#9B8265] text-center line-clamp-1 mt-0.5">
                        {diya.meaning}
                      </span>
                      <span
                        className={`mt-2 px-2 py-0.5 rounded-full text-[9px] font-mono-tech uppercase tracking-wider ${
                          isLit
                            ? 'bg-[#FFB703]/20 text-[#FFD166]'
                            : 'bg-[#180C24] text-[#9B8265] group-hover:text-[#FDFBF7]'
                        }`}
                      >
                        {isLit ? '● Lit' : '○ Tap to Light'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Blessing Mantra Toast Bar */}
              <div className="mt-7 p-4 rounded-2xl bg-[#0C0612]/80 border border-[#FFB703]/30 flex flex-col items-center justify-center gap-1.5">
                <p className="font-devanagari text-xs sm:text-sm text-[#FFB703]">
                  ॥ {activeDiyaSanskrit} ॥
                </p>
                <p className="text-xs sm:text-sm text-[#FDFBF7] font-medium">
                  {activeDiyaToast}
                </p>
              </div>

              {/* Altar Interactive Controls: Light All Diyas & Sparkler Cursor Toggle */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleLightAllDiyas}
                  className="px-5 py-2.5 rounded-full bg-[#FFB703]/20 hover:bg-[#FFB703] text-[#FFD166] hover:text-[#0C0612] border border-[#FFB703]/50 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,183,3,0.25)]"
                >
                  <Flame className="w-4 h-4 fill-current" />
                  <span>
                    {litCount === 7
                      ? 'Reset Altar to Single Lamp'
                      : `Light All 7 Sacred Diyas (${7 - litCount} Remaining)`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSparklerCursor((prev) => !prev)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border flex items-center gap-2 transition-all cursor-pointer ${
                    sparklerCursor
                      ? 'bg-[#E63946]/20 border-[#E63946] text-[#FFD166]'
                      : 'bg-[#0C0612]/60 border-[#FFB703]/25 text-[#9B8265]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
                  <span>
                    Phuljhari Sparkler Trail: {sparklerCursor ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Dual Primary Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href="#wishes-portfolio"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FFB703] to-[#FB8500] hover:from-[#FFD166] hover:to-[#FFB703] text-[#0C0612] font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-[0_12px_35px_rgba(255,183,3,0.4)] transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Wishes Portfolio</span>
            </a>

            <a
              href="#card-studio"
              className="w-full sm:w-auto px-8 py-4 rounded-full kumkum-glass border border-[#FFB703]/45 hover:border-[#FFB703] text-[#FDFBF7] hover:text-[#FFD166] font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 transition-all"
            >
              <Wand2 className="w-4 h-4 text-[#FFB703]" />
              <span>Create Custom Greeting Card</span>
            </a>
          </div>
        </section>

        {/* Ornamental Section Divider */}
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-center gap-4 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FFB703] to-transparent" />
          <MotifEmblemSvg motif="lotus" className="w-7 h-7" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FFB703] to-transparent" />
        </div>

        {/* SECTION 1: CURATED WISHES PORTFOLIO GRID */}
        <WishesPortfolioSection
          onSelectWishForStudio={handleSelectWishForStudio}
        />

        {/* Ornamental Section Divider */}
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-center gap-4 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FFB703] to-transparent" />
          <MotifEmblemSvg motif="kalash" className="w-7 h-7" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FFB703] to-transparent" />
        </div>

        {/* SECTION 2: INTERACTIVE CUSTOM GREETING CARD STUDIO */}
        <GreetingCardStudio
          cardState={cardState}
          setCardState={setCardState}
          onPublishToWall={handlePublishStudioCardToWall}
        />

        {/* Ornamental Section Divider */}
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-center gap-4 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FFB703] to-transparent" />
          <MotifEmblemSvg motif="ganesha" className="w-7 h-7" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FFB703] to-transparent" />
        </div>

        {/* SECTION 3: 5-DAY DEEPAVALI PANCHANG & INTERACTIVE COMMUNITY DIYA WALL */}
        <PanchangAndWallSection
          wallPosts={wallPosts}
          onAddWallPost={handleAddWallPost}
          onLikeWallPost={handleLikeWallPost}
          onUsePanchangWish={handleUsePanchangWish}
        />
      </main>

      {/* ROYAL HERITAGE FOOTER */}
      <footer className="relative z-10 border-t border-[#FFB703]/20 bg-[#08030D] py-14 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center space-y-5">
          <InteractiveDiyaSvg isLit={true} size="sm" flameColor="gold" />

          <div className="space-y-1">
            <p className="font-devanagari text-base sm:text-lg text-[#FFB703]">
              ॥ लोकाः समस्ताः सुखिनो भवन्तु • शुभ दीपावली ॥
            </p>
            <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-gold-foil">
              Jyotirmaya — Royal Deepavali Wishes Portfolio
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#9B8265] max-w-md">
            Crafted with warm marigold gold, sindoor velvet, and sacred Sanskrit blessings. May the
            lamps of wisdom, compassion, and abundance shine in every courtyard.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-[#D8C3A5]">
            <a href="#courtyard" className="hover:text-[#FFB703] transition-colors flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#FFB703]" />
              <span>Sacred Altar</span>
            </a>
            <a href="#wishes-portfolio" className="hover:text-[#FFB703] transition-colors">
              15 Curated Blessings
            </a>
            <a href="#card-studio" className="hover:text-[#FFB703] transition-colors">
              Royal Patrika Card Studio
            </a>
            <a href="#community-wall" className="hover:text-[#FFB703] transition-colors">
              5-Day Panchang & Diya Wall
            </a>
          </div>

          <div className="pt-4 border-t border-[#FFB703]/10 w-full max-w-md flex items-center justify-center gap-1.5 text-[11px] font-mono-tech text-[#9B8265]">
            <span>MADE WITH</span>
            <Heart className="w-3 h-3 text-[#E63946] fill-current" />
            <span>FOR THE FESTIVAL OF LIGHTS • VIKRAM SAMVAT 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
