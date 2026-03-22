import React from "react";
import { BsClipboardData } from "react-icons/bs";
import { DiCodeigniter } from "react-icons/di";
import { FaMobileAlt } from "react-icons/fa";
import { BiRocket } from "react-icons/bi";
import projectConfig from "./projectConfig";

// Try direct import first (remove comment and test)
import resumePdf from '../images/Ali_Asghar_Resume.pdf';

const homeConfig = {
  greeting_i18n: {
    en: (
      <h1 className="heading">
        Hi! I'm <strong className="main-name"> Ali Asghar</strong>
      </h1>
    ),
    es: (
      <h1 className="heading">
        Hola! Soy <strong className="main-name"> Ali Asghar</strong>
      </h1>
    ),
  },

  titles_i18n: {
    en: [
      "ML engineer",
      "Open Source Contributor",
      "Backend Developer",
      "Data Scientist",
      "Machine Learning Specialist",
    ],
    es: [
      "Científico de Datos",
      "Especialista en Aprendizaje Automático",
      "Colaborador de Código Abierto",
      "Desarrollador Backend",
      "Ingeniero de ML",
    ],
  },

  about_i18n: {
    en: {
      start:
        "I've been working for over 2 years on data science projects. I'm excited by learning new things, contributing to the data science community, and spreading the word of data!",
      exit: "I'm fluent at Python, SQL databases, BI tools, and more, with a deep interest in machine learning.",
    },
    es: {
      start:
        "He trabajado por más de 2 años en proyectos de ciencia de datos. Me entusiasma aprender cosas nuevas, contribuir a la comunidad y compartir conocimiento.",
      exit: "Domino Python, bases de datos SQL, herramientas de BI y más, con un fuerte interés en el aprendizaje automático.",
    },
  },

  
  workTimeline: [
    {
      id: "work-4",
      title: "AI/ML Engineer",
      title_i18n: { en: "ML Engineer", es: "ML Engineer" },
      company: "Self Projects / Learning",
      description_i18n: {
        en: "Designed and implemented machine learning and deep learning models for prediction and classification tasks. Worked on data preprocessing, feature engineering, model evaluation, and integrating trained models into applications using REST APIs.",
        es: "Diseñé e implementé modelos de machine learning y deep learning para tareas de predicción y clasificación, integrando modelos entrenados mediante APIs REST.",
      },
      date: "2026-Present",
      icon: <BiRocket />,
      tags: ["ml", "python", "deep-learning", "apis", "model-deployment"],
    },

     {
      id: "work-3",
      title: "Machine Learning & Web Developer",
      title_i18n: { en: "Freelance Developer", es: "Desarrollador Freelance" },
      company: "Freelancing / Personal Work",
      description_i18n: {
        en: "Developed web-based tools and applications including a React portfolio, PDF converter, and AI-based plagiarism checker. Focused on clean UI, performance, and practical problem-solving.",
        es: "Desarrollé herramientas web como portafolio en React, convertidor PDF y verificador de plagio basado en IA.",
      },
      date: "2024-2025",
      icon: <BsClipboardData />,
      tags: ["react", "javascript", "web-development", "ui-ux"],
    },

    
    {
      id: "work-2",
      title: "Deep Learning Engineer",
      title_i18n: { en: "Deep Learning Engineer", es: "Ingeniero de Deep Learning" },
      company: "Academic Experience",
      description_i18n: {
        en: "Designed and trained deep learning models including CNNs, RNNs, and transformers for tasks such as image classification, NLP, and time-series forecasting. Worked with TensorFlow and PyTorch to build, evaluate, and optimize neural network architectures.",
        es: "Diseñé y entrené modelos de deep learning incluyendo CNNs, RNNs y transformers para clasificación de imágenes, PLN y predicción de series temporales usando TensorFlow y PyTorch.",
      },
      date: "2023-2024",
      icon: <FaMobileAlt />,
      tags: ["deep-learning", "tensorflow", "pytorch", "cnn", "nlp", "transformers"],
    },

    {
      id: "work-0",
      title: "Full Stack Developer",
      title_i18n: { en: "Full Stack Developer", es: "Desarrollador Full Stack" },
      company: "Academic & Personal Projects",
      description_i18n: {
        en: "Built and deployed full stack web applications using React for the frontend and Node.js/Express for the backend. Designed RESTful APIs, managed databases, and focused on responsive UI, clean architecture, and end-to-end functionality.",
        es: "Desarrollé aplicaciones web completas usando React en el frontend y Node.js/Express en el backend. Diseñé APIs RESTful, gestioné bases de datos y me enfoqué en interfaces responsivas y arquitectura limpia.",
      },
      date: "2023-2024",
      icon: <DiCodeigniter />,
      tags: ["react", "nodejs", "express", "mongodb", "rest-api", "full-stack"],
    },

  ],

  // RESUME SECTION - FIXED SPANISH TRANSLATIONS
  resume_i18n: {
    en: {
      description: "Want to know more about my professional journey? View my complete resume with detailed experience, education, and skills.",
      buttonText: "View Full Resume",
      summary: "I'm a Computer Science scholar at NED University holding a keen interest in Data Science and Machine Learning. I possess practical experience in constructing, training, and assessing machine learning and deep learning frameworks. I've engaged in AI initiatives concerning electricity usage examination and consultative systems. Furthermore, I took part in an AI Hackathon, where I utilized my talents in a practical, collaborative setting. I am keen to absorb knowledge, enhance skills, and tackle actual AI challenges.",
      summaryShort: "Computer Science scholar with practical experience in ML/DL frameworks, AI initiatives, and collaborative projects.",
      downloadButton: "Download PDF Resume",
      closeButton: "Close Preview",
      modalTitle: "Resume Preview",
      sectionSummary: "PROFESSIONAL SUMMARY",
      sectionExperience: "WORK EXPERIENCE",
      sectionEducation: "EDUCATION"
    },
    es: {
      description: "¿Quieres saber más sobre mi trayectoria profesional? Mira mi currículum completo con experiencia detallada, educación y habilidades.",
      buttonText: "Ver CV Completo",
      summary: "Soy estudiante de Ciencias de la Computación en la Universidad NED con un gran interés en Ciencia de Datos y Aprendizaje Automático. Tengo experiencia práctica en la construcción, entrenamiento y evaluación de marcos de trabajo de machine learning y deep learning. He participado en iniciativas de IA relacionadas con el análisis de consumo eléctrico y sistemas consultivos. Además, participé en un Hackathon de IA, donde utilicé mis talentos en un entorno práctico y colaborativo. Estoy ansioso por absorber conocimientos, mejorar habilidades y enfrentar desafíos reales de IA.",
      summaryShort: "Estudiante de Ciencias de la Computación con experiencia práctica en frameworks de ML/DL, iniciativas de IA y proyectos colaborativos.",
      downloadButton: "Descargar CV en PDF",
      closeButton: "Cerrar Vista Previa",
      modalTitle: "Vista Previa del Currículum",
      sectionSummary: "RESUMEN PROFESIONAL",
      sectionExperience: "EXPERIENCIA LABORAL",
      sectionEducation: "EDUCACIÓN"
    }
  },

  resumeConfig: {
    enabled: true,
    fileName: "Ali_Asghar_Resume.pdf",
    
    // Option 3: Import from assets
    filePath: resumePdf,
    
    personalInfo: {
      name: "ALI ASGHAR",
      title: "DATA SCIENTIST",
      title_i18n: { en: "DATA SCIENTIST", es: "CIENTÍFICO DE DATOS" },
      email: "aliasghargh540@gmail.com",
      phone: "03202376159",
      address: "Kaltar Pur Muhala Kandiaro"
    },
    
       education: [
      {
        degree: "BS - Computer Science",
        degree_i18n: { en: "BS - Computer Science", es: "Licenciatura en Ciencias de la Computación" },
        institution: "NED Engineering University",
        period: "Dec 2023 - Present",
        description_i18n: {
          en: "Innovates by incorporating contemporary technologies to boost functionality and user experience. Consistently employs superior coding standards, streamlines workflows, and provides effective solutions via practical projects and independent work.",
          es: "Innovadora incorporando tecnologías contemporáneas para mejorar la funcionalidad y experiencia del usuario. Emplea consistentemente estándares de codificación superiores, optimiza flujos de trabajo y proporciona soluciones efectivas a través de proyectos prácticos y trabajo independiente."
        }
      },
      {
        degree: "Pre Engineering",
        degree_i18n: { en: "Pre Engineering", es: "Pre-Ingeniería" },
        institution: "Paras Science College Kandiaro",
        period: "Jan 2021 - Feb 2023",
        description_i18n: {
          en: "Completed intermediate (Science) with excellent grades",
          es: "Completado intermedio (Ciencias) con calificaciones excelentes"
        }
      }
    ]
  },

  project: projectConfig.project,
};

export default homeConfig;
