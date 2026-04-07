export const translations = {
  es: {
    nav: {
      about: "Nosotros",
      treatments: "Tratamientos",
      facilities: "Instalaciones",
      contact: "Contacto",
      book: "Reservar Cita"
    },
    hero: {
      subtitle: "Reconectando con tu paz interior en un santuario de lujo en",
      bookBtn: "Reservar Cita",
      exploreBtn: "Explorar Menú"
    },
    about: {
      title: "El Santuario",
      description: "Adéntrate en un mundo donde el tiempo se detiene y la tranquilidad reina. DALI SPA es un refugio exclusivo diseñado para rejuvenecer tu mente, cuerpo y espíritu a través de terapias holísticas y servicio de clase mundial.",
      signature: "La Experiencia DALI",
      cta1Title: "Descarga nuestro folleto de servicios y precios",
      cta1Btn: "DESCARGAR PDF",
      cta2Title: "Ponte en Contacto",
      cta2Btn: "CONTÁCTANOS",
      cta3Title: "El DALI Spa es galardonado con el premio AAA Four Diamond",
      cta3Btn: "RESERVA TU VISITA"
    },
    menu: {
      title: "Menú de Tratamientos",
      all: "Todos",
      massage: "Masajes",
      facial: "Faciales",
      body: "Corporales",
      salon: "Salón",
      duration: "MIN",
      addCart: "+ Agregar",
      inCart: "En Carrito",
      reserve: "Reservar Sesión"
    },
    reviews: {
      title: "¿Qué opinan de nosotros?",
      subtitle: "Una experiencia sublime que redefine el concepto de bienestar.",
      btn: "Leer Opiniones"
    },
    cart: {
      title: "CARRITO DALI",
      emptyTitle: "RESERVA TU SESIÓN",
      contactTitle: "Información de Contacto",
      fullName: "Nombre Completo",
      namePlaceholder: "Ej. María González",
      appointmentDetails: "Detalles de la Cita",
      date: "Fecha",
      hour: "Hora",
      people: "Personas",
      promo: "Código Promocional",
      promoPlaceholder: "Ingresar código",
      selectedTreatments: "Tratamientos Seleccionados",
      emptyMsg: "Explora nuestros paquetes de spa para agregar tratamientos.",
      subtotal: "Subtotal",
      proceedBtn: "PROCEDER A RESERVAR",
      searchBtn: "BUSCAR DISPONIBILIDAD",
      continueBtn: "SEGUIR EXPLORANDO"
    },
    footer: {
      subtitle: "Reconectando con tu paz interior en un santuario de lujo en",
      contact: "Contacto",
      quickLinks: "Enlaces Rápidos",
      treatments: "Tratamientos",
      facilities: "Instalaciones",
      giftCards: "Tarjetas de Regalo",
      membership: "Membresía",
      reviews: "Opiniones del Hotel",
      faq: "Preguntas Frecuentes",
      newsletter: "Boletín Informativo",
      newsletterDesc: "Suscríbete para ofertas exclusivas e inspiración de bienestar.",
      emailPlaceholder: "Tu Correo Electrónico",
      joinBtn: "Unirse",
      devBy: "Desarrollado por",
      privacy: "Política de Privacidad",
      terms: "Términos de Uso",
      sitemap: "Mapa del Sitio"
    }
  },
  en: {
    nav: {
      about: "About",
      treatments: "Treatments",
      facilities: "Facilities",
      contact: "Contact",
      book: "Book Session"
    },
    hero: {
      subtitle: "Reconnecting you with your inner peace in a sanctuary of luxury at",
      bookBtn: "Book Session",
      exploreBtn: "Explore Menu"
    },
    about: {
      title: "The Sanctuary",
      description: "Step into a realm where time stands still and tranquility reigns. DALI SPA is an exclusive haven designed to rejuvenate your mind, body, and spirit through holistic therapies and world-class service.",
      signature: "The DALI Experience",
      cta1Title: "Download our brochure of services and prices",
      cta1Btn: "DOWNLOAD PDF",
      cta2Title: "Contact Us",
      cta2Btn: "GET IN TOUCH",
      cta3Title: "The DALI Spa is the recipient of the AAA Four Diamond Award",
      cta3Btn: "BOOK YOUR VISIT"
    },
    menu: {
      title: "Treatment Menu",
      all: "All",
      massage: "Massages",
      facial: "Facials",
      body: "Body",
      salon: "Salon",
      duration: "MIN",
      addCart: "+ Add",
      inCart: "In Cart",
      reserve: "Book Session"
    },
    reviews: {
      title: "What people say",
      subtitle: "A sublime experience that redefines the concept of wellness.",
      btn: "Read Reviews"
    },
    cart: {
      title: "DALI CART",
      emptyTitle: "BOOK YOUR SESSION",
      contactTitle: "Contact Information",
      fullName: "Full Name",
      namePlaceholder: "E.g. Jane Doe",
      appointmentDetails: "Appointment Details",
      date: "Date",
      hour: "Hour",
      people: "People",
      promo: "Promo Code",
      promoPlaceholder: "Enter code",
      selectedTreatments: "Selected Treatments",
      emptyMsg: "Browse our spa packages to add treatments.",
      subtotal: "Subtotal",
      proceedBtn: "PROCEED TO RESERVATION",
      searchBtn: "SEARCH AVAILABILITY",
      continueBtn: "CONTINUE BROWSING"
    },
    footer: {
      subtitle: "Reconnecting you with your inner peace in a sanctuary of luxury at",
      contact: "Contact",
      quickLinks: "Quick Links",
      treatments: "Treatments",
      facilities: "Facilities",
      giftCards: "Gift Cards",
      membership: "Membership",
      reviews: "Hotel Reviews",
      faq: "FAQs",
      newsletter: "Newsletter",
      newsletterDesc: "Subscribe for exclusive DALI offers and wellness inspiration.",
      emailPlaceholder: "Your Email",
      joinBtn: "Join",
      devBy: "Developed by",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      sitemap: "Sitemap"
    }
  }
};

// Generic type to infer nested dot-notation keys
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof translations.es>;
