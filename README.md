# Relicus - Mental Health & Wellness Platform (v8.0)

Full-stack Next.js 14 platform for booking therapists with reliable Razorpay payments, comprehensive mental health services, and MongoDB Atlas backend.

## Stack

- **Frontend:** Next.js 14 (App Router, TypeScript, React 18)
- **Styling:** Tailwind CSS with medical brand palette (Midnight Blue, Healing Green, Calm Blue, Gainsboro)
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Payments:** Razorpay (orders, signature verification)
- **Email:** Zoho Mail via Nodemailer
- **Images:** Local static assets (SVG & image files)
- **Deployment:** Vercel-ready

## Features

✅ **Mental Health Services Directory**

- 6 core services: Counselling, Assessments, Learning Support, Speech Therapy, Training, Referral Services
- Horizontal scrolling carousel with manual + auto-scroll
- Netflix-style service detail modals
- Local SVG placeholder system for fast loading

✅ **Therapist Booking System**

- Complete therapist directory with search functionality
- Therapist profiles: name, designation, specialties, session price, bio
- Real-time search by name or specialty
- Therapist admin panel for managing profiles

✅ **Razorpay Payment Integration**

- Secure order creation with booking metadata
- Payment signature verification (HMAC SHA256)
- Automatic booking confirmation on payment success
- Error handling and retry logic

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

**Required variables:**

- `MONGODB_URI` - MongoDB Atlas connection string
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Razorpay test/live key ID (for browser)
- `RAZORPAY_KEY_ID` - Razorpay key ID (for server)
- `RAZORPAY_KEY_SECRET` - Razorpay secret key (for signature verification)

**Optional variables:**

- `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` - Zoho SMTP credentials
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET` - NextAuth configuration

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Add Sample Therapists

Visit the admin panel at `/admin/therapists` and create sample therapist profiles:

1. Click "Add Therapist"
2. Fill in details: name, designation, photo URL, session price, bio, specialties
3. Click "Create Therapist"

### 5. Test Booking Flow

1. Navigate to the "Find a Specialist" section on the home page
2. Search for a therapist by name or designation
3. Click "Book" on a therapist card
4. In the payment modal, click "Pay ₹[amount]"
5. Complete payment through Razorpay test flow

### 6. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── therapists/
│   │   │   └── route.ts              # GET public therapist list (with search)
│   │   ├── admin/
│   │   │   └── therapists/
│   │   │       ├── route.ts          # POST create, GET admin list
│   │   │       └── [id]/route.ts     # GET/PUT/DELETE single therapist
│   │   └── payments/
│   │       ├── create-order/route.ts # POST create Razorpay order
│   │       └── verify/route.ts       # POST verify payment + create booking
│   ├── admin/
│   │   └── therapists/
│   │       └── page.tsx              # Admin therapist management UI
│   ├── globals.css                   # Tailwind + custom brand classes
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page with sections
├── components/
│   ├── TherapistsSection.tsx         # Main therapist listing section
│   ├── TherapistCard.tsx             # Individual therapist card
│   ├── TherapistPaymentModal.tsx     # Payment confirmation modal
│   ├── ServicesMarquee.tsx           # Services carousel
│   ├── ServiceDetailModal.tsx        # Service detail modal
│   ├── HeroSlideshow.tsx             # Hero banner
│   └── ChatbotPanel.tsx              # Screening chatbot
├── lib/
│   ├── mongodb.ts                    # Mongoose connection utility
│   └── email.ts                      # Zoho email helper
├── models/
│   ├── Therapist.ts                  # Therapist schema
│   ├── Booking.ts                    # Booking schema
│   ├── Physiologist.ts               # Legacy physiologist schema
│   └── HeroBanner.ts                 # Hero banner schema
└── data/
    └── servicesData.ts               # 6 core services data
```

## API Endpoints

### Public Endpoints

#### Therapists

- `GET /api/therapists` - List all active therapists
- `GET /api/therapists?q=query` - Search therapists by name or designation

#### Payments

- `POST /api/payments/create-order` - Create Razorpay order

  - Body: `{ therapistId, therapistName, amount }`
  - Returns: Razorpay order object

- `POST /api/payments/verify` - Verify payment and create booking
  - Body: `{ orderId, paymentId, signature, therapistId, amount, userId? }`
  - Returns: Booking confirmation with ID

### Admin Endpoints

#### Therapists Management

- `POST /api/admin/therapists` - Create new therapist

  - Body: `{ name, designation, photo, price, bio?, specialties?, isActive? }`
  - Returns: Created therapist

- `GET /api/admin/therapists` - List all therapists (including inactive)

  - Returns: Array of all therapists

- `GET /api/admin/therapists/[id]` - Get single therapist

  - Returns: Therapist details

- `PUT /api/admin/therapists/[id]` - Update therapist

  - Body: Partial therapist object with fields to update
  - Returns: Updated therapist

- `DELETE /api/admin/therapists/[id]` - Delete therapist
  - Returns: Success message

## Database Models

### Therapist

```typescript
{
  _id: ObjectId
  name: string (required)
  designation: string (required)
  photo: string (required) - URL to therapist photo
  price: number (required) - Session price in ₹
  bio?: string
  specialties?: string[]
  isActive: boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

### Booking

```typescript
{
  _id: ObjectId
  therapistId: ObjectId (reference to Therapist)
  userId?: ObjectId
  paymentId: string (Razorpay payment ID)
  orderId: string (Razorpay order ID)
  amount: number
  status: string ("confirmed", "pending", "cancelled")
  bookingDate: Date
  createdAt: Date
  updatedAt: Date
}
```

## Payment Flow

1. **User initiates booking:**

   - Clicks "Book" on therapist card
   - TherapistPaymentModal opens with booking details

2. **Create order:**

   - Frontend calls `POST /api/payments/create-order`
   - Backend creates Razorpay order with amount in paise
   - Returns order ID

3. **Razorpay checkout:**

   - Razorpay SDK loaded dynamically
   - Checkout modal opens for payment
   - User completes payment

4. **Payment verification:**

   - Razorpay sends payment response
   - Frontend calls `POST /api/payments/verify`
   - Backend verifies HMAC SHA256 signature
   - On success: Booking record created in MongoDB
   - Returns booking confirmation

5. **User confirmation:**
   - Success message displayed
   - Modal closes
   - Optional: Email confirmation sent

## Razorpay Test Credentials

For testing, use these credentials:

**Card Number:** 4111 1111 1111 1111
**Expiry:** 02/25
**CVV:** 123

## Design System (Medical Professional Palette)

| Color Name    | Hex Code  | Usage                             |
| ------------- | --------- | --------------------------------- |
| Midnight Blue | `#1c4966` | Headers, navbars, primary actions |
| Healing Green | `#5f8b70` | "Book Now" buttons, success text  |
| Calm Blue     | `#8fbdd7` | Cards, secondary elements         |
| Gainsboro     | `#e0dfdd` | Backgrounds, borders              |

**Typography:**

- Headers: Work Sans (Bold)
- Body: Manrope (Regular/Medium)

## Deployment

### Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy (automatic on main branch push)

### Environment Variables in Production

- `MONGODB_URI` - Production MongoDB connection
- `RAZORPAY_KEY_ID` - Live Razorpay key ID
- `RAZORPAY_KEY_SECRET` - Live Razorpay secret
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Live Razorpay key ID (public)

### MongoDB Atlas

- Use M0 Free or M2 paid cluster
- Whitelist Vercel IP: `0.0.0.0/0` (with strong password) or specific IPs
- Keep backups enabled

### Razorpay

- Switch to Live mode for production
- Update webhook URL in dashboard if using webhooks
- Use live keys in `.env.local` for production

## Troubleshooting

### Build Errors

**"Cannot find module '@/lib/mongodb'"**

- Ensure TypeScript paths are configured in `tsconfig.json`
- Restart development server

### Database Issues

**MongoDB connection timeout**

- Check connection string in `.env.local`
- Verify IP whitelist in MongoDB Atlas
- Ensure network connectivity

### Payment Issues

**"Invalid Razorpay key"**

- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
- Check it matches your Razorpay dashboard

**Payment verification failed**

- Verify `RAZORPAY_KEY_SECRET` is correct
- Check signature generation logic uses correct order

### API Errors

**404 on therapist endpoints**

- Ensure MongoDB is connected
- Check database has therapist records
- Visit `/admin/therapists` to add therapists

## Documentation

For detailed documentation on the therapist booking system, see [THERAPIST_SYSTEM.md](./THERAPIST_SYSTEM.md)

## License

Proprietary - Relicus Platform v8.0

## Support

For issues or questions:

1. Check the Troubleshooting section above
2. Review API examples in this README
3. Check browser console for client-side errors
4. Check server logs for backend errors
