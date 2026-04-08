export const images = {
  hero: "/images/Dali-hero.webp",
  saludCutanea: "/images/salud-cutanea.jpg",
  advancedCare: "/images/advanced-care.jpg",
  renovacion: "/images/renovación.jpg",
  body: "/images/body.jpg",
  nailsBeauty: "/images/nails-and-beauty.jpg",
  skin: "/images/skin.webp",
  waiting: "/images/Te esperamos.webp",
};

export const galleryImages = [
  "/images/galeria1.webp",
  "/images/galeria2.webp",
  "/images/galeria3.webp",
  "/images/galeria4.webp",
  "/images/galeria5.webp",
  "/images/galeria6.webp",
];

export interface SpaService {
  id: string;
  category: string;
  name: string;
  description: string;
  duration: string;
  price?: number;
  imageUrl?: string;
}

export interface CartItem extends SpaService {
  quantity: number;
}

export const treatments: SpaService[] = [
  // Salud Cutánea
  { id: "sc1", category: "Salud Cutánea", name: "Limpieza Profunda", description: "Tratamiento esencial para purificar la piel, eliminando impurezas y células muertas para revelar un rostro fresco y luminoso.", duration: "50 MIN" },
  { id: "sc2", category: "Salud Cutánea", name: "Tratamiento Antiacné", description: "Cuidado especializado para pieles propensas al acné, utilizando activos purificantes y calmantes para reducir la inflamación y prevenir brotes.", duration: "60 MIN" },
  { id: "sc3", category: "Salud Cutánea", name: "Sistemas de Hidratación y Oxigenación", description: "Infusión intensiva de humedad y oxígeno que revitaliza las células, combatiendo la opacidad y previniendo el envejecimiento prematuro.", duration: "60 MIN" },
  { id: "sc4", category: "Salud Cutánea", name: "Desensibilizante", description: "Terapia suave y reconfortante diseñada específicamente para calmar pieles reactivas, enrojecidas o sensibles, restaurando su barrera natural.", duration: "50 MIN" },
  { id: "sc5", category: "Salud Cutánea", name: "Promo: Faciales 3x2", description: "Aprovecha nuestra promoción especial y recibe 3 faciales básicos al precio de 2. Ideal para mantener un cuidado continuo de tu piel.", duration: "50 MIN" },

  // Advanced Care
  { id: "ac1", category: "Advanced Care", name: "Hydrafacial", description: "La tecnología más avanzada para limpiar, extraer e hidratar la piel de manera profunda, utilizando sérums súper efectivos.", duration: "60 MIN" },
  { id: "ac2", category: "Advanced Care", name: "Micropunción (Dermapen)", description: "Tratamiento regenerador que estimula la producción de colágeno y elastina, mejorando la textura de la piel, cicatrices y líneas finas.", duration: "60 MIN" },
  { id: "ac3", category: "Advanced Care", name: "Lifting Facial", description: "Procedimiento no invasivo enfocado en tensar y elevar los tejidos del rostro, proporcionando un efecto rejuvenecedor y firmeza inmediata.", duration: "80 MIN" },
  { id: "ac4", category: "Advanced Care", name: "Rejuvenecimiento Láser", description: "Terapia de luz pulsada de alta precisión para tratar manchas, unificar el tono y estimular la renovación celular para una piel visiblemente más joven.", duration: "60 MIN" },
  { id: "ac5", category: "Advanced Care", name: "Láminas de Oro", description: "Exclusivo facial que incorpora los beneficios antioxidantes y tensores del oro de 24 quilates, aportando un brillo espectacular y lujo absoluto.", duration: "80 MIN" },

  // Specialty & Bio-Regen
  { id: "sb1", category: "Specialty & Bio-Regen", name: "Exosomas PDRN", description: "Terapia regenerativa celular profunda ideal para reparar la piel dañada, promover la curación y rejuvenecer utilizando exosomas avanzados.", duration: "60 MIN" },
  { id: "sb2", category: "Specialty & Bio-Regen", name: "PDRN de Salmón (ADN de Salmón)", description: "Potente tratamiento bioestimulador que utiliza polinucleótidos para reparar tejidos, mejorar la elasticidad y revertir el daño solar.", duration: "60 MIN" },
  { id: "sb3", category: "Specialty & Bio-Regen", name: "Plasma Rico en Plaquetas", description: "Bio-revitalización utilizando tu propio plasma para estimular la regeneración tisular, logrando mayor luminosidad, firmeza y reducción de líneas de expresión.", duration: "90 MIN" },
  { id: "sb4", category: "Specialty & Bio-Regen", name: "Fibroblast", description: "Técnica innovadora tipo arco eléctrico para tensar la piel, reduciendo eficazmente estrías, flacidez y párpados caídos sin cirugía.", duration: "60 MIN" },
  { id: "sb5", category: "Specialty & Bio-Regen", name: "Dermaplaning", description: "Exfoliación física controlada que elimina el vello fino y células muertas, logrando una superficie cutánea ultra suave y facilitando la absorción de productos.", duration: "50 MIN" },
  { id: "sb6", category: "Specialty & Bio-Regen", name: "Radiofrecuencia", description: "Tecnología térmica de ondas electromagnéticas que estimula la formación de nuevo colágeno, mejorando progresivamente la flacidez facial o corporal.", duration: "50 MIN" },

  // Body & Wellness
  { id: "bw1", category: "Body & Wellness", name: "Masaje Relajante", description: "Experiencia enfocada en aliviar la fatiga mental y física a través de masoterapia con pases suaves y rítmicos. Induce un estado de paz profunda.", duration: "50/80 MIN" },
  { id: "bw2", category: "Body & Wellness", name: "Masaje Descontracturante", description: "Terapia firme y focalizada para disolver nudos de tensión, espasmos musculares y dolor crónico, restaurando la movilidad y el confort.", duration: "50/80 MIN" },
  { id: "bw3", category: "Body & Wellness", name: "Presoterapia", description: "Tratamiento de compresión neumática controlada diseñado para mejorar el drenaje linfático, reducir retención de líquidos y eliminar toxinas.", duration: "45 MIN" },
  { id: "bw4", category: "Body & Wellness", name: "Bundle: Masaje + Spa de pies", description: "El descanso definitivo. Combina un reconfortante masaje corporal con un exquisito spa revitalizante específico para pies cansados.", duration: "90 MIN" },
  { id: "bw5", category: "Body & Wellness", name: "Bundle: Masaje Descontracturante + Presoterapia", description: "Programa integral de recuperación para relajar musculatura profunda y activar simultáneamente el sistema linfático. Resultados inmediatos.", duration: "90 MIN" },

  // Nails & Beauty
  { id: "nb1", category: "Nails & Beauty", name: "Manicura Spa (+ Gel de regalo)", description: "Cuidado completo para tus manos que incluye exfoliación, hidratación profunda, arreglo de cutículas y aplicación gratuita de esmalte en gel.", duration: "60 MIN" },
  { id: "nb2", category: "Nails & Beauty", name: "Pedicura Spa (+ Détox iónico de regalo)", description: "Ritual consentidor para los pies con servicio especializado de pedicura. Incluye sesión de détox iónico complementaria para limpiar el organismo.", duration: "80 MIN" },
  { id: "nb3", category: "Nails & Beauty", name: "Hydralips", description: "Tratamiento hidratante intensivo y voluminizador sin agujas para suavizar, mejorar la textura y rejuvenecer el contorno de tus labios.", duration: "30 MIN", price: 550 },
  { id: "nb4", category: "Nails & Beauty", name: "Lifting de Pestañas", description: "Elevación natural desde la raíz que da un efecto de mayor longitud y curvatura a tus pestañas, realzando la mirada sin necesidad de extensiones.", duration: "60 MIN" },
  { id: "nb5", category: "Nails & Beauty", name: "Depilación (Cejas, bigote o patilla)", description: "Servicio de depilación precisa y cuidadosa adaptada para áreas delicadas del rostro, dejando la piel libre de vello y suave.", duration: "15 MIN" },
];

export const CATEGORIES = [
  "Salud Cutánea",
  "Advanced Care",
  "Specialty & Bio-Regen",
  "Body & Wellness",
  "Nails & Beauty",
];

export const CATEGORY_IMAGES: Record<string, string[]> = {
  "Salud Cutánea": [images.saludCutanea, images.skin],
  "Advanced Care": [images.advancedCare, images.renovacion],
  "Specialty & Bio-Regen": [images.renovacion, images.skin],
  "Body & Wellness": [images.body, images.saludCutanea],
  "Nails & Beauty": [images.nailsBeauty, images.saludCutanea],
};

export const siteInfo = {
  phone: "+52 492 117 8858",
  phoneRaw: "+524921178858",
  address: "Grieta 4, Cañada de la Bufa, 98619 Guadalupe, Zac.",
  mapLink: "https://maps.app.goo.gl/F1tBS64SgAeKDS1e7",
  schedule: {
    weekdays: "Lunes a viernes: 10 am - 8pm",
    weekend: "Sabado: 10am - 4pm"
  },
  social: {
    facebook: "https://www.facebook.com/dalispaa",
    instagram: "https://www.instagram.com/spadali_zac"
  }
};
