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
      "Individual Counselling & Psychotherapy: Personal one-to-one therapy sessions to help with stress, anxiety, depression, relationship issues, and personal emotional growth in a safe and supportive space, and to grow, heal and increase well-being.\n\nFamily & Couple Therapy: Sessions are designed for families and couples to improve communication, solve conflicts, and build healthy emotional connections within their relationships.\n\nBehavior Therapy: Goal-oriented therapy focused on changing negative behaviors and developing positive habits in children, adolescents, and adults.",
    faqs: [
      {
        question: "What is the individual counselling?",
        answer:
          "Individual counselling is a personal or therapeutic process through which individuals are helped to overcome emotional challenges, mental health challenges, and growth requirements.",
      },
      {
        question: "What is family and couple therapy?",
        answer:
          "It is a cognitive approach therapy that assists couples and families to communicate better, address conflicts and enhance emotional relationships.",
      },
      {
        question: "What is behaviour therapy?",
        answer:
          "Behaviour therapy aims at changing bad habits and creating good, working habits using systematic approaches.",
      },
      {
        question: "What problems can individual therapy address?",
        answer:
          "Psychotherapy is usually used to help people deal with stress, anxiety, depression, trauma, grief, low self-esteem, anger, burnout, and relationship issues.",
      },
      {
        question: "Who is supposed to think about couple therapy?",
        answer:
          "Couples who have communication gaps, lack trust, emotional distance, conflicts, or those desiring to have a stronger relationship.",
      },
      {
        question: "Who is behaviour therapy for?",
        answer:
          "Children, teenagers, and adults facing behaviour problems, emotional problems in control, learning impairments, and social problems.",
      },
      {
        question: "How does psychotherapy work?",
        answer:
          "With the help of a trained psychologist, you can explore your thoughts, feelings, past experiences, and behavioural patterns with the intention of developing more health coping strategies.",
      },
      {
        question: "How does family therapy work?",
        answer:
          "Therapists see how the family functions and lead the members to comprehend each other, their feelings as well as how to interact in the most healthy ways.",
      },
      {
        question: "What are the problems that behaviour therapy deals with?",
        answer:
          "Hyperactivity, tantrums, aggression, withdrawal, social withdrawal, anxiety behaviours, academic problems and habits.",
      },
      {
        question: "Can anxiety and stress be effectively counselled?",
        answer:
          "Yes. The evidence based treatments in Relicus (CBT, mindfulness-based therapy and talk therapy) are very effective in anxiety and stress reduction.",
      },
      {
        question: "Is therapy able to restore relationship trust?",
        answer:
          "Yes. A professional allows engaging in therapy and overcoming misunderstandings in a safe environment.",
      },
      {
        question: "What is the mechanism of behaviour therapy?",
        answer:
          "The therapists follow the patterns and apply reinforcement techniques, behaviour modification, and structured routines in order to modify behaviours.",
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
      "Psychological Assessment: Comprehensive evaluation of emotional, behavioral, and mental health for accurate diagnosis and to support or plan a suitable treatment.\n\nNeurocognitive Assessment: Assessment of memory, attention, thinking skills, and brain functions to identify cognitive difficulties.\n\nLearning Disability Assessment: Specialized assessments to identify learning difficulties like dyslexia, dyscalculia, or attention-related problems, helping in academic and emotional support.\n\nIQ Assessment: Standardized testing to measure intellectual abilities for academic support, clinical, and career guidance.",
    faqs: [
      {
        question: "What do we mean by a psychological assessment?",
        answer:
          "Psychological assessment is a scientific and structured assessment of emotional, behavioural, cognitive or mental-health issues.",
      },
      {
        question: "What is neurocognitive assessment?",
        answer:
          "It is a scientific assessment of memory, attention, reasoning and brain functioning in order to discover cognitive strengths and challenges.",
      },
      {
        question: "What is an IQ assessment?",
        answer:
          "IQ test has been used to measure intellectual aspects such as reasoning, problem solving, comprehension as well as analytical abilities.",
      },
      {
        question: "What is learning disability assessment?",
        answer:
          "The systematic assessment of learning problems including those with dyslexia, dyscalculia, dysgraphia, and attention.",
      },
      {
        question: "Who won't need a psychological test?",
        answer:
          "Children, teenagers and adults with academic problems, behavioural concerns, emotional problems or who are uncertain about their diagnosis.",
      },
      {
        question: "When does one require a neurocognitive assessment?",
        answer:
          "This assessment would be beneficial to people who experience memory loss, attention problems, difficulty in concentrating, being confused, or experiencing a decline in cognition.",
      },
      {
        question:
          "At what age do children with learning disability get tested?",
        answer:
          "Symptoms such as complications in reading, writing, spelling, calculating mathematical problems, lack of concentration or retarded learning can indicate it.",
      },
      {
        question: "Why do people take IQ tests?",
        answer:
          "In case of academic planning, determining giftedness, career guidance, psychological assessment, or diagnostic clarity.",
      },
      {
        question: "Is this test useful in the diagnosis of ADHD or dementia?",
        answer:
          "Yes. Neurocognitive tests can be used to detect cognitive patterns of ADHD, the symptoms of dementia, and other neurological issues.",
      },
      {
        question:
          "At what age should learning disability testing be conducted?",
        answer: "Formal assessment can be done with children aged 6 and more.",
      },
      {
        question: "What are the age groups that can take an IQ test?",
        answer: "IQ testing can be done on children, adolescents, and adults.",
      },
      {
        question: "Why is a psychological testing relevant?",
        answer:
          "They assist in finding out the root causes, give the proper diagnosis and prescribe a clear treatment and intervention plan.",
      },
      {
        question:
          "Is it an appropriate evaluation that applies to both children and adults?",
        answer:
          "Yes. Relicus presents child, adolescent and adult neurocognitive assessment.",
      },
      {
        question: "Will the school believe such assessment reports?",
        answer:
          "Yes. Our tests are professionally based and acceptable in the school.",
      },
      {
        question: "Scientific validity of the results?",
        answer:
          "Yes. Relicus administers internationally recognized IQ assessment instruments that are research-based.",
      },
    ],
  },
  {
    id: "learning-support-remedial-services",
    title: "Learning Support & Remedial Services",
    slug: "learning-support-remedial-services",
    heroImage: "/images/services/Learning Support & Remedial Services.png",
    shortDescription:
      "Specialized academic support for children with learning difficulties to improve reading, writing, attention, and overall school performance.",
    fullDescription:
      "Remedial Training: Specialised academic support for children with learning difficulties to improve reading, writing, attention, and academic performance.",
    faqs: [
      {
        question: "What is remedial training?",
        answer:
          "A well-designed learning support program of children with learning challenges in the areas of reading, writing, spelling, and attention.",
      },
      {
        question: "Who needs remedial training?",
        answer:
          "Children with dyslexia, learning disability, ADHD, or under-achievement in their academic progress.",
      },
      {
        question: "Which skills are better in remedial training?",
        answer:
          "The following criteria were reading, comprehension, handwriting, math, spelling, attention, and learning strategies.",
      },
      {
        question:
          "Is there a distinction between remedial training and tuition?",
        answer:
          "Yes. It is curative, competence-oriented and targeting the cause of learning impairments not just in academics.",
      },
      {
        question: "What is the duration of remedial training?",
        answer:
          "The development of a child is based on the needs of the child, and generally; it involves weekly sessions.",
      },
      {
        question: "Are parents provided with home strategies?",
        answer:
          "Yes. Parents receive activity plans and individualized learning instructions.",
      },
      {
        question: "Are the sessions one-on-one?",
        answer: "Yes mostly, to have a better personalization.",
      },
      {
        question: "What are the expected outcomes?",
        answer:
          "Higher grades, self-esteem, concentration and general performance in school.",
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
      "Speech Therapy: Therapy sessions to improve speech, language, communication, and swallowing difficulties in children and adults.",
    faqs: [
      {
        question: "What is speech therapy?",
        answer:
          "The speech therapy is used to assist children and adults to enhance their communication, speech articulateness, language progression, and swallowing skills.",
      },
      {
        question: "Who needs speech therapy?",
        answer:
          "Patients who have indistinct speech, language delay, stuttering, articulation problems, voice disorders, or swallowing problems.",
      },
      {
        question:
          "Is there any benefit to using speech therapy in children with delayed speech?",
        answer:
          "Yes. Early intervention will result in faster progress and better communication skills.",
      },
      {
        question: "Is speech therapy useful on adults?",
        answer:
          "Yes. The stroke recovery, voice, and communication problems are of great benefit to adult people.",
      },
      {
        question: "So what are the methods of speech therapists?",
        answer:
          "Language stimulation, articulation training, fluency training, oral-motor training, and voice training.",
      },
      {
        question: "Can parents be involved?",
        answer:
          "Yes. Home-activity guidance is provided to the parents to help in development.",
      },
    ],
  },
  {
    id: "training-internships",
    title: "Training & Internships",
    slug: "training-internships",
    heroImage: "/images/services/TrainingInterns.png",
    shortDescription:
      "Hands-on training for psychology students, professional workshops, and skill-based training sessions for students, parents, and professionals.",
    fullDescription:
      "Internship Program: Hands-on training for psychology students to gain clinical exposure and real-world experience under supervision.\n\nWorkshops & Webinars: Interactive programs focused on mental health awareness, professional skill-based training sessions, and educational workshops for students, parents, and professionals.",
    faqs: [
      {
        question: "What type of workshops does Relicus have?",
        answer:
          "Mental health awareness, emotional intelligence, parenting, stress management, life skills, student-centered programs.",
      },
      {
        question: "What is Relicus internship program?",
        answer:
          "Practical psychology training with real clinical practice and learning.",
      },
      {
        question: "Who is allowed to attend such workshops?",
        answer:
          "Students, parents, educators, professionals and people who are interested in well-being.",
      },
      {
        question: "What topics are covered?",
        answer:
          "Fear, emotional strength, interpersonal competence, self-confidence, attentiveness, and others.",
      },
      {
        question:
          "What are some of the skills that I will acquire during the internship?",
        answer:
          "Handling of case, skills in counseling, assessment, writing reports, documentation, ethics and professional communication.",
      },
      {
        question: "Can schools or colleges book workshops?",
        answer:
          "Absolutely. Relicus frequently collaborates with institutions.",
      },
      {
        question: "Are interns allowed to witness actual therapy?",
        answer:
          "Yes, with requirements of confidentiality and ethical allowances.",
      },
      {
        question: "What can we do to plan a workshop?",
        answer: "Visit the site or just make bookings by contacting Relicus.",
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
      "Trauma Care & Crisis Interventions: Immediate and long term emotional support and therapy for individuals coping with trauma, abuse, grief, accidents, and other crisis situations to help begin healing and recovery.\n\nReferral Services: Guidance and connection to psychiatrists other medical professionals, special educators, or rehabilitation centers for additional care when needed.",
    faqs: [
      {
        question: "What is trauma care?",
        answer:
          "Treatment that assists people who are undergoing emotional shock, abuse, accidents or crisis.",
      },
      {
        question: "What do you mean by referral services at Relicus?",
        answer:
          "Professional counseling that links the clients with psychiatrists, medical doctors, special educators, rehabilitation services or any other specialists.",
      },
      {
        question: "Who is to receive trauma counseling?",
        answer:
          "Any person experiencing emotional distress, PTSD symptoms, flashbacks, panic attacks, grief or an insurmountable situation.",
      },
      {
        question: "When do I need a referral?",
        answer:
          "In case your concerns need to be medicated, medically checked, with advanced treatment or special assistance.",
      },
      {
        question: "Are you a crisis intervention supporter?",
        answer:
          "Yes. Temporary emotional support is offered to individuals with urgent mental problems.",
      },
      {
        question: "Are you aware of special educators?",
        answer:
          "Yes. In particular with learning disabilities and developmental issues.",
      },
      {
        question:
          "Is treatment of childhood trauma possible with the aid of trauma therapy?",
        answer:
          "Absolutely. Therapy aids in the processing of painful memories and judgment about the formation of healthier coping patterns.",
      },
      {
        question: "Do referrals take place prior to making?",
        answer:
          "Yes. Only after deep discussion and the consent of the client, the referrals are made.",
      },
      {
        question: "Is the treatment of trauma confidential?",
        answer: "Yes. Meetings are confidential and done with discretion.",
      },
    ],
  },
];

// Legacy export preserved for components expecting the brief service list.
export const SERVICES_WITH_DETAILS = servicesData.map((service) => ({
  title: service.title,
  image: service.heroImage,
  description: service.shortDescription,
}));
