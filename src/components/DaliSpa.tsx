import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import type { CartItem, SpaService } from "../data";
import { images, treatments, CATEGORIES, CATEGORY_IMAGES, siteInfo } from "../data";
import {
  Moon, Sun, Menu, X, Plus, Minus, Trash2, ChevronLeft, ChevronRight,
  CalendarDays, Users, Tag, ShoppingBag, Star, Phone, Globe, User,
  ExternalLink, MapPin, Clock
} from "lucide-react";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";

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
   CART CONTEXT
   ═══════════════════════════════════════════════════════════════ */
interface CartCtx {
  items: CartItem[];
  addItem: (s: SpaService) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, q: number) => void;
  total: number;
  count: number;
  open: boolean;
  setOpen: (o: boolean) => void;
}
const Ctx = createContext<CartCtx | null>(null);
function useCart() { const c = useContext(Ctx); if (!c) throw new Error("useCart outside provider"); return c; }

function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const total = items.reduce((s, i) => s + (i.price || 0) * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const addItem = (svc: SpaService) => {
    setItems(p => { const e = p.find(i => i.id === svc.id); return e ? p.map(i => i.id === svc.id ? { ...i, quantity: i.quantity + 1 } : i) : [...p, { ...svc, quantity: 1 }]; });
    setOpen(true);
  };
  const removeItem = (id: string) => setItems(p => p.filter(i => i.id !== id));
  const updateQty = (id: string, q: number) => { if (q <= 0) return removeItem(id); setItems(p => p.map(i => i.id === id ? { ...i, quantity: q } : i)); };
  return <Ctx.Provider value={{ items, addItem, removeItem, updateQty, total, count, open, setOpen }}>{children}</Ctx.Provider>;
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  "DEALS", "DINING", "SUITES", "ALL INCLUSIVE PLAN", "GALLERY", "BLOG"
];
const MENU_L = [
  { l: "Resort" }, { l: "Deals" }, { l: "Suites" }, { l: "Dining" },
  { l: "Gallery" }, { l: "Things to Do" }, { l: "Spa", active: true }, { l: "Blog" },
];
const MENU_R = [
  { l: "Travel Agents" }, { l: "Live Cam" }, { l: "Exclusive Benefits" },
  { l: "Villa La Valencia", badge: "New Resort" }, { l: "All Inclusive Plan" }, { l: "Weddings" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { setOpen } = useCart();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const toggleDark = useCallback(() => {
    setDark(p => { const n = !p; document.documentElement.classList.toggle("dark", n); return n; });
  }, []);

  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; }, [menuOpen]);

  const tx = scrolled ? "text-[var(--text)]" : "text-white";
  const txm = scrolled ? "text-[var(--text-muted)]" : "text-white/70";

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[var(--cream)] shadow-md" : "bg-black/70 backdrop-blur-sm"}`}>
        {/* Row 1 */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-10">
            <div className="hidden lg:flex gap-5 items-center text-[11px] tracking-wider">
              <a href="#" className={`flex items-center gap-1.5 hover:text-teal transition-colors ${txm}`}>
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> Live Cam
              </a>
              <button onClick={toggleDark} className={`flex items-center gap-1.5 hover:text-teal transition-colors ${txm}`}>
                {dark ? <Sun size={14} /> : <Moon size={14} />} Dark Mode
                <span className={`w-8 h-4 rounded-full relative transition-colors ${dark ? "bg-teal" : "bg-white/30"}`}>
                  <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${dark ? "translate-x-4" : "translate-x-0.5"}`} />
                </span>
              </button>
              <a href="#" className={`flex items-center gap-1.5 hover:text-teal transition-colors ${txm}`}>
                <User size={12} /> Login
              </a>
            </div>
            {/* Logo */}
            <a href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className={`text-2xl lg:text-3xl font-serif tracking-[0.3em] font-medium leading-none transition-colors ${scrolled ? "text-teal" : "text-white"}`}>DALI</span>
              <span className={`text-[7px] lg:text-[8px] tracking-[0.5em] font-sans transition-colors ${scrolled ? "text-[var(--text-muted)]" : "text-white/60"}`}>SPA & WELLNESS</span>
            </a>
            {/* Right */}
            <div className="flex gap-3 items-center text-[11px] tracking-wider ml-auto">
              <button onClick={() => setLang(lang === "en" ? "es" : "en")} className={`hidden lg:flex items-center gap-1 hover:text-teal transition-colors ${txm} uppercase font-bold`}>
                <Globe size={14} /> {lang}
              </button>
              <a href={`tel:${siteInfo.phoneRaw}`} className={`hidden lg:flex items-center gap-1 hover:text-teal transition-colors ${txm}`}>
                <Phone size={12} /> {siteInfo.phone}
              </a>
              <button onClick={() => setOpen(true)} className="bg-teal hover:bg-teal/90 text-white px-5 py-2 text-[10px] tracking-[0.15em] font-sans font-semibold shadow-lg shadow-[var(--teal)]/20 transition-colors uppercase">{t('nav.book')}</button>
              <button onClick={() => setMenuOpen(!menuOpen)} className={`p-1 transition-colors ${tx}`} aria-label="Menu">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {/* Row 2 */}
        <div className={`hidden lg:block transition-all duration-300 ${scrolled ? "h-0 overflow-hidden opacity-0" : ""}`}>
          <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-10 h-10">
            {NAV_LINKS.map(l => <a key={l} href="#" className={`text-[11px] tracking-[0.15em] font-sans hover:text-teal transition-colors ${scrolled ? "text-[var(--text)]/80" : "text-white/80"}`}>{l}</a>)}
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div className={`fixed inset-0 z-[60] bg-[var(--cream)] transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="border-b border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto px-4 flex justify-end items-center h-10">
            <button onClick={() => setOpen(true)} className="bg-teal text-white px-5 py-2 text-[10px] tracking-[0.15em] font-sans font-semibold mr-3 uppercase">{t('nav.book')}</button>
            <button onClick={() => setMenuOpen(false)} className="text-[var(--text)] p-1"><X size={28} /></button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 overflow-y-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
          <div className="flex flex-col gap-6">
            {MENU_L.map(({ l, active }) => <a key={l} href="#" onClick={() => setMenuOpen(false)} className={`text-2xl lg:text-3xl font-serif tracking-widest hover:text-teal transition-colors ${active ? "text-teal" : ""}`}>{l}</a>)}
          </div>
          <div className="flex flex-col gap-6">
            {MENU_R.map(({ l, badge }) => (
              <div key={l} className="flex items-center gap-3">
                <a href="#" onClick={() => setMenuOpen(false)} className="text-2xl lg:text-3xl font-serif tracking-widest hover:text-teal transition-colors">{l}</a>
                {badge && <span className="text-[9px] bg-teal text-white px-2 py-0.5 tracking-wider uppercase">{badge}</span>}
              </div>
            ))}
          </div>
          <div className="hidden lg:block">
            <img src={images.resort} alt="DALI Resort" className="w-full aspect-[4/3] object-cover" loading="lazy" />
            <p className="text-[11px] tracking-widest text-[var(--text-muted)] mt-4">
              <a href={siteInfo.mapLink} target="_blank" rel="noreferrer" className="hover:text-teal transition-colors flex items-start gap-1"><MapPin size={12} className="mt-0.5 shrink-0" /> <span>{siteInfo.address}</span></a>
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 border-t border-[var(--border-color)] py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-6 text-[10px] tracking-widest text-[var(--text-muted)]">
            {["Why Book With Us?","Airport Pick up","Groceries2go","Hotel Reviews","Contact","FAQs"].map(l => <a key={l} href="#" className="hover:text-[var(--text)] transition-colors">{l}</a>)}
            <a href="#" className="ml-auto hover:text-[var(--text)] transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative h-[65vh] lg:h-[75vh] flex items-end justify-center overflow-hidden pb-20 lg:pb-28">
      <div className="absolute inset-0">
        <img src={images.hero} alt="DALI SPA" className="w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-[0.15em] font-light mb-3 italic animate-fade-in">Dali Spa</h1>
        <p className="text-white/70 text-sm md:text-base tracking-[0.2em] font-sans animate-fade-in-delay">{t('hero.subtitle')} Villa del Palmar Flamingos</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INFO SECTIONS
   ═══════════════════════════════════════════════════════════════ */
function InfoSections() {
  const { setOpen } = useCart();
  const { t } = useLanguage();
  return (
    <>
      {/* About */}
      <section className="py-20 lg:py-28 bg-[var(--cream)]">
        <Reveal className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <p className="text-sm font-sans leading-[1.9] text-[var(--text-muted)] tracking-wide text-justify">
            {t('about.description')}
          </p>
          <div className="aspect-[16/10] overflow-hidden">
            <img src={images.facilities} alt="Treatment Cabins" className="w-full h-full object-cover luxury-hover" loading="lazy" />
          </div>
        </Reveal>
      </section>
      {/* CTA trio */}
      <section className="grid grid-cols-1 md:grid-cols-3">
        {[
          { img: images.body, title: t('about.cta1Title'), cta: t('about.cta1Btn') },
          { img: images.facial, title: t('about.cta2Title'), cta: t('about.cta2Btn') },
          { img: images.hydrotherapy, title: t('about.cta3Title'), cta: t('about.cta3Btn'), action: () => setOpen(true) },
        ].map(({ img, title, cta, action }, i) => (
          <div key={i} className="relative group overflow-hidden min-h-[280px]">
            <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-12 lg:p-16 flex flex-col items-start justify-end h-full">
              <p className="text-2xl lg:text-3xl font-serif tracking-wider leading-snug text-white">{title}</p>
              <button onClick={action} className="mt-6 border border-white/40 text-white hover:bg-white hover:text-black tracking-[0.2em] text-[10px] px-6 py-3 font-sans uppercase transition-all">{cta}</button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TREATMENT MENU
   ═══════════════════════════════════════════════════════════════ */
function TreatmentMenu() {
  const [cat, setCat] = useState("BRIDAL PACKAGE");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const { addItem } = useCart();
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = treatments.filter(t => t.category === cat);
  const catImgs = CATEGORY_IMAGES[cat] || [images.massage];

  const scroll = (d: "l" | "r") => scrollRef.current?.scrollBy({ left: d === "l" ? -200 : 200, behavior: "smooth" });

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[var(--cream)] to-white">
      <Reveal className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif tracking-widest italic text-center mb-14">{t('menu.title')}</h2>
        {/* Pill carousel */}
        <div className="relative flex items-center gap-2 mb-14">
          <button onClick={() => scroll("l")} className="shrink-0 w-10 h-10 bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"><ChevronLeft size={20} className="text-gray-500" /></button>
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth py-1">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => { setCat(c); setExpandedId(null); setImgIdx(0); }}
                className={`shrink-0 px-5 py-2.5 text-[10px] tracking-[0.15em] font-sans font-semibold uppercase transition-all whitespace-nowrap ${cat === c ? "bg-teal text-white shadow-lg" : "bg-gray-700 text-white hover:bg-gray-600"}`}>
                {c}
              </button>
            ))}
          </div>
          <button onClick={() => scroll("r")} className="shrink-0 w-10 h-10 bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"><ChevronRight size={20} className="text-gray-500" /></button>
        </div>
        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={catImgs[imgIdx]} alt={cat} className="w-full h-full object-cover transition-all duration-700 luxury-hover" loading="lazy" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {catImgs.map((_, i) => <button key={i} onClick={() => setImgIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === imgIdx ? "bg-[var(--gold)] scale-125" : "bg-white/50 hover:bg-white/80"}`} />)}
            </div>
          </div>
          {/* List */}
          <div className="space-y-1">
            {filtered.map(item => (
              <div key={item.id} className="border-b border-[var(--border-color)] group">
                <button onClick={() => setExpandedId(expandedId === item.id ? null : item.id)} className="w-full py-5 flex justify-between items-center text-left gap-4">
                  <div className="flex items-start gap-3">
                    {item.description && (
                      <span className={`mt-1 shrink-0 w-6 h-6 border flex items-center justify-center transition-all ${expandedId === item.id ? "bg-teal border-teal text-white shadow-md" : "border-gray-300 text-gray-400 group-hover:border-teal group-hover:text-teal"}`}>
                        <Plus size={14} className={`transition-transform ${expandedId === item.id ? "rotate-45" : ""}`} />
                      </span>
                    )}
                    <div>
                      <span className="text-base font-serif tracking-wider group-hover:text-teal transition-colors">{item.name}</span>
                      {item.duration && <span className="text-xs text-[var(--text-muted)] ml-3">({item.duration.toLowerCase().replace(/ min/i, " minutes")})</span>}
                    </div>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${expandedId === item.id ? "max-h-60 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="pl-9">
                    <p className="text-sm font-sans leading-relaxed text-[var(--text-muted)] tracking-wide mb-4">{item.description}</p>
                    {item.price && <p className="text-sm font-sans text-teal font-semibold tracking-wider mb-4 text-base">${item.price} USD</p>}
                    <button onClick={(e) => { e.stopPropagation(); addItem({ ...item, imageUrl: catImgs[0] }); }} className="bg-teal hover:bg-teal/90 text-white px-6 py-3 tracking-[0.2em] text-[10px] font-sans font-semibold shadow-lg shadow-[var(--teal)]/20 transition-all uppercase active:scale-95">{t('menu.addCart')}</button>
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

/* ═══════════════════════════════════════════════════════════════
   TRIPADVISOR
   ═══════════════════════════════════════════════════════════════ */
function Tripadvisor() {
  const { t } = useLanguage();
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[var(--teal)]/5 to-[var(--cream)]">
      <Reveal className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-2xl md:text-3xl font-serif italic text-teal tracking-wider mb-10 leading-relaxed">{t('reviews.title')}</p>
        <p className="text-base font-serif italic text-[var(--text)]/80 leading-[1.9] mb-8">{t('reviews.subtitle')}</p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">RE</div>
          <div className="text-left"><span className="text-sm font-sans font-semibold">Rick Ellerbeck</span><span className="text-xs text-[var(--text-muted)] ml-2">From Tripadvisor</span></div>
        </div>
        <div className="flex justify-center gap-0.5 mb-8">{[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />)}</div>
        <button className="border border-[var(--text)]/30 px-10 py-3 tracking-[0.2em] text-[10px] font-sans uppercase hover:bg-[var(--text)] hover:text-[var(--cream)] transition-all active:scale-95">{t('reviews.btn')}</button>
        <div className="flex justify-center gap-5 mt-12">
          <a href={siteInfo.social.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[var(--text)]/20 flex items-center justify-center text-[var(--text)]/60 hover:text-teal hover:border-teal transition-all hover:-translate-y-1" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href={siteInfo.social.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[var(--text)]/20 flex items-center justify-center text-[var(--text)]/60 hover:text-teal hover:border-teal transition-all hover:-translate-y-1" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CART DRAWER
   ═══════════════════════════════════════════════════════════════ */
function CartDrawer() {
  const { items, removeItem, updateQty, total, count, open, setOpen } = useCart();
  const { t } = useLanguage();
  const [name, setName] = useState(""); const [date, setDate] = useState("");
  const [hour, setHour] = useState("10:00 AM"); const [people, setPeople] = useState(1);
  const [promo, setPromo] = useState("");
  const has = items.length > 0;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-[70] backdrop-blur-sm" onClick={() => setOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-[var(--cream)] z-[80] shadow-2xl flex flex-col transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-color)] flex justify-between items-center">
          <h2 className="text-xl font-serif tracking-widest text-teal flex items-center gap-2"><ShoppingBag size={18} /> {has ? `${t('cart.title')} (${count})` : t('cart.emptyTitle')}</h2>
          <button onClick={() => setOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text)]"><X size={20} /></button>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-[10px] tracking-[0.3em] font-sans text-[var(--text-muted)] uppercase font-semibold flex items-center gap-2"><User size={14} /> {t('cart.contactTitle')}</h3>
            <div><label className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase block mb-1">{t('cart.fullName')}</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('cart.namePlaceholder')} className="w-full border border-[var(--border-color)] bg-transparent px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-teal transition-colors placeholder:text-[var(--text-muted)]/40" /></div>
          </div>
          <div className="space-y-4">
            <h3 className="text-[10px] tracking-[0.3em] font-sans text-[var(--text-muted)] uppercase font-semibold flex items-center gap-2"><CalendarDays size={14} /> {t('cart.appointmentDetails')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase block mb-1">{t('cart.date')}</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-[var(--border-color)] bg-transparent px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-teal transition-colors" /></div>
              <div>
                <label className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase block mb-1">{t('cart.hour')}</label>
                <select value={hour} onChange={e => setHour(e.target.value)} className="w-full border border-[var(--border-color)] bg-transparent px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-teal transition-colors appearance-none">
                  {["10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM"].map(h => <option key={h} value={h} className="text-black">{h}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase block mb-1 flex items-center gap-1"><Users size={12} /> {t('cart.people')}</label>
                <div className="flex items-center border border-[var(--border-color)]"><button onClick={() => setPeople(Math.max(1,people-1))} className="px-3 py-2 text-[var(--text-muted)] hover:text-teal"><Minus size={12} /></button><span className="flex-1 text-center text-xs">{people}</span><button onClick={() => setPeople(people+1)} className="px-3 py-2 text-[var(--text-muted)] hover:text-teal"><Plus size={12} /></button></div>
              </div>
              <div><label className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase block mb-1 flex items-center gap-1"><Tag size={12} /> {t('cart.promo')}</label><input type="text" value={promo} onChange={e => setPromo(e.target.value)} placeholder={t('cart.promoPlaceholder')} className="w-full border border-[var(--border-color)] bg-transparent px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-teal transition-colors placeholder:text-[var(--text-muted)]/40" /></div>
            </div>
          </div>
          {has && <div className="border-t border-[var(--border-color)]" />}
          {has && (
            <div className="space-y-5">
              <h3 className="text-[10px] tracking-[0.3em] font-sans text-[var(--text-muted)] uppercase font-semibold">{t('cart.selectedTreatments')}</h3>
              {items.map(item => (
                <div key={item.id} className="flex gap-3 group">
                  <div className="w-16 h-20 bg-gray-200 overflow-hidden shrink-0">{item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />}</div>
                  <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                    <div><div className="flex justify-between items-start gap-2"><h4 className="text-xs font-serif tracking-wider uppercase truncate">{item.name}</h4><button onClick={() => removeItem(item.id)} className="text-[var(--text-muted)] hover:text-red-500 transition-colors shrink-0"><Trash2 size={12} /></button></div><p className="text-[9px] tracking-widest font-sans text-teal uppercase mt-0.5">{item.duration}</p></div>
                    <div className="flex justify-between items-end"><span className="text-xs font-sans tracking-wider font-semibold">${(item.price||0)*item.quantity} USD</span><div className="flex items-center border border-[var(--border-color)]"><button onClick={() => updateQty(item.id,item.quantity-1)} className="px-2 py-1 text-[var(--text-muted)]"><Minus size={10} /></button><span className="text-[10px] font-sans w-5 text-center">{item.quantity}</span><button onClick={() => updateQty(item.id,item.quantity+1)} className="px-2 py-1 text-[var(--text-muted)]"><Plus size={10} /></button></div></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!has && <p className="text-center text-xs text-[var(--text-muted)] tracking-widest py-8 uppercase">{t('cart.emptyMsg')}</p>}
        </div>
        {/* Footer */}
        <div className="p-5 border-t border-[var(--border-color)] space-y-3">
          {has && <div className="flex justify-between items-center"><span className="text-[10px] tracking-widest font-sans uppercase text-[var(--text-muted)]">{t('cart.subtotal')}</span><span className="text-lg font-sans tracking-widest font-semibold">${total} USD</span></div>}
          <button className="w-full bg-teal hover:bg-teal/90 text-white py-4 tracking-[0.2em] font-sans text-[10px] font-semibold shadow-xl shadow-[var(--teal)]/20 transition-colors uppercase">{has ? t('cart.proceedBtn') : t('cart.searchBtn')}</button>
          <button onClick={() => setOpen(false)} className="w-full text-[var(--text-muted)] font-sans text-[10px] tracking-widest uppercase py-2 hover:text-[var(--text)] transition-colors">{t('cart.continueBtn')}</button>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-navy text-white py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full h-px bg-teal mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="space-y-5">
            <a href="/" className="flex flex-col"><span className="text-3xl font-serif tracking-[0.3em] font-medium leading-none">DALI</span><span className="text-[8px] tracking-[0.5em] text-white/50">SPA & WELLNESS</span></a>
            <p className="text-[11px] leading-relaxed text-white/50 tracking-wider">{t('footer.subtitle')} Villa del Palmar Flamingos.</p>
            <div className="flex gap-3 pt-2">
              <a href={siteInfo.social.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href={siteInfo.social.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
          <div className="space-y-5">
            <h4 className="text-[11px] tracking-[0.3em] uppercase font-bold text-white/80">{t('footer.contact')}</h4>
            <ul className="text-[11px] space-y-3 text-white/50 tracking-wider leading-relaxed">
              <li><a href={`tel:${siteInfo.phoneRaw}`} className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={12} /> {siteInfo.phone}</a></li>
              <li><a href={siteInfo.mapLink} target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-white transition-colors"><MapPin size={12} className="mt-1 shrink-0" /> <span className="leading-tight">{siteInfo.address}</span></a></li>
              <li className="flex items-start gap-2"><Clock size={12} className="mt-1 shrink-0" /> <span className="leading-tight">{siteInfo.schedule.weekdays}<br/>{siteInfo.schedule.weekend}</span></li>
            </ul>
          </div>
          <div className="space-y-5">
            <h4 className="text-[11px] tracking-[0.3em] uppercase font-bold text-white/80">{t('footer.quickLinks')}</h4>
            <ul className="text-[11px] space-y-3 text-white/50 tracking-wider uppercase">{[t('footer.treatments'),t('footer.facilities'),t('footer.giftCards'),t('footer.membership'),t('footer.reviews'),t('footer.faq')].map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}</ul>
          </div>
          <div className="space-y-5">
            <h4 className="text-[11px] tracking-[0.3em] uppercase font-bold text-white/80">{t('footer.newsletter')}</h4>
            <p className="text-[11px] leading-relaxed text-white/50 tracking-wider">{t('footer.newsletterDesc')}</p>
            <div className="relative pt-1"><input type="email" placeholder={t('footer.emailPlaceholder')} className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-[11px] focus:outline-none focus:border-white/60 transition-colors text-white placeholder:text-white/25 tracking-wider" /><button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] tracking-widest uppercase font-bold text-white/60 hover:text-white transition-colors mt-1">{t('footer.joinBtn')}</button></div>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-white/10 flex justify-center items-center text-[9px] tracking-widest text-white/30 uppercase gap-4">
          <p>
            {t('footer.devBy')}{" "}
            <a href="https://devdiazlabs.com" target="_blank" rel="noreferrer" className="relative inline-block text-white/60 hover:text-white transition-colors group">
              DevDiaz Labs
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal transition-all duration-300 group-hover:w-full"></span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP (exported as single island)
   ═══════════════════════════════════════════════════════════════ */
export default function DaliSpa() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Navbar />
        <Hero />
        <InfoSections />
        <TreatmentMenu />
        <Tripadvisor />
        <Footer />
        <CartDrawer />
      </CartProvider>
    </LanguageProvider>
  );
}
