# Therapist Booking System Documentation

## Overview

The Relicus therapist booking system is a complete end-to-end solution for managing therapist profiles and processing online bookings with Razorpay payment integration.

## Architecture

### Backend Components

#### 1. **Therapist Data Model** (`src/models/Therapist.ts`)

- Mongoose schema for storing therapist information
- Fields: name, designation, photo URL, session price, bio, specialties, active status
- Includes full-text search indexes on name and designation
- Timestamps for creation/update tracking

#### 2. **API Endpoints**

**Public Endpoints:**

- `GET /api/therapists` - List all active therapists with optional search
  - Query: `?q=search_term` (searches name and designation)
  - Returns: Array of therapist objects

**Admin Endpoints:**

- `POST /api/admin/therapists` - Create new therapist

  - Required fields: name, designation, photo, price
  - Returns: Created therapist object

- `GET /api/admin/therapists` - List all therapists (including inactive)

  - Returns: Array of all therapists

- `GET /api/admin/therapists/[id]` - Get single therapist details

  - Returns: Therapist object or 404

- `PUT /api/admin/therapists/[id]` - Update therapist

  - Body: Any therapist fields to update
  - Returns: Updated therapist object

- `DELETE /api/admin/therapists/[id]` - Delete therapist
  - Returns: Success confirmation

**Payment Endpoints:**

- `POST /api/payments/create-order` - Create Razorpay order

  - Body: `{ therapistId, therapistName, amount }`
  - Returns: Razorpay order object with id, amount (in paise), currency

- `POST /api/payments/verify` - Verify and complete payment
  - Body: `{ orderId, paymentId, signature, therapistId, amount, userId? }`
  - Verifies Razorpay signature using HMAC SHA256
  - Creates Booking record on success
  - Returns: Booking confirmation with booking ID

### Frontend Components

#### 1. **TherapistCard** (`src/components/TherapistCard.tsx`)

- Displays therapist profile card
- Shows: Photo, name, designation, session price
- "Book" button triggers payment flow
- Hover animations with shadow and scale effects
- Brand color styling (Midnight Blue, Healing Green)

#### 2. **TherapistPaymentModal** (`src/components/TherapistPaymentModal.tsx`)

- Modal for booking confirmation and payment
- Displays therapist name and session price
- Handles Razorpay SDK loading and initialization
- Payment flow:
  1. Create order via `/api/payments/create-order`
  2. Initialize Razorpay checkout
  3. Handle payment response
  4. Verify on backend via `/api/payments/verify`
  5. Display success/error status
- Error handling with user-friendly messages

#### 3. **TherapistsSection** (`src/components/TherapistsSection.tsx`)

- Main section component for displaying therapist list
- Features:
  - Fetches therapists from `/api/therapists`
  - Search input with client-side filtering
  - Grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
  - Loading and empty states
  - Integrated TherapistPaymentModal
- State management: therapists list, filtered results, search query, payment modal state

#### 4. **Admin Therapist Panel** (`src/app/admin/therapists/page.tsx`)

- Full CRUD interface at `/admin/therapists`
- Features:
  - List all therapists in table format
  - Add new therapist (form modal)
  - Edit existing therapist
  - Delete therapist with confirmation
  - Show/hide active/inactive status
  - Specialties management (comma-separated input)
- Form validation and error messaging
- Success/error notifications

## Database Schema

### Therapist Model

```typescript
{
  _id: ObjectId,
  name: string,                    // Required
  designation: string,             // Required (e.g., "Clinical Psychologist")
  photo: string,                   // Required (URL)
  price: number,                   // Required (session price in ₹)
  bio?: string,                    // Optional (professional background)
  specialties?: string[],          // Optional (e.g., ["Anxiety", "Depression"])
  isActive: boolean,               // Default: true
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model

```typescript
{
  _id: ObjectId,
  therapistId: ObjectId,           // Reference to Therapist
  userId?: ObjectId,               // Optional user reference
  paymentId: string,               // Razorpay payment ID
  orderId: string,                 // Razorpay order ID
  amount: number,                  // Booking amount
  status: string,                  // "confirmed", "pending", "cancelled"
  bookingDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

**Required for production:**

```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id    # For browser (public)
```

**Optional:**

```
MONGODB_URI=mongodb://...  # Defaults to local MongoDB if not set
```

## Payment Flow

1. **User initiates booking:**

   - Clicks "Book" on therapist card
   - TherapistPaymentModal opens

2. **Create Order:**

   - Frontend calls `POST /api/payments/create-order`
   - Backend creates Razorpay order
   - Returns order ID and amount (in paise)

3. **Razorpay Checkout:**

   - Razorpay SDK loaded dynamically
   - Checkout modal opens with order details
   - User completes payment with Razorpay

4. **Payment Verification:**

   - Razorpay sends payment response
   - Frontend calls `POST /api/payments/verify`
   - Backend verifies signature using HMAC SHA256
   - Booking record created in MongoDB
   - Success confirmation sent to frontend

5. **User Confirmation:**
   - Success message displayed
   - Modal closes after 2 seconds
   - Optional: Email confirmation could be sent

## Integration Steps

### 1. Add TherapistsSection to main page

```tsx
// In your main page or layout
import TherapistsSection from "@/components/TherapistsSection";

export default function Home() {
  return (
    <>
      {/* Other sections */}
      <TherapistsSection />
    </>
  );
}
```

### 2. Add navigation link

```tsx
// In header/navigation
<a href="#therapists" className="...">
  Find a Specialist
</a>
```

### 3. Add admin panel link

```tsx
// In admin dashboard
<a href="/admin/therapists" className="...">
  Manage Therapists
</a>
```

## API Examples

### Search Therapists

```bash
curl "http://localhost:3000/api/therapists?q=psychologist"
```

### Create Therapist (Admin)

```bash
curl -X POST http://localhost:3000/api/admin/therapists \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Priya Sharma",
    "designation": "Clinical Psychologist",
    "photo": "https://example.com/priya.jpg",
    "price": 500,
    "bio": "15+ years in mental health care",
    "specialties": ["Anxiety", "Depression", "CBT"]
  }'
```

### Create Payment Order

```bash
curl -X POST http://localhost:3000/api/payments/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "therapistId": "65f7a3c1d6b8e4c2f1a5b9d2",
    "therapistName": "Dr. Priya Sharma",
    "amount": 500
  }'
```

### Verify Payment

```bash
curl -X POST http://localhost:3000/api/payments/verify \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "order_123456",
    "paymentId": "pay_123456",
    "signature": "signature_hash",
    "therapistId": "65f7a3c1d6b8e4c2f1a5b9d2",
    "amount": 500
  }'
```

## Troubleshooting

### Payment verification fails

- **Issue:** "Invalid signature" error
- **Solution:** Verify RAZORPAY_KEY_SECRET is correct and matches your Razorpay dashboard

### Therapist list empty

- **Issue:** No therapists showing on frontend
- **Solution:** Check `/api/admin/therapists` to add therapists via admin panel

### Razorpay script not loading

- **Issue:** Payment modal shows but Razorpay checkout doesn't open
- **Solution:**
  1. Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set in `.env.local`
  2. Check browser console for errors
  3. Ensure Razorpay account is active

### Database connection error

- **Issue:** "MongoDB connection failed"
- **Solution:**
  1. Ensure MongoDB is running
  2. Check `MONGODB_URI` in `.env.local`
  3. Verify database credentials

## Future Enhancements

- [ ] Therapist availability calendar/time slots
- [ ] Email confirmations for bookings
- [ ] SMS notifications
- [ ] Booking history and management
- [ ] Therapist ratings and reviews
- [ ] Cancellation and refund handling
- [ ] Session notes and follow-ups
- [ ] Insurance coverage integration
- [ ] Video consultation integration

## Security Considerations

1. **Razorpay Signature Verification:** Always verify payment signatures on the backend
2. **Admin Route Protection:** Add authentication middleware to admin endpoints
3. **API Rate Limiting:** Implement rate limiting on payment endpoints
4. **Input Validation:** All endpoints validate required fields
5. **CORS:** Configure appropriate CORS policies for production
6. **Environment Variables:** Never commit `.env.local` with real credentials

## Support & Questions

For issues or questions about the therapist booking system:

1. Check the troubleshooting section above
2. Review API examples in this documentation
3. Check browser console for client-side errors
4. Check server logs for backend errors
