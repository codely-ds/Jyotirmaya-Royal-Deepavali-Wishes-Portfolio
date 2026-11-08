import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Copy,
  Check,
  Flame,
  Heart,
  MapPin,
  PlusCircle,
  Wand2,
} from 'lucide-react';
import {
  PANCHANG_DAYS,
  PanchangDay,
  CommunityDiyaPost,
} from '../data/diwaliData';
import { InteractiveDiyaSvg, ZariCornerFlourish } from './DiwaliMotifs';
import { triggerSparkBurst } from './AmbientSparkleCanvas';
import { soundEngine } from '../utils/soundChimes';

interface PanchangAndWallSectionProps {
  wallPosts: CommunityDiyaPost[];
  onAddWallPost: (post: Omit<CommunityDiyaPost, 'id' | 'timestamp' | 'likes'>) => void;
  onLikeWallPost: (id: string) => void;
  onUsePanchangWish: (day: PanchangDay) => void;
}

const BLESSING_TAGS = [
  'Sukh & Samriddhi',
  'Vidya & Shanti',
  'Kutumb Sneh',
  'Aarogya & Shakti',
  'Nava-Aarambh',
];

export const PanchangAndWallSection: React.FC<PanchangAndWallSectionProps> = ({
  wallPosts,
  onAddWallPost,
  onLikeWallPost,
  onUsePanchangWish,
}) => {
  const [selectedDayNum, setSelectedDayNum] = useState<number>(3); // Default to Day 3: Badi Diwali (Lakshmi Puja)
  const [copiedDayWish, setCopiedDayWish] = useState(false);

  // Community Wall Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [blessingTag, setBlessingTag] = useState(BLESSING_TAGS[0]);
  const [flameColor, setFlameColor] = useState<'gold' | 'sindoor' | 'peacock'>('gold');
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const activeDay =
    PANCHANG_DAYS.find((d) => d.dayNumber === selectedDayNum) || PANCHANG_DAYS[2];

  const handleCopyDayWish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const text = `✦ ${activeDay.sanskritTitle} (${activeDay.title}) ✦\n\n${activeDay.specialWish}\n\n— Shubh Deepavali 🪔`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
    soundEngine.playSparkleTick();
    triggerSparkBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      count: 28,
    });
    setCopiedDayWish(true);
    setTimeout(() => setCopiedDayWish(false), 2400);
  };

  const handleSubmitWallDiya = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    soundEngine.playGrandIllumination();
    triggerSparkBurst({ grand: true });

    onAddWallPost({
      senderName: senderName.trim() || 'Anonymous Well-Wisher',
      location: location.trim() || 'Global Courtyard',
      message: message.trim(),
      blessingTag,
      flameColor,
    });

    setSenderName('');
    setLocation('');
    setMessage('');
    setIsFormOpen(false);
  };

  const handleLike = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (likedIds.includes(id)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    soundEngine.playDiyaIgnite(5);
    triggerSparkBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      count: 18,
    });
    setLikedIds((prev) => [...prev, id]);
    onLikeWallPost(id);
  };

  return (
    <section
      id="community-wall"
      className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto space-y-24"
    >
      {/* PART 1: 5-DAY DEEPAVALI PARVA PANCHANG & MUHURAT SHOWCASE */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#118AB2]/20 border border-[#118AB2]/50 text-[#4CC9F0] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <Calendar className="w-3.5 h-3.5 text-[#FFB703]" />
            <span>Panch-Parva Deepavali • Sacred 5-Day Almanac</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] tracking-tight leading-[1.15] mb-3">
            Auspicious <span className="text-gold-foil italic font-semibold">Five Days of Light</span>
          </h2>
          <p className="text-[#D8C3A5] text-base sm:text-lg">
            Explore the sacred lunar tithis, Pradosh Kaal Muhurat timings, and tailored blessings for
            each day from Dhanteras to Bhai Dooj.
          </p>
        </div>

        {/* 5-Day Horizontal Pill Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
          {PANCHANG_DAYS.map((day) => {
            const isSelected = day.dayNumber === selectedDayNum;
            return (
              <button
                key={day.dayNumber}
                onClick={() => {
                  soundEngine.playDiyaIgnite(day.dayNumber);
                  setSelectedDayNum(day.dayNumber);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#2B133D] to-[#180C24] border-[#FFB703] shadow-[0_0_25px_rgba(255,183,3,0.25)]'
                    : 'kumkum-glass border-[#FFB703]/20 hover:border-[#FFB703]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#FFB703]">
                    Day 0{day.dayNumber}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#FFB703] animate-ping" />
                  )}
                </div>
                <p className="font-serif-royal text-lg sm:text-xl font-bold text-[#FDFBF7]">
                  {day.title}
                </p>
                <p className="text-[11px] text-[#9B8265] truncate">
                  {day.tithi}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Day Jewel-Box Detail Card */}
        <div className="zari-card relative rounded-3xl p-6 sm:p-10 overflow-hidden">
          <ZariCornerFlourish position="tl" className="w-6 h-6 absolute top-3 left-3 opacity-70" />
          <ZariCornerFlourish position="tr" className="w-6 h-6 absolute top-3 right-3 opacity-70" />
          <ZariCornerFlourish position="bl" className="w-6 h-6 absolute bottom-3 left-3 opacity-70" />
          <ZariCornerFlourish position="br" className="w-6 h-6 absolute bottom-3 right-3 opacity-70" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#FFB703]/15 border border-[#FFB703]/40 text-[#FFD166] font-mono-tech text-xs font-semibold">
                  DAY 0{activeDay.dayNumber} • {activeDay.tithi.toUpperCase()}
                </span>
                <span className="font-devanagari text-sm text-[#FFB703]">
                  {activeDay.sanskritTitle}
                </span>
              </div>

              <h3 className="font-serif-royal text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
                {activeDay.title} —{' '}
                <span className="text-gold-foil italic font-semibold">
                  {activeDay.traditionalName}
                </span>
              </h3>

              <p className="text-[#D8C3A5] text-base leading-relaxed">
                {activeDay.significance}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#0C0612]/70 border border-[#FFB703]/20">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFD166] mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#FFB703]" />
                    <span>Auspicious Muhurat Window</span>
                  </div>
                  <p className="font-mono-tech text-xs sm:text-sm text-[#FDFBF7]">
                    {activeDay.muhuratWindow}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0C0612]/70 border border-[#FFB703]/20">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFD166] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
                    <span>Sacred Ritual Highlight</span>
                  </div>
                  <p className="text-xs text-[#D8C3A5] leading-snug">
                    {activeDay.ritualHighlight}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Day-Specific Blessing Box */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0C0612]/80 border border-[#FFB703]/35 flex flex-col justify-between space-y-5">
              <div>
                <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#FFB703] block mb-2">
                  ✦ Tailored {activeDay.title} Blessing ✦
                </span>
                <p className="font-serif-royal italic text-xl sm:text-2xl text-[#FDFBF7] leading-relaxed">
                  “{activeDay.specialWish}”
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  onClick={handleCopyDayWish}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#FFB703] hover:bg-[#FFD166] text-[#0C0612] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedDayWish ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied {activeDay.title} Wish!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy {activeDay.title} Wish</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    soundEngine.playSparkleTick();
                    onUsePanchangWish(activeDay);
                  }}
                  className="py-2.5 px-3.5 rounded-xl bg-[#180C24] hover:bg-[#FFB703]/20 border border-[#FFB703]/35 text-[#FFD166] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Open in Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: INTERACTIVE COMMUNITY DIYA WALL ("THE COURTYARD OF SHARED LIGHTS") */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/30 text-[#FFD166] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              <Flame className="w-3.5 h-3.5 text-[#FFB703]" />
              <span>Global Courtyard • {wallPosts.length} Sacred Lamps Glowing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FDFBF7] tracking-tight">
              Community <span className="text-gold-foil italic font-semibold">Wall of Lit Diyas</span>
            </h2>
            <p className="text-[#D8C3A5] text-sm sm:text-base mt-1 max-w-2xl">
              Light your own virtual diya and leave a blessing of peace, health, or prosperity on our
              shared festive courtyard.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="shrink-0 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FFB703] to-[#FB8500] hover:from-[#FFD166] hover:to-[#FFB703] text-[#0C0612] font-bold text-sm flex items-center gap-2 shadow-[0_0_28px_rgba(255,183,3,0.35)] transition-all cursor-pointer self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isFormOpen ? 'Close Diya Sanctuary Form' : 'Light a Virtual Diya & Post Wish'}</span>
          </button>
        </div>

        {/* Collapsible Add Virtual Diya Form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmitWallDiya}
            className="zari-card rounded-3xl p-6 sm:p-8 mb-10 border-[#FFB703]/60 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-[#FFB703]/20 pb-4">
              <div className="flex items-center gap-3">
                <InteractiveDiyaSvg isLit={true} size="sm" flameColor={flameColor} />
                <div>
                  <h3 className="font-serif-royal text-2xl font-bold text-[#FDFBF7]">
                    Kindle Your Sacred Diya on the Courtyard Wall
                  </h3>
                  <p className="text-xs text-[#9B8265]">
                    Your lamp and blessing will immediately illuminate the community grid below.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFD166] mb-1.5">
                  Your Name / Family Name
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g., Kavita & Rajeev Verma"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0C0612] border border-[#FFB703]/30 text-sm text-[#FDFBF7] placeholder-[#9B8265] focus:outline-none focus:border-[#FFB703]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFD166] mb-1.5">
                  City / Country
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Udaipur, India"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0C0612] border border-[#FFB703]/30 text-sm text-[#FDFBF7] placeholder-[#9B8265] focus:outline-none focus:border-[#FFB703]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFD166] mb-1.5">
                  Sankalpa (Blessing Theme)
                </label>
                <select
                  value={blessingTag}
                  onChange={(e) => setBlessingTag(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0C0612] border border-[#FFB703]/30 text-sm text-[#FDFBF7] focus:outline-none focus:border-[#FFB703]"
                >
                  {BLESSING_TAGS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFD166] mb-1.5">
                Your Deepavali Blessing for the Community
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a warm Diwali wish, memory, or prayer for everyone visiting..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#0C0612] border border-[#FFB703]/30 text-sm text-[#FDFBF7] placeholder-[#9B8265] focus:outline-none focus:border-[#FFB703] resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D8C3A5]">
                  Flame Aura:
                </span>
                {(
                  [
                    { id: 'gold', label: 'Marigold Gold', hex: '#FFB703' },
                    { id: 'sindoor', label: 'Sindoor Crimson', hex: '#E63946' },
                    { id: 'peacock', label: 'Peacock Neel', hex: '#4CC9F0' },
                  ] as const
                ).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setFlameColor(c.id)}
                    className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${
                      flameColor === c.id
                        ? 'border-[#FFB703] bg-[#FFB703]/20 text-[#FDFBF7] font-semibold'
                        : 'border-[#FFB703]/20 text-[#9B8265]'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFB703] to-[#FB8500] text-[#0C0612] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg"
              >
                Ignite Diya & Publish Blessing 🪔
              </button>
            </div>
          </form>
        )}

        {/* Community Lit Diya Grid (3 per row on desktop, capped at 3 data points per card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wallPosts.map((post) => {
            const hasLiked = likedIds.includes(post.id);
            return (
              <div
                key={post.id}
                className="zari-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Row: Lit Diya + Name & Location */}
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <InteractiveDiyaSvg
                      isLit={true}
                      size="sm"
                      flameColor={post.flameColor}
                      className="shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-serif-royal text-xl font-bold text-[#FDFBF7] truncate">
                        {post.senderName}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-[#9B8265]">
                        <MapPin className="w-3 h-3 text-[#FFB703] shrink-0" />
                        <span className="truncate">{post.location}</span>
                        <span>•</span>
                        <span className="font-mono-tech text-[11px]">{post.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Blessing Message */}
                  <p className="text-[#D8C3A5] text-sm sm:text-[15px] leading-relaxed mb-5">
                    “{post.message}”
                  </p>
                </div>

                {/* Bottom Row: Sankalpa Tag + Send Light / Heart Button */}
                <div className="pt-3.5 border-t border-[#FFB703]/15 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/25 text-[11px] font-semibold text-[#FFD166]">
                    ✦ {post.blessingTag}
                  </span>

                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    className={`px-3 py-1 rounded-full text-xs font-mono-tech flex items-center gap-1.5 border transition-all cursor-pointer ${
                      hasLiked
                        ? 'bg-[#E63946]/20 border-[#E63946] text-[#FFccd5]'
                        : 'bg-[#0C0612]/60 border-[#FFB703]/20 text-[#D8C3A5] hover:border-[#FFB703]/60'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        hasLiked ? 'fill-[#E63946] text-[#E63946]' : 'text-[#FFB703]'
                      }`}
                    />
                    <span>{post.likes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
