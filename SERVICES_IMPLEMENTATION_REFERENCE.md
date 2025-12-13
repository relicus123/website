# Services Refactor - Implementation Reference

## 📂 File Structure

```
src/
├── data/
│   └── servicesData.ts              (UPDATED - now with full service details)
├── components/
│   └── Header.tsx                   (UPDATED - dropdown + mobile submenu)
└── app/
    └── services/
        └── [slug]/
            ├── page.tsx             (NEW - dynamic service pages)
            └── layout.tsx           (NEW - metadata generation)
```

---

## 1️⃣ Services Data File

**Location:** `src/data/servicesData.ts`

### TypeScript Interface

```typescript
export interface Service {
  id: string; // Unique identifier
  title: string; // Display name
  slug: string; // URL-friendly name
  heroImage: string; // Image URL
  shortDescription: string; // 1-2 line summary
  fullDescription: string; // Detailed paragraph
  faqs: Array<{
    // FAQ entries
    question: string;
    answer: string;
  }>;
}
```

### Data Array Structure

```typescript
export const servicesData: Service[] = [
  {
    id: "counselling-psychotherapy",
    title: "Counselling & Psychotherapy",
    slug: "counselling-psychotherapy",
    heroImage: "/images/services/Counselling & Psychotherapy.png",
    shortDescription: "One-to-one therapy sessions in a safe, private space...",
    fullDescription: "Counselling and Psychotherapy at Relicus provides...",
    faqs: [
      {
        question: "How long are therapy sessions?",
        answer: "Standard therapy sessions are 50-60 minutes long...",
      },
      // ... more FAQs
    ],
  },
  // ... 5 more services
];
```

### Available Services

1. `counselling-psychotherapy`
2. `psychological-assessments`
3. `learning-support-remedial`
4. `speech-language-services`
5. `training-workshops`
6. `referral-support-services`

---

## 2️⃣ Header Component

**Location:** `src/components/Header.tsx`

### New State Management

```typescript
const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);
const dropdownTimeoutRef = useRef<NodeJS.Timeout>();
```

### Desktop Dropdown

- **Trigger:** Hover on Services link
- **Open:** Immediate
- **Close:** 200ms delay after mouse leave
- **Styling:** White box, emerald accent, smooth shadow

### Mobile Submenu

- **Trigger:** Tap on Services button
- **Behavior:** Expands/collapses on tap
- **Content:** Nested service links
- **Auto-close:** When service is selected

### Key Functions

```typescript
handleDropdownEnter(); // Clear timeout, open dropdown
handleDropdownLeave(); // Set 200ms timeout before close
handleClickOutside(); // Close when clicking outside (useEffect)
```

### Styling Classes

```
Desktop:
- "relative" - Position context for absolute dropdown
- "hover:text-brand-dark/70" - Link hover effect
- "hover:bg-emerald-50/50" - Item hover background
- "shadow-lg" - Dropdown shadow
- "border-brand-light/20" - Subtle border

Mobile:
- "px-4 py-3" - Button padding
- "flex items-center justify-between" - Layout
- "rotate-180" - Chevron animation class
```

---

## 3️⃣ Service Page Component

**Location:** `src/app/services/[slug]/page.tsx`

### Route Parameter

```typescript
interface ServicePageProps {
  params: {
    slug: string;
  };
}
```

### Page Structure

#### A. Hero Section

```tsx
<section className="bg-gradient-to-b from-emerald-50/50 to-white pt-32 pb-16">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Left: Title & Description */}
    <div>
      <h1 className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
        {service.title}
      </h1>
      <p>{service.shortDescription}</p>
      <button>Book Now</button>
    </div>

    {/* Right: Hero Image */}
    <Image src={service.heroImage} alt={service.title} />
  </div>
</section>
```

**Responsive Behavior:**

- Mobile: Single column (stacked)
- Desktop: Two-column grid
- Image height: 384px (mobile) → 500px (desktop)
- Typography scales: `text-4xl` → `text-6xl`

#### B. Detailed Content Section

```tsx
<section className="py-16 md:py-24 border-b border-brand-light/20">
  <div className="max-w-3xl mx-auto px-4">
    <p className="text-lg md:text-xl leading-relaxed">
      {service.fullDescription}
    </p>
  </div>
</section>
```

**Features:**

- Centered layout (max-width-3xl)
- Professional typography
- Generous line-height for readability
- Responsive padding

#### C. FAQ Accordion Section

```tsx
<section className="py-16 md:py-24">
  <h2 className="text-3xl font-bold text-center bg-gradient-to-r ... mb-12">
    Frequently Asked Questions
  </h2>

  {service.faqs.map((faq, index) => (
    <div className="border border-brand-light/30 rounded-lg">
      {/* Header (always visible) */}
      <button onClick={() => toggleFAQ(index)}>
        <span>{faq.question}</span>
        <ChevronDownIcon
          className={`rotate-${expandedFAQ === index ? 180 : 0}`}
        />
      </button>

      {/* Body (animated) */}
      <motion.div
        animate={{
          height: expandedFAQ === index ? "auto" : 0,
          opacity: expandedFAQ === index ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <p>{faq.answer}</p>
      </motion.div>
    </div>
  ))}
</section>
```

**Accordion Features:**

- Click to expand/collapse
- Smooth height animation (300ms)
- Chevron icon rotation
- Emerald color scheme
- Single item expanded at a time

#### D. CTA Section (Bottom)

```tsx
<section className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50">
  <h2>Ready to Get Started?</h2>
  <p>Take the first step toward your wellness journey...</p>
  <div className="flex gap-4">
    <button className="button-primary">Book Now</button>
    <button className="button-secondary">Meet Our Team</button>
  </div>
</section>
```

### Animations

**Page Entry**

```typescript
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
```

**Staggered Children**

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
```

**FAQ Smooth Height**

```typescript
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{
    height: expandedFAQ === index ? "auto" : 0,
    opacity: expandedFAQ === index ? 1 : 0,
  }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
/>
```

### Error Handling

```typescript
if (!service) {
  notFound(); // Triggers 404 page
}
```

---

## 4️⃣ Layout & Metadata

**Location:** `src/app/services/[slug]/layout.tsx`

### Dynamic Metadata

```typescript
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);

  return {
    title: `${service.title} | Relicus`,
    description: service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      images: [service.heroImage],
    },
  };
}
```

**Benefits:**

- ✅ SEO optimization
- ✅ Social media sharing (Open Graph)
- ✅ Dynamic page titles
- ✅ Proper meta descriptions

### Static Parameter Generation

```typescript
export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}
```

**Benefits:**

- ✅ Pre-built pages at deploy time
- ✅ Zero-latency page loads
- ✅ Better SEO (static pages are favored)
- ✅ Automatic regeneration on data changes

---

## 🎨 Tailwind Classes Reference

### Hero Section

```
bg-gradient-to-b from-emerald-50/50 to-white
grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12
bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent
shadow-2xl rounded-2xl
```

### Dropdown Menu

```
bg-white rounded-lg shadow-lg border border-brand-light/20
px-6 py-3 hover:bg-emerald-50/50
transition-transform rotate-180
```

### FAQ Accordion

```
border border-brand-light/30 rounded-lg shadow-sm hover:shadow-md
px-6 py-4 md:py-5 bg-white hover:bg-brand-light/20
w-5 h-5 text-emerald-600
bg-brand-light/10 px-6 py-4
```

### CTA Section

```
bg-gradient-to-r from-emerald-50 to-teal-50
border-t border-brand-light/20
py-16 md:py-20
```

---

## 🔌 Dependencies Used

**Already Installed:**

- ✅ `next` - App Router, Image optimization
- ✅ `framer-motion` - Page animations
- ✅ `@heroicons/react` - ChevronDown icon
- ✅ `tailwindcss` - Styling

**No additional packages required!**

---

## 📊 Component Statistics

| File              | Lines | Type      | Purpose                  |
| ----------------- | ----- | --------- | ------------------------ |
| servicesData.ts   | 285   | Data      | Service definitions      |
| Header.tsx        | 251   | Component | Navigation with dropdown |
| [slug]/page.tsx   | 307   | Page      | Service detail page      |
| [slug]/layout.tsx | 35    | Layout    | Metadata generation      |

**Total New/Modified Code:** ~878 lines

---

## ✨ Key Features

✅ **Type Safe** - Full TypeScript support
✅ **Responsive** - Works on all devices
✅ **Accessible** - Keyboard navigation, ARIA labels
✅ **Performant** - Static generation, image optimization
✅ **Animated** - Smooth transitions with Framer Motion
✅ **SEO Friendly** - Dynamic metadata, Open Graph
✅ **Maintainable** - Centralized data, reusable components
✅ **Extensible** - Easy to add new services

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Vercel auto-detects Next.js
3. Pages pre-built automatically
4. Dynamic metadata works out of the box

### Self-Hosted

```bash
npm run build
npm start
```

All service pages are pre-built and served statically.

---

**Last Updated:** December 13, 2025
**Version:** 1.0
**Status:** ✅ Production Ready
