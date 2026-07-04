export type Language = 'en' | 'fr' | 'it';

type Dictionary = {
  [key in Language]: {
    [key: string]: any;
  }
};

export const dictionaries: Dictionary = {
  en: {
    nav: {
      home: "Home",
      courses: "Courses",
      studyInItaly: "Study in Italy",
      aboutUs: "About Us",
      contact: "Contact",
      freeConsultation: "Free Consultation"
    },
    hero: {
      accredited: "Accredited by University of Perugia",
      title1: "Learn Italian",
      title2: "in Tunisia",
      desc: "Face-to-face and online Italian courses. CELI exam preparation, study visa assistance, and document preparation for studying in Italy.",
      consultation: "Free Consultation",
      explore: "Explore Courses",
      stats: {
        students: "Students Trained",
        passRate: "CELI Pass Rate",
        experience: "Years Experience",
        visas: "Visas Assisted"
      }
    },
    features: {
      title: "What We Offer",
      subtitle: "Comprehensive Italian language education and support services to help you achieve your goals in Italy.",
      learnMore: "Learn more",
      items: [
        { title: "Italian Courses", desc: "Face-to-face and online Italian courses from A1 to B2 levels with experienced teachers." },
        { title: "CELI Exam Center", desc: "Official CELI examination center accredited by the University of Perugia." },
        { title: "Study in Italy", desc: "Complete assistance with study visa documents and university applications." },
        { title: "Online & In-Person", desc: "Flexible learning options with both online classes and in-person sessions." }
      ]
    },
    levels: {
      title: "Course Levels",
      subtitle: "From beginner to advanced, we have the right course for your Italian language journey and visa requirements.",
      items: [
        { level: "A1", name: "Beginner", desc: "Basic Italian for everyday situations.", visa: "" },
        { level: "A2", name: "Elementary", desc: "Understand and communicate in routine tasks and familiar topics. Required for work visa applications.", visa: "Work Visa" },
        { level: "B1", name: "Intermediate", desc: "Deal with most situations while traveling. Required for Italian nationality.", visa: "Nationality" },
        { level: "B2", name: "Upper Intermediate", desc: "Interact with native speakers fluently. Required for study visa applications.", visa: "Study Visa" }
      ]
    },
    whyUs: {
      title: "Why Choose Format?",
      subtitle: "We are committed to your success with experienced teachers, proven methods, and comprehensive support.",
      items: [
        { title: "Experienced Teachers", desc: "Our teaching staff includes certified Italian teachers and native speakers with years of experience." },
        { title: "Official CELI Center", desc: "Accredited by the University of Perugia, we are an official CELI examination center in Tunisia." },
        { title: "Visa Document Support", desc: "We help you prepare all necessary documents for your study in Italy visa application." },
        { title: "Flexible Learning", desc: "Choose between face-to-face classes at our center or online sessions from the comfort of your home." }
      ]
    },
    chat: {
      liveSupport: "Live Support",
      replyInstantly: "We reply instantly",
      enterDetails: "Please enter your details to start chatting.",
      name: "Name",
      email: "Email",
      startChat: "Start Chat",
      typeMessage: "Type a message..."
    },
    footer: {
      description: "Your trusted partner for learning Italian and preparing for studies in Italy. Official CELI examination center in Tunisia.",
      quickLinks: "Quick Links",
      contact: "Contact Us",
      rights: "All rights reserved."
    },
    cta: {
      title: "Ready to Start Your Italian Journey?",
      desc: "Book your free consultation today and take the first step towards mastering Italian and achieving your goals in Italy.",
      btn1: "Book Free Consultation",
      btn2: "View Courses"
    },
    contact: {
      getInTouch: "Get in Touch",
      contactUs: "Contact Us",
      desc: "Have questions about our courses or services? We are here to help. Reach out for a free consultation.",
      letsTalk: "Let's Talk",
      letsTalkDesc: "Whether you want to learn Italian, prepare for CELI exams, or need help with your study visa documents, our team is ready to assist you.",
      followUs: "Follow Us",
      messageSent: "Message Sent!",
      thankYou: "Thank you for reaching out. We will get back to you within 24 hours.",
      sendAnother: "Send Another Message",
      fullName: "Full Name *",
      phone: "Phone",
      subject: "Subject",
      message: "Message *",
      sendMessage: "Send Message",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Find answers to common questions about our courses and services."
    },
    courses: {
      programs: "Comprehensive Italian Programs",
      ourCourses: "Our Courses",
      desc: "From A1 beginner to B2 upper intermediate, we offer structured Italian language courses designed to help you achieve fluency and pass your CELI exams.",
      coursePrograms: "Course Programs",
      courseProgramsSub: "Choose the level that matches your current skills and goals.",
      mostPopular: "MOST POPULAR",
      smallGroups: "Small Groups",
      startingFrom: "Starting from",
      enrollNow: "Enroll Now",
      celiCert: "CELI Certification",
      celiCertSub: "The Certificate of Knowledge of the Italian Language, recognized by the University of Perugia.",
      celiExamLevels: "CELI Exam Levels",
      celiPrep: "CELI Exam Preparation",
      passRate: "95% Pass Rate",
      passRateDesc: "Our students consistently achieve excellent results on their CELI exams.",
      flexibleSchedule: "Flexible Schedule",
      flexibleScheduleSub: "Choose the schedule that fits your lifestyle. Morning, afternoon, evening, or weekend classes available.",
      notSure: "Not Sure Which Level is Right for You?",
      notSureSub: "Book a free placement test and consultation. Our team will help you choose the best course for your goals.",
      bookTest: "Book Free Placement Test"
    },
    about: {
      ourStory: "Our Story",
      aboutFormat: "About Format",
      desc: "A leading Italian language school in Tunisia, dedicated to helping students achieve fluency and realize their dreams of studying and living in Italy.",
      ourMission: "Our Mission",
      ourJourney: "Our Journey",
      journeySub: "From a small language school to a leading Italian education center in Tunisia.",
      meetTeam: "Meet Our Team",
      teamSub: "Dedicated professionals committed to your Italian language success.",
      accredited: "Accredited by the University of Perugia",
      accreditedSub: "Format is proud to be an official CELI examination center accredited by the University of Perugia, one of Italy's most prestigious universities.",
      joinFamily: "Join the Format Family",
      joinSub: "Whether you want to learn Italian for personal growth, academic purposes, or professional opportunities, we are here to help you succeed.",
      getInTouch: "Get in Touch"
    },
    study: {
      title: "Study in Italy",
      desc: "Your complete guide to studying in Italy. We assist with language preparation, university applications, and visa documentation.",
      services: "Our Services",
      servicesSub: "Comprehensive support for your academic journey in Italy.",
      req: "Requirements",
      reqSub: "What you need to study in Italy.",
      bookConsultation: "Book a Consultation",
      bookSub: "Schedule a free consultation with our study abroad experts."
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      courses: "Cours",
      studyInItaly: "Étudier en Italie",
      aboutUs: "À Propos",
      contact: "Contact",
      freeConsultation: "Consultation Gratuite"
    },
    hero: {
      accredited: "Accrédité par l'Université de Pérouse",
      title1: "Apprenez l'Italien",
      title2: "en Tunisie",
      desc: "Cours d'italien en présentiel et en ligne. Préparation à l'examen CELI, assistance visa d'études et préparation des documents pour étudier en Italie.",
      consultation: "Consultation Gratuite",
      explore: "Découvrir les Cours",
      stats: {
        students: "Étudiants Formés",
        passRate: "Taux de Réussite CELI",
        experience: "Années d'Expérience",
        visas: "Visas Assistés"
      }
    },
    features: {
      title: "Ce Que Nous Offrons",
      subtitle: "Un enseignement complet de la langue italienne et des services de soutien pour vous aider.",
      learnMore: "En savoir plus",
      items: [
        { title: "Cours d'Italien", desc: "Cours d'italien en présentiel et en ligne des niveaux A1 à B2 avec des professeurs expérimentés." },
        { title: "Centre d'Examen CELI", desc: "Centre officiel d'examen CELI accrédité par l'Université de Pérouse." },
        { title: "Étudier en Italie", desc: "Assistance complète pour les documents de visa d'études et les candidatures universitaires." },
        { title: "En Ligne & En Présentiel", desc: "Options d'apprentissage flexibles avec des cours en ligne et des sessions en présentiel." }
      ]
    },
    levels: {
      title: "Niveaux de Cours",
      subtitle: "Du débutant au avancé, nous avons le cours adapté à votre parcours et aux exigences de visa.",
      items: [
        { level: "A1", name: "Débutant", desc: "Italien de base pour les situations quotidiennes.", visa: "" },
        { level: "A2", name: "Élémentaire", desc: "Comprendre et communiquer dans les tâches de routine et les sujets familiers. Requis pour le visa de travail.", visa: "Visa de Travail" },
        { level: "B1", name: "Intermédiaire", desc: "Faire face à la plupart des situations en voyage. Requis pour la nationalité italienne.", visa: "Nationalité" },
        { level: "B2", name: "Intermédiaire Supérieur", desc: "Interagir couramment avec des locuteurs natifs. Requis pour le visa d'études.", visa: "Visa d'Études" }
      ]
    },
    whyUs: {
      title: "Pourquoi Choisir Format ?",
      subtitle: "Nous nous engageons pour votre réussite avec des professeurs expérimentés et un soutien complet.",
      items: [
        { title: "Professeurs Expérimentés", desc: "Notre équipe comprend des professeurs certifiés et des locuteurs natifs avec des années d'expérience." },
        { title: "Centre CELI Officiel", desc: "Accrédité par l'Université de Pérouse, nous sommes un centre officiel CELI en Tunisie." },
        { title: "Soutien pour le Visa", desc: "Nous vous aidons à préparer tous les documents nécessaires pour votre visa d'études." },
        { title: "Apprentissage Flexible", desc: "Choisissez entre des cours en présentiel à notre centre ou des sessions en ligne." }
      ]
    },
    chat: {
      liveSupport: "Support en direct",
      replyInstantly: "Nous répondons instantanément",
      enterDetails: "Veuillez entrer vos coordonnées pour commencer.",
      name: "Nom",
      email: "E-mail",
      startChat: "Commencer le Chat",
      typeMessage: "Tapez un message..."
    },
    footer: {
      description: "Votre partenaire de confiance pour apprendre l'italien et préparer vos études en Italie. Centre officiel d'examen CELI en Tunisie.",
      quickLinks: "Liens Rapides",
      contact: "Contactez-Nous",
      rights: "Tous droits réservés."
    },
    cta: {
      title: "Prêt à Commencer Votre Parcours Italien ?",
      desc: "Réservez votre consultation gratuite dès aujourd'hui et faites le premier pas.",
      btn1: "Réserver Consultation",
      btn2: "Voir les Cours"
    },
    contact: {
      getInTouch: "Contactez-nous",
      contactUs: "Nous Contacter",
      desc: "Vous avez des questions sur nos cours ou services ? Nous sommes là pour vous aider.",
      letsTalk: "Parlons-en",
      letsTalkDesc: "Que vous souhaitiez apprendre l'italien, préparer les examens CELI ou obtenir de l'aide pour votre visa, notre équipe est prête à vous aider.",
      followUs: "Suivez-nous",
      messageSent: "Message Envoyé !",
      thankYou: "Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures.",
      sendAnother: "Envoyer un autre message",
      fullName: "Nom Complet *",
      phone: "Téléphone",
      subject: "Sujet",
      message: "Message *",
      sendMessage: "Envoyer le Message",
      faqTitle: "Foire Aux Questions",
      faqSubtitle: "Trouvez des réponses aux questions courantes sur nos cours."
    },
    courses: {
      programs: "Programmes d'Italien Complets",
      ourCourses: "Nos Cours",
      desc: "Du niveau débutant A1 au niveau intermédiaire supérieur B2, nous proposons des cours d'italien structurés.",
      coursePrograms: "Programmes de Cours",
      courseProgramsSub: "Choisissez le niveau qui correspond à vos compétences et objectifs actuels.",
      mostPopular: "LE PLUS POPULAIRE",
      smallGroups: "Petits Groupes",
      startingFrom: "À partir de",
      enrollNow: "S'inscrire",
      celiCert: "Certification CELI",
      celiCertSub: "Le certificat de connaissance de la langue italienne, reconnu par l'Université de Pérouse.",
      celiExamLevels: "Niveaux d'Examen CELI",
      celiPrep: "Préparation à l'Examen CELI",
      passRate: "Taux de Réussite de 95%",
      passRateDesc: "Nos étudiants obtiennent constamment d'excellents résultats.",
      flexibleSchedule: "Emploi du Temps Flexible",
      flexibleScheduleSub: "Choisissez l'horaire qui correspond à votre style de vie. Matin, après-midi, soir ou week-end.",
      notSure: "Pas Sûr du Niveau ?",
      notSureSub: "Réservez un test de niveau et une consultation gratuite. Notre équipe vous aidera.",
      bookTest: "Réserver un Test de Niveau"
    },
    about: {
      ourStory: "Notre Histoire",
      aboutFormat: "À Propos de Format",
      desc: "Une école de langue italienne de premier plan en Tunisie, dédiée à aider les étudiants à maîtriser la langue.",
      ourMission: "Notre Mission",
      ourJourney: "Notre Parcours",
      journeySub: "D'une petite école de langue à un centre éducatif italien de premier plan en Tunisie.",
      meetTeam: "Rencontrez Notre Équipe",
      teamSub: "Des professionnels dévoués engagés dans votre réussite en italien.",
      accredited: "Accrédité par l'Université de Pérouse",
      accreditedSub: "Format est fier d'être un centre d'examen officiel CELI accrédité par l'Université de Pérouse.",
      joinFamily: "Rejoignez la Famille Format",
      joinSub: "Que vous souhaitiez apprendre l'italien pour votre développement personnel, académique ou professionnel, nous sommes là pour vous.",
      getInTouch: "Contactez-nous"
    },
    study: {
      title: "Étudier en Italie",
      desc: "Votre guide complet pour étudier en Italie. Nous vous aidons pour la langue, les candidatures et les visas.",
      services: "Nos Services",
      servicesSub: "Un soutien complet pour votre parcours académique en Italie.",
      req: "Exigences",
      reqSub: "Ce dont vous avez besoin pour étudier en Italie.",
      bookConsultation: "Réserver une Consultation",
      bookSub: "Planifiez une consultation gratuite avec nos experts en études à l'étranger."
    }
  },
  it: {
    nav: {
      home: "Home",
      courses: "Corsi",
      studyInItaly: "Studiare in Italia",
      aboutUs: "Chi Siamo",
      contact: "Contatti",
      freeConsultation: "Consulenza Gratuita"
    },
    hero: {
      accredited: "Accreditato dall'Università per Stranieri di Perugia",
      title1: "Impara l'Italiano",
      title2: "in Tunisia",
      desc: "Corsi di italiano in presenza e online. Preparazione all'esame CELI, assistenza per il visto di studio e preparazione dei documenti per studiare in Italia.",
      consultation: "Consulenza Gratuita",
      explore: "Esplora i Corsi",
      stats: {
        students: "Studenti Formati",
        passRate: "Tasso di Superamento CELI",
        experience: "Anni di Esperienza",
        visas: "Visti Assistiti"
      }
    },
    features: {
      title: "Cosa Offriamo",
      subtitle: "Educazione linguistica completa e servizi di supporto per aiutarti a raggiungere i tuoi obiettivi.",
      learnMore: "Scopri di più",
      items: [
        { title: "Corsi di Italiano", desc: "Corsi in presenza e online dai livelli A1 a B2 con insegnanti esperti." },
        { title: "Centro Esami CELI", desc: "Centro ufficiale per esami CELI accreditato dall'Università di Perugia." },
        { title: "Studiare in Italia", desc: "Assistenza completa per i documenti del visto e iscrizioni universitarie." },
        { title: "Online e In Presenza", desc: "Opzioni di apprendimento flessibili con lezioni online e in presenza." }
      ]
    },
    levels: {
      title: "Livelli dei Corsi",
      subtitle: "Dal principiante all'avanzato, abbiamo il corso giusto per il tuo percorso.",
      items: [
        { level: "A1", name: "Principiante", desc: "Italiano di base per le situazioni quotidiane.", visa: "" },
        { level: "A2", name: "Elementare", desc: "Comprendere e comunicare in compiti di routine e argomenti familiari. Richiesto per il visto di lavoro.", visa: "Visto Lavoro" },
        { level: "B1", name: "Intermedio", desc: "Gestire la maggior parte delle situazioni in viaggio. Richiesto per la cittadinanza.", visa: "Cittadinanza" },
        { level: "B2", name: "Intermedio Superiore", desc: "Interagire fluentemente con i madrelingua. Richiesto per il visto di studio.", visa: "Visto Studio" }
      ]
    },
    whyUs: {
      title: "Perché Scegliere Format?",
      subtitle: "Siamo impegnati per il tuo successo con insegnanti esperti e supporto completo.",
      items: [
        { title: "Insegnanti Esperti", desc: "Il nostro staff include insegnanti certificati e madrelingua con anni di esperienza." },
        { title: "Centro CELI Ufficiale", desc: "Accreditato dall'Università di Perugia, siamo un centro ufficiale in Tunisia." },
        { title: "Supporto per il Visto", desc: "Ti aiutiamo a preparare tutti i documenti necessari per il tuo visto di studio." },
        { title: "Apprendimento Flessibile", desc: "Scegli tra lezioni in presenza nel nostro centro o sessioni online." }
      ]
    },
    chat: {
      liveSupport: "Supporto Live",
      replyInstantly: "Rispondiamo all'istante",
      enterDetails: "Inserisci i tuoi dati per iniziare.",
      name: "Nome",
      email: "Email",
      startChat: "Inizia Chat",
      typeMessage: "Scrivi un messaggio..."
    },
    footer: {
      description: "Il tuo partner di fiducia per imparare l'italiano e prepararti per gli studi in Italia. Centro ufficiale d'esame CELI in Tunisia.",
      quickLinks: "Link Rapidi",
      contact: "Contattaci",
      rights: "Tutti i diritti riservati."
    },
    cta: {
      title: "Pronto per Iniziare il Tuo Percorso?",
      desc: "Prenota oggi la tua consulenza gratuita e fai il primo passo.",
      btn1: "Prenota Consulenza",
      btn2: "Guarda i Corsi"
    },
    contact: {
      getInTouch: "Contattaci",
      contactUs: "Contattaci",
      desc: "Hai domande sui nostri corsi o servizi? Siamo qui per aiutarti.",
      letsTalk: "Parliamo",
      letsTalkDesc: "Se vuoi imparare l'italiano, prepararti per gli esami CELI o hai bisogno di aiuto con il visto di studio, il nostro team è pronto ad assisterti.",
      followUs: "Seguici",
      messageSent: "Messaggio Inviato!",
      thankYou: "Grazie per averci contattato. Ti risponderemo entro 24 ore.",
      sendAnother: "Invia un altro messaggio",
      fullName: "Nome Completo *",
      phone: "Telefono",
      subject: "Oggetto",
      message: "Messaggio *",
      sendMessage: "Invia Messaggio",
      faqTitle: "Domande Frequenti",
      faqSubtitle: "Trova le risposte alle domande comuni sui nostri corsi e servizi."
    },
    courses: {
      programs: "Programmi di Italiano Completi",
      ourCourses: "I Nostri Corsi",
      desc: "Dal livello principiante A1 al livello intermedio superiore B2, offriamo corsi di italiano strutturati per aiutarti a raggiungere la fluidità.",
      coursePrograms: "Programmi dei Corsi",
      courseProgramsSub: "Scegli il livello che corrisponde alle tue competenze e obiettivi.",
      mostPopular: "PIÙ POPOLARE",
      smallGroups: "Piccoli Gruppi",
      startingFrom: "A partire da",
      enrollNow: "Iscriviti Ora",
      celiCert: "Certificazione CELI",
      celiCertSub: "Il Certificato di Conoscenza della Lingua Italiana, riconosciuto dall'Università di Perugia.",
      celiExamLevels: "Livelli Esame CELI",
      celiPrep: "Preparazione Esame CELI",
      passRate: "Tasso di Superamento 95%",
      passRateDesc: "I nostri studenti ottengono costantemente ottimi risultati negli esami CELI.",
      flexibleSchedule: "Orario Flessibile",
      flexibleScheduleSub: "Scegli l'orario che si adatta al tuo stile di vita. Mattina, pomeriggio, sera o fine settimana.",
      notSure: "Non sai quale livello è giusto per te?",
      notSureSub: "Prenota un test di livello gratuito. Il nostro team ti aiuterà.",
      bookTest: "Prenota Test di Livello"
    },
    about: {
      ourStory: "La Nostra Storia",
      aboutFormat: "Chi Siamo",
      desc: "Una scuola di lingua italiana leader in Tunisia, dedicata ad aiutare gli studenti a raggiungere la fluidità.",
      ourMission: "La Nostra Missione",
      ourJourney: "Il Nostro Percorso",
      journeySub: "Da una piccola scuola di lingue a un centro educativo italiano leader in Tunisia.",
      meetTeam: "Il Nostro Team",
      teamSub: "Professionisti dedicati impegnati per il tuo successo con la lingua italiana.",
      accredited: "Accreditato dall'Università di Perugia",
      accreditedSub: "Format è orgogliosa di essere un centro d'esame ufficiale CELI accreditato dall'Università di Perugia.",
      joinFamily: "Unisciti alla Famiglia Format",
      joinSub: "Se vuoi imparare l'italiano per crescita personale, scopi accademici o opportunità professionali, siamo qui per te.",
      getInTouch: "Contattaci"
    },
    study: {
      title: "Studiare in Italia",
      desc: "La tua guida completa per studiare in Italia. Ti assistiamo con la lingua, le iscrizioni e i visti.",
      services: "I Nostri Servizi",
      servicesSub: "Supporto completo per il tuo percorso accademico in Italia.",
      req: "Requisiti",
      reqSub: "Cosa ti serve per studiare in Italia.",
      bookConsultation: "Prenota una Consulenza",
      bookSub: "Pianifica una consulenza gratuita con i nostri esperti."
    }
  }
};
