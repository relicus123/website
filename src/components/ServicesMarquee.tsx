const SERVICES = [
  {
    title: "Counselling & Psychotherapy",
    image:
      "https://res.cloudinary.com/dqpzzx5jb/image/upload/v1765209638/Counselling_Psychotherapy_wu8tcy.png",
  },
  {
    title: "Psychological Assessments",
    image:
      "https://res.cloudinary.com/dqpzzx5jb/image/upload/v1765209639/Psychological_Assessments_ttgjbx.png",
  },
  {
    title: "Learning Support & Remedial Services",
    image:
      "https://res.cloudinary.com/dqpzzx5jb/image/upload/v1765209637/Learning_Support_Remedial_Services_baje0p.png",
  },
  {
    title: "Speech & Language Services",
    image:
      "https://res.cloudinary.com/dqpzzx5jb/image/upload/v1765209637/Speech_Language_Services_suy56y.png",
  },
  {
    title: "Training, Internships & Professional Workshops",
    image:
      "https://res.cloudinary.com/dqpzzx5jb/image/upload/v1765209637/TrainingInterns_atwzb0.png",
  },
  {
    title: "Referral & Support Services",
    image:
      "https://res.cloudinary.com/dqpzzx5jb/image/upload/v1765209636/Referral_Support_Services_s8edlw.png",
  },
];

const DUPLICATED = [...SERVICES, ...SERVICES];

export default function ServicesMarquee() {
  return (
    <section
      id="services"
      className="bg-brand-light border-y border-brand-light/60"
      aria-label="Relicus services"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-wide text-brand-dark/70">
            Relicus Psychological Services
          </p>
          <h2 className="text-xl font-semibold text-brand-dark">
            Our services
          </h2>
          <p className="text-sm text-brand-dark/70 max-w-2xl mx-auto">
            Explore our core offerings, continuously showcased in a smooth
            horizontal carousel.
          </p>
        </div>

        <div className="services-marquee">
          <div className="marquee-track">
            {DUPLICATED.map((service, idx) => (
              <ServiceCard key={`${service.title}-${idx}`} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
}: {
  service: {
    title: string;
    image: string;
  };
}) {
  return (
    <div className="service-card">
      <div className="card h-full flex flex-col overflow-hidden shadow-md border border-brand-light/70 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <div className="h-48 w-full overflow-hidden bg-white">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <p className="text-base font-semibold text-brand-dark leading-snug">
            {service.title}
          </p>
        </div>
      </div>
    </div>
  );
}
