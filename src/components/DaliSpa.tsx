import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import type { SpaService } from "../data";
import { images, treatments, CATEGORIES, CATEGORY_IMAGES, siteInfo, galleryImages, GENERAL_FRESHA_URL } from "../data";
import {
  Menu, X, Plus, Minus, ChevronLeft, ChevronRight, ChevronDown,
  CalendarDays, Users, Star, Phone, MapPin
} from "lucide-react";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";
import FreshaModal from "./FreshaModal";

/* ═══════════════════════════════════════════════════════════════
   REVEAL / MOTION
   ═══════════════════════════════════════════════════════════════ */
function Reveal({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.unobserve(e.target); } }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${vis ? "reveal-visible" : ""} ${className}`}>{children}</div>;
}


/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { key: "treatments", href: "#tratamientos" },
  { key: "gallery", href: "#galeria" },
  { key: "location", href: "#ubicacion" },
  { key: "faq", href: "#faq" }
];


/* ═══════════════════════════════════════════════════════════════
   FLAGS (SVG)
   ═══════════════════════════════════════════════════════════════ */
const MXFlag = () => (
  <svg viewBox="0 0 900 600" width="16" height="12" className="rounded-sm shadow-sm ring-1 ring-white/10">
    <rect width="900" height="600" fill="#ce1126" /><rect width="600" height="600" fill="#fff" /><rect width="300" height="600" fill="#006847" />
    <g transform="translate(450,300) scale(0.4)">
      <path d="M-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0" fill="#006847" /><path d="M-60 0a60 60 0 1 1 120 0 60 60 0 1 1-120 0" fill="#964b00" />
      <path d="M0-100l20 60 60 20-60 20-20 60-20-60-60-20 60-20z" fill="#fff" />
    </g>
  </svg>
);
const USFlag = () => (
  <svg viewBox="0 0 741 390" width="16" height="12" className="rounded-sm shadow-sm ring-1 ring-white/10">
    <rect width="741" height="390" fill="#b22234" /><path d="M0 30h741M0 90h741M0 150h741M0 210h741M0 270h741M0 330h741" stroke="#fff" strokeWidth="30" />
    <rect width="296" height="210" fill="#3c3b6e" />
    <g fill="#fff">
      <g id="s18"><g id="s9"><g id="s5"><g id="s"><path d="M0-4l1.3 4H-1.3zM-2 1.5l3.2-1.3-3.2-1.2zm4 0L-1.2.2 2-1.1z" /><path d="M0 4L-1.3 0H1.3z" opacity=".5" /></g>
        <use xlinkHref="#s" x="43" y="21" /><use xlinkHref="#s" x="86" y="21" /><use xlinkHref="#s" x="129" y="21" /><use xlinkHref="#s" x="172" y="21" /></g>
        <use xlinkHref="#s5" x="21" y="21" /></g>
        <use xlinkHref="#s9" x="0" y="42" /><use xlinkHref="#s9" x="0" y="84" /><use xlinkHref="#s9" x="0" y="126" /></g>
    </g>
  </svg>
);

function Navbar({ onOpenBooking }: { onOpenBooking: (url: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    const clickOutside = (e: MouseEvent) => { if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false); };
    window.addEventListener("scroll", h, { passive: true });
    window.addEventListener("mousedown", clickOutside);
    return () => { window.removeEventListener("scroll", h); window.removeEventListener("mousedown", clickOutside); };
  }, []);

  const txm = scrolled ? "text-[var(--text-muted)]" : "text-white/70";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[var(--cream)] shadow-md" : "bg-black/70 backdrop-blur-sm"}`}>
      {/* Row 1 */}
      <div className="relative z-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-14 md:h-16">
          <div className="hidden lg:flex gap-5 items-center text-[11px] tracking-wider">
            <a href={`tel:${siteInfo.phoneRaw}`} className={`flex items-center gap-1.5 hover:text-burgundy transition-colors ${txm}`}>
              <Phone size={12} /> {siteInfo.phone}
            </a>
          </div>

          {/* Logo */}
          <a href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className={`text-2xl lg:text-3xl font-logo tracking-[0.5em] font-medium leading-none transition-colors ${scrolled ? "text-charcoal" : "text-white"}`}>DALI</span>
            <span className={`text-[7px] lg:text-[8px] tracking-[0.5em] font-sans transition-colors ${scrolled ? "text-[var(--text-muted)]" : "text-white/60"}`}>{t('hero.logoSubtitle')}</span>
          </a>

          {/* Right */}
          <div className="flex gap-4 items-center text-[11px] tracking-wider ml-auto">
            <div className="relative" ref={langRef}>
              {/* Desktop Button */}
              <button onClick={() => setLangOpen(!langOpen)} className={`hidden lg:flex items-center gap-2 hover:text-burgundy transition-all ${txm} uppercase font-bold py-1`}>
                {lang === "es" ? <MXFlag /> : <USFlag />}
                <span>{lang === "es" ? "ESP" : "ENG"}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mobile Toggle (Option A) */}
              <button 
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className={`lg:hidden flex items-center text-[10px] font-sans tracking-[0.2em] font-bold py-2 transition-colors ${scrolled ? "text-burgundy" : "text-white/90"}`}
              >
                {lang === 'es' ? 'ENG' : 'ESP'}
              </button>

              {/* Dropdown (Desktop only) */}
              <div className={`absolute top-full right-0 mt-2 w-40 bg-[var(--cream)]/90 backdrop-blur-md border border-[var(--border-color)] shadow-xl z-50 transition-all duration-300 origin-top-right hidden lg:block ${langOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
                <button onClick={() => { setLang("es"); setLangOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-burgundy hover:text-white transition-colors ${lang === "es" ? "text-burgundy font-bold" : "text-[var(--text)]"}`}>
                  <MXFlag /> Español
                </button>
                <button onClick={() => { setLang("en"); setLangOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-burgundy hover:text-white transition-colors ${lang === "en" ? "text-burgundy font-bold" : "text-[var(--text)]"}`}>
                  <USFlag /> English
                </button>
              </div>
            </div>
            <button onClick={() => onOpenBooking(GENERAL_FRESHA_URL)} className="hidden md:block bg-burgundy hover:bg-burgundy/90 text-white px-5 py-2 text-[10px] tracking-[0.15em] font-sans font-semibold shadow-lg shadow-[var(--burgundy)]/20 transition-colors uppercase">{t('nav.book')}</button>
          </div>
        </div>
      </div>

      {/* Row 2: Persistent Navigation Links */}
      <div className={`relative z-10 transition-all duration-300 hidden md:block ${scrolled ? "bg-white/80" : "bg-black/20"} backdrop-blur-md border-t border-white/5`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-6 md:gap-10 h-10 overflow-x-auto no-scrollbar">
          {NAV_LINKS.map(l => (
            <a key={l.key} href={l.href} className={`text-[9px] md:text-[11px] tracking-[0.15em] font-sans whitespace-nowrap hover:text-burgundy transition-colors ${scrolled ? "text-[var(--text)]" : "text-white/80"}`}>
              {t(`nav.${l.key}` as any) || l.key}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={images.hero} alt="DALI SPA" className="w-full h-full object-cover object-[80%_15%] md:object-[center_15%]" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-4 -translate-y-16 lg:-translate-y-24">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-[0.15em] font-light mb-3 italic animate-fade-in">Dali Spa</h1>
        <p className="text-white/70 text-sm md:text-base tracking-[0.3em] font-sans animate-fade-in-delay uppercase">{t('hero.subtitle')}</p>
      </div>
    </section>
  );
}



/* ═══════════════════════════════════════════════════════════════
   TREATMENT MENU
   ═══════════════════════════════════════════════════════════════ */
function TreatmentMenu({ onOpenBooking }: { onOpenBooking: (url: string) => void }) {
  const [cat, setCat] = useState("sc");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const { t } = useLanguage();
  const scrollRefDesktop = useRef<HTMLDivElement>(null);
  const scrollRefMobile = useRef<HTMLDivElement>(null);

  const filtered = treatments.filter(t => t.category === cat);
  const catImgs = CATEGORY_IMAGES[cat] || [images.saludCutanea];

  const scrollDesk = (d: "l" | "r") => scrollRefDesktop.current?.scrollBy({ left: d === "l" ? -200 : 200, behavior: "smooth" });
  const scrollMob = (d: "l" | "r") => scrollRefMobile.current?.scrollBy({ left: d === "l" ? -200 : 200, behavior: "smooth" });

  const renderCarousel = (isMobile: boolean) => (
    <div className="relative flex items-center justify-center gap-2 w-full">
      {isMobile && <button onClick={() => scrollMob("l")} className="shrink-0 w-8 h-8 rounded-full bg-transparent border border-gray-300 hover:border-burgundy text-[var(--navy)] hover:text-burgundy flex items-center justify-center transition-colors shadow-sm"><ChevronLeft size={16} /></button>}
      
      <div ref={isMobile ? scrollRefMobile : scrollRefDesktop} className="flex gap-2 lg:gap-3 overflow-x-auto scrollbar-hide scroll-smooth py-3 px-1 max-w-full lg:justify-center">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => { setCat(c); setExpandedId(null); setImgIdx(0); }}
            className={`shrink-0 px-5 py-2.5 text-[9px] lg:text-[10px] tracking-[0.15em] font-sans font-semibold uppercase transition-all whitespace-nowrap rounded-[4px] border ${cat === c ? "bg-burgundy text-white border-burgundy shadow-md scale-105" : "bg-transparent text-[var(--text-muted)] border-[var(--border-color)] hover:border-burgundy hover:text-burgundy"}`}>
            {t(`treatments.categories.${c}` as any)}
          </button>
        ))}
      </div>

      {isMobile && <button onClick={() => scrollMob("r")} className="shrink-0 w-8 h-8 rounded-full bg-transparent border border-gray-300 hover:border-burgundy text-[var(--navy)] hover:text-burgundy flex items-center justify-center transition-colors shadow-sm"><ChevronRight size={16} /></button>}
    </div>
  );

  return (
    <section id="tratamientos" className="py-20 lg:py-28 bg-gradient-to-b from-[var(--cream)] to-white">
      <Reveal className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif tracking-widest italic text-center mb-10 lg:mb-14">{t('menu.title')}</h2>
        
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Desktop Pill carousel (Hidden on Mobile) */}
          <div className="hidden lg:flex col-span-12 mb-4">
            {renderCarousel(false)}
          </div>

          {/* Image */}
          <div className="order-1 lg:order-none lg:col-span-5 relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-2xl shadow-2xl xl:max-w-md mx-auto w-full">
            <img src={catImgs[imgIdx]} alt={t(`treatments.categories.${cat}` as any)} className="w-full h-full object-cover object-top transition-all duration-700 luxury-hover" loading="lazy" />
          </div>

          {/* Mobile Pill carousel (Below Image, Hidden on Desktop) */}
          <div className="order-2 lg:hidden w-full">
            {renderCarousel(true)}
          </div>

          {/* List */}
          <div className="order-3 lg:order-none lg:col-span-7 space-y-2 w-full">
            {filtered.map(item => (
              <div key={item.id} className="border-b border-[var(--border-color)] group">
                <button onClick={() => setExpandedId(expandedId === item.id ? null : item.id)} className="w-full py-6 flex justify-between items-center text-left gap-4">
                  <div className="flex items-start gap-3">
                    {item.description && (
                      <span className={`mt-1 shrink-0 w-6 h-6 border flex items-center justify-center transition-all ${expandedId === item.id ? "bg-teal border-teal text-white shadow-md" : "border-gray-300 text-gray-400 group-hover:border-teal group-hover:text-teal"}`}>
                        <Plus size={14} className={`transition-transform ${expandedId === item.id ? "rotate-45" : ""}`} />
                      </span>
                    )}
                    <div>
                      <span className="text-base font-serif tracking-wider group-hover:text-teal transition-colors">
                        {t(`treatments.items.${item.id}.name` as any)}
                      </span>
                      {item.duration && <span className="text-xs text-[var(--text-muted)] ml-3">({item.duration.toLowerCase().replace(/ min/i, ` ${t('menu.duration' as any)}`)})</span>}
                    </div>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${expandedId === item.id ? "max-h-60 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="pl-9">
                    <p className="text-sm font-sans leading-relaxed text-[var(--text-muted)] tracking-wide mb-4">
                      {t(`treatments.items.${item.id}.description` as any)}
                    </p>
                    {item.price && <p className="text-sm font-sans text-burgundy font-semibold tracking-wider mb-4 text-base">${item.price} MXN</p>}
                    <button onClick={(e) => { e.stopPropagation(); onOpenBooking(GENERAL_FRESHA_URL); }} className="bg-burgundy hover:bg-burgundy/90 text-white px-6 py-3 tracking-[0.2em] text-[10px] font-sans font-semibold shadow-lg shadow-[var(--burgundy)]/20 transition-all uppercase active:scale-95">{t('nav.book')}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ReviewsSection() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (d: "l" | "r") => scrollRef.current?.scrollBy({ left: d === "l" ? -300 : 300, behavior: "smooth" });

  return (
    <section className="py-20 lg:py-28 bg-[var(--cream)]">
      <Reveal className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-serif tracking-wider text-center text-[var(--navy)] mb-10 md:mb-16">{t('reviews.title')}</h2>
        
        <div className="relative">
          {/* Mobile Navigation Arrows */}
          <button onClick={() => scroll("l")} className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--border-color)] text-[var(--navy)] hover:text-burgundy flex items-center justify-center transition-colors shadow-lg"><ChevronLeft size={20} /></button>
          <button onClick={() => scroll("r")} className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--border-color)] text-[var(--navy)] hover:text-burgundy flex items-center justify-center transition-colors shadow-lg"><ChevronRight size={20} /></button>

          <div ref={scrollRef} className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 text-left overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-2 px-1 scroll-smooth">
            {/* Review 1 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col justify-between shrink-0 w-[85vw] md:w-auto snap-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <div>
                <div className="flex gap-4 items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#5d463e] text-white flex items-center justify-center font-bold text-lg shrink-0">Z</div>
                  <div>
                    <p className="font-sans font-semibold text-[var(--navy)] leading-tight">{t('reviews.r1_name')}</p>
                    <p className="text-[10px] md:text-xs text-[var(--text-muted)] font-sans">{t('reviews.r1_meta')}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3 items-center">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-[10px] md:text-xs text-[var(--text-muted)] ml-2">{t('reviews.r1_time')}</span>
                </div>
                <p className="font-sans text-[var(--text)] leading-relaxed text-sm">{t('reviews.r1_text')}</p>
              </div>
            </div>
            {/* Review 2 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col justify-between shrink-0 w-[85vw] md:w-auto snap-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <div>
                <div className="flex gap-4 items-center mb-6">
                  <div className="w-12 h-12 rounded-full shadow-md overflow-hidden shrink-0"><img src="https://ui-avatars.com/api/?name=F&background=random" className="w-full h-full object-cover" alt="F" loading="lazy" /></div>
                  <div>
                    <p className="font-sans font-semibold text-[var(--navy)] leading-tight">{t('reviews.r2_name')}</p>
                    <p className="text-[10px] md:text-xs text-[var(--text-muted)] font-sans">{t('reviews.r2_meta')}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3 items-center">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-[10px] md:text-xs text-[var(--text-muted)] ml-2">{t('reviews.r2_time')}</span>
                </div>
                <p className="font-sans text-[var(--text)] leading-relaxed text-sm">{t('reviews.r2_text')}</p>
              </div>
            </div>
            {/* Review 3 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col justify-between shrink-0 w-[85vw] md:w-auto snap-center shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <div>
                <div className="flex gap-4 items-center mb-6">
                  <div className="w-12 h-12 rounded-full shadow-md overflow-hidden shrink-0"><img src="https://ui-avatars.com/api/?name=A&background=random" className="w-full h-full object-cover" alt="A" loading="lazy" /></div>
                  <div>
                    <p className="font-sans font-semibold text-[var(--navy)] leading-tight">{t('reviews.r3_name')}</p>
                    <p className="text-[10px] md:text-xs text-[var(--text-muted)] font-sans">{t('reviews.r3_meta')}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3 items-center">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-[10px] md:text-xs text-[var(--text-muted)] ml-2">{t('reviews.r3_time')}</span>
                </div>
                <p className="font-sans text-[var(--text)] leading-relaxed text-sm">{t('reviews.r3_text')}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════
   GALLERY
   ═══════════════════════════════════════════════════════════════ */
function GallerySection() {
  const { t } = useLanguage();
  return (
    <section id="galeria" className="py-20 lg:py-28 bg-[var(--cream)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 md:mb-16 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--navy)] tracking-wider">{t('gallery.title')}</h2>
          <div className="w-12 h-0.5 bg-burgundy mx-auto mt-6" />
        </Reveal>
      </div>

      {/* Infinite Ticker Container */}
      <div className="relative">
        <div className="flex gap-6 animate-ticker">
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <div key={i} className="shrink-0 w-[92vw] md:w-[600px] lg:w-[700px] aspect-[4/5] md:aspect-[4/3] overflow-hidden group rounded-2xl shadow-2xl border-4 border-white/50">
              <img
                src={img}
                alt={`Galeria ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NEW FOOTER SECTIONS: Contact, Map, Minimal Footer
   ═══════════════════════════════════════════════════════════════ */

function ContactInfoSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-navy py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Side: Image (replaces the form) */}
        <Reveal className="bg-cream rounded-2xl p-3 shadow-2xl relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden">
            <img src={images.waiting} alt={t('contactInfo.title')} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </Reveal>

        {/* Right Side: Info */}
        <Reveal className="space-y-10 text-white">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-serif tracking-wider text-cream">{t('contactInfo.title')}</h2>
            <div className="w-12 h-0.5 bg-burgundy" />
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-[12px] font-sans text-cream/70 tracking-[0.2em] uppercase">{t('contactInfo.hoursLabel')}</h3>
              <p className="text-sm font-sans tracking-wide leading-relaxed font-light text-white/90">
                {t('contactInfo.weekdays')} <br />
                {t('contactInfo.weekend')}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[12px] font-sans text-cream/70 tracking-[0.2em] uppercase">{t('contactInfo.socialLabel')}</h3>
              <p className="text-sm font-sans tracking-wide leading-relaxed font-light text-white/90 mb-4 flex items-center gap-2">
                <Phone size={14} className="text-burgundy" />
                <span>{t('contactInfo.phone')} <a href={`tel:${siteInfo.phoneRaw}`} className="hover:text-cream transition-colors">{siteInfo.phone}</a></span>
              </p>
              <div className="flex gap-3">
                <a href={siteInfo.social.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/5 hover:bg-burgundy text-white px-5 py-2.5 rounded-full text-xs transition-colors tracking-widest font-light border border-white/10 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white text-cream transition-colors"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  Facebook
                </a>
                <a href={siteInfo.social.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/5 hover:bg-burgundy text-white px-5 py-2.5 rounded-full text-xs transition-colors tracking-widest font-light border border-white/10 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white text-cream transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InteractiveMapSection() {
  const { t } = useLanguage();
  return (
    <section id="ubicacion" className="bg-cream py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <Reveal className="text-center">
          <h2 className="text-4xl lg:text-5xl font-serif text-[var(--navy)] tracking-wider">{t('map.title')}</h2>
          <p className="font-sans text-[var(--text-muted)] text-sm tracking-widest mt-4">{t('map.subtitle')}</p>
        </Reveal>

        <Reveal className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-white isolate">
          {/* Map Overlay Card */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 lg:left-12 bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl z-20 max-w-[320px] md:max-w-sm hidden md:block">
            <h3 className="text-2xl font-serif tracking-wider text-[var(--burgundy)] mb-6 flex items-center gap-3">
              <MapPin size={24} className="shrink-0" /> {siteInfo.address.split(',')[1]?.trim() || "Guadalupe"}
            </h3>
            <p className="font-sans text-sm tracking-wide text-gray-600 leading-relaxed mb-8">
              {siteInfo.address}
            </p>
            <a
              href={siteInfo.mapLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full text-center bg-burgundy hover:bg-burgundy/90 text-white font-sans text-xs tracking-[0.2em] uppercase py-3.5 px-6 rounded-full transition-all border border-transparent shadow-[0_4px_15px_-3px_rgba(99,11,17,0.4)]"
            >
              {t('map.viewExternal')}
            </a>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.9317578796857!2d-102.53746869999999!3d22.7655593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86824eca0610d625%3A0xae8c2b63b9e23152!2sDALI%20SPA!5e0!3m2!1ses-419!2smx!4v1775606047233!5m2!1ses-419!2smx"
            className="absolute inset-0 w-full h-full z-10"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </Reveal>

        {/* Mobile Info Card (Visible only on small screens below map) */}
        <div className="md:hidden bg-white p-8 rounded-2xl shadow-xl mt-4 text-center">
          <h3 className="text-xl font-serif tracking-wider text-[var(--burgundy)] mb-4">
            {siteInfo.address.split(',')[1]?.trim() || "Guadalupe"}
          </h3>
          <p className="font-sans text-sm tracking-wide text-gray-600 leading-relaxed mb-6">
            {siteInfo.address}
          </p>
          <a
            href={siteInfo.mapLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-center bg-burgundy text-white font-sans text-xs tracking-[0.2em] uppercase py-3 px-6 rounded-full"
          >
            {t('map.viewMaps')}
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { t } = useLanguage();
  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
  ];

  return (
    <section id="faq" className="bg-cream py-20 px-4 border-t border-[var(--border-color)]/20">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif text-[var(--navy)] tracking-wider">{t('faq.title')}</h2>
          <div className="w-12 h-0.5 bg-burgundy mx-auto mt-6" />
        </Reveal>
        <Reveal className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white p-6 rounded-xl shadow-sm border border-[var(--border-color)]/30 cursor-pointer overflow-hidden transition-all duration-300">
              <summary className="font-serif text-[var(--navy)] tracking-wider text-lg lg:text-xl flex justify-between items-center list-none outline-none">
                {faq.q}
                <span className="transition group-open:rotate-180 text-burgundy">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <div className="pt-4 font-sans text-sm text-[var(--text-muted)] tracking-wide leading-relaxed font-light mt-2 border-t border-[var(--border-color)]/10">
                {faq.a}
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function MinimalFooter() {
  const { t } = useLanguage();
  return (
    <footer className="bg-navy py-16 px-4 flex flex-col items-center justify-center border-t border-white/5">
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-4xl font-logo tracking-[0.4em] text-cream-uniform font-medium">DALI</h2>
        <p className="font-sans text-white/50 tracking-[0.3em] uppercase text-[10px] sm:text-xs">
          {t('hero.subtitle')}
        </p>
      </div>
      <div className="w-full max-w-5xl h-px bg-white/10 mb-8" />
      <p className="text-[10px] tracking-widest font-sans uppercase text-white/30 text-center">
        {t('footer.devBy')} <a href="https://devdiazlabs.com" target="_blank" rel="noreferrer" className="text-white hover:text-cream transition-colors font-medium ml-1">DevDiaz Labs.</a>
      </p>
    </footer>
  );
}

function FloatingBooking({ onOpen }: { onOpen: (url: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-[60] transition-all duration-500 transform ${visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-50 pointer-events-none"}`}>
      <button 
        onClick={() => onOpen(GENERAL_FRESHA_URL)} 
        className="group relative bg-burgundy text-white p-4 rounded-full shadow-[0_10px_25px_-5px_rgba(99,11,17,0.6)] flex items-center justify-center hover:bg-burgundy/90 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <CalendarDays size={24} />
        {/* Tooltip opcional o texto pequeño */}
        <span className="absolute right-full mr-4 bg-navy text-white text-[10px] py-2 px-4 rounded-lg tracking-widest uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10 whitespace-nowrap">
          Reservar Cita
        </span>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP (exported as single island)
   ═══════════════════════════════════════════════════════════════ */
export default function DaliSpa() {
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);

  return (
    <LanguageProvider>
      <Navbar onOpenBooking={setBookingUrl} />
      <Hero />
      <TreatmentMenu onOpenBooking={setBookingUrl} />
      <GallerySection />
      <ReviewsSection />
      <ContactInfoSection />
      <InteractiveMapSection />
      <FAQSection />
      <MinimalFooter />
      <FloatingBooking onOpen={setBookingUrl} />
      <FreshaModal url={bookingUrl} onClose={() => setBookingUrl(null)} />
    </LanguageProvider>
  );
}
