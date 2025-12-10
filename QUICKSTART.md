# 🚀 Quick Start Guide - Mobile-Optimized Relicus v9.0

## ✅ What's New in v9.0

Your website is now **fully mobile-friendly** and **performance-optimized**! Here's what changed:

### Mobile Features:

- 📱 Hamburger menu for mobile navigation
- 👆 Touch-friendly buttons (44px minimum)
- 📐 Responsive layouts for all screen sizes
- 🖼️ Optimized images for faster loading
- ⚡ Smooth animations with reduced motion support

---

## 🏃 Getting Started (3 Steps)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

Copy and configure your environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:

```env
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Test on Mobile

### Option 1: Chrome DevTools

1. Open your site in Chrome
2. Press F12 to open DevTools
3. Click the device toggle button (or Ctrl+Shift+M)
4. Select a mobile device

### Option 2: Real Device (Same Network)

1. Start dev server: `npm run dev`
2. Find your computer's IP:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` (look for inet)
3. On your phone, browse to: `http://YOUR_IP:3000`

Example: `http://192.168.1.100:3000`

---

## 🎯 Key Mobile Features to Test

### Navigation

- ✅ Tap the hamburger menu (top right)
- ✅ Menu should slide open smoothly
- ✅ Tap links to navigate
- ✅ Menu closes after selection

### Hero Section

- ✅ Text is readable without zooming
- ✅ Buttons are easy to tap
- ✅ Images load quickly

### Services Carousel

- ✅ Swipe left/right works smoothly
- ✅ Tap arrow buttons to navigate
- ✅ Service cards are properly sized

### Therapist Cards

- ✅ Cards stack vertically on mobile
- ✅ "Book now" button is full-width
- ✅ All text is readable

### Search

- ✅ Search bar is easy to use
- ✅ Keyboard appears properly
- ✅ Results filter instantly

---

## 🛠️ Build & Deploy

### Build for Production

```bash
npm run build
```

This command:

- Optimizes all images
- Minifies CSS and JavaScript
- Generates static pages
- Shows bundle sizes

### Test Production Build

```bash
npm run start
```

### Deploy to Vercel

```bash
git add .
git commit -m "v9.0: Mobile optimization"
git push origin main
```

Vercel will automatically deploy your changes.

---

## 📊 Performance Checklist

Before deploying, verify these:

- [ ] Build completes without errors
- [ ] Site works on mobile Chrome/Safari
- [ ] Navigation menu opens/closes smoothly
- [ ] All buttons are touch-friendly
- [ ] Images load quickly
- [ ] No horizontal scrolling (except carousel)
- [ ] Forms work with mobile keyboard
- [ ] Payment flow works on mobile

---

## 🔍 Run Performance Tests

### Lighthouse Audit (Chrome)

1. Open your site in Chrome
2. Press F12 → Lighthouse tab
3. Select "Mobile" device
4. Click "Generate report"

**Target Scores:**

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Test on Slow Connection

Chrome DevTools → Network tab → Throttling → Slow 3G

---

## 📂 Project Structure

```
Relicus/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── layout.tsx         # ✨ Updated: Mobile viewport
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # ✨ Updated: Mobile styles
│   ├── components/
│   │   ├── Header.tsx         # ✨ NEW: Hamburger menu
│   │   ├── HomeClient.tsx     # ✨ Updated: Responsive
│   │   ├── ServicesMarquee.tsx # ✨ Updated: Mobile carousel
│   │   ├── TherapistCard.tsx  # ✨ Updated: Flexible layout
│   │   └── ...
│   ├── models/                # MongoDB schemas
│   └── lib/                   # Utilities
├── public/                    # Static assets
├── next.config.mjs           # ✨ Updated: Image optimization
├── package.json
├── README.md                 # ✨ Updated to v9.0
├── MOBILE_OPTIMIZATION.md    # ✨ NEW: Mobile guide
└── OPTIMIZATION_SUMMARY.md   # ✨ NEW: Complete summary
```

---

## 🆘 Troubleshooting

### Issue: Build fails

**Solution:** Run `npm install` to ensure all dependencies are installed

### Issue: Mobile menu doesn't open

**Solution:** Clear browser cache and hard reload (Ctrl+Shift+R)

### Issue: Images not loading

**Solution:** Verify image paths and Next.js Image configuration

### Issue: Slow on mobile

**Solution:**

- Check image sizes are optimized
- Verify production build is used (`npm run build && npm run start`)
- Test on different network speeds

---

## 📖 Documentation

- **Mobile Optimization Guide**: [MOBILE_OPTIMIZATION.md](./MOBILE_OPTIMIZATION.md)
- **Optimization Summary**: [OPTIMIZATION_SUMMARY.md](./OPTIMIZATION_SUMMARY.md)
- **Therapist System**: [THERAPIST_SYSTEM.md](./THERAPIST_SYSTEM.md)
- **Full README**: [README.md](./README.md)

---

## 🎉 You're All Set!

Your website is now:

- ✅ Mobile-friendly
- ✅ Performance-optimized
- ✅ Production-ready
- ✅ Touch-accessible

Run `npm run dev` and test it out! 🚀

---

**Need Help?**

- Check error messages in the terminal
- Review browser console for warnings
- Refer to documentation files above
- Test on multiple devices

**Happy Coding! 💚**
