# Master Developer Guide — DALI SPA (Belleza y Relajacion)

Este es el documento **único y definitivo** de estándares para el proyecto **DALI SPA**. Define la arquitectura, diseño, performance y convenciones para asegurar una experiencia de lujo, rápida y mantenible tanto para humanos como agentes IA.

---

## 1. Filosofía de Desarrollo — Seniority

Todo cambio debe seguir estos principios de ingeniería para mantener un código limpio y profesional:
- **Clean Code**: Código autodescriptivo. Funciones pequeñas, lógica declarativa y nombres semánticos.
- **DRY (Don't Repeat Yourself)**: Lógica centralizada. **`src/data/index.ts`** es la única fuente de verdad para datos.
- **Single Responsibility (SRP)**: Un componente = una responsabilidad. No mezclar lógica de negocio pesada con presentación.
- **Separación de Concernimientos**: Datos en `src/data/`, estilos globales en `src/styles/`, componentes en `src/components/`, layouts en `src/layouts/`.
- **Atomic Design**:
  - **Átomos**: Elementos básicos (botones, iconos, inputs sueltos).
  - **Moléculas**: Grupos de átomos con lógica mínima (un input con su label, un item del menú).
  - **Organismos**: Secciones completas con lógica compleja (Navbar, Hero, TreatmentMenu, CartDrawer).

---

## 2. Stack Tecnológico (Core 2026)

El proyecto utiliza tecnologías modernas de alto rendimiento:
- **Framework**: Astro v5+ (Static Output)
- **UI Interactiva**: React 19+ (@astrojs/react)
- **Estilos**: Tailwind CSS v4+ (Nativo)
- **Iconografía**: Lucide React
- **Tipografía**: Google Fonts (Playfair Display, Montserrat & Marcellus)
- **Tipado**: TypeScript (Estricto)
- **Internacionalización**: Custom Context-based i18n (ESP/ENG)

---

## 3. Estructura de Proyecto (Architecture)

```
src/
├── components/      # Componentes React (Navbar, Hero, TreatmentMenu, ReviewsSection, CartDrawer, etc.)
│   └── DaliSpa.tsx  # Punto de entrada principal e Islas de Interactividad.
├── context/         # React Context Providers (LanguageContext, etc.)
├── data/            # Datos centralizados (servicios, imágenes, categorías)
│   └── index.ts     # Única Fuente de Verdad para Datos Estáticos (SSoT).
├── layouts/         # Layout.astro (Base global, meta tags SEO, manifest link)
├── locales/         # Diccionarios de traducción (index.ts)
├── pages/           # Rutas (index.astro)
├── styles/          # global.css (Tokens, animaciones premium, ticker definition)
└── utils/           # (Proyectado para funciones de utilidad)
```

---

## 4. Extreme Performance & Speed (Lighthouse 100/100)

La velocidad es parte esencial del lujo. El sitio debe ser instantáneo en móviles y laptops:
- **Mobile-First Always**: Optimizado para dispositivos móviles antes que para desktop.
- **GPU Acceleration**: Uso exclusivo de `translate3d`, `opacity` y `scale` para animaciones. Evitar reflows (`top`, `margin`, `width`, `height`).
- **Asset Optimization**: 
  - Imágenes con `loading="lazy"` (excepto el Hero/LCP: `fetchPriority="high"`). 
  - Uso de WebP/AVIF vía Unsplash params (`?auto=format`).
- **Deferred JS**: Minimizar el tiempo de bloqueo del hilo principal. Las animaciones deben ser fluidas incluso en CPUs móviles limitadas.

---

## 5. Diseño Premium & Motion

El diseño debe transmitir calma, exclusividad y fluidez:
- **Colores de Marca (System Tokens)**:
  - `--burgundy` (#630B11): Acentos principales, botones y branding secundario.
  - `--navy` (#0a1628): Fondo del Footer (Branding Central). Proporciona profundidad y elegancia clásica.
  - `--burgundy-dark` (#4D080D): Utilizado para contrastes profundos opcionales.
  - `--cream` (#F2EBE1): Background cálido (Beige Arena). Sustituye al antiguo blanco roto.
  - `--cream-uniform` (#DCC8B1): Tono beige extraído de los uniformes del personal. Utilizado en el Footer para contraste y branding real.
  - `--logo-charcoal` (#333333): Color específico para el wordmark 'DALI' (inspirado en marketing). Utilizado en Header (scrolled).
  - `--gold` (#c9a84c): Acentos sutiles (Luxury Feel).
- **Tipografía de Marca**:
  - **Logo**: `Marcellus` (Flared Sans-serif). Espaciado: `0.5em` (Extra Wide).
  - **Encabezados**: `Playfair Display` (Serif de alto contraste).
  - **Cuerpo**: `Montserrat` (Sans-serif moderno).
- **Scroll Reveal**: Uso del componente `<Reveal />` para que las secciones principales entren con una animación suave (opacidad 0 -> 1 + desplazamiento 24px -> 0) optimizada por GPU.
- **Micro-interacciones**: Clase `.luxury-hover` en imágenes y botones principales (zoom sutil + brillo).
- **Glassmorphism**: Uso de `backdrop-blur` en menús fijos y carrito para dar profundidad y sensación premium.

---

## 6. Estado y Carrito (React Context)

El carrito de compras es el motor de reserva del sitio. Se gestiona mediante `CartProvider` en `src/components/DaliSpa.tsx`.

### Interfaz del Contexto (`CartCtx`):
- `items`: Lista de tratamientos seleccionados.
- `addItem(svc: SpaService)`: Agrega o incrementa la cantidad de un servicio.
- `removeItem(id: string)`: Elimina un servicio por ID.
- `updateQty(id: string, q: number)`: Actualiza la cantidad (si es 0, elimina).
- `total`: Precio total acumulado.
- `count`: Cantidad total de servicios en el carrito.
- `open / setOpen`: Control de visibilidad del Drawer.

---

## 7. Arquitectura de Datos (`src/data/index.ts`)

**Regla de Oro**: Ninguna información de servicios, precios, descripciones o rutas de imágenes debe estar hardcodeada.
- Importar todo desde `src/data/index.ts`.
- Estructura centralizada para facilitar cambios de inventario o precios globales de forma instantánea.

---

## 8. Convenciones de Código y Nomenclatura

- **Variables/Funciones**: `camelCase` descriptivo (ej. `filteredTreatments`, `handleBooking`).
- **Componentes**: `PascalCase` (ej. `DaliSpa.tsx`, `CartDrawer.tsx`).
- **Booleanos**: Prefijos informativos (`is`, `has`, `should`, `can`) (ej. `isScrolled`, `hasItems`, `canProceed`).
- **Constantes**: `UPPER_SNAKE_CASE` (ej. `CATEGORIES`, `NAV_LINKS`, `images`).
- **Comentarios**:
  - Código: Nombres y lógica en Inglés.
  - Comentarios explicativos: Español (para contexto del equipo y desarrollador).

---

## 9. SEO & Accesibilidad (a11y)

- **Semántica**: Uso obligatorio de tags HTML5 (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`).
- **Headings**: Un solo `<h1>` por página. Jerarquía estricta (`h1 > h2 > h3`).
- **SEO Social**: Incluir siempre Open Graph (`og:title`, `og:description`, `og:image`) y Meta Description.
- **Keywords**: spa, luxury, wellness, Nuevo Vallarta, Riviera Nayarit, relaxation, treatments.

---

## 10. Workflow y Git

- **Comandos**:
  - `npm run dev`: Desarrollo local.
  - `npm run build`: Build de producción.
  - `npm run preview`: Validación final.
- **Commits**: Seguir convenciones semánticas (Conventional Commits):
  - `feat: [feature name]` (ej: `feat: add scrollreveal support`)
  - `fix: [bug fixed]` (ej: `fix: mobile menu collision`)
  - `style: [ui changes]` (ej: `style: update luxury-hover scale`)
  - `docs: [documentation updates]`

---



## 11. Internacionalización (i18n)

El sitio utiliza un sistema de traducción dinámico basado en un Contexto Global:
- **Diccionarios**: Localizados en `src/locales/index.ts`.
- **Selector**: Integrado en el Navbar (Escritorio y Móvil).
- **Consistencia**: Todos los textos de UI, alertas y notificaciones del carrito deben pasar por el hook `useLanguage()`.

---

## 12. Flujo de Reserva (WhatsApp Integration)

DALI SPA no usa un checkout tradicional bancario, sino una solicitud de disponibilidad directa:
1. El usuario agrega tratamientos al carrito flotante.
2. Define fecha, hora y número de personas en el `CartDrawer`.
3. Al hacer clic en "SOLICITAR DISPONIBILIDAD", se genera un mensaje de WhatsApp preformateado con el resumen de la cita.
4. El personal de recepción confirma y agenda manualmente.

---

## 13. Animaciones Avanzadas (Luxury Ticker)

- **Galería Infinitas**: Utiliza `@keyframes ticker` en `global.css` optimizada para hardware.
- **Reviews**: Carrusel manual (snap-center) en móvil y grid en desktop.
- **Floating Cart**: Botón con animación de bounce y contador dinámico.

---

## 14. Cosas a Evitar (Anti-patterns) — ❌

- ❌ **Hardcoding**: Escribir precios, textos o URLs de imágenes directamente en el componente JSX.
- ❌ **Any**: Prohibido usar `any` en TypeScript; define interfaces o tipos adecuados.
- ❌ **Dependencias infladas**: No agregar librerías externas pesadas si Tailwind o CSS nativo pueden resolverlo.
- ❌ **Comentarios residuales**: No dejar `TODO`, `console.log` o bloques de código comentados en producción.
- ❌ **Ignorar Mobile**: Dar por terminado una sección sin probarla exhaustivamente en vista móvil (375px/390px).
- ❌ **Ignorar Core Web Vitals**: Agregar imágenes pesadas sin lazy-loading o scripts que bloqueen el FCP.
- ❌ **Código Complicado**: Evitar "clever code" difícil de mantener para humanos. Prefiere la legibilidad.

---

## 15. Comunicación del Agente (IA a Propietario)

- **Seniority**: Comunicación técnica directa, proactiva y propositiva.
- **Cero Placeholders**: Entregar siempre soluciones finales, funcionales y probadas.
- **Justificaciones**: Siempre explicar el "por qué" de las mejoras técnicas basándose en performance, UX o mantenibilidad.
- **Garantía de Calidad**: Validar responsividad, accesibilidad y velocidad antes de cada entrega formal.

---
