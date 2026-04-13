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
  duration: string;
  price?: number;
  priceLabel?: string; // "desde MX$570", "MX$1,000 (Save 29%)", "gratis"
  description?: string;
  isPackage?: boolean;
  bookingUrl?: string; // Enlace profundo específico para este servicio en Fresha
}

// ─── SERVICIOS DESTACADOS ───────────────────────────────────────────────────
export const featuredServices: SpaService[] = [
  { id: "f1", category: "featured", name: "Reductivo o reafirmante", duration: "1 hr – 1 hr, 30 min", priceLabel: "desde MX$570", bookingUrl: "https://www.fresha.com/a/dali-spa-guadalupe-canada-de-la-bufa-grieta-4-r0fq9f67?service=s%3A15763476" },
  { id: "f2", category: "featured", name: "Gel", duration: "40 min – 1 hr", priceLabel: "desde MX$100", bookingUrl: "https://www.fresha.com/a/dali-spa-guadalupe-canada-de-la-bufa-grieta-4-r0fq9f67?service=s%3A15768470" },
  { id: "f3", category: "featured", name: "Masaje relajante", duration: "20 min – 1 hr, 20 min", priceLabel: "desde MX$330", bookingUrl: "https://www.fresha.com/a/dali-spa-guadalupe-canada-de-la-bufa-grieta-4-r0fq9f67?service=s%3A15763466" },
  { id: "f4", category: "featured", name: "Pedicura", duration: "40 min – 1 hr, 20 min", priceLabel: "desde MX$270", bookingUrl: "https://www.fresha.com/a/dali-spa-guadalupe-canada-de-la-bufa-grieta-4-r0fq9f67?service=s%3A13761508" },
  { id: "f5", category: "featured", name: "The Christmas Reset Experience", duration: "2 hr, 15 min · 5 servicios", priceLabel: "MX$1,000 (Ahorra 29%)", isPackage: true, description: "Facial Oxigenante · Masaje Relajante · Spa de Pies · Refrigerio · Regalo", bookingUrl: "https://www.fresha.com/a/dali-spa-guadalupe-canada-de-la-bufa-grieta-4-r0fq9f67?service=p%3A1700536" },
  { id: "f6", category: "featured", name: "Paquete Reset de Verano", duration: "1 hr, 30 min · 2 servicios", priceLabel: "MX$600 (Ahorra 20%)", isPackage: true, description: "Limpieza facial profunda + Mascarilla calmante e hidratante · Detox de pies", bookingUrl: "https://www.fresha.com/a/dali-spa-guadalupe-canada-de-la-bufa-grieta-4-r0fq9f67?service=p%3A1652728" },
];

// ─── MENÚ COMPLETO ───────────────────────────────────────────────────────────
export const FULL_MENU: Record<string, SpaService[]> = {
  paquetes: [
    { id: "pk1", category: "paquetes", name: "The Christmas Reset Experience", duration: "2 hr, 15 min · 5 servicios", priceLabel: "MX$1,000 (Ahorra 29%)", isPackage: true, description: "Facial Oxigenante · Masaje Relajante · Spa de Pies · Refrigerio · Regalo" },
    { id: "pk2", category: "paquetes", name: "Paquete Pareja #2", duration: "2 hr, 5 min · 3 servicios", priceLabel: "MX$950 (Ahorra 18%)", isPackage: true, description: "Limpiezas faciales con masaje lifting · Masajes relajantes con envoltura de oro" },
    { id: "pk3", category: "paquetes", name: "Paquete Pareja #1", duration: "2 hr, 10 min · 3 servicios", priceLabel: "MX$950 (Ahorra 18%)", isPackage: true, description: "Limpieza facial con masaje lifting · Masaje relajante con envoltura de oro" },
    { id: "pk4", category: "paquetes", name: "Paquete facial para dos", duration: "1 hr, 30 min · 2 servicios", priceLabel: "MX$950 (Ahorra 17%)", isPackage: true, description: "Dos faciales: hidratante, oxigenante o radiofrecuencia. Incluye limpieza profunda" },
    { id: "pk5", category: "paquetes", name: "Paquete mirada de ensueño", duration: "2 hr", priceLabel: "MX$650", isPackage: true, description: "Diseño de ceja con pigmento HD · Lash lifting con pigmento · Depilación de regalo" },
    { id: "pk6", category: "paquetes", name: "Paquete masaje detox", duration: "1 hr, 30 min", priceLabel: "MX$900", isPackage: true, description: "Masaje descontracturante con aceite tibio y aromaterapia · Limpieza facial detox" },
    { id: "pk7", category: "paquetes", name: "Paquete spa", duration: "3 hr", priceLabel: "MX$1,000", isPackage: true, description: "Spa de pies · Facial hidratante · Masaje relajante con aceite tibio y aromaterapia" },
    { id: "pk8", category: "paquetes", name: "Paquete mamá", duration: "3 hr", priceLabel: "MX$1,300", isPackage: true, description: "Facial hidratante con masaje lifting · Masaje relajante · Spa de pies · Manicura" },
    { id: "pk9", category: "paquetes", name: "Paquete exfoliación corporal", duration: "3 hr", priceLabel: "MX$1,300", isPackage: true, description: "Facial hidratante · Exfoliación corporal · Envoltura de chocolate o mascarilla de oro" },
    { id: "pk10", category: "paquetes", name: "Paquete velo de novia", duration: "4 hr", priceLabel: "MX$1,900", isPackage: true, description: "Facial limpieza profunda · Exfoliación corporal · Mascarilla de oro o chocolate" },
    { id: "pk11", category: "paquetes", name: "Paquete Reset de Verano", duration: "1 hr, 30 min · 2 servicios", priceLabel: "MX$600 (Ahorra 20%)", isPackage: true, description: "Limpieza facial profunda + Mascarilla calmante e hidratante · Detox de pies" },
  ],
  faciales: [
    { id: "fc1", category: "faciales", name: "Limpieza profunda", duration: "1 hr", priceLabel: "MX$470" },
    { id: "fc2", category: "faciales", name: "Antiacné", duration: "1 hr, 40 min", priceLabel: "MX$540" },
    { id: "fc3", category: "faciales", name: "Rejuvenecimiento láser", duration: "1 hr", priceLabel: "MX$990" },
    { id: "fc4", category: "faciales", name: "Radiofrecuencia", duration: "1 hr", priceLabel: "MX$670" },
    { id: "fc5", category: "faciales", name: "Plasma rico en plaquetas", duration: "1 hr, 30 min", priceLabel: "MX$1,550" },
    { id: "fc6", category: "faciales", name: "Oxigenante", duration: "1 hr, 30 min", priceLabel: "MX$600" },
    { id: "fc7", category: "faciales", name: "Micropunción (Dermapen)", duration: "1 hr, 30 min – 2 hr, 30 min", priceLabel: "desde MX$830" },
    { id: "fc8", category: "faciales", name: "Mesoterapia facial", duration: "40 min", priceLabel: "MX$790" },
    { id: "fc9", category: "faciales", name: "Lifting facial", duration: "1 hr, 40 min", priceLabel: "MX$1,090" },
    { id: "fc10", category: "faciales", name: "Láminas de oro", duration: "1 hr, 20 min – 1 hr, 40 min", priceLabel: "desde MX$1,210" },
    { id: "fc11", category: "faciales", name: "Hydrafacial", duration: "1 hr, 30 min", priceLabel: "MX$770" },
    { id: "fc12", category: "faciales", name: "Hidratante", duration: "1 hr, 30 min", priceLabel: "MX$550" },
    { id: "fc13", category: "faciales", name: "Despigmentante", duration: "1 hr", priceLabel: "MX$970" },
    { id: "fc14", category: "faciales", name: "Desensibilizante", duration: "1 hr, 30 min", priceLabel: "MX$600" },
    { id: "fc15", category: "faciales", name: "Dermaplaning", duration: "1 hr", priceLabel: "MX$790" },
    { id: "fc16", category: "faciales", name: "Exosomas PDRN", duration: "2 hr, 30 min", priceLabel: "MX$1,500" },
    { id: "fc17", category: "faciales", name: "Salmón PDRN", duration: "1 hr", priceLabel: "MX$2,500" },
    { id: "fc18", category: "faciales", name: "Enzimas facial", duration: "15 min", priceLabel: "MX$680" },
    { id: "fc19", category: "faciales", name: "Botox", duration: "1 hr", priceLabel: "MX$3,600" },
    { id: "fc20", category: "faciales", name: "Baby botox", duration: "30 min", priceLabel: "MX$2,900" },
    { id: "fc21", category: "faciales", name: "Retoque botox", duration: "30 min", priceLabel: "Consultar" },
    { id: "fc22", category: "faciales", name: "Facial de Verano", duration: "1 hr", priceLabel: "MX$600" },
  ],
  corporales: [
    { id: "co1", category: "corporales", name: "Masaje relajante", duration: "20 min – 1 hr, 20 min", priceLabel: "desde MX$330", bookingUrl: "https://www.fresha.com/a/dali-spa-guadalupe-canada-de-la-bufa-grieta-4-r0fq9f67?service=s%3A15763466" },
    { id: "co2", category: "corporales", name: "Masaje descontracturante", duration: "1 hr", priceLabel: "MX$610" },
    { id: "co3", category: "corporales", name: "Masaje piedras calientes", duration: "1 hr, 20 min", priceLabel: "MX$700" },
    { id: "co4", category: "corporales", name: "Reductivo o reafirmante", duration: "1 hr – 1 hr, 30 min", priceLabel: "desde MX$570", bookingUrl: "https://www.fresha.com/a/dali-spa-guadalupe-canada-de-la-bufa-grieta-4-r0fq9f67?service=s%3A15763476" },
    { id: "co5", category: "corporales", name: "Exfoliación corporal", duration: "40 min", priceLabel: "MX$700" },
    { id: "co6", category: "corporales", name: "Drenaje linfático", duration: "50 min", priceLabel: "MX$600" },
    { id: "co7", category: "corporales", name: "Presoterapia", duration: "1 hr", priceLabel: "MX$300" },
    { id: "co8", category: "corporales", name: "Electroestimulación", duration: "30 min", priceLabel: "desde MX$260" },
    { id: "co9", category: "corporales", name: "EMS abdomen", duration: "40 min · 1 sesión", priceLabel: "MX$500" },
    { id: "co10", category: "corporales", name: "Cavitador", duration: "20 min", priceLabel: "MX$400" },
    { id: "co11", category: "corporales", name: "Levantamiento de glúteos", duration: "1 hr", priceLabel: "MX$600" },
    { id: "co12", category: "corporales", name: "Levantamiento de busto", duration: "1 hr", priceLabel: "MX$510" },
    { id: "co13", category: "corporales", name: "Aumento de glúteos (mesoterapia)", duration: "1 hr, 30 min", priceLabel: "MX$1,200" },
    { id: "co14", category: "corporales", name: "Mesoterapia corporal", duration: "1 hr, 30 min – 2 hr", priceLabel: "desde MX$890" },
    { id: "co15", category: "corporales", name: "Micropuntura en estrías", duration: "1 hr", priceLabel: "desde MX$880" },
    { id: "co16", category: "corporales", name: "Piernas cansadas", duration: "40 min", priceLabel: "MX$450" },
    { id: "co17", category: "corporales", name: "Paquete Básico Reductor", duration: "1 hr, 15 min", priceLabel: "MX$3,800", isPackage: true },
    { id: "co18", category: "corporales", name: "Paquete Intenso Reductor", duration: "1 hr, 30 min", priceLabel: "MX$5,400", isPackage: true },
    { id: "co19", category: "corporales", name: "Paquete Total Reductivo", duration: "2 hr", priceLabel: "MX$6,800", isPackage: true },
    { id: "co20", category: "corporales", name: "Baño postoperatorio", duration: "40 min", priceLabel: "desde MX$150" },
    { id: "co21", category: "corporales", name: "Estancia post", duration: "1 hr", priceLabel: "MX$2,300" },
    { id: "co22", category: "corporales", name: "Enzimas corporal", duration: "15 min", priceLabel: "MX$860" },
    { id: "co23", category: "corporales", name: "Velo de novia", duration: "4 hr", priceLabel: "MX$1,760", isPackage: true },
  ],
  depilacion_cera: [
    { id: "dc1", category: "depilacion_cera", name: "Piernas completas", duration: "1 hr", priceLabel: "MX$420" },
    { id: "dc2", category: "depilacion_cera", name: "Media pierna", duration: "30 min", priceLabel: "MX$230" },
    { id: "dc3", category: "depilacion_cera", name: "Brazos completos", duration: "40 min", priceLabel: "MX$310" },
    { id: "dc4", category: "depilacion_cera", name: "Medio brazo", duration: "20 min", priceLabel: "MX$210" },
    { id: "dc5", category: "depilacion_cera", name: "Bikini completo", duration: "30 min", priceLabel: "MX$540" },
    { id: "dc6", category: "depilacion_cera", name: "Delineado de bikini", duration: "15 min", priceLabel: "MX$340" },
    { id: "dc7", category: "depilacion_cera", name: "Axila", duration: "20 min", priceLabel: "MX$210" },
    { id: "dc8", category: "depilacion_cera", name: "Glúteos", duration: "30 min", priceLabel: "MX$260" },
    { id: "dc9", category: "depilacion_cera", name: "Abdomen", duration: "1 hr", priceLabel: "MX$220" },
    { id: "dc10", category: "depilacion_cera", name: "Abdomen medio", duration: "30 min", priceLabel: "MX$120" },
    { id: "dc11", category: "depilacion_cera", name: "Media espalda", duration: "30 min", priceLabel: "MX$230" },
    { id: "dc12", category: "depilacion_cera", name: "Espalda Completa", duration: "1 hr", priceLabel: "MX$350" },
    { id: "dc13", category: "depilacion_cera", name: "Linea interglútea", duration: "20 min", priceLabel: "MX$200" },
    { id: "dc14", category: "depilacion_cera", name: "Manos y dedos", duration: "20 min", priceLabel: "MX$150" },
    { id: "dc15", category: "depilacion_cera", name: "Cara", duration: "40 min", priceLabel: "MX$450" },
    { id: "dc16", category: "depilacion_cera", name: "Ceja", duration: "20 min", priceLabel: "MX$200" },
    { id: "dc17", category: "depilacion_cera", name: "Bigote", duration: "10 min", priceLabel: "MX$120" },
    { id: "dc18", category: "depilacion_cera", name: "Barba", duration: "20 min", priceLabel: "MX$260" },
    { id: "dc19", category: "depilacion_cera", name: "Patilla", duration: "20 min", priceLabel: "MX$110" },
    { id: "dc20", category: "depilacion_cera", name: "Nariz", duration: "10 min", priceLabel: "MX$110" },
    { id: "dc21", category: "depilacion_cera", name: "Menton", duration: "10 min", priceLabel: "MX$110" },
  ],
  depilacion_laser: [
    { id: "dl1", category: "depilacion_laser", name: "Cuerpo completo", duration: "2 hr", priceLabel: "MX$20,800", description: "Sesiones ilimitadas mientras cumplan con sus citas." },
    { id: "dl2", category: "depilacion_laser", name: "Piernas completas", duration: "40 min", priceLabel: "desde MX$1,130" },
    { id: "dl3", category: "depilacion_laser", name: "Espalda Completa", duration: "35 min", priceLabel: "desde MX$970" },
    { id: "dl4", category: "depilacion_laser", name: "Cara completa", duration: "30 min", priceLabel: "desde MX$700" },
    { id: "dl5", category: "depilacion_laser", name: "1/2 piernas", duration: "30 min", priceLabel: "desde MX$700" },
    { id: "dl6", category: "depilacion_laser", name: "1/2 espalda", duration: "30 min", priceLabel: "desde MX$540" },
    { id: "dl7", category: "depilacion_laser", name: "1/2 brazos", duration: "25 min", priceLabel: "desde MX$540" },
    { id: "dl8", category: "depilacion_laser", name: "1/2 cara", duration: "20 min", priceLabel: "desde MX$430" },
    { id: "dl9", category: "depilacion_laser", name: "Barba", duration: "20 min", priceLabel: "desde MX$430" },
    { id: "dl10", category: "depilacion_laser", name: "Bikini", duration: "25 min", priceLabel: "desde MX$430" },
    { id: "dl11", category: "depilacion_laser", name: "Axilas", duration: "20 min", priceLabel: "desde MX$310" },
    { id: "dl12", category: "depilacion_laser", name: "Patillas", duration: "20 min", priceLabel: "desde MX$310" },
    { id: "dl13", category: "depilacion_laser", name: "Cuello", duration: "25 min", priceLabel: "desde MX$310" },
    { id: "dl14", category: "depilacion_laser", name: "Menton", duration: "10 min – 20 min", priceLabel: "desde MX$160" },
    { id: "dl15", category: "depilacion_laser", name: "Bigote", duration: "10 min", priceLabel: "desde MX$160" },
    { id: "dl16", category: "depilacion_laser", name: "Aclaramiento de axila", duration: "1 hr", priceLabel: "desde MX$1,800" },
    { id: "dl17", category: "depilacion_laser", name: "Láser Despigmentante", duration: "1 hr", priceLabel: "MX$700", description: "Limpieza facial · Ácidos despigmentantes · Láser facial" },
    { id: "dl18", category: "depilacion_laser", name: "Diagnóstico láser", duration: "30 min", priceLabel: "Gratis" },
  ],
  unias: [
    { id: "un1", category: "unias", name: "Manicura", duration: "40 min – 1 hr, 30 min", priceLabel: "desde MX$220" },
    { id: "un2", category: "unias", name: "Pedicura", duration: "40 min – 1 hr, 20 min", priceLabel: "desde MX$270" },
    { id: "un3", category: "unias", name: "Gel", duration: "40 min – 1 hr", priceLabel: "desde MX$100", bookingUrl: "https://www.fresha.com/a/dali-spa-guadalupe-canada-de-la-bufa-grieta-4-r0fq9f67?service=s%3A15768470" },
    { id: "un4", category: "unias", name: "Acrílico", duration: "15 min – 2 hr, 30 min", priceLabel: "desde MX$30" },
    { id: "un5", category: "unias", name: "Rubber", duration: "10 min – 1 hr", priceLabel: "desde MX$40" },
    { id: "un6", category: "unias", name: "Manicura Rusa", duration: "10 min", priceLabel: "MX$90" },
    { id: "un7", category: "unias", name: "Retiro", duration: "30 min – 40 min", priceLabel: "desde MX$65" },
    { id: "un8", category: "unias", name: "Reparacion uña", duration: "20 min", priceLabel: "MX$30 por uña" },
    { id: "un9", category: "unias", name: "Vitamina", duration: "10 min – 30 min", priceLabel: "desde MX$10" },
    { id: "un10", category: "unias", name: "Extras por uña", duration: "5 min", priceLabel: "desde MX$2" },
  ],
  mas_servicios: [
    { id: "ms1", category: "mas_servicios", name: "Hydralips", duration: "40 min", priceLabel: "MX$550" },
    { id: "ms2", category: "mas_servicios", name: "Spa de Manos", duration: "10 min", priceLabel: "MX$200", description: "Exfoliación + mascarilla" },
    { id: "ms3", category: "mas_servicios", name: "Presoterapia", duration: "1 hr", priceLabel: "MX$300" },
    { id: "ms4", category: "mas_servicios", name: "Lifting de pestañas", duration: "40 min – 1 hr, 20 min", priceLabel: "desde MX$330" },
    { id: "ms5", category: "mas_servicios", name: "Laminado de ceja", duration: "40 min – 1 hr, 20 min", priceLabel: "desde MX$170" },
    { id: "ms6", category: "mas_servicios", name: "Eliminación de verrugas", duration: "30 min", priceLabel: "desde MX$150" },
    { id: "ms7", category: "mas_servicios", name: "Diseño de ceja (depilación)", duration: "20 min – 1 hr, 20 min", priceLabel: "desde MX$200" },
    { id: "ms8", category: "mas_servicios", name: "Detox iónica de pies", duration: "30 min", priceLabel: "MX$280" },
    { id: "ms9", category: "mas_servicios", name: "Ceja HD (Hena)", duration: "30 min – 40 min", priceLabel: "desde MX$330" },
    { id: "ms10", category: "mas_servicios", name: "Refrigerio", duration: "10 min", priceLabel: "desde MX$100" },
  ],
};

// Configuración visual por categoría para el layout editorial
export const CATEGORY_CONFIG: Record<string, { title: string; image: string }> = {
  paquetes: {
    title: "Paquetes & Experiencias",
    image: "/images/galeria1.webp",
  },
  faciales: {
    title: "Tratamientos Faciales",
    image: "/images/salud-cutanea.jpg",
  },
  corporales: {
    title: "Tratamientos Corporales",
    image: "/images/body.jpg",
  },
  depilacion_cera: {
    title: "Depilación con Cera",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  },
  depilacion_laser: {
    title: "Depilación Láser",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
  },
  unias: {
    title: "Uñas",
    image: "/images/nails-and-beauty.jpg",
  },
  mas_servicios: {
    title: "Más Servicios",
    image: "/images/nails-and-beauty.jpg",
  },
};

// Legacy - kept for menu translation keys compatibility
export const treatments: SpaService[] = [];
export const CATEGORIES = Object.keys(FULL_MENU);
export const CATEGORY_IMAGES: Record<string, string[]> = Object.fromEntries(
  Object.entries(CATEGORY_CONFIG).map(([key, val]) => [key, [val.image]])
);

export const siteInfo = {
  phone: "+52 492 117 8858",
  phoneRaw: "+524921178858",
  address: "Grieta 4, Cañada de la Bufa, 98619 Guadalupe, Zac.",
  mapLink: "https://maps.app.goo.gl/F1tBS64SgAeKDS1e7",
  social: {
    facebook: "https://www.facebook.com/dalispaa",
    instagram: "https://www.instagram.com/spadali_zac"
  }
};

export const GENERAL_FRESHA_URL = "https://www.fresha.com/a/dali-spa-guadalupe-canada-de-la-bufa-grieta-4-r0fq9f67";
