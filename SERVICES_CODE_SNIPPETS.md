# Code Snippets - Quick Reference

## Accessing Services Data

### Import services
```typescript
import { servicesData } from "@/data/servicesData";

// Get all services
const allServices = servicesData;

// Find a specific service
const service = servicesData.find(s => s.slug === "counselling-psychotherapy");

// Map through services
servicesData.map(service => (
  <a key={service.id} href={`/services/${service.slug}`}>
    {service.title}
  </a>
))
```

---

## Header Dropdown Example

### Basic structure
```typescript
import { servicesData } from "@/data/servicesData";

<button className="flex items-center gap-2">
  Services
  <svg className={`transition-transform ${open ? "rotate-180" : ""}`}>
    <path strokeLinecap="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
</button>

{open && (
  <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg">
    {servicesData.map((service) => (
      <a 
        key={service.id}
        href={`/services/${service.slug}`}
        className="block px-6 py-3 hover:bg-emerald-50/50"
      >
        {service.title}
      </a>
    ))}
  </div>
)}
```

---

## Service Page Usage

### Next.js Dynamic Route
```typescript
// File: src/app/services/[slug]/page.tsx

export default function ServicePage({ params }) {
  const service = servicesData.find(s => s.slug === params.slug);
  
  if (!service) notFound();
  
  return (
    <main>
      {/* Hero section */}
      <h1>{service.title}</h1>
      <Image src={service.heroImage} alt={service.title} />
      
      {/* Content section */}
      <p>{service.fullDescription}</p>
      
      {/* FAQ section */}
      {service.faqs.map((faq) => (
        <div key={faq.question}>
          <button>{faq.question}</button>
          <p>{faq.answer}</p>
        </div>
      ))}
    </main>
  );
}
```

---

## FAQ Accordion Component

### Basic accordion pattern
```typescript
const [expanded, setExpanded] = useState<number | null>(null);

{faqs.map((faq, index) => (
  <div key={index} className="border rounded-lg">
    {/* Header */}
    <button
      onClick={() => setExpanded(expanded === index ? null : index)}
      className="w-full px-6 py-4 flex items-center justify-between"
    >
      <span>{faq.question}</span>
      <ChevronDownIcon 
        className={`w-5 h-5 transition-transform ${
          expanded === index ? "rotate-180" : ""
        }`}
      />
    </button>
    
    {/* Body with animation */}
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: expanded === index ? "auto" : 0,
        opacity: expanded === index ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="px-6 py-4">{faq.answer}</p>
    </motion.div>
  </div>
))}
```

---

## Page Entry Animation

### Framer Motion pattern
```typescript
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Usage
<motion.main
  variants={pageVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h1 variants={itemVariants}>Title</motion.h1>
    <motion.p variants={itemVariants}>Description</motion.p>
  </motion.div>
</motion.main>
```

---

## Hero Section Layout

### Split layout pattern
```typescript
<section className="bg-gradient-to-b from-emerald-50/50 to-white py-32">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Left */}
    <div>
      <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
        Title
      </h1>
      <p className="text-xl text-brand-dark/80 mt-4">
        Description
      </p>
      <button className="button-primary mt-8">
        Action
      </button>
    </div>
    
    {/* Right */}
    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
      <Image src="/image.jpg" alt="Title" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  </div>
</section>
```

---

## Dynamic Metadata

### Next.js metadata pattern
```typescript
import { Metadata } from "next";
import { servicesData } from "@/data/servicesData";

export async function generateMetadata({
  params,
}): Promise<Metadata> {
  const service = servicesData.find(s => s.slug === params.slug);
  
  if (!service) return { title: "Not Found" };
  
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

export function generateStaticParams() {
  return servicesData.map(service => ({
    slug: service.slug,
  }));
}
```

---

## Dropdown Menu with Hover

### Desktop dropdown pattern
```typescript
const [open, setOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);
const timeoutRef = useRef<NodeJS.Timeout>();

const handleEnter = () => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  setOpen(true);
};

const handleLeave = () => {
  timeoutRef.current = setTimeout(() => {
    setOpen(false);
  }, 200); // 200ms delay
};

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };
  
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

<div
  ref={dropdownRef}
  className="relative"
  onMouseEnter={handleEnter}
  onMouseLeave={handleLeave}
>
  <button>Services</button>
  
  {open && (
    <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg">
      {/* Items */}
    </div>
  )}
</div>
```

---

## CTA Section Pattern

### Call-to-action section
```typescript
<section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold text-brand-dark mb-4">
      Ready to Get Started?
    </h2>
    <p className="text-lg text-brand-dark/70 mb-8">
      Description text here...
    </p>
    <div className="flex gap-4 justify-center flex-wrap">
      <button className="button-primary px-8 py-3">
        Primary Action
      </button>
      <button className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50">
        Secondary Action
      </button>
    </div>
  </div>
</section>
```

---

## 404 Handling

### Not found pattern
```typescript
import { notFound } from "next/navigation";
import { servicesData } from "@/data/servicesData";

export default function ServicePage({ params }) {
  const service = servicesData.find(s => s.slug === params.slug);
  
  if (!service) {
    notFound(); // Shows built-in 404 page
  }
  
  return (
    // Page content
  );
}
```

---

## Service Data Structure

### Adding a new service
```typescript
{
  id: "unique-id",
  title: "Service Title",
  slug: "service-slug",
  heroImage: "/images/services/Service.png",
  shortDescription: "One or two line summary of the service.",
  fullDescription: `
    Detailed paragraph describing the service. This can be 100+ words 
    explaining what the service offers, benefits, and outcomes.
    Multiple sentences to provide comprehensive information.
  `,
  faqs: [
    {
      question: "What is...?",
      answer: "Answer here..."
    },
    {
      question: "How does...?",
      answer: "Answer here..."
    },
    // ... more FAQs
  ]
}
```

---

## Responsive Typography

### Typography scaling
```typescript
// Large headings
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
  Title
</h1>

// Paragraphs
<p className="text-base md:text-lg lg:text-xl leading-relaxed">
  Content
</p>

// Small text
<p className="text-sm md:text-base text-brand-dark/70">
  Secondary content
</p>
```

---

## Gradient Text

### Brand gradient pattern
```typescript
// Primary gradient (emerald to teal)
<h1 className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
  Gradient Text
</h1>

// Custom gradient
<h2 className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
  Custom Gradient
</h2>
```

---

## Image Optimization

### Next.js Image best practices
```typescript
import Image from "next/image";

<Image
  src="/images/services/Service.png"
  alt="Service description"
  width={800}
  height={600}
  className="object-cover rounded-lg"
  priority // for above-fold images
/>

// With container
<div className="relative h-96 rounded-lg overflow-hidden">
  <Image
    src="/image.jpg"
    alt="Alt text"
    fill
    className="object-cover"
  />
</div>
```

---

## Tailwind Utilities Reference

### Colors
```
from-emerald-600 to-teal-500  // Brand gradient
bg-emerald-50/50              // Light emerald background
text-brand-dark               // Brand dark text
hover:bg-emerald-50/50        // Hover background
```

### Spacing
```
py-16 md:py-24                // Vertical padding (responsive)
px-4 md:px-6                  // Horizontal padding
gap-4 md:gap-8                // Gap between items
mt-8                          // Margin top
```

### Sizing
```
h-96 md:h-[500px]             // Height responsive
w-full                        // Full width
max-w-3xl                      // Max width container
```

### Effects
```
shadow-lg                     // Large shadow
rounded-lg                    // Rounded corners
border border-brand-light/20  // Border with opacity
overflow-hidden               // Clip content
```

---

**Last Updated:** December 13, 2025
**All code snippets are production-ready** ✅
