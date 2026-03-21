# 🚀 Ali Asghar — Personal Portfolio

![Portfolio Banner](https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1200&auto=format&fit=crop&q=80)

> A modern, responsive personal portfolio built with **React**, **Material UI**, and **Framer Motion** — showcasing my journey as an ML Engineer, Full Stack Developer, and Deep Learning Engineer.

---

## 🌐 Live Demo

🔗 [View Portfolio](https://portfolio-tau-three-74.vercel.app/) 

---

## ✨ Features

- 🌍 **Bilingual Support** — English & Spanish (i18n)
- 🎨 **Dark / Light Theme Toggle**
- 🤖 **AI Chatbot** — built-in assistant
- 📄 **Resume Preview & Download** — PDF modal
- 🃏 **Interactive Project Cards** — draggable stack with Framer Motion
- ⏳ **Animated Work Timeline** — experience history
- 📱 **Fully Responsive** — mobile, tablet, desktop
- ⚡ **Scroll Progress Indicator**
- 🔍 **SEO Optimized** — JSON-LD structured data

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React 18, JSX |
| **UI Library** | Material UI (MUI v6) |
| **Animations** | Framer Motion |
| **Styling** | Tailwind CSS, CSS Modules |
| **Icons** | React Icons |
| **Routing** | React Router DOM |
| **Language** | JavaScript (ES6+) |
| **Build Tool** | Vite / Create React App |

---

## 📁 Folder Structure

```
portfolio/
│
├── public/                         # Static assets
│
├── src/
│   ├── assets/
│   │   ├── configs/
│   │   │   ├── homeConfig.jsx      # Main config — greeting, timeline, resume
│   │   │   ├── projectConfig.jsx   # Projects data
│   │   │   ├── skillsConfig.jsx    # Skills data
│   │   │   ├── blogConfig.jsx      # Blog data
│   │   │   ├── footerConfig.jsx    # Footer links
│   │   │   └── menuConfig.jsx      # Navigation menu
│   │   └── images/
│   │       └── Ali_Asghar_Resume.pdf
│   │
│   ├── components/
│   │   ├── Cards/                  # Reusable card components
│   │   ├── Footer/                 # Footer component
│   │   ├── NavBar/                 # Navigation bar
│   │   ├── Tags/                   # Tag/badge components
│   │   ├── Timeline/               # Work experience timeline
│   │   ├── Project/
│   │   │   ├── index.jsx           # Projects section
│   │   │   └── Stack.jsx           # Draggable card stack
│   │   ├── About.js                # About section
│   │   ├── Chatbot.jsx             # AI Chatbot
│   │   ├── DynamicTyping.js        # Animated typing titles
│   │   ├── Hero.jsx                # Hero section
│   │   ├── ResumeModal.jsx         # PDF resume modal
│   │   ├── Seo.js                  # SEO component
│   │   └── ThemeToggle.jsx         # Dark/light toggle
│   │
│   ├── pages/
│   │   └── Home/
│   │       └── Home.js             # Main home page
│   │
│   ├── utils/
│   │   └── i18n.js                 # Language switcher utility
│   │
│   ├── App.js                      # Root app component
│   ├── index.jsx                   # Entry point
│   ├── master-styles.css           # Global styles
│   └── theme.js                    # MUI theme config
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) v16+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-portfolio.git

# 2. Navigate into the project
cd your-portfolio

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The app will run at **http://localhost:3000**

---

## ⚙️ Configuration

All content is managed through config files in `src/assets/configs/`:

### Update Personal Info
Edit `homeConfig.jsx`:
```jsx
personalInfo: {
  name: "ALI ASGHAR",
  email: "aliasghargh540@gmail.com",
  phone: "03202376159",
}
```

### Add a New Project
Edit `projectConfig.jsx`:
```jsx
{
  id: "project-x",
  title: "My New Project",
  description: "Project description here",
  link: "https://your-project-link.com",
  image: "https://image-url.com",
  tags: ["react", "python"]
}
```

### Add Work Experience
Edit `workTimeline` in `homeConfig.jsx`:
```jsx
{
  id: "work-5",
  title: "Your New Role",
  company: "Company Name",
  date: "2025-Present",
  description_i18n: {
    en: "Description in English",
    es: "Descripción en Español",
  },
  tags: ["skill1", "skill2"],
}
```

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `/build` folder, ready to deploy.

---

## 🌍 Deployment

This portfolio can be deployed on:

| Platform | Command |
|---|---|
| **Vercel** | `vercel deploy` |
| **Netlify** | Drag & drop `/build` folder |
| **GitHub Pages** | `npm run deploy` |

---

## 👤 Author

**Ali Asghar**

- 🎓 BS Computer Science — NED Engineering University
- 📧 [aliasghargh540@gmail.com](mailto:aliasghargh540@gmail.com)
- 📱 03202376159
- 📍 Kandiaro, Pakistan

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> ⭐ If you found this helpful, please give it a star on GitHub!
