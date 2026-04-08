export const images = {
  hero: "/images/Dali-hero.png",
  massage: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=1200",
  facial: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=1200",
  body: "https://images.unsplash.com/photo-1519415387722-a1c3bbff7158?auto=format&fit=crop&q=80&w=1200",
  bridal: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200",
  facilities: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&q=80&w=1200",
  hydrotherapy: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000",
  resort: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
  skin: "/images/skin.jpg",
  waiting: "/images/Te esperamos.jpg",
};

export const galleryImages = [
  "/images/galeria1.jpg",
  "/images/galeria2.jpg",
  "/images/galeria3.jpg",
  "/images/galeria4.jpg",
  "/images/galeria5.jpg",
  "/images/galeria6.jpg",
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
  { id: "b1", category: "BRIDAL PACKAGE", name: "Hair Style", description: "Professional bridal hairstyling with elegant updos, curls, or sleek looks tailored to your special day.", duration: "90 MIN" },
  { id: "b2", category: "BRIDAL PACKAGE", name: "Bride Package", description: "Complete bridal experience including hair, makeup, facial, and relaxation massage for the perfect wedding day glow.", duration: "180 MIN" },
  { id: "b3", category: "BRIDAL PACKAGE", name: "Make up", description: "Professional makeup application using premium products for a long-lasting, photo-ready bridal look.", duration: "60 MIN" },
  { id: "s1", category: "SIGNATURE EXPERIENCES", name: "Tatewari Ritual", description: "Our signature holistic experience combining ancient healing traditions with modern spa techniques for total body renewal.", duration: "120 MIN", price: 295 },
  { id: "s2", category: "SIGNATURE EXPERIENCES", name: "Pacific Sunset Journey", description: "An indulgent body treatment inspired by the healing energy of the Pacific Ocean, with volcanic sand exfoliation and marine wrap.", duration: "90 MIN", price: 225 },
  { id: "m1", category: "MASSAGE", name: "Swedish Relaxation", description: "Classic full-body massage using long, flowing strokes to improve circulation and promote deep relaxation.", duration: "50/80 MIN", price: 135 },
  { id: "m2", category: "MASSAGE", name: "Deep Tissue", description: "Therapeutic massage targeting deep muscle layers to release chronic tension, knots, and muscle stiffness.", duration: "50/80 MIN", price: 155 },
  { id: "m3", category: "MASSAGE", name: "Hot Stone Therapy", description: "Heated volcanic stones placed on key points of the body to melt away tension and restore energy flow.", duration: "80 MIN", price: 175 },
  { id: "m4", category: "MASSAGE", name: "Aromatherapy Massage", description: "A sensory journey combining therapeutic essential oils with gentle massage techniques for total mind-body balance.", duration: "50/80 MIN", price: 145 },
  { id: "br1", category: "BODY RENEWAL", name: "Volcanic Mud Wrap", description: "Mineral-rich volcanic clay detoxifies and smooths the skin while providing deep emotional grounding.", duration: "50 MIN", price: 135 },
  { id: "br2", category: "BODY RENEWAL", name: "Agave Nectar Scrub", description: "Organic blue agave nectar and sea salts gently exfoliate, leaving skin luminous and silky smooth.", duration: "50 MIN", price: 125 },
  { id: "br3", category: "BODY RENEWAL", name: "Tropical Coconut Wrap", description: "Nourishing coconut oil wrap that deeply hydrates and softens sun-exposed skin.", duration: "50 MIN", price: 130 },
  { id: "f1", category: "FACIAL CARE", name: "DALI Radiance Facial", description: "Advanced vitamin C treatment to brighten, firm, and protect skin from environmental damage.", duration: "50 MIN", price: 145 },
  { id: "f2", category: "FACIAL CARE", name: "Hydra-Intensive Therapy", description: "Marine botanical extracts plump and revitalize dehydrated skin with intensive moisture infusion.", duration: "80 MIN", price: 175 },
  { id: "f3", category: "FACIAL CARE", name: "Anti-Aging Renewal", description: "Collagen-boosting facial using peptide technology to reduce fine lines and restore youthful firmness.", duration: "80 MIN", price: 195 },
  { id: "c1", category: "COUPLE'S EXPERIENCE", name: "Romantic Escape", description: "Side-by-side massage in our private couple's suite with champagne and chocolate-covered strawberries.", duration: "80 MIN", price: 350 },
  { id: "c2", category: "COUPLE'S EXPERIENCE", name: "Harmony Ritual", description: "A synchronized body scrub and massage experience designed to reconnect couples through shared relaxation.", duration: "120 MIN", price: 450 },
  { id: "jm1", category: "JUST FOR MEN", name: "Executive De-Stress", description: "Targeted deep tissue massage focused on neck, shoulders, and back — designed for high-performance individuals.", duration: "50 MIN", price: 145 },
  { id: "jm2", category: "JUST FOR MEN", name: "Men's Power Facial", description: "Deep-cleansing facial addressing razor burn, ingrown hairs, and environmental damage unique to men's skin.", duration: "50 MIN", price: 135 },
];

export const CATEGORIES = [
  "BRIDAL PACKAGE",
  "SIGNATURE EXPERIENCES",
  "MASSAGE",
  "BODY RENEWAL",
  "FACIAL CARE",
  "COUPLE'S EXPERIENCE",
  "JUST FOR MEN",
];

export const CATEGORY_IMAGES: Record<string, string[]> = {
  "BRIDAL PACKAGE": [images.bridal, images.facial],
  "SIGNATURE EXPERIENCES": [images.massage, images.hydrotherapy],
  "MASSAGE": [images.massage, images.body],
  "BODY RENEWAL": [images.body, images.hydrotherapy],
  "FACIAL CARE": [images.facial, images.massage],
  "COUPLE'S EXPERIENCE": [images.hydrotherapy, images.massage],
  "JUST FOR MEN": [images.body, images.facial],
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
