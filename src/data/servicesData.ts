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
    shortDescription:
      "One-to-one therapy sessions in a safe, private space to help with stress, anxiety, depression, relationship issues, and personal emotional growth.",
    fullDescription:
      "Counselling and Psychotherapy at Relicus provides professional, confidential support for individuals dealing with emotional distress, mental health challenges, and life transitions. Our experienced therapists use evidence-based approaches such as Cognitive Behavioral Therapy (CBT), psychodynamic therapy, and humanistic methods to help you understand yourself better, develop healthy coping strategies, and achieve lasting positive change. Whether you're struggling with anxiety, depression, relationship issues, grief, or personal growth, our compassionate professionals are here to support your mental wellness journey. Sessions are tailored to your unique needs in a judgement-free environment.",
    faqs: [
      {
        question: "How long are therapy sessions?",
        answer:
          "Standard therapy sessions are 50-60 minutes long. Some clients opt for extended sessions or shorter check-in appointments based on their needs.",
      },
      {
        question: "How many sessions do I need?",
        answer:
          "The number of sessions varies depending on your goals and presenting concerns. Some clients benefit from short-term therapy (8-12 sessions), while others prefer ongoing support. Your therapist will work with you to determine the best plan.",
      },
      {
        question: "Is everything I share confidential?",
        answer:
          "Yes, client confidentiality is fundamental to therapy. Information shared in sessions is kept strictly confidential, with limited exceptions for safety concerns.",
      },
      {
        question: "Do you offer online sessions?",
        answer:
          "Yes, we offer both in-person and online therapy sessions via secure video conferencing for your convenience.",
      },
    ],
  },
  {
    id: "psychological-assessments",
    title: "Psychological Assessments",
    slug: "psychological-assessments",
    heroImage: "/images/services/Psychological Assessments.png",
    shortDescription:
      "Scientific evaluation of emotional, behavioral, and mental health concerns for accurate diagnosis and comprehensive treatment planning.",
    fullDescription:
      "Psychological assessments are comprehensive evaluations conducted by qualified psychologists to understand cognitive abilities, emotional functioning, behavioral patterns, and mental health concerns. Using validated psychological tests, clinical interviews, and behavioral observations, we provide detailed insights into your psychological profile. These assessments are valuable for diagnosis, treatment planning, academic accommodations, occupational guidance, and personal understanding. Our assessments follow international standards and ethical guidelines, ensuring accuracy and reliability. Results are presented in a detailed report with clear recommendations for management and support.",
    faqs: [
      {
        question: "What types of assessments do you offer?",
        answer:
          "We conduct various assessments including intelligence testing, personality assessment, emotional functioning, cognitive ability, learning disability evaluation, and occupational aptitude testing.",
      },
      {
        question: "How long does an assessment take?",
        answer:
          "Assessments typically take 2-4 hours depending on the type. Complex evaluations may require multiple sessions.",
      },
      {
        question: "When will I receive the results?",
        answer:
          "A comprehensive report is usually provided within 7-10 business days of completing the assessment, followed by a feedback session.",
      },
      {
        question:
          "Can assessment results be used for educational accommodations?",
        answer:
          "Yes, our assessments are recognized by educational institutions and can support requests for accommodations and special provisions.",
      },
    ],
  },
  {
    id: "learning-support-remedial",
    title: "Learning Support & Remedial Services",
    slug: "learning-support-remedial",
    heroImage: "/images/services/Learning Support & Remedial Services.png",
    shortDescription:
      "Specialized academic support for children with learning difficulties to improve reading, writing, attention, and overall school performance.",
    fullDescription:
      "Learning Support and Remedial Services at Relicus are designed for children who struggle with specific academic skills or learning challenges. Our qualified professionals work with students experiencing difficulties in reading (dyslexia), writing (dysgraphia), mathematics, attention, or general academic performance. Using evidence-based remedial techniques, multisensory learning strategies, and individualized intervention plans, we help children build confidence and competence in academic areas. We also work closely with schools, parents, and the child to ensure consistent support across environments. Our goal is to unlock each child's potential and foster a love for learning.",
    faqs: [
      {
        question: "How is a learning disability diagnosed?",
        answer:
          "Learning disabilities are typically identified through psychological assessments, educational testing, and classroom observation. We conduct comprehensive evaluations to identify specific areas of difficulty.",
      },
      {
        question: "What teaching methods do you use?",
        answer:
          "We use multi-sensory, structured literacy approaches, diagnostic-prescriptive teaching, and evidence-based interventions tailored to each child's learning style.",
      },
      {
        question: "How often should my child attend sessions?",
        answer:
          "Frequency depends on the severity and type of difficulty. Most children benefit from 2-3 sessions per week, though some may need more intensive support initially.",
      },
      {
        question: "Can parents participate in sessions?",
        answer:
          "Yes, we encourage parental involvement. We provide strategies parents can use at home to reinforce learning and support their child's progress.",
      },
    ],
  },
  {
    id: "speech-language-services",
    title: "Speech & Language Services",
    slug: "speech-language-services",
    heroImage: "/images/services/Speech & Language Services.png",
    shortDescription:
      "Professional therapy for speech, language, communication, and swallowing difficulties in both children and adults.",
    fullDescription:
      "Speech and Language Services at Relicus address a wide range of communication disorders across all age groups. Our licensed speech-language pathologists (SLPs) provide assessment and therapy for speech disorders (articulation, fluency, voice), language disorders (receptive and expressive language), pragmatic communication difficulties, swallowing disorders, and voice issues. Using play-based therapy for children and adult-centered approaches for older clients, we create engaging, effective treatment plans. We focus on functional communication skills to improve quality of life, social interaction, and academic/occupational success. Sessions are designed to be interactive and progress-focused.",
    faqs: [
      {
        question: "What age groups do you serve?",
        answer:
          "We work with individuals from early childhood through adulthood, including assessment and therapy for all communication disorders.",
      },
      {
        question: "How do you make therapy fun for children?",
        answer:
          "We use play-based activities, games, songs, and storytelling to make therapy engaging and enjoyable while targeting specific speech and language goals.",
      },
      {
        question: "What is stuttering therapy like?",
        answer:
          "Stuttering therapy may include fluency-enhancing techniques, stammering strategies, and confidence building. We customize the approach based on age and individual needs.",
      },
      {
        question: "Can speech therapy help with accent modification?",
        answer:
          "Yes, we offer accent reduction services for individuals who wish to modify their speech patterns for personal or professional reasons.",
      },
    ],
  },
  {
    id: "training-workshops",
    title: "Training, Internships & Professional Workshops",
    slug: "training-workshops",
    heroImage: "/images/services/TrainingInterns.png",
    shortDescription:
      "Hands-on training for psychology students, professional workshops, and skill-based training sessions for students, parents, and professionals.",
    fullDescription:
      "Relicus offers comprehensive training and professional development opportunities for psychology students, practitioners, parents, and educators. Our internship programs provide practical experience in clinical psychology, therapeutic skills, and client management under expert supervision. Professional workshops cover evidence-based interventions, mental health awareness, parenting strategies, stress management, workplace wellness, and more. Designed by experienced professionals with current industry knowledge, our training programs combine theoretical foundations with practical applications. Whether you're seeking to advance your career, gain clinical experience, or develop new skills, our programs are designed to empower and inspire growth in mental health and education sectors.",
    faqs: [
      {
        question: "Who can apply for internships?",
        answer:
          "Final-year psychology students, recent graduates, and professionals seeking clinical experience can apply. We typically offer 3-6 month internship programs.",
      },
      {
        question: "What topics do your workshops cover?",
        answer:
          "Workshops cover areas like child development, parenting skills, anxiety management, emotional intelligence, inclusive education, workplace stress, and trauma-informed care.",
      },
      {
        question: "Are certificates provided?",
        answer:
          "Yes, all participants receive completion certificates. Professional workshops also include continuing education credits where applicable.",
      },
      {
        question: "Can organizations book customized workshops?",
        answer:
          "Absolutely! We design tailored workshops for schools, organizations, and corporate groups based on specific learning needs.",
      },
    ],
  },
  {
    id: "referral-support-services",
    title: "Referral & Support Services",
    slug: "referral-support-services",
    heroImage: "/images/services/Referral & Support Services.png",
    shortDescription:
      "Professional guidance and connections to medical specialists, psychiatrists, special educators, and rehabilitation centers when specialized care is needed.",
    fullDescription:
      "Referral and Support Services provide clients with professional guidance to appropriate medical, educational, and rehabilitation specialists when needed. Our team maintains strong networks with psychiatrists, neurologists, special educators, occupational therapists, and rehabilitation centers. We help navigate the healthcare and education systems, coordinate care, and ensure seamless transitions to specialized services. This holistic approach recognizes that comprehensive mental health and educational support often requires collaboration across multiple professionals. We advocate for our clients, share relevant clinical information (with consent), and maintain ongoing support throughout their journey with external providers. Our goal is to empower you to access the best possible care.",
    faqs: [
      {
        question: "How does the referral process work?",
        answer:
          "If we identify a need for specialized care, we discuss options with you, provide recommendations with reasoning, and facilitate connections with appropriate professionals.",
      },
      {
        question: "Can you provide recommendations for medication evaluation?",
        answer:
          "Yes, we can refer you to qualified psychiatrists for medication evaluation and management when appropriate as part of comprehensive treatment.",
      },
      {
        question: "Do you stay involved after a referral?",
        answer:
          "We can coordinate ongoing support with other providers (with your consent) and continue therapy alongside specialized services for integrated care.",
      },
      {
        question: "What if I'm unsure about seeking specialist help?",
        answer:
          "We'll discuss the pros and cons, answer your questions, and support you in making an informed decision about specialist care.",
      },
    ],
  },
];

// Keep the legacy export for backward compatibility
export const SERVICES_WITH_DETAILS = servicesData.map((service) => ({
  title: service.title,
  image: service.heroImage,
  description: service.shortDescription,
}));
