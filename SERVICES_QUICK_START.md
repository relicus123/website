# Services Refactor - Quick Start Guide

## ✅ What's Been Implemented

You now have a complete, professional services ecosystem:

1. **Centralized Services Data** (`src/data/servicesData.ts`)

   - 6 services with full descriptions and FAQs
   - TypeScript interfaces for type safety
   - Backward-compatible with existing code

2. **Enhanced Header Component** (`src/components/Header.tsx`)

   - Desktop: Services dropdown opens on hover
   - Mobile: Services accordion opens on click
   - Auto-closes with smooth transitions
   - Links to dynamic service pages

3. **Dynamic Service Pages** (`src/app/services/[slug]/page.tsx`)
   - Beautiful hero section with split layout
   - Detailed content with professional typography
   - Interactive FAQ accordion with smooth animations
   - CTA section to encourage bookings
   - Automatic 404 handling for invalid slugs

---

## 🚀 Try It Now

### Option 1: Start Dev Server

```bash
npm run dev
```

Then navigate to: http://localhost:3000

### Option 2: View a Service

Click "Services" in the navbar dropdown, or visit directly:

- http://localhost:3000/services/counselling-psychotherapy
- http://localhost:3000/services/psychological-assessments
- http://localhost:3000/services/learning-support-remedial
- http://localhost:3000/services/speech-language-services
- http://localhost:3000/services/training-workshops
- http://localhost:3000/services/referral-support-services

---

## 📝 Code Overview

### Part 1: Services Data Structure

```typescript
// src/data/servicesData.ts
export interface Service {
  id: string;
  title: string;
  slug: string;
  heroImage: string;
  shortDescription: string;
  fullDescription: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const servicesData: Service[] = [
  {
    id: "counselling-psychotherapy",
    title: "Counselling & Psychotherapy",
    slug: "counselling-psychotherapy",
    heroImage: "/images/services/Counselling & Psychotherapy.png",
    shortDescription: "...",
    fullDescription: "...",
    faqs: [...]
  },
  // ... 5 more services
];
```

### Part 2: Header Dropdown

```typescript
// src/components/Header.tsx - Key sections

// Services dropdown with hover/click handlers
<div
  ref={dropdownRef}
  className="relative"
  onMouseEnter={handleDropdownEnter}
  onMouseLeave={handleDropdownLeave}
>
  <button className="flex items-center gap-2">
    Services
    <svg
      className={`transition-transform ${
        servicesDropdownOpen ? "rotate-180" : ""
      }`}
    >
      {/* Chevron icon */}
    </svg>
  </button>

  {/* Dropdown Menu */}
  {servicesDropdownOpen && (
    <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg">
      {servicesData.map((service) => (
        <Link href={`/services/${service.slug}`}>{service.title}</Link>
      ))}
    </div>
  )}
</div>
```

### Part 3: Service Page Structure

```typescript
// src/app/services/[slug]/page.tsx

// Hero Section
<section className="bg-gradient-to-b from-emerald-50/50 to-white">
  <h1 className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
    {service.title}
  </h1>
  <Image src={service.heroImage} alt={service.title} />
</section>

// Detailed Content
<section>
  <p>{service.fullDescription}</p>
</section>

// FAQ Accordion
<section>
  {service.faqs.map((faq, index) => (
    <div key={index} onClick={() => toggleFAQ(index)}>
      <h3>{faq.question}</h3>
      {expandedFAQ === index && <p>{faq.answer}</p>}
    </div>
  ))}
</section>
```

---

## 🎨 Styling Highlights

- **Hero Gradient:** `from-emerald-600 to-teal-500` (brand colors)
- **Background:** `bg-gradient-to-b from-emerald-50/50 to-white`
- **Hover Effects:** `hover:bg-emerald-50/50`, `hover:shadow-md`
- **Icons:** Rotating chevron on FAQ expand
- **Responsive:** Mobile stacks, desktop side-by-side

---

## ⚡ Animation Details

### Page Entry

- Fade-in with slight upward movement
- 600ms smooth transition

### FAQ Accordion

- Height expands from 0 to auto
- Opacity transitions 0 to 1
- Chevron rotates 0° to 180°
- 300ms smooth easing

### Dropdown Menu

- 200ms delay before closing (prevents flickering)
- Smooth hover transitions

---

## 🔧 Customization

### Add a New Service

1. Open `src/data/servicesData.ts`
2. Add new object to `servicesData` array:

```typescript
{
  id: "new-service",
  title: "New Service",
  slug: "new-service",
  heroImage: "/images/services/New Service.png",
  shortDescription: "Brief 2-line summary",
  fullDescription: "Detailed paragraph about the service",
  faqs: [
    { question: "Q1?", answer: "A1." },
    // ... more FAQs
  ]
}
```

3. Page automatically created at `/services/new-service`
4. Dropdown menu updates automatically

### Change Colors

- Update gradient classes: `from-emerald-600 to-teal-500`
- Change hover colors: `hover:bg-emerald-50/50`
- Modify backgrounds: `bg-gradient-to-b from-emerald-50/50`

### Adjust Animation Speed

- Page duration: Change `duration: 0.6` to `duration: 1.0`
- FAQ animation: Change `duration: 0.3` to `duration: 0.5`

---

## 📋 Testing Checklist

✅ Build runs: `npm run build`
✅ No TypeScript errors
✅ Navbar dropdown works on desktop (hover)
✅ Mobile services menu works (click)
✅ Service pages load correctly
✅ FAQs expand/collapse smoothly
✅ Images display properly
✅ All links work
✅ Responsive on mobile
✅ Navigation closes after selection

---

## 🚀 Production Checklist

- [ ] Add real images to `/public/images/services/`
- [ ] Test all 6 service pages in production
- [ ] Verify metadata for SEO (title, description, OG images)
- [ ] Test on multiple devices
- [ ] Verify animations on slower devices
- [ ] Check accessibility (keyboard navigation, screen readers)
- [ ] Run lighthouse audit
- [ ] Deploy to production

---

## 📚 Related Files

- **Main Component:** `src/components/Header.tsx` (251 lines)
- **Data File:** `src/data/servicesData.ts` (285 lines)
- **Service Page:** `src/app/services/[slug]/page.tsx` (307 lines)
- **Service Layout:** `src/app/services/[slug]/layout.tsx` (35 lines)
- **Documentation:** `SERVICES_REFACTOR_COMPLETE.md`

---

## 🤔 FAQ

**Q: How do I add more FAQs to a service?**
A: Edit the `faqs` array in `src/data/servicesData.ts` for any service.

**Q: Can I change the dropdown animation speed?**
A: Yes, modify the `200` in `setTimeout` for close delay, or the `transition` properties.

**Q: How do I customize the service page layout?**
A: Edit the sections in `src/app/services/[slug]/page.tsx` - hero, content, FAQ, CTA.

**Q: Will service pages be SEO-friendly?**
A: Yes! Dynamic metadata is generated automatically, and pages are pre-built at deploy time.

**Q: Can users book from the service page?**
A: Yes! Both "Book Now" buttons link to `/#book` section. Link to actual booking system in those buttons.

---

**Status:** ✅ Complete & Ready to Use
**Last Updated:** December 13, 2025
