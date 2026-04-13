import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CalendarDays, ExternalLink, Tag } from "lucide-react";
import { FULL_MENU, CATEGORY_CONFIG, GENERAL_FRESHA_URL } from "../data";
import FreshaModal from "./FreshaModal";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";

export default function MenuCompleto() {
  return (
    <LanguageProvider>
      <MenuContent />
    </LanguageProvider>
  );
}

function MenuContent() {
  const { lang, setLang, t } = useLanguage();
  const categories = Object.keys(FULL_MENU);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      for (const key of categories) {
        const el = document.getElementById(`section-${key}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.5) {
            setActiveCategory(key);
            break;
          }
          if (rect.bottom > window.innerHeight * 0.5 && rect.top < 0) {
            setActiveCategory(key);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (key: string) => {
    const el = document.getElementById(`section-${key}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[var(--cream)]">

      {/* ── SPLIT SCREEN ────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* LEFT — sticky image (desktop only) */}
        <div className="hidden lg:block lg:w-[42%] h-screen sticky top-0 overflow-hidden bg-[var(--navy)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/80 via-black/20 to-transparent z-10" />
              <img
                src={CATEGORY_CONFIG[activeCategory]?.image}
                alt={CATEGORY_CONFIG[activeCategory]?.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Category label overlay */}
          <div className="absolute bottom-12 left-12 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <p className="text-[var(--burgundy)] text-[10px] tracking-[0.4em] uppercase font-sans font-bold mb-2">
                  Menú de Servicios
                </p>
                <h2 className="text-white font-serif text-3xl italic tracking-wide">
                  {CATEGORY_CONFIG[activeCategory]?.title}
                </h2>
                <div className="w-10 h-[2px] bg-[var(--burgundy)] mt-4" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Logo watermark */}
          <div className="absolute top-8 left-10 z-20">
            <a href="/" className="flex items-center gap-3 group">
              <span className="text-white/60 font-logo text-2xl tracking-[0.4em] group-hover:text-white transition-colors">DALI</span>
            </a>
          </div>
        </div>

        {/* RIGHT — scrollable content */}
        <div className="w-full lg:w-[58%] min-h-screen bg-[var(--cream)]">

          {/* Sticky header (mobile + desktop) */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[var(--border-color)]/30 px-4 md:px-10 py-3 lg:py-4">
            <div className="flex items-center justify-between gap-4">
              <a
                href="/"
                className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--burgundy)] transition-colors group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </a>

              {/* Mobile Title - Logo Centered (MATCH HOME PAGE STYLE) */}
              <div className="lg:hidden flex flex-col items-center flex-1">
                <span className="text-2xl font-logo tracking-[0.5em] font-medium text-charcoal leading-none">DALI</span>
                <span className="text-[7px] tracking-[0.4em] font-sans text-[var(--text-muted)] uppercase mt-1">
                  {t('hero.logoSubtitle')}
                </span>
              </div>

              {/* Desktop Category pills (ONLY DESKTOP) */}
              <div className="hidden lg:flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {categories.map((key) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`shrink-0 text-[10px] tracking-[0.12em] font-sans font-semibold uppercase px-4 py-2 rounded-full border transition-all ${
                      activeCategory === key
                        ? "bg-[var(--burgundy)] text-white border-[var(--burgundy)]"
                        : "text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--burgundy)] hover:text-[var(--burgundy)] bg-white/50"
                    }`}
                  >
                    {CATEGORY_CONFIG[key]?.title.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Desktop Booking Button (ONLY DESKTOP) */}
              <button
                onClick={() => setBookingUrl(GENERAL_FRESHA_URL)}
                className="hidden lg:flex items-center gap-2 bg-[var(--burgundy)] text-white px-5 py-2.5 text-[10px] tracking-[0.2em] font-sans font-semibold uppercase shadow-md hover:bg-[var(--burgundy)]/90 transition-colors"
              >
                <CalendarDays size={14} />
                <span>Reservar</span>
              </button>

              {/* Mobile Language Switcher (MATCH HOME PAGE STYLE) */}
              <button 
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="lg:hidden flex items-center text-[10px] font-sans tracking-[0.2em] font-bold py-2 text-burgundy transition-colors uppercase"
              >
                {lang === 'es' ? 'ENG' : 'ESP'}
              </button>
            </div>

            {/* Mobile Sticky Category Navigation (ONLY MOBILE) */}
            <div className="lg:hidden mt-4 overflow-x-auto no-scrollbar flex gap-2 pb-1 snap-x">
              {categories.map((key) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`shrink-0 px-4 py-2 rounded-full border text-[10px] uppercase tracking-widest font-sans font-extrabold transition-all snap-start ${
                    activeCategory === key
                      ? "bg-burgundy text-white border-burgundy shadow-md"
                      : "bg-white text-[var(--text-muted)] border-[var(--border-color)]"
                  }`}
                >
                  {CATEGORY_CONFIG[key]?.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 md:px-10 lg:px-14 pt-10 pb-24">

            {/* Page title area - Refined Hero for Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-14 xl:mb-20 pt-4 lg:pt-0"
            >
              <div className="lg:hidden mb-10 text-center">
                <div className="w-10 h-0.5 bg-burgundy mx-auto mb-6" />
                <p className="text-[var(--burgundy)] text-[10px] tracking-[0.4em] uppercase font-sans font-bold mb-4">
                  Dali Spa · Catálogo
                </p>
                <h1 className="font-serif text-5xl text-[var(--navy)] leading-tight italic">
                  Rituales & <br /> Servicios
                </h1>
                <p className="text-sm font-sans text-[var(--text-muted)] mt-6 max-w-xs mx-auto leading-relaxed font-light">
                  Una selección de tratamientos diseñados para tu bienestar absoluto.
                </p>
              </div>

              {/* Desktop Title (Unchanged) */}
              <div className="hidden lg:block">
                <p className="text-[var(--burgundy)] text-[10px] tracking-[0.4em] uppercase font-sans font-bold mb-3">
                  Catálogo Completo
                </p>
                <h1 className="font-serif text-4xl md:text-5xl text-[var(--navy)] leading-tight">
                  Rituales & Servicios
                </h1>
                <p className="text-sm font-sans text-[var(--text-muted)] mt-4 max-w-md leading-relaxed">
                  Selecciona cualquier servicio para reservarlo directamente desde nuestra agenda en Fresha.
                </p>
              </div>


            </motion.div>

            {/* Service Sections */}
            <div className="space-y-20">
              {categories.map((key) => {
                const services = FULL_MENU[key];
                const config = CATEGORY_CONFIG[key];
                return (
                  <section key={key} id={`section-${key}`} className="scroll-mt-24">

                    {/* Mobile image banner */}
                    <div className="lg:hidden mb-6 h-40 overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/30 z-10" />
                      <img 
                        src={config.image} 
                        alt={config.title} 
                        className="w-full h-full object-cover" 
                        style={{ 
                          objectPosition: key === 'depilacion_cera' ? 'center 20%' : 
                                         key === 'depilacion_laser' ? 'center 85%' : 'center'
                        }}
                      />
                      <div className="absolute bottom-3 left-4 z-20">
                        <h2 className="text-white font-serif text-xl italic">{config.title}</h2>
                      </div>
                    </div>

                    {/* Desktop section title */}
                    <h2 className="hidden lg:block font-serif text-2xl text-[var(--navy)] mb-8 relative">
                      {config.title}
                      <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[var(--burgundy)]" />
                    </h2>

                    {/* Service list */}
                    <div className="space-y-0">
                      {services.map((svc, idx) => (
                        <div
                          key={svc.id}
                          onClick={() => setBookingUrl(svc.bookingUrl || GENERAL_FRESHA_URL)}
                          className="group flex items-center justify-between py-4 border-b border-[var(--border-color)]/60 cursor-pointer hover:pl-3 transition-all duration-300 hover:border-[var(--burgundy)]/40"
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              {svc.isPackage && (
                                <span className="shrink-0 inline-flex items-center gap-1 bg-[var(--burgundy)]/10 border border-[var(--burgundy)]/20 text-[var(--burgundy)] text-[8px] font-sans font-bold tracking-widest uppercase px-2 py-0.5">
                                  <Tag size={9} /> Pack
                                </span>
                              )}
                              <span className="font-sans text-[var(--navy)] font-medium text-sm group-hover:text-[var(--burgundy)] transition-colors duration-300 leading-snug">
                                {svc.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] text-[var(--text-muted)] font-sans tracking-wide">{svc.duration}</span>
                              {svc.description && (
                                <span className="text-[9px] text-[var(--text-muted)]/70 font-sans italic hidden sm:block truncate max-w-xs">{svc.description}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className={`font-sans text-xs font-semibold tracking-wide ${svc.priceLabel?.includes('Ahorra') ? 'text-green-600' : svc.priceLabel === 'Gratis' || svc.priceLabel === 'Consultar' ? 'text-[var(--text-muted)]' : 'text-[var(--burgundy)]'}`}>
                              {svc.priceLabel}
                            </span>
                            <span className="hidden lg:block text-[var(--burgundy)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ExternalLink size={13} />
                            </span>
                            <div className="lg:hidden w-7 h-7 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] group-hover:bg-[var(--burgundy)] group-hover:text-white group-hover:border-[var(--burgundy)] transition-all duration-300">
                              <CalendarDays size={13} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 pt-10 border-t border-[var(--border-color)] flex flex-col items-center text-center gap-4">
              <p className="text-xs font-sans text-[var(--text-muted)] tracking-wide">¿No encuentras lo que buscas?</p>
              <a
                href={GENERAL_FRESHA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--burgundy)] text-white px-8 py-4 text-[10px] tracking-[0.25em] font-sans font-semibold uppercase shadow-lg hover:bg-[var(--burgundy)]/90 transition-colors"
              >
                <ExternalLink size={14} />
                Ver agenda completa en Fresha
              </a>
              <p className="text-[10px] font-sans text-[var(--text-muted)]/60 uppercase tracking-widest mt-2">
                Desarrollado por{" "}
                <a href="https://devdiazlabs.com" target="_blank" rel="noreferrer" className="hover:text-[var(--burgundy)] transition-colors">
                  DevDiaz Labs
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <FreshaModal url={bookingUrl} onClose={() => setBookingUrl(null)} />
    </div>
  );
}
