# Integration Guide: Adding Therapist Section to Main Page

This guide explains how to integrate the `TherapistsSection` component into your main page.

## Step 1: Update the Main Page

Edit `src/app/page.tsx` and add the TherapistsSection import and component:

```tsx
import TherapistsSection from "@/components/TherapistsSection";

export default function Home() {
  return (
    <>
      {/* Existing sections */}
      <HeroSlideshow />
      <ServicesMarquee />

      {/* Add the Therapists Section */}
      <TherapistsSection />

      {/* Other sections if any */}
    </>
  );
}
```

## Step 2: Update Navigation

Add a link in your navigation to the Therapists section:

```tsx
// In your header/navigation component
<a href="#therapists" className="hover:text-brand-green transition">
  Find a Specialist
</a>
```

## Step 3: Test the Integration

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`

3. You should see:
   - The Therapists section header with green "Therapists" text
   - Search input field
   - Loading state initially, then therapist cards grid
   - Empty state if no therapists added

## Step 4: Add Sample Therapists

1. Visit `http://localhost:3000/admin/therapists`
2. Click "Add Therapist"
3. Fill in the form with sample data:

   - Name: Dr. Priya Sharma
   - Designation: Clinical Psychologist
   - Photo: https://via.placeholder.com/300x400?text=Dr.+Priya
   - Price: 500
   - Bio: Experienced clinical psychologist with 10+ years in mental health
   - Specialties: Anxiety, Depression, CBT
   - Active: ✓

4. Click "Create Therapist"

## Step 5: Test the Booking Flow

1. On the home page, scroll to "Find a Specialist"
2. Search for a therapist (e.g., type "Priya")
3. Click "Book" on the therapist card
4. In the payment modal, click "Pay ₹500"
5. Use Razorpay test credentials:
   - Card: 4111 1111 1111 1111
   - Expiry: 02/25
   - CVV: 123
6. Click "Pay" in Razorpay modal
7. You should see success message and booking confirmation

## Troubleshooting

### No therapists showing

- Check if therapists are added in admin panel: `/admin/therapists`
- Check MongoDB connection by visiting `/api/therapists` in browser
- Check browser console for API errors

### Search not working

- Make sure therapist names contain the search term
- Search is case-insensitive by default
- Try searching by designation instead of name

### Payment modal not opening

- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set in `.env.local`
- Check browser console for errors
- Check that Razorpay script loads successfully

### Booking not confirmed

- Verify `RAZORPAY_KEY_SECRET` matches your Razorpay account
- Check browser console for payment verification errors
- Check server logs for verification endpoint errors

## Styling Customization

The TherapistsSection uses brand colors defined in `tailwind.config.ts`:

```tsx
// Modify colors in TherapistsSection.tsx
<h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
  Our <span className="text-brand-green">Therapists</span>
</h2>
```

Available color classes:

- `text-brand-dark` - Midnight Blue (#1c4966)
- `text-brand-green` - Healing Green (#5f8b70)
- `text-brand-blue` - Calm Blue (#8fbdd7)
- `bg-brand-light` - Gainsboro (#e0dfdd)

## Additional Customization

### Change grid layout

In `TherapistsSection.tsx`, modify the grid:

```tsx
// Current: 1 col mobile, 2 cols tablet, 3 cols desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Option 1: 2 cols desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// Option 2: 4 cols desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Customize search placeholder

In `TherapistsSection.tsx`:

```tsx
placeholder = "Search by name or specialty...";
// Change to:
placeholder = "Find your therapist...";
```

### Change section colors

In `TherapistsSection.tsx`:

```tsx
<section id="therapists" className="bg-brand-light border-y border-brand-light/60">
// bg-brand-light is the background color - can customize
```

## API Integration

The TherapistsSection uses two main API endpoints:

### GET /api/therapists - Fetch all therapists

```bash
curl http://localhost:3000/api/therapists
```

### GET /api/therapists?q=search - Search therapists

```bash
curl http://localhost:3000/api/therapists?q=psychologist
```

Both return array of therapist objects with:

- `_id`: MongoDB ID
- `name`: Therapist name
- `designation`: Professional title
- `photo`: Image URL
- `price`: Session price in ₹
- `bio`: Professional background
- `specialties`: Array of specialization areas

## Next Steps

After integration, you can:

1. **Add more therapists** via admin panel
2. **Customize styling** to match your brand
3. **Add email notifications** for bookings (implement in `/api/payments/verify`)
4. **Set up therapist availability** (requires calendar/scheduling system)
5. **Create therapist detail pages** (click therapist name → `/therapist/[id]`)

See `THERAPIST_SYSTEM.md` for more advanced features and customization options.
