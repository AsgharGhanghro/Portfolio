import { BiGitRepoForked } from "react-icons/bi";
import { AiFillGithub, AiFillEye } from "react-icons/ai";
import { ImBook } from "react-icons/im";

import Detection from "../images/AI_Detection.png";
import Energy from "../images/Energy_Advisor.png";
import portfolio from "../images/portfolio.png";

import React from 'react';

const projectConfig = [
  {
    id: "project-5",
    title: "AI_Detection & Plagiarism Checker",
    category: { en: "Library", es: "Librería" },
    description_i18n: {
      en: "Hyperparameter tuning & feature selection for scikit‑learn using evolutionary algorithms.",
      es: "Ajuste de hiperparámetros y selección de variables para scikit‑learn con algoritmos evolutivos."
    },
    links: [
      { name: "repo", url: "https://github.com/AsgharGhanghro", icon: <AiFillGithub/> },
      { name: "fork", url: "https://github.com/AsgharGhanghro", icon: <BiGitRepoForked/> },
      { name: "subscription", url: "https://github.com/AsgharGhanghro", icon: <AiFillEye/> },
      { name: "docs", url: "https://sklearn-genetic-opt.readthedocs.io/en/stable/", icon: <ImBook/> }
    ],
    image: Detection,
    target: "_blank"
  },
  {
    id: "project-3",
    title: "Energy AI_Advisor",
    category: { en: "System", es: "Sistema" },
    description_i18n: {
      en: "Real‑time energy advisor for the users of electricity on Deep Learning GRU model.",
      es: "Asesor energético en tiempo real para los usuarios de electricidad basado en el modelo de Aprendizaje Profundo GRU."
    },
    links: [
      { name: "repo", url: "https://github.com/AsgharGhanghro", icon: <AiFillGithub/> },
      { name: "fork", url: "https://github.com/AsgharGhanghro", icon: <BiGitRepoForked/> },
      { name: "subscription", url: "https://github.com/AsgharGhanghro", icon: <AiFillEye/> }
    ],
    image: Energy,
    target: "_blank"
  },
  {
    id: "project-2",
    title: "Pyworkforce",
    category: { en: "Library", es: "Librería" },
    description_i18n: {
      en: "Standard tools for WFM: queuing, scheduling, rostering, and optimization.",
      es: "Herramientas estándar para WFM: colas, programación, turnos y optimización."
    },
    links: [
      { name: "repo", url: "https://github.com/AsgharGhanghro", icon: <AiFillGithub/> },
      { name: "fork", url: "https://github.com/AsgharGhanghro", icon: <BiGitRepoForked/> },
      { name: "subscription", url: "https://github.com/AsgharGhanghro", icon: <AiFillEye/> },
      { name: "docs", url: "https://pyworkforce.readthedocs.io/en/stable/", icon: <ImBook/> }
    ],
    image: "https://miro.medium.com/max/1400/1*UDnhOFK35IbAPx15wkMgVg.jpeg",
    target: "_blank"
  },
  {
    id: "project-1",
    title: "Portfolio Web",
    category: { en: "Website", es: "Sitio web" },
    description_i18n: {
      en: "Source code for my personal portfolio website.",
      es: "Código fuente de mi sitio web personal de portafolio."
    },
    links: [
      { name: "repo", url: "https://github.com/AsgharGhanghro", icon: <AiFillGithub/> },
      { name: "fork", url: "https://github.com/AsgharGhanghro", icon: <BiGitRepoForked/> },
      { name: "subscription", url: "https://github.com/AsgharGhanghro", icon: <AiFillEye/> }
    ],
    image: portfolio,
    target: "_blank"
  }
];

export default projectConfig;

