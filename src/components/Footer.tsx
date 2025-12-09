export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <p className="font-semibold mb-3">Services</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Online Therapy</li>
            <li>Physiotherapy</li>
            <li>Clinical Psychology</li>
            <li>Wellness Coaching</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Company</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>About</li>
            <li>Careers</li>
            <li>Blogs</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Support</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Refunds</li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="font-semibold">Stay connected</p>
          <p className="text-sm text-white/80">
            24/7 chat support and expert guidance whenever you need it.
          </p>
          <div className="flex gap-2">
            <span className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
              in
            </span>
            <span className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
              fb
            </span>
            <span className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
              ig
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} YourCare Platform. Built for reliable,
        conflict-free scheduling and payments.
      </div>
    </footer>
  );
}
