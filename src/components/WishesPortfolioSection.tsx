import React, { useState, useMemo } from 'react';
import {
  Check,
  Copy,
  Sparkles,
  Search,
  Bookmark,
  Wand2,
  X,
} from 'lucide-react';
import {
  DIWALI_WISHES,
  DiwaliWish,
  WishCategory,
} from '../data/diwaliData';
import { MotifEmblemSvg, ZariCornerFlourish } from './DiwaliMotifs';
import { triggerSparkBurst } from './AmbientSparkleCanvas';
import { soundEngine } from '../utils/soundChimes';

interface WishesPortfolioSectionProps {
  onSelectWishForStudio: (wish: DiwaliWish) => void;
}

const CATEGORIES: { id: WishCategory; label: string; sanskritHint: string }[] = [
  { id: 'all', label: 'All Blessings', sanskritHint: 'सर्व मङ्गल' },
  { id: 'family', label: 'Family & Elders', sanskritHint: 'कुटुम्ब स्नेह' },
  { id: 'friends', label: 'Friends & Joy', sanskritHint: 'मित्र आनन्द' },
  { id: 'professional', label: 'Professional & Clients', sanskritHint: 'शुभ लाभ' },
  { id: 'shlokas', label: 'Poetic & Shlokas', sanskritHint: 'वैदिक मन्त्र' },
];

export const WishesPortfolioSection: React.FC<WishesPortfolioSectionProps> = ({
  onSelectWishForStudio,
}) => {
  const [activeCategory, setActiveCategory] = useState<WishCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['wish-1', 'wish-11']);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [copiedAllBookmarks, setCopiedAllBookmarks] = useState(false);

  const filteredWishes = useMemo(() => {
    return DIWALI_WISHES.filter((w) => {
      const matchesCat = activeCategory === 'all' || w.category === activeCategory;
      const matchesBookmark = !showOnlyBookmarked || bookmarkedIds.includes(w.id);
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        w.wishText.toLowerCase().includes(q) ||
        w.categoryLabel.toLowerCase().includes(q) ||
        (w.sanskritLine && w.sanskritLine.toLowerCase().includes(q));
      return matchesCat && matchesBookmark && matchesSearch;
    });
  }, [activeCategory, searchQuery, showOnlyBookmarked, bookmarkedIds]);

  const handleCopyWish = async (wish: DiwaliWish, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const formatted = wish.sanskritLine
      ? `✦ ${wish.sanskritLine} ✦\n\n${wish.wishText}\n\n— Shubh Deepavali 🪔✨`
      : `${wish.wishText}\n\n— Shubh Deepavali 🪔✨`;

    try {
      await navigator.clipboard.writeText(formatted);
    } catch {
      // Fallback copy
      const ta = document.createElement('textarea');
      ta.value = formatted;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    soundEngine.playSparkleTick();
    triggerSparkBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      count: 28,
    });

    setCopiedId(wish.id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === wish.id ? null : prev));
    }, 2400);
  };

  const toggleBookmark = (id: string) => {
    soundEngine.playSparkleTick();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyAllBookmarked = async () => {
    const saved = DIWALI_WISHES.filter((w) => bookmarkedIds.includes(w.id));
    if (saved.length === 0) return;

    const bundle = saved
      .map(
        (w, i) =>
          `${i + 1}. [${w.categoryLabel}]\n${w.sanskritLine ? `${w.sanskritLine}\n` : ''}${w.wishText}`
      )
      .join('\n\n────────────────────\n\n');

    try {
      await navigator.clipboard.writeText(bundle);
    } catch {
      // ignore
    }
    soundEngine.playSparkleTick();
    setCopiedAllBookmarks(true);
    setTimeout(() => setCopiedAllBookmarks(false), 2400);
  };

  return (
    <section
      id="wishes-portfolio"
      className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/30 text-[#FFD166] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
          <span>Curated Literary Anthology • 15 Royal Blessings</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] tracking-tight leading-[1.15] mb-4">
          The Treasury of <span className="text-gold-foil italic font-semibold">Deepavali Wishes</span>
        </h2>

        <p className="text-[#D8C3A5] text-base sm:text-lg leading-relaxed">
          Handcrafted blessings steeped in warmth, reverence, and sacred Sanskrit verse. Copy any wish
          with a single tap or load it directly into the Royal Patrika Studio to seal a custom card.
        </p>
      </div>

      {/* Category Filter Pills & Search Toolbar */}
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id && !showOnlyBookmarked;
            const count =
              cat.id === 'all'
                ? DIWALI_WISHES.length
                : DIWALI_WISHES.filter((w) => w.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowOnlyBookmarked(false);
                }}
                className={`group relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FFB703] to-[#FB8500] text-[#0C0612] font-semibold shadow-[0_0_24px_rgba(255,183,3,0.4)]'
                    : 'kumkum-glass text-[#D8C3A5] border border-[#FFB703]/25 hover:border-[#FFB703]/60 hover:text-[#FDFBF7]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-mono-tech px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#0C0612]/20 text-[#0C0612] font-bold'
                      : 'bg-[#FFB703]/10 text-[#FFB703]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {/* Saved Favorites Filter Pill */}
          <button
            onClick={() => setShowOnlyBookmarked((prev) => !prev)}
            className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              showOnlyBookmarked
                ? 'bg-[#E63946] text-[#FDFBF7] font-semibold shadow-[0_0_22px_rgba(230,57,70,0.45)]'
                : 'kumkum-glass text-[#D8C3A5] border border-[#E63946]/35 hover:border-[#E63946] hover:text-[#FDFBF7]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>Saved Shortlist ({bookmarkedIds.length})</span>
          </button>
        </div>

        {/* Search Input & Copy Shortlist Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-2xl mx-auto w-full mt-1">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#9B8265] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wishes by keyword (e.g., Lakshmi, family, kaju katli, peace, shloka)..."
              className="w-full pl-11 pr-10 py-2.5 rounded-full kumkum-glass border border-[#FFB703]/25 text-sm text-[#FDFBF7] placeholder-[#9B8265] focus:outline-none focus:border-[#FFB703]/70 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9B8265] hover:text-[#FDFBF7] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {showOnlyBookmarked && bookmarkedIds.length > 0 && (
            <button
              onClick={handleCopyAllBookmarked}
              className="shrink-0 px-4 py-2.5 rounded-full bg-[#FFB703]/15 border border-[#FFB703]/45 text-[#FFD166] hover:bg-[#FFB703]/25 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
            >
              {copiedAllBookmarks ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Copied All ({bookmarkedIds.length})!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Shortlist</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Empty Filter State */}
      {filteredWishes.length === 0 ? (
        <div className="zari-card rounded-2xl p-12 text-center max-w-lg mx-auto">
          <p className="font-serif-royal text-2xl text-[#FDFBF7] mb-2">
            No blessings matched your filter
          </p>
          <p className="text-sm text-[#9B8265] mb-6">
            Try clearing your search keyword or switching back to All Blessings.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setShowOnlyBookmarked(false);
            }}
            className="px-5 py-2.5 rounded-full bg-[#FFB703] text-[#0C0612] text-sm font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* 3-Column Wishes Grid (Capped at 3 Data Points per Card) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWishes.map((wish) => {
            const isCopied = copiedId === wish.id;
            const isBookmarked = bookmarkedIds.includes(wish.id);

            return (
              <article
                key={wish.id}
                className="zari-card relative rounded-2xl p-7 flex flex-col justify-between group overflow-hidden"
              >
                {/* Ornamental Zari Corners */}
                <ZariCornerFlourish position="tl" className="w-5 h-5 absolute top-2.5 left-2.5 opacity-55 group-hover:opacity-100 transition-opacity" />
                <ZariCornerFlourish position="tr" className="w-5 h-5 absolute top-2.5 right-2.5 opacity-55 group-hover:opacity-100 transition-opacity" />
                <ZariCornerFlourish position="bl" className="w-5 h-5 absolute bottom-2.5 left-2.5 opacity-55 group-hover:opacity-100 transition-opacity" />
                <ZariCornerFlourish position="br" className="w-5 h-5 absolute bottom-2.5 right-2.5 opacity-55 group-hover:opacity-100 transition-opacity" />

                {/* DATA POINT 1: Category Badge + Custom SVG Motif + Serial */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/25">
                      <MotifEmblemSvg motif={wish.motif} className="w-4 h-4" />
                      <span className="text-xs font-semibold tracking-wider uppercase text-[#FFD166]">
                        {wish.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono-tech text-xs text-[#9B8265]">
                        {wish.serial}
                      </span>
                      <button
                        onClick={() => toggleBookmark(wish.id)}
                        title={isBookmarked ? 'Remove from saved shortlist' : 'Save to shortlist'}
                        className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                          isBookmarked
                            ? 'bg-[#E63946]/20 border-[#E63946]/60 text-[#E63946]'
                            : 'border-transparent text-[#9B8265] hover:text-[#FFD166] hover:bg-[#FFB703]/10'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* DATA POINT 2: Sacred Sanskrit Couplet & Poetic Wish Body */}
                  {wish.sanskritLine && (
                    <p className="font-devanagari text-xs sm:text-sm text-[#FFB703]/90 mb-2.5 tracking-wide border-l-2 border-[#FFB703]/40 pl-3 py-0.5">
                      {wish.sanskritLine}
                    </p>
                  )}

                  <p className="text-[#FDFBF7] text-[17px] leading-[1.65] font-normal mb-6">
                    “{wish.wishText}”
                  </p>
                </div>

                {/* DATA POINT 3: Action Bar (One-Click Copy + Load into Card Studio) */}
                <div className="pt-4 border-t border-[#FFB703]/15 flex items-center gap-2.5">
                  <button
                    onClick={(e) => handleCopyWish(wish, e)}
                    className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      isCopied
                        ? 'bg-[#10B981]/20 border border-[#10B981] text-[#34D399]'
                        : 'bg-[#FFB703]/12 hover:bg-[#FFB703] text-[#FFD166] hover:text-[#0C0612] border border-[#FFB703]/35'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied ✨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Wish</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      soundEngine.playSparkleTick();
                      onSelectWishForStudio(wish);
                    }}
                    className="py-2.5 px-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#180C24] hover:bg-[#E63946]/20 text-[#D8C3A5] hover:text-[#FDFBF7] border border-[#FFB703]/20 hover:border-[#E63946]/60 flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Customize this blessing in the Greeting Card Studio"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-[#FFB703]" />
                    <span>Card Studio</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
