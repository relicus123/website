"use client";

const highlights = [
  "Trauma care",
  "Rehabilitation",
  "Workplace wellbeing",
  "Community outreach",
  "Interactive webinars",
  "Education programs",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-light">
      <section className="bg-white border-b border-brand-light/60 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-wide text-brand-dark/70">
            About Relicus
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-brand-dark mt-2">
            Well-being, reimagined with evidence-based care
          </h1>
          <p className="mt-3 text-brand-dark/80 max-w-3xl">
            Relicus is a comprehensive psychological service platform introduced
            by a group of psychologists dedicated to promoting mental health,
            empowerment, and holistic well-being. We strive to make professional
            psychological support accessible and approachable for individuals,
            families, and organizations.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-brand-light/60 py-12">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="space-y-4">
            <div className="space-y-3 text-brand-dark/90 leading-relaxed">
              <p>
                Our work spans therapy, trauma care, rehabilitation, education,
                workplace wellbeing, and awareness programs. Through individual
                and group therapy sessions, interactive webinars, educational
                workshops, and community outreach, we create supportive
                environments where mental health is prioritized and stigma is
                reduced.
              </p>
              <p>
                We believe psychological well-being is the foundation of a
                healthy, empowered society. Our client-centered approach blends
                evidence-based practices with compassion, ensuring every
                individual receives the guidance and support they need to grow,
                heal, and thrive.
              </p>
              <p>
                Beyond therapy, Relicus is committed to awareness and education,
                bridging the gap between psychology and everyday life—whether in
                schools, businesses, or communities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-brand-light/70 border border-brand-light p-4">
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                  Our Vision
                </h3>
                <p className="text-sm text-brand-dark/80 leading-relaxed">
                  Fostering mental health, well-being, and inclusivity through
                  psychological care, education, research, and holistic
                  rehabilitation—delivered with evidence-based, compassionate
                  services that empower people to recover, grow, and flourish.
                </p>
              </div>
              <div className="rounded-xl bg-brand-light/70 border border-brand-light p-4">
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                  Our Mission
                </h3>
                <p className="text-sm text-brand-dark/80 leading-relaxed">
                  Provide compassionate, evidence-based, personalized mental
                  health care through a holistic, multidisciplinary approach:
                  psychotherapy, counseling, rehabilitation, and career
                  guidance, tailored to each profile—while advancing research
                  and community engagement via seminars, workshops, and
                  webinars.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-brand-dark/80">
              <span className="px-3 py-2 rounded-lg bg-brand-blue/20 border border-brand-blue/30">
                +91 6235 252 624
              </span>
              <span className="px-3 py-2 rounded-lg bg-brand-blue/20 border border-brand-blue/30">
                www.relicus.in
              </span>
            </div>
          </div>

          {/* Illustration / image block */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-brand-light shadow-sm bg-gradient-to-br from-brand-blue/30 via-white to-brand-light">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,#1c4966,transparent_25%),radial-gradient(circle_at_80%_0%,#5f8b70,transparent_25%),radial-gradient(circle_at_50%_80%,#8fbdd7,transparent_25%)]" />
            <div className="relative p-6 flex flex-col gap-4 h-full justify-center">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/80 border border-brand-light flex items-center justify-center text-2xl">
                  🧠
                </div>
                <div>
                  <p className="text-brand-dark text-sm">Holistic Care</p>
                  <p className="text-brand-dark font-semibold">
                    Therapy · Rehab · Education
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-white/80 border border-brand-light px-3 py-2 text-sm text-brand-dark"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-white/85 border border-brand-light p-4">
                <p className="text-brand-dark/90 text-sm leading-relaxed">
                  “Every individual deserves compassionate, evidence-based care
                  to recover, grow, and flourish. We’re here to make that
                  journey accessible.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
