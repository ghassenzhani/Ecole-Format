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
    }
  }
};
