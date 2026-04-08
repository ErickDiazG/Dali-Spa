import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import type { CartItem, SpaService } from "../data";
import { images, treatments, CATEGORIES, CATEGORY_IMAGES, siteInfo, galleryImages } from "../data";
import {
  Menu, X, Plus, Minus, Trash2, ChevronLeft, ChevronRight, ChevronDown,
  CalendarDays, Users, Tag, ShoppingBag, Star, Phone, Globe, User,
  ExternalLink, MapPin, Clock, Circle
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
  { name: "INICIO", href: "#" },
  { name: "EXPERIENCIA", href: "#experiencia" },
  { name: "TRATAMIENTOS", href: "#tratamientos" },
  { name: "GALERÍA", href: "#galeria" },
  { name: "UBICACIÓN", href: "#ubicacion" },
  { name: "FAQ", href: "#faq" }
];
const MENU_L = [];
const MENU_R = [];

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

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { setOpen } = useCart();
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
            <span className={`text-[7px] lg:text-[8px] tracking-[0.5em] font-sans transition-colors ${scrolled ? "text-[var(--text-muted)]" : "text-white/60"}`}>BELLEZA Y RELAJACIÓN</span>
          </a>

          {/* Right */}
          <div className="flex gap-4 items-center text-[11px] tracking-wider ml-auto">
            <div className="relative" ref={langRef}>
              <button onClick={() => setLangOpen(!langOpen)} className={`hidden lg:flex items-center gap-2 hover:text-burgundy transition-all ${txm} uppercase font-bold py-1`}>
                {lang === "es" ? <MXFlag /> : <USFlag />}
                <span>{lang === "es" ? "ESP" : "ENG"}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {/* Dropdown */}
              <div className={`absolute top-full right-0 mt-2 w-40 bg-[var(--cream)]/90 backdrop-blur-md border border-[var(--border-color)] shadow-xl z-50 transition-all duration-300 origin-top-right ${langOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
                <button onClick={() => { setLang("es"); setLangOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-burgundy hover:text-white transition-colors ${lang === "es" ? "text-burgundy font-bold" : "text-[var(--text)]"}`}>
                  <MXFlag /> Español
                </button>
                <button onClick={() => { setLang("en"); setLangOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-burgundy hover:text-white transition-colors ${lang === "en" ? "text-burgundy font-bold" : "text-[var(--text)]"}`}>
                  <USFlag /> Inglés
                </button>
              </div>
            </div>
            <button onClick={() => setOpen(true)} className="bg-burgundy hover:bg-burgundy/90 text-white px-5 py-2 text-[10px] tracking-[0.15em] font-sans font-semibold shadow-lg shadow-[var(--burgundy)]/20 transition-colors uppercase">{t('nav.book')}</button>
          </div>
        </div>
      </div>

      {/* Row 2: Persistent Navigation Links */}
      <div className={`relative z-10 transition-all duration-300 ${scrolled ? "bg-white/80" : "bg-black/20"} backdrop-blur-md border-t border-white/5`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-6 md:gap-10 h-10 overflow-x-auto no-scrollbar">
          {NAV_LINKS.map(l => (
            <a key={l.name} href={l.href} className={`text-[9px] md:text-[11px] tracking-[0.15em] font-sans whitespace-nowrap hover:text-burgundy transition-colors ${scrolled ? "text-[var(--text)]" : "text-white/80"}`}>
              {l.name}
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
        <img src={images.hero} alt="DALI SPA" className="w-full h-full object-cover object-[center_15%]" fetchPriority="high" />
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
   INFO SECTIONS
   ═══════════════════════════════════════════════════════════════ */
function InfoSections() {
  const { setOpen } = useCart();
  const { t } = useLanguage();
  return (
    <>
      {/* About */}
      <section id="experiencia" className="py-20 lg:py-28 bg-[var(--cream)]">
        <Reveal className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <p className="text-sm font-sans leading-[1.9] text-[var(--text-muted)] tracking-wide text-justify">
            {t('about.description')}
          </p>
          <div className="aspect-[16/10] overflow-hidden">
            <img src={images.skin} alt="Skin Treatment" className="w-full h-full object-cover luxury-hover" loading="lazy" />
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TREATMENT MENU
   ═══════════════════════════════════════════════════════════════ */
function TreatmentMenu() {
  const [cat, setCat] = useState("Salud Cutánea");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const { addItem } = useCart();
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = treatments.filter(t => t.category === cat);
  const catImgs = CATEGORY_IMAGES[cat] || [images.saludCutanea];

  const scroll = (d: "l" | "r") => scrollRef.current?.scrollBy({ left: d === "l" ? -200 : 200, behavior: "smooth" });

  return (
    <section id="tratamientos" className="py-20 lg:py-28 bg-gradient-to-b from-[var(--cream)] to-white">
      <Reveal className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif tracking-widest italic text-center mb-14">{t('menu.title')}</h2>
        {/* Pill carousel */}
        <div className="relative flex items-center gap-2 mb-14">
          <button onClick={() => scroll("l")} className="shrink-0 w-10 h-10 bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"><ChevronLeft size={20} className="text-gray-500" /></button>
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth py-1">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => { setCat(c); setExpandedId(null); setImgIdx(0); }}
                className={`shrink-0 px-5 py-2.5 text-[10px] tracking-[0.15em] font-sans font-semibold uppercase transition-all whitespace-nowrap ${cat === c ? "bg-burgundy text-white shadow-lg" : "bg-gray-700 text-white hover:bg-gray-600"}`}>
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
                    {item.price && <p className="text-sm font-sans text-burgundy font-semibold tracking-wider mb-4 text-base">${item.price} USD</p>}
                    <button onClick={(e) => { e.stopPropagation(); addItem({ ...item, imageUrl: catImgs[0] }); }} className="bg-burgundy hover:bg-burgundy/90 text-white px-6 py-3 tracking-[0.2em] text-[10px] font-sans font-semibold shadow-lg shadow-[var(--burgundy)]/20 transition-all uppercase active:scale-95">{t('menu.addCart')}</button>
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
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[var(--burgundy)]/5 to-[var(--cream)]">
      <Reveal className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-2xl md:text-3xl font-serif italic text-burgundy tracking-wider mb-10 leading-relaxed">{t('reviews.title')}</p>
        <p className="text-base font-serif italic text-[var(--text)]/80 leading-[1.9] mb-8">{t('reviews.subtitle')}</p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">RE</div>
          <div className="text-left"><span className="text-sm font-sans font-semibold">Rick Ellerbeck</span><span className="text-xs text-[var(--text-muted)] ml-2">From Tripadvisor</span></div>
        </div>
        <div className="flex justify-center gap-0.5 mb-8">{[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />)}</div>
        <button className="border border-[var(--text)]/30 px-10 py-3 tracking-[0.2em] text-[10px] font-sans uppercase hover:bg-[var(--text)] hover:text-[var(--cream)] transition-all active:scale-95">{t('reviews.btn')}</button>
        <div className="flex justify-center gap-5 mt-12">
          <a href={siteInfo.social.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[var(--text)]/20 flex items-center justify-center text-[var(--text)]/60 hover:text-burgundy hover:border-burgundy transition-all hover:-translate-y-1" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href={siteInfo.social.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[var(--text)]/20 flex items-center justify-center text-[var(--text)]/60 hover:text-burgundy hover:border-burgundy transition-all hover:-translate-y-1" aria-label="Instagram">
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
          <h2 className="text-xl font-serif tracking-widest text-burgundy flex items-center gap-2"><ShoppingBag size={18} /> {has ? `${t('cart.title')} (${count})` : t('cart.emptyTitle')}</h2>
          <button onClick={() => setOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text)]"><X size={20} /></button>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-[10px] tracking-[0.3em] font-sans text-[var(--text-muted)] uppercase font-semibold flex items-center gap-2"><User size={14} /> {t('cart.contactTitle')}</h3>
            <div><label className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase block mb-1">{t('cart.fullName')}</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('cart.namePlaceholder')} className="w-full border border-[var(--border-color)] bg-transparent px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-burgundy transition-colors placeholder:text-[var(--text-muted)]/40" /></div>
          </div>
          <div className="space-y-4">
            <h3 className="text-[10px] tracking-[0.3em] font-sans text-[var(--text-muted)] uppercase font-semibold flex items-center gap-2"><CalendarDays size={14} /> {t('cart.appointmentDetails')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase block mb-1">{t('cart.date')}</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-[var(--border-color)] bg-transparent px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-burgundy transition-colors" /></div>
              <div>
                <label className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase block mb-1">{t('cart.hour')}</label>
                <select value={hour} onChange={e => setHour(e.target.value)} className="w-full border border-[var(--border-color)] bg-transparent px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-burgundy transition-colors appearance-none">
                  {["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"].map(h => <option key={h} value={h} className="text-black">{h}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase block mb-1 flex items-center gap-1"><Users size={12} /> {t('cart.people')}</label>
                <div className="flex items-center border border-[var(--border-color)]"><button onClick={() => setPeople(Math.max(1, people - 1))} className="px-3 py-2 text-[var(--text-muted)] hover:text-burgundy"><Minus size={12} /></button><span className="flex-1 text-center text-xs">{people}</span><button onClick={() => setPeople(people + 1)} className="px-3 py-2 text-[var(--text-muted)] hover:text-burgundy"><Plus size={12} /></button></div>
              </div>
              <div><label className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase block mb-1 flex items-center gap-1"><Tag size={12} /> {t('cart.promo')}</label><input type="text" value={promo} onChange={e => setPromo(e.target.value)} placeholder={t('cart.promoPlaceholder')} className="w-full border border-[var(--border-color)] bg-transparent px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-burgundy transition-colors placeholder:text-[var(--text-muted)]/40" /></div>
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
                    <div><div className="flex justify-between items-start gap-2"><h4 className="text-xs font-serif tracking-wider uppercase truncate">{item.name}</h4><button onClick={() => removeItem(item.id)} className="text-[var(--text-muted)] hover:text-red-500 transition-colors shrink-0"><Trash2 size={12} /></button></div><p className="text-[9px] tracking-widest font-sans text-burgundy uppercase mt-0.5">{item.duration}</p></div>
                    <div className="flex justify-between items-end"><span className="text-xs font-sans tracking-wider font-semibold">${(item.price || 0) * item.quantity} USD</span><div className="flex items-center border border-[var(--border-color)]"><button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2 py-1 text-[var(--text-muted)]"><Minus size={10} /></button><span className="text-[10px] font-sans w-5 text-center">{item.quantity}</span><button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2 py-1 text-[var(--text-muted)]"><Plus size={10} /></button></div></div>
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
          <button className="w-full bg-burgundy hover:bg-burgundy/90 text-white py-4 tracking-[0.2em] font-sans text-[10px] font-semibold shadow-xl shadow-[var(--burgundy)]/20 transition-colors uppercase">{has ? t('cart.proceedBtn') : t('cart.searchBtn')}</button>
          <button onClick={() => setOpen(false)} className="w-full text-[var(--text-muted)] font-sans text-[10px] tracking-widest uppercase py-2 hover:text-[var(--text)] transition-colors">{t('cart.continueBtn')}</button>
        </div>
      </div>
    </>
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
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--navy)] tracking-wider">Galería</h2>
          <div className="w-12 h-0.5 bg-burgundy mx-auto mt-6" />
        </Reveal>
      </div>

      {/* Infinite Ticker Container */}
      <div className="relative">
        <div className="flex gap-4 animate-ticker hover:pause-animation">
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <div key={i} className="shrink-0 w-[75vw] md:w-[40vw] lg:w-[25vw] aspect-[4/5] overflow-hidden group rounded-lg shadow-lg">
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

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 0.5rem)); }
        }
        .animate-ticker {
          width: fit-content;
          animation: ticker 30s linear infinite;
          padding: 0 1rem;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
        @media (min-width: 1024px) {
          .animate-ticker {
            animation-duration: 45s;
          }
        }
      `}</style>
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
        <Reveal className="bg-cream rounded-xl p-3 shadow-2xl relative">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img src={images.waiting} alt="Te Esperamos" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </Reveal>

        {/* Right Side: Info */}
        <Reveal className="space-y-10 text-white">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-serif tracking-wider text-cream">Te estamos esperando</h2>
            <div className="w-12 h-0.5 bg-burgundy" />
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-[12px] font-sans text-cream/70 tracking-[0.2em] uppercase">Horarios de Atención</h3>
              <p className="text-sm font-sans tracking-wide leading-relaxed font-light text-white/90">
                {siteInfo.schedule.weekdays} <br />
                {siteInfo.schedule.weekend}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[12px] font-sans text-cream/70 tracking-[0.2em] uppercase">Contacto y Redes Sociales</h3>
              <p className="text-sm font-sans tracking-wide leading-relaxed font-light text-white/90 mb-4 flex items-center gap-2">
                <Phone size={14} className="text-burgundy" />
                <span>Teléfono: <a href={`tel:${siteInfo.phoneRaw}`} className="hover:text-cream transition-colors">{siteInfo.phone}</a></span>
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
  return (
    <section id="ubicacion" className="bg-cream py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <Reveal className="text-center">
          <h2 className="text-4xl lg:text-5xl font-serif text-[var(--navy)] tracking-wider">Encuéntranos</h2>
          <p className="font-sans text-[var(--text-muted)] text-sm tracking-widest mt-4">Visítanos en nuestra ubicación</p>
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
              Ver en Google Maps
            </a>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.9317578796857!2d-102.53746869999999!3d22.7655593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86824eca0610d625%3A0xae8c2b63b9e23152!2sDALI%20SPA!5e0!3m2!1ses-419!2smx!4v1775606047233!5m2!1ses-419!2smx"
            className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 z-10"
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
            Ver en Maps
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "¿Con cuánta anticipación debo llegar?", a: "Le sugerimos llegar al menos 15 minutos antes de su cita reservada para permitir el tiempo suficiente para el proceso de registro, cambiar su vestimenta y comenzar a relajarse adecuadamente en nuestras instalaciones." },
    { q: "¿Qué debo llevar?", a: "Le proporcionaremos una bata limpia, toallas y amenidades exclusivas de baño. Sin embargo, si desea utilizar las instalaciones de hidroterapia con mayor comodidad, le sugerimos traer su propio traje de baño." },
    { q: "¿Cuentan con estacionamiento?", a: "Sí, contamos con estacionamiento privado y seguro para todos nuestros huéspedes durante la duración de sus tratamientos en el spa." },
  ];

  return (
    <section id="faq" className="bg-cream py-20 px-4 border-t border-[var(--border-color)]/20">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif text-[var(--navy)] tracking-wider">Preguntas Frecuentes</h2>
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
        Desarrollado por <a href="https://devdiazlabs.com" target="_blank" rel="noreferrer" className="text-white hover:text-cream transition-colors font-medium ml-1">DevDiaz Labs.</a>
      </p>
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
        <GallerySection />
        <ContactInfoSection />
        <InteractiveMapSection />
        <FAQSection />
        <MinimalFooter />
        <CartDrawer />
      </CartProvider>
    </LanguageProvider>
  );
}
