import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  Maximize2,
  Send,
  X,
  Palette,
  Stamp,
} from 'lucide-react';
import {
  CARD_THEMES,
  CardThemeConfig,
  DIWALI_WISHES,
  MotifType,
} from '../data/diwaliData';
import {
  InteractiveDiyaSvg,
  MotifEmblemSvg,
  ZariCornerFlourish,
} from './DiwaliMotifs';
import { downloadGreetingCardPng } from '../utils/exportCardCanvas';
import { triggerSparkBurst } from './AmbientSparkleCanvas';
import { soundEngine } from '../utils/soundChimes';

export interface StudioCardState {
  recipient: string;
  sender: string;
  message: string;
  sanskritHeader: string;
  showSanskrit: boolean;
  themeId: CardThemeConfig['id'];
  motif: MotifType;
}

interface GreetingCardStudioProps {
  cardState: StudioCardState;
  setCardState: React.Dispatch<React.SetStateAction<StudioCardState>>;
  onPublishToWall: (sender: string, message: string, motif: MotifType) => void;
}

const QUICK_RECIPIENTS = [
  'Maa, Papa & Family',
  'Priya & Rohan',
  'Esteemed Partners',
  'My Dearest Friend',
  'Dada & Dadi Ji',
];

const SANSKRIT_INVOCATIONS = [
  '॥ श्री गणेशाय नमः • शुभ दीपावली ॥',
  '॥ ॐ श्री महालक्ष्म्यै नमः • शुभ लाभ ॥',
  '॥ तमसो मा ज्योतिर्गमय • दीपोत्सवः ॥',
];

const MOTIF_OPTIONS: { id: MotifType; label: string }[] = [
  { id: 'diya', label: 'Brass Deepam' },
  { id: 'lotus', label: 'Sacred Lotus' },
  { id: 'kalash', label: 'Mangal Kalash' },
  { id: 'ganesha', label: 'Vigneshwara' },
  { id: 'peacock', label: 'Mayur Plume' },
];

export const GreetingCardStudio: React.FC<GreetingCardStudioProps> = ({
  cardState,
  setCardState,
  onPublishToWall,
}) => {
  const [copiedFormatted, setCopiedFormatted] = useState(false);
  const [downloadedToast, setDownloadedToast] = useState(false);
  const [publishedToast, setPublishedToast] = useState(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [presetIndex, setPresetIndex] = useState(0);

  const activeTheme =
    CARD_THEMES.find((t) => t.id === cardState.themeId) || CARD_THEMES[0];

  const serialCode = `#JP-${(cardState.recipient.length * 7 + cardState.message.length)
    .toString()
    .padStart(4, '0')}`;

  const handleCyclePreset = () => {
    const nextIdx = (presetIndex + 1) % DIWALI_WISHES.length;
    const nextWish = DIWALI_WISHES[nextIdx];
    setPresetIndex(nextIdx);
    soundEngine.playSparkleTick();
    setCardState((prev) => ({
      ...prev,
      message: nextWish.wishText,
      motif: nextWish.motif,
      sanskritHeader: nextWish.sanskritLine
        ? `॥ ${nextWish.sanskritLine} ॥`
        : prev.sanskritHeader,
    }));
  };

  const handleDownloadPng = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    soundEngine.playGrandIllumination();
    triggerSparkBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      count: 45,
    });

    downloadGreetingCardPng({
      recipient: cardState.recipient,
      sender: cardState.sender,
      message: cardState.message,
      sanskritHeader: cardState.sanskritHeader,
      showSanskrit: cardState.showSanskrit,
      theme: activeTheme,
      motif: cardState.motif,
      serialCode,
    });

    setDownloadedToast(true);
    setTimeout(() => setDownloadedToast(false), 3000);
  };

  const handleCopyFormattedCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const formattedText = [
      cardState.showSanskrit ? `${cardState.sanskritHeader}` : '✦ शुभ दीपावली • SHUBH DEEPAVALI ✦',
      '══════════════════════════',
      `Dearest ${cardState.recipient || 'Loved Ones'},`,
      '',
      `“${cardState.message.trim()}”`,
      '',
      'With Warmest Blessings & Golden Light,',
      `🪔 ${cardState.sender || 'With Love & Respect'} ✨`,
      '══════════════════════════',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(formattedText);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = formattedText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    soundEngine.playSparkleTick();
    triggerSparkBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      count: 30,
    });

    setCopiedFormatted(true);
    setTimeout(() => setCopiedFormatted(false), 2600);
  };

  const handlePinToWall = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    soundEngine.playDiyaIgnite(4);
    triggerSparkBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      count: 32,
    });
    onPublishToWall(
      cardState.sender || 'Well-Wisher',
      `To ${cardState.recipient || 'Everyone'}: ${cardState.message}`,
      cardState.motif
    );
    setPublishedToast(true);
    setTimeout(() => setPublishedToast(false), 3000);
  };

  const renderCardPreview = (isModal = false) => (
    <div
      className={`relative rounded-[26px] p-6 sm:p-9 transition-all duration-500 overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9)] ${
        isModal ? 'max-w-xl w-full mx-auto' : 'w-full'
      }`}
      style={{
        background: activeTheme.bgGradient,
        border: `2px solid ${activeTheme.borderPrimary}`,
      }}
    >
      {/* Inner Zari Hairline Frame */}
      <div
        className="relative rounded-[18px] p-6 sm:p-8 flex flex-col items-center text-center justify-between min-h-[510px]"
        style={{
          border: `1px solid ${activeTheme.borderSecondary}`,
          boxShadow: 'inset 0 0 60px rgba(255, 183, 3, 0.08)',
        }}
      >
        {/* 4 Corner Filigree Flourishes */}
        <ZariCornerFlourish
          position="tl"
          color={activeTheme.borderPrimary}
          className="w-7 h-7 absolute top-2.5 left-2.5"
        />
        <ZariCornerFlourish
          position="tr"
          color={activeTheme.borderPrimary}
          className="w-7 h-7 absolute top-2.5 right-2.5"
        />
        <ZariCornerFlourish
          position="bl"
          color={activeTheme.borderPrimary}
          className="w-7 h-7 absolute bottom-2.5 left-2.5"
        />
        <ZariCornerFlourish
          position="br"
          color={activeTheme.borderPrimary}
          className="w-7 h-7 absolute bottom-2.5 right-2.5"
        />

        {/* Top Header Invocation */}
        <div className="w-full space-y-2">
          {cardState.showSanskrit && (
            <p
              className="font-devanagari text-xs sm:text-sm font-semibold tracking-wider"
              style={{ color: activeTheme.accentColor }}
            >
              {cardState.sanskritHeader}
            </p>
          )}
          <div className="flex items-center justify-center gap-2">
            <span
              className="h-[1px] w-8 opacity-40"
              style={{ backgroundColor: activeTheme.borderPrimary }}
            />
            <span
              className="font-mono-tech text-[10px] tracking-[0.22em] uppercase"
              style={{ color: activeTheme.textSecondary }}
            >
              Festival of Sacred Lights
            </span>
            <span
              className="h-[1px] w-8 opacity-40"
              style={{ backgroundColor: activeTheme.borderPrimary }}
            />
          </div>
        </div>

        {/* Central Emblem Medallion with Twin Miniature Lit Diyas */}
        <div className="my-4 flex items-center justify-center gap-5">
          <InteractiveDiyaSvg isLit={true} size="sm" flameColor="gold" />
          <div
            className="w-18 h-18 rounded-full flex items-center justify-center relative shadow-inner"
            style={{
              backgroundColor: activeTheme.badgeBg,
              border: `1.5px solid ${activeTheme.borderPrimary}`,
            }}
          >
            <MotifEmblemSvg
              motif={cardState.motif}
              color={activeTheme.accentColor}
              className="w-10 h-10"
            />
          </div>
          <InteractiveDiyaSvg isLit={true} size="sm" flameColor="gold" />
        </div>

        {/* Main Title & Recipient Salutation */}
        <div className="max-w-md mx-auto space-y-3 my-2">
          <h3
            className="font-serif-royal text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: activeTheme.accentColor }}
          >
            Shubh Deepavali
          </h3>

          <p
            className="font-serif-royal italic text-xl sm:text-2xl font-semibold"
            style={{ color: activeTheme.textSecondary }}
          >
            Dearest {cardState.recipient || 'Loved Ones'},
          </p>

          {/* Poetic Message Body */}
          <p
            className="font-serif-royal text-lg sm:text-[21px] leading-[1.6] py-2"
            style={{ color: activeTheme.textPrimary }}
          >
            “{cardState.message}”
          </p>
        </div>

        {/* Sender Signature & Royal Seal */}
        <div className="w-full pt-5 mt-3 border-t border-current/15 flex flex-col items-center gap-1.5">
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-semibold"
            style={{ color: activeTheme.textSecondary }}
          >
            With Warmest Blessings & Golden Light
          </span>
          <p
            className="font-serif-royal text-2xl font-bold"
            style={{ color: activeTheme.accentColor }}
          >
            {cardState.sender || 'With Love & Respect'}
          </p>

          <div className="mt-2 flex items-center justify-between w-full text-[10px] font-mono-tech opacity-65 pt-2">
            <span style={{ color: activeTheme.textSecondary }}>
              SAMVAT 2082–2083
            </span>
            <span style={{ color: activeTheme.textSecondary }}>
              ROYAL PATRIKA {serialCode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="card-studio"
      className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E63946]/15 border border-[#E63946]/40 text-[#FFD166] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
          <Stamp className="w-3.5 h-3.5 text-[#FFB703]" />
          <span>Interactive Royal Patrika & Kharita Workshop</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] tracking-tight leading-[1.15] mb-4">
          Bespoke <span className="text-gold-foil italic font-semibold">Greeting Card Studio</span>
        </h2>

        <p className="text-[#D8C3A5] text-base sm:text-lg leading-relaxed">
          Inscribe your recipient’s name, choose a royal silk or parchment palette, stamp a sacred motif,
          and export a high-resolution keepsake card ready to share with family, friends, or clients.
        </p>
      </div>

      {/* Split-Screen Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Controls & Customization Form */}
        <div className="lg:col-span-6 zari-card rounded-3xl p-6 sm:p-8 space-y-6">
          {/* 1. Recipient Input + Preset Chips */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFD166] mb-2">
              1. Recipient Name (To)
            </label>
            <input
              type="text"
              value={cardState.recipient}
              onChange={(e) =>
                setCardState((prev) => ({ ...prev, recipient: e.target.value }))
              }
              placeholder="e.g., Respected Maa & Papa, Priya & Rohan..."
              maxLength={48}
              className="w-full px-4 py-3 rounded-xl bg-[#0C0612]/90 border border-[#FFB703]/30 text-[#FDFBF7] placeholder-[#9B8265] text-sm focus:outline-none focus:border-[#FFB703] transition-colors"
            />
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {QUICK_RECIPIENTS.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() =>
                    setCardState((prev) => ({ ...prev, recipient: name }))
                  }
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                    cardState.recipient === name
                      ? 'bg-[#FFB703] text-[#0C0612] border-[#FFB703] font-semibold'
                      : 'bg-[#180C24] text-[#D8C3A5] border-[#FFB703]/20 hover:border-[#FFB703]/50'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Sender Name Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFD166] mb-2">
              2. Sender Signature (From)
            </label>
            <input
              type="text"
              value={cardState.sender}
              onChange={(e) =>
                setCardState((prev) => ({ ...prev, sender: e.target.value }))
              }
              placeholder="e.g., Aarav, Ananya & The Sharma Family"
              maxLength={48}
              className="w-full px-4 py-3 rounded-xl bg-[#0C0612]/90 border border-[#FFB703]/30 text-[#FDFBF7] placeholder-[#9B8265] text-sm focus:outline-none focus:border-[#FFB703] transition-colors"
            />
          </div>

          {/* 3. Custom Blessing Message + Preset Cycler */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFD166]">
                3. Deepavali Blessing Message
              </label>
              <button
                type="button"
                onClick={handleCyclePreset}
                className="text-xs font-semibold text-[#FFB703] hover:text-[#FFF3B0] flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/30 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Inspire Me (Next Preset)</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={cardState.message}
              onChange={(e) =>
                setCardState((prev) => ({ ...prev, message: e.target.value }))
              }
              maxLength={320}
              placeholder="Write your heartfelt Diwali wish here..."
              className="w-full px-4 py-3 rounded-xl bg-[#0C0612]/90 border border-[#FFB703]/30 text-[#FDFBF7] placeholder-[#9B8265] text-sm leading-relaxed focus:outline-none focus:border-[#FFB703] transition-colors resize-none"
            />
            <div className="flex items-center justify-between mt-1.5 text-xs text-[#9B8265]">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[#D8C3A5]">
                <input
                  type="checkbox"
                  checked={cardState.showSanskrit}
                  onChange={(e) =>
                    setCardState((prev) => ({
                      ...prev,
                      showSanskrit: e.target.checked,
                    }))
                  }
                  className="accent-[#FFB703] rounded cursor-pointer"
                />
                <span>Include Sanskrit Invocation Header</span>
              </label>
              <span className="font-mono-tech">{cardState.message.length}/320</span>
            </div>

            {cardState.showSanskrit && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {SANSKRIT_INVOCATIONS.map((inv) => (
                  <button
                    key={inv}
                    type="button"
                    onClick={() =>
                      setCardState((prev) => ({ ...prev, sanskritHeader: inv }))
                    }
                    className={`font-devanagari text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                      cardState.sanskritHeader === inv
                        ? 'bg-[#FFB703]/20 border-[#FFB703] text-[#FFD166]'
                        : 'bg-[#0C0612]/60 border-[#FFB703]/15 text-[#9B8265] hover:text-[#D8C3A5]'
                    }`}
                  >
                    {inv}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Card Theme Palette Selector */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FFD166] mb-2.5">
              <Palette className="w-3.5 h-3.5 text-[#FFB703]" />
              <span>4. Royal Patrika Silk & Foil Palette</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {CARD_THEMES.map((theme) => {
                const isSelected = cardState.themeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playSparkleTick();
                      setCardState((prev) => ({ ...prev, themeId: theme.id }));
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#FFB703] bg-[#FFB703]/15 shadow-[0_0_20px_rgba(255,183,3,0.22)]'
                        : 'border-[#FFB703]/20 bg-[#0C0612]/70 hover:border-[#FFB703]/50'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full shrink-0 border"
                      style={{
                        background: theme.bgGradient,
                        borderColor: theme.borderPrimary,
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#FDFBF7] truncate">
                        {theme.name}
                      </p>
                      <p className="text-[11px] text-[#9B8265] truncate">
                        {theme.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Sacred Emblem Motif Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFD166] mb-2.5">
              5. Sacred Seal Emblem
            </label>
            <div className="grid grid-cols-5 gap-2">
              {MOTIF_OPTIONS.map((item) => {
                const isSelected = cardState.motif === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playSparkleTick();
                      setCardState((prev) => ({ ...prev, motif: item.id }));
                    }}
                    className={`py-2.5 px-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#FFB703] bg-[#FFB703]/18 text-[#FFD166]'
                        : 'border-[#FFB703]/20 bg-[#0C0612]/60 text-[#9B8265] hover:text-[#FDFBF7] hover:border-[#FFB703]/45'
                    }`}
                  >
                    <MotifEmblemSvg motif={item.id} className="w-5 h-5" />
                    <span className="text-[10px] font-medium text-center leading-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Interactive Card Preview & Export Toolbar */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Top Preview Bar */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-mono-tech text-xs uppercase tracking-wider text-[#D8C3A5]">
                Live Royal Patrika Preview
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsFullscreenModalOpen(true)}
              className="text-xs text-[#FFD166] hover:text-[#FFF3B0] flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/30 cursor-pointer transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fullscreen Showcase</span>
            </button>
          </div>

          {/* Live Rendered Card */}
          {renderCardPreview(false)}

          {/* Export & Share Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDownloadPng}
              className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#FFB703] to-[#FB8500] hover:from-[#FFD166] hover:to-[#FFB703] text-[#0C0612] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,183,3,0.35)] transition-all cursor-pointer"
            >
              {downloadedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Royal PNG Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Card (High-Res PNG)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyFormattedCard}
              className="py-3.5 px-5 rounded-2xl kumkum-glass border border-[#FFB703]/40 hover:border-[#FFB703] text-[#FDFBF7] font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedFormatted ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#34D399]">Copied for WhatsApp ✨</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#FFB703]" />
                  <span>Copy Formatted Text Card</span>
                </>
              )}
            </button>
          </div>

          {/* Secondary Action: Pin directly to the Community Diya Wall */}
          <button
            type="button"
            onClick={handlePinToWall}
            className="w-full py-3 px-5 rounded-2xl bg-[#180C24] hover:bg-[#E63946]/20 border border-[#E63946]/40 hover:border-[#E63946] text-[#D8C3A5] hover:text-[#FDFBF7] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {publishedToast ? (
              <>
                <Sparkles className="w-4 h-4 text-[#FFB703]" />
                <span className="text-[#FFD166]">
                  Lit & Pinned to the Community Diya Wall Below!
                </span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-[#E63946]" />
                <span>Light & Pin This Blessing to the Community Diya Wall</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Fullscreen Ceremonial Showcase Modal */}
      {isFullscreenModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0C0612]/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsFullscreenModalOpen(false)}
        >
          <div
            className="relative max-w-xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-tech text-xs uppercase tracking-widest text-[#FFD166]">
                ✦ Ceremonial Fullscreen Presentation ✦
              </span>
              <button
                onClick={() => setIsFullscreenModalOpen(false)}
                className="p-2 rounded-full bg-[#180C24] border border-[#FFB703]/40 text-[#FDFBF7] hover:bg-[#FFB703] hover:text-[#0C0612] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {renderCardPreview(true)}
          </div>
        </div>
      )}
    </section>
  );
};
