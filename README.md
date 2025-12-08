# Physiologist Consultation Platform (v7.0)

Full-stack Next.js 14 platform for booking physiologists with reliability-first payments (Razorpay), webhook recovery, PHQ-2/GAD-2 screening, and MongoDB Atlas.

## Stack

- **Frontend:** Next.js 14 (App Router, TypeScript, React 18)
- **Styling:** Tailwind CSS with medical brand palette (Midnight Blue, Healing Green, Calm Blue, Gainsboro)
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Payments:** Razorpay (orders, signature verification, webhooks, refunds)
- **Auth:** NextAuth.js (planned for admin dashboard)
- **Email:** Zoho Mail via Nodemailer
- **Images:** Cloudinary unsigned uploads
- **Deployment:** Vercel-ready

## Features

✅ **Bulletproof Booking Engine**

- Phase A (Filter): Slot API subtracts confirmed/paid bookings
- Phase B (Gatekeeper): Pre-payment slot validation
- Phase C (Safety Net): Webhook recovery + auto-refund on race conditions

✅ **PHQ-2 & GAD-2 Mental Health Screening Chatbot**

- Floating toggle button, guided questionnaire
- Health score feeds into booking metadata

✅ **Razorpay Payment Integration**

- Order creation with booking metadata in notes
- Signature verification
- Webhook fallback for ghost payments
- Automatic refund on double-booking conflicts

✅ **Doctor Directory & Booking Modal**

- Real-time availability fetching
- Multi-step booking flow (info → slots → payment)
- Success/error handling with user feedback

## Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

**Required variables:**

- `MONGODB_URI` - MongoDB Atlas connection string
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Razorpay test/live key ID
- `RAZORPAY_KEY_SECRET` - Razorpay secret key
- `RAZORPAY_WEBHOOK_SECRET` - Webhook verification secret
- `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` - Zoho SMTP credentials
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_PRESET` - Cloudinary config
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET` - NextAuth configuration

### 3. Seed Database

Visit `/api/seed` once to populate sample doctors:
\`\`\`bash
npm run dev

# Then open: http://localhost:3000/api/seed

\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
src/
├── app/
│ ├── api/
│ │ ├── doctors/ # Fetch physiologist directory
│ │ ├── slots/ # Available slot filtering
│ │ ├── payment/
│ │ │ ├── order/ # Razorpay order creation (gatekeeper)
│ │ │ └── verify/ # Payment signature verification
│ │ ├── webhooks/
│ │ │ └── razorpay/ # Ghost payment recovery + refunds
│ │ └── seed/ # Database seeding endpoint
│ ├── globals.css # Tailwind + custom brand classes
│ ├── layout.tsx # Root layout with Manrope font
│ └── page.tsx # Home page with hero + directory
├── components/
│ ├── DoctorDirectory.tsx # Doctor list + state management
│ ├── DoctorCard.tsx # Individual doctor cards
│ ├── BookingModal.tsx # Multi-step booking flow + Razorpay
│ └── ChatbotPanel.tsx # PHQ-2/GAD-2 screening interface
├── lib/
│ ├── mongodb.ts # Mongoose connection utility
│ ├── razorpay.ts # Razorpay client + helpers
│ └── email.ts # Nodemailer Zoho SMTP
├── models/
│ ├── Physiologist.ts # Doctor schema
│ └── Booking.ts # Booking schema (compound unique index)
├── scripts/
│ └── seedDoctors.ts # Sample data generator
└── types/
└── razorpay.d.ts # Razorpay window object types
\`\`\`

## API Endpoints

### Public

- `GET /api/doctors` - List all verified physiologists
- `GET /api/doctors/[id]` - Single doctor details
- `GET /api/slots?doctorId=X&date=YYYY-MM-DD` - Available slots
- `POST /api/payment/order` - Create Razorpay order (gatekeeper check)
- `POST /api/payment/verify` - Verify payment + confirm booking
- `POST /api/webhooks/razorpay` - Webhook handler (ghost payment recovery)

### Admin (one-time)

- `GET /api/seed` - Populate database with sample doctors

## Testing Scenarios

### Double-Booking Race Test

1. Open two browser tabs
2. Navigate to same doctor + date + slot
3. Initiate payment in both tabs simultaneously
4. **Expected:** One succeeds, other triggers automatic refund with error message

### Ghost Payment Test

1. Start booking flow, complete payment
2. Close browser before payment callback executes
3. **Expected:** Webhook automatically creates booking from order notes within seconds

### Webhook Recovery Test

1. Simulate network failure after payment
2. Razorpay webhook fires with `payment.captured` event
3. **Expected:** Booking created with `bookingSource: 'WEBHOOK'`, confirmation email sent

## Design System (Medical Professional Palette)

| Color Name    | Hex Code  | Usage                                 |
| ------------- | --------- | ------------------------------------- |
| Midnight Blue | `#1c4966` | Headers, navbars, active states       |
| Healing Green | `#5f8b70` | "Book Now" buttons, success messages  |
| Calm Blue     | `#8fbdd7` | Doctor cards (top), user chat bubbles |
| Gainsboro     | `#e0dfdd` | Page backgrounds, disabled states     |

**Typography:**

- Display: Work Sans
- Body: Manrope

## Deployment Notes

### Vercel Configuration

1. Add all environment variables in Vercel dashboard
2. Set `NEXTAUTH_URL` to your production domain
3. Configure Hostinger DNS:
   - A Record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

### MongoDB Atlas

- Use M0 Free Tier cluster
- Whitelist Vercel IP ranges or use `0.0.0.0/0` (with strong password)

### Razorpay Webhook

- Add webhook URL in Razorpay Dashboard: `https://yourdomain.com/api/webhooks/razorpay`
- Subscribe to `payment.captured` event
- Use Port 443 (HTTPS required)

### Zoho Mail

- Enable SMTP in Zoho admin panel
- Use app-specific password if 2FA is enabled
- Test with `/api/seed` (triggers console logs)

## Troubleshooting

**Build errors about missing env vars:**

- Env vars are optional at build time; they're checked at runtime in API routes

**Tailwind @apply warnings in IDE:**

- False positives; Tailwind directives are valid

**MongoDB connection fails:**

- Check IP whitelist in Atlas
- Verify connection string format
- Ensure network allows outbound 27017

**Razorpay payments not working:**

- Verify test keys are set for dev environment
- Check browser console for Razorpay script load errors
- Ensure `NEXT_PUBLIC_` prefix on `RAZORPAY_KEY_ID`

**Webhook not firing:**

- Use ngrok or similar for local testing
- Check Razorpay Dashboard → Webhooks → Logs
- Verify webhook secret matches `.env.local`

## License

Proprietary - Version 7.0 Final Master Release
