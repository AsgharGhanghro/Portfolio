/* eslint-disable no-useless-escape */
import React, { useState, useRef, useEffect } from 'react';

const PerfectChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi there! 👋 I'm Ali's AI assistant. I can help you learn about his skills, projects, and experience. What would you like to know?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentlyTyping, setCurrentlyTyping] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef(null);

  const portfolioData = {
    name: "Ali Asghar",
    role: "Data Scientist",
    email: "aliasghargh540@gmail.com",
    phone: "03202376159",
    location: "Kaltar Pur Muhala, Kandiaro, Sindh, Pakistan",
    portfolio: "https://portfolio-asghar-ali.vercel.app/",
    
    skills: {
      dataScience: [
        "Machine Learning & Deep Learning",
        "Python Programming (pandas, NumPy, scikit-learn)",
        "Data Processing & Analysis",
        "Feature Engineering & Model Optimization",
        "TensorFlow & PyTorch"
      ],
      webDevelopment: [
        "React.js & Modern JavaScript",
        "Responsive Web Design",
        "REST API Integration",
        "Full-Stack Development"
      ],
      advanced: [
        "LLM Assistants & RAG Systems",
        "AutoML & Model Deployment",
        "Production Deployment on Azure",
        "MLOps Best Practices"
      ]
    },
    
    projects: [
      {
        name: "Personal Portfolio Website",
        url: "https://portfolio-asghar-ali.vercel.app/",
        description: "A modern, responsive portfolio built with React showcasing all projects, skills, and an interactive AI chatbot assistant",
        tech: ["React", "JavaScript", "CSS3"],
        features: ["Responsive Design", "AI Chatbot", "Project Showcase", "Contact Form"]
      },
      {
        name: "Plagiarism and AI Checker",
        description: "Advanced AI tool that detects plagiarism and identifies AI-generated content using machine learning and natural language processing",
        tech: ["Python", "Machine Learning", "NLP", "Deep Learning"],
        status: "Currently in development",
        features: ["Text Analysis", "AI Detection", "Similarity Scoring"]
      },
      {
        name: "PNG to PDF Converter",
        url: "https://convert-web.lovable.app/",
        description: "Fast and reliable file conversion web application with an intuitive, user-friendly interface",
        tech: ["React", "JavaScript", "File Processing API"],
        features: ["Quick Conversion", "Batch Processing", "Preview Function"]
      }
    ],

    education: [
      {
        degree: "BS Computer Science",
        institution: "NED University of Engineering & Technology",
        location: "Karachi, Pakistan",
        period: "Dec 2023 - Present",
        details: "Studying Computer Science with focus on AI, Machine Learning, and Software Development"
      },
      {
        degree: "Pre-Engineering",
        institution: "Paras Science College Kandiaro",
        location: "Sindh, Pakistan",
        period: "Jan 2021 - Feb 2023",
        achievement: "Completed with excellent grades"
      }
    ],

    experience: {
      current: "Freelancer",
      startDate: "December 2024",
      description: "Working as a freelance Data Scientist and Full-Stack Developer, specializing in ML/AI solutions and web applications",
      responsibilities: [
        "Building and deploying machine learning models",
        "Creating data-driven web applications",
        "Integrating ML models with REST APIs",
        "Processing and analyzing large datasets",
        "Consulting on AI/ML projects"
      ],
      achievements: [
        "Participated in AI Hackathons",
        "Built AI systems for electricity usage analysis",
        "Developed consultative AI systems",
        "Successfully deployed multiple production applications"
      ]
    }
  };

  const getResponse = (input) => {
    const lowerInput = input.toLowerCase().trim();

    // Handle empty input
    if (lowerInput.length < 2) {
      return "I didn't quite catch that. Could you please ask your question? I'm here to help you learn about Ali's work!";
    }

    // Questions about the bot itself
    if (/^(who are you|what are you|tell me about (you|yourself)|what do you do|your name|introduce yourself)$/i.test(lowerInput)) {
      return "I'm Ali Asghar's AI assistant! 🤖\n\nI was created by Ali using React and JavaScript to help visitors learn about his work and expertise. I'm designed to answer your questions naturally and provide helpful information about:\n\n• His technical skills and experience\n• Projects he's built with live demos\n• His educational background\n• Contact information and availability\n\nThink of me as Ali's virtual representative here to help you! What would you like to know about him?";
    }

    // Who built you
    if (/who (built|build|created|create|made|make|developed|develop|programmed|program|designed|design|coded|code) (you|u|this|the bot|the chatbot)|who('s| is) (your|the|ur) (creator|developer|builder|maker)|who are you/i.test(lowerInput)) {
      return `I was built by Ali Asghar himself! 👨‍💻\n\nAli created me as part of his portfolio to showcase his skills in AI and web development. This chatbot demonstrates his ability to:\n\n• Build conversational AI interfaces\n• Develop with React and JavaScript\n• Create intuitive user experiences\n• Implement natural language understanding\n\nI'm a live example of Ali's work - a functional project that also helps visitors learn about him. Pretty cool, right? 😊\n\nWant to know more about his other projects?`;
    }

    // Greetings
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|sup|what's up|yo|hola|namaste)$/i.test(lowerInput)) {
      return "Hello! 👋 Great to meet you!\n\nI'm Ali's AI assistant, and I'm here to help you learn about his work in Data Science and Software Development.\n\nI can share information about:\n• His skills in Python, ML/DL, and React\n• Projects he's built (with live links!)\n• His education and background\n• How to contact him for opportunities\n\nWhat would you like to explore first?";
    }

    // About Ali
    if (/who (is|are)|about ali|tell me about (ali|him)|introduce (ali|him)|ali'?s? background|get to know/i.test(lowerInput)) {
      return "Ali Asghar is a Data Scientist and Computer Science student at NED University of Engineering & Technology in Karachi, Pakistan! 🎓\n\nPROFESSIONAL PROFILE:\n• Data Scientist with hands-on ML/DL experience\n• Currently freelancing on AI and web projects\n• Specializes in building production-ready ML systems\n• Strong full-stack development capabilities\n\nWHAT SETS HIM APART:\n✓ Takes projects from concept to production\n✓ Combines ML expertise with web development\n✓ Participated in AI Hackathons\n✓ Built real-world AI systems\n✓ Experience with LLMs, RAG, and AutoML\n\nCURRENT FOCUS:\nFreelancing on projects involving ML model deployment, data analytics, and intelligent web applications.\n\nWould you like to see his projects or learn about his technical skills?";
    }

    // Skills
    if (/skill|technology|tech stack|what (can|does|do) (he|ali) (know|use|work with)|expertise|proficient|technologies|tools|languages|capabilities|technical/i.test(lowerInput)) {
      let response = "Ali has comprehensive technical expertise across Data Science and Software Development:\n\n";
      
      response += "DATA SCIENCE & MACHINE LEARNING:\n";
      portfolioData.skills.dataScience.forEach(skill => {
        response += `• ${skill}\n`;
      });
      
      response += "\nWEB DEVELOPMENT:\n";
      portfolioData.skills.webDevelopment.forEach(skill => {
        response += `• ${skill}\n`;
      });
      
      response += "\nADVANCED AI CAPABILITIES:\n";
      portfolioData.skills.advanced.forEach(skill => {
        response += `• ${skill}\n`;
      });
      
      response += "\nDEVELOPMENT PRACTICES:\n";
      response += "• Git version control\n";
      response += "• Agile methodology\n";
      response += "• Code optimization\n";
      response += "• Production deployment\n\n";
      
      response += "His strength lies in combining these skills to build intelligent, user-friendly applications that solve real problems.\n\n";
      response += "Want to see how he's applied these in actual projects?";
      
      return response;
    }

    // Projects
    if (/project|work|portfolio|built|created|developed|application|app|what (has|did) (he|ali) (build|make|create|work on)|show me|demonstrate/i.test(lowerInput)) {
      let response = "Ali has built several impressive projects showcasing his skills:\n\n";
      
      portfolioData.projects.forEach((project, i) => {
        response += `${i + 1}. ${project.name.toUpperCase()}\n`;
        response += `${project.description}\n\n`;
        response += `Technologies: ${project.tech.join(', ')}\n`;
        
        if (project.features) {
          response += `Key Features: ${project.features.join(', ')}\n`;
        }
        
        if (project.url) {
          response += `🔗 Live Demo: ${project.url}\n`;
        }
        
        if (project.status) {
          response += `Status: ${project.status}\n`;
        }
        
        response += '\n';
      });
      
      response += "ADDITIONAL WORK:\n";
      response += "• AI system for electricity usage analysis\n";
      response += "• Consultative AI systems\n";
      response += "• Various ML models and data pipelines\n\n";
      response += "Each project shows his ability to handle the entire development lifecycle - from planning and coding to testing and deployment.\n\n";
      response += "Curious about any specific project or want to discuss his approach?";
      
      return response;
    }

    // Specific projects
    if (/portfolio (website|site)|personal website|this (website|site)|portfolio site/i.test(lowerInput)) {
      const project = portfolioData.projects[0];
      return `You're looking at Ali's portfolio website right now! 🌐\n\n${project.description}\n\nTECHNOLOGIES USED:\n${project.tech.join(', ')}\n\nKEY FEATURES:\n${project.features.map(f => `• ${f}`).join('\n')}\n\n🔗 ${project.url}\n\nThis site demonstrates Ali's frontend development skills and ability to create engaging, interactive user experiences. The chatbot you're talking to is also built by him!\n\nWant to see his other projects?`;
    }

    if (/pdf converter|png to pdf|converter|file conversion/i.test(lowerInput)) {
      const project = portfolioData.projects[2];
      return `The PNG to PDF Converter is one of Ali's practical web applications! 📄\n\n${project.description}\n\nTECHNOLOGIES:\n${project.tech.join(', ')}\n\nFEATURES:\n${project.features.map(f => `• ${f}`).join('\n')}\n\n🔗 Live Demo: ${project.url}\n\nThis project shows Ali's ability to build useful, practical tools that solve real user needs. It's fully functional and deployed!\n\nInterested in his other projects?`;
    }

    if (/(plagiarism|ai checker|detection|content checker)/i.test(lowerInput)) {
      const project = portfolioData.projects[1];
      return `The Plagiarism and AI Checker is an exciting ML project Ali is developing! 🔍\n\n${project.description}\n\nTECHNOLOGIES:\n${project.tech.join(', ')}\n\nFEATURES:\n${project.features.map(f => `• ${f}`).join('\n')}\n\nStatus: ${project.status}\n\nThis project demonstrates Ali's ML expertise and ability to build practical AI tools that address real-world challenges in content verification.\n\nWant to learn about his other projects or ML skills?`;
    }

    // Education
    if (/education|study|studying|university|college|degree|qualification|school|academic|student|where (does|did) (he|ali) study/i.test(lowerInput)) {
      let response = "ALI'S EDUCATIONAL BACKGROUND:\n\n";
      
      portfolioData.education.forEach((edu, i) => {
        response += `${i + 1}. ${edu.degree}\n`;
        response += `${edu.institution}\n`;
        response += `${edu.location}\n`;
        response += `${edu.period}\n`;
        if (edu.details) {
          response += `${edu.details}\n`;
        }
        if (edu.achievement) {
          response += `${edu.achievement}\n`;
        }
        response += '\n';
      });
      
      response += "BEYOND FORMAL EDUCATION:\n";
      response += "• Self-taught in advanced ML/AI concepts\n";
      response += "• Participated in AI Hackathons\n";
      response += "• Continuous learning through practical projects\n";
      response += "• Hands-on experience with latest technologies\n\n";
      response += "His education combined with extensive project experience gives him a strong foundation in both theory and real-world application.\n\n";
      response += "Want to know about his practical skills or see his projects?";
      
      return response;
    }

    // Experience
    if (/experience|work experience|job|working|freelanc|career|employment|what (does|is) (he|ali) (do|doing)|professional/i.test(lowerInput)) {
      const exp = portfolioData.experience;
      let response = `PROFESSIONAL EXPERIENCE:\n\n`;
      response += `Current Role: ${exp.current}\n`;
      response += `Since: ${exp.startDate}\n\n`;
      response += `${exp.description}\n\n`;
      
      response += "KEY RESPONSIBILITIES:\n";
      exp.responsibilities.forEach(r => {
        response += `• ${r}\n`;
      });
      
      response += "\nACHIEVEMENTS:\n";
      exp.achievements.forEach(a => {
        response += `• ${a}\n`;
      });
      
      response += "\nWORKING APPROACH:\n";
      response += "Ali specializes in taking projects from concept to production, handling everything from initial analysis to deployment and maintenance.\n\n";
      response += "Interested in hiring him or learning more about his skills?";
      
      return response;
    }

    // Contact
    if (/contact|email|phone|reach|connect|hire|get in touch|talk to (ali|him)|meet|message|available|recruiting|opportunity|work with/i.test(lowerInput)) {
      return `Great! Ali is available for opportunities and would love to hear from you! 📬\n\nCONTACT INFORMATION:\n📧 Email: ${portfolioData.email}\n📱 Phone: ${portfolioData.phone}\n🌐 Portfolio: ${portfolioData.portfolio}\n📍 Location: ${portfolioData.location}\n\nBEST FOR:\n• Freelance projects (ML, Data Science, Web Development)\n• Full-time opportunities\n• Technical consultations\n• Collaborations on AI/ML projects\n• Contract work\n\nRESPONSE TIME:\nAli is very responsive and typically replies within 24 hours. He's professional, communicative, and excited about new challenges!\n\nWHAT TO INCLUDE:\n• Project details or opportunity description\n• Timeline and budget expectations\n• Technical requirements\n• Any specific questions\n\nDon't hesitate to reach out!`;
    }

    // Python
    if (/python|python programming|learn python|python skills/i.test(lowerInput)) {
      return "Yes! Python is one of Ali's core strengths and his primary language for Data Science! 🐍\n\nPYTHON EXPERTISE:\n\nLibraries & Frameworks:\n• pandas - Data manipulation and analysis\n• NumPy - Numerical computing\n• scikit-learn - Machine learning algorithms\n• TensorFlow/PyTorch - Deep learning\n• Matplotlib/Seaborn - Data visualization\n• Flask/FastAPI - API development\n\nApplications:\n• Building ML/DL models from scratch\n• Data preprocessing and cleaning\n• Feature engineering and selection\n• Statistical analysis\n• Creating automated data pipelines\n• REST API development for model deployment\n\nReal Projects:\nAli has used Python extensively in his AI projects, including electricity usage analysis, plagiarism detection, and various ML systems.\n\nHe writes clean, efficient, production-ready Python code following industry best practices.\n\nWant to see his Python projects in action?";
    }

    // Machine Learning
    if (/machine learning|ml|deep learning|dl|ai|artificial intelligence|neural network|model|algorithm|data science/i.test(lowerInput)) {
      return "Ali has solid, hands-on expertise in Machine Learning and AI! Here's what he brings:\n\nTECHNICAL CAPABILITIES:\n• Building ML/DL models from scratch\n• Model training, evaluation, and optimization\n• Hyperparameter tuning and cross-validation\n• Feature engineering and selection\n• Model deployment via REST APIs\n• Production-ready ML systems\n\nREAL-WORLD EXPERIENCE:\n• AI Hackathon participant 🏆\n• Built AI system for electricity usage analysis\n• Developed consultative AI systems\n• Experience with LLM assistants\n• RAG (Retrieval-Augmented Generation) systems\n• AutoML experimentation\n\nFRAMEWORKS & TOOLS:\n• TensorFlow and PyTorch for deep learning\n• scikit-learn for classical ML\n• Production deployment on Azure\n• MLOps best practices\n\nAPPROACH:\nAli doesn't just build models - he solves problems by:\n• Understanding business requirements first\n• Choosing appropriate algorithms\n• Ensuring model interpretability\n• Building production-ready solutions\n• Implementing ongoing monitoring\n\nInterested in seeing his AI projects?";
    }

    // React/Web Dev
    if (/react|web dev|frontend|website|web app|javascript|html|css|ui|user interface|front.end/i.test(lowerInput)) {
      return "Ali is skilled in React and modern web development! 🌐\n\nFRONTEND SKILLS:\n• React.js - Component-based architecture\n• JavaScript/ES6+ - Modern features and syntax\n• Responsive Design - Mobile-first approach\n• State Management - React Hooks and Context\n• API Integration - REST APIs and data fetching\n• CSS3 - Modern styling and animations\n\nLIVE EXAMPLES:\nYou're experiencing his work right now! This portfolio website, including this chatbot, was built by Ali using React.\n\nPROJECTS:\n• Personal Portfolio - https://portfolio-asghar-ali.vercel.app/\n• PDF Converter - https://convert-web.lovable.app/\n• Various data visualization dashboards\n\nUNIQUE STRENGTH:\nAli combines web development with data science, creating applications that are both visually appealing and intelligent. He can build full-stack applications that seamlessly integrate ML models.\n\nDEPLOYMENT:\nExperienced with modern hosting platforms like Vercel and Netlify.\n\nWant to learn more about his approach or see other projects?";
    }

    // Location
    if (/where|location|based|from|live|city|country|pakistan/i.test(lowerInput)) {
      return `LOCATION INFORMATION:\n\n📍 Based in: ${portfolioData.location}\n\n🏛️ University: NED University of Engineering & Technology, Karachi\n\n🇵🇰 Country: Pakistan\n\nWORK ARRANGEMENT:\nAs a freelancer, Ali works remotely with clients worldwide. Geography doesn't limit collaboration - he's experienced with:\n• Remote collaboration tools (Slack, Zoom, Teams)\n• Asynchronous communication\n• Working across different time zones\n• Virtual meetings and presentations\n\nTime Zone: Pakistan Standard Time (PKT / UTC+5)\n\nAli is flexible with working hours and can accommodate different time zones for meetings and collaboration.\n\nInterested in working together?`;
    }

    // Availability
    if (/available for (work|hire)|looking for work|open to opportunities|seeking|job hunting|can (i|we) hire/i.test(lowerInput)) {
      return `Yes! Ali is currently available for new opportunities! 💼\n\nOPEN TO:\n✅ Freelance projects (short or long-term)\n✅ Contract positions\n✅ Full-time opportunities\n✅ Part-time consulting\n✅ Collaborative projects\n\nIDEAL PROJECTS:\n• Data Science and ML applications\n• Full-stack web development\n• ML model deployment and integration\n• Data analysis and visualization\n• AI-powered web applications\n\nWORKING STYLE:\n• Professional and reliable\n• Clear communication\n• On-time delivery\n• Flexible with requirements\n• Quick to adapt to new technologies\n• Remote-friendly\n\nSTART TIMELINE:\nCan begin new projects within 1-2 weeks depending on current commitments.\n\nNEXT STEPS:\n📧 Email: ${portfolioData.email}\n📱 Phone: ${portfolioData.phone}\n\nReach out with your project details for a prompt response!`;
    }

    // Portfolio
    if (/portfolio|his website|website link|url|site/i.test(lowerInput)) {
      return `ALI'S PORTFOLIO:\n\n🔗 ${portfolioData.portfolio}\n\nWHAT YOU'LL FIND:\n• Complete project showcase with live demos\n• Detailed breakdown of technical skills\n• Work experience timeline\n• Education background\n• Interactive AI assistant (me!) 🤖\n• Easy contact options\n• Professional presentation\n\nWHY VISIT:\n• See his work in action\n• Explore detailed project information\n• View his complete technical capabilities\n• Get a comprehensive view of his expertise\n• Direct contact methods\n\nThe portfolio itself demonstrates Ali's frontend development skills - it's responsive, modern, and user-friendly!\n\nAnything else you'd like to know about Ali?`;
    }

    // GitHub/Code
    if (/github|git|code|repository|repo|source code/i.test(lowerInput)) {
      return `ABOUT ALI'S CODE:\n\nWhile I don't have his GitHub link readily available, you can:\n\nVIEW LIVE PROJECTS:\n• Portfolio: https://portfolio-asghar-ali.vercel.app/\n• PDF Converter: https://convert-web.lovable.app/\n\nREQUEST CODE ACCESS:\nFor specific repositories or to discuss his coding approach:\n📧 ${portfolioData.email}\n\nAli is happy to share:\n• Code repositories\n• Technical documentation\n• Architecture decisions\n• Development methodologies\n\nCODE QUALITY:\nAli writes:\n✓ Clean, readable code\n✓ Well-documented functions\n✓ Modular, reusable components\n✓ Following industry best practices\n✓ Production-ready, maintainable code\n\nInterested in his technical skills or specific technologies?`;
    }

    // Rates/Pricing
    if (/salary|rate|price|cost|charge|payment|budget|how much|pricing|fee/i.test(lowerInput)) {
      return `REGARDING RATES:\n\nAli's rates vary based on:\n• Project scope and complexity\n• Timeline and urgency requirements\n• Type of work (ML, web dev, consulting)\n• Duration (hourly, project-based, retainer)\n\nBEST APPROACH:\nFor accurate pricing:\n1. Share your project requirements\n2. Specify your budget range\n3. Discuss timeline expectations\n4. Outline deliverables needed\n\nCONTACT ALI:\n📧 ${portfolioData.email}\n📱 ${portfolioData.phone}\n\nHe's flexible and works within various budget ranges. You'll receive a clear, transparent quote based on your specific needs.\n\nVALUE PROPOSITION:\n• High-quality work that meets requirements\n• Reliable, on-time delivery\n• Clear, consistent communication\n• Post-delivery support included\n• Reasonable, competitive rates\n\nHappy to discuss terms that work for both parties!`;
    }

    // Timeline questions
    if (/how long|timeline|deadline|when can|how fast|duration|time frame/i.test(lowerInput)) {
      return `REGARDING PROJECT TIMELINES:\n\nTimelines depend on several factors:\n• Project complexity and scope\n• Your specific requirements\n• Current workload\n• Technology stack involved\n• Team size (solo or collaborative)\n\nTYPICAL TIMELINES:\n• Small web projects: 1-2 weeks\n• ML model development: 2-4 weeks\n• Full-stack applications: 4-8 weeks\n• Complex AI systems: 6-12 weeks\n\nALI'S APPROACH:\n✓ Provides realistic estimates upfront\n✓ Breaks projects into clear milestones\n✓ Regular progress updates and communication\n✓ Flexible with urgent requirements\n✓ Buffer time for testing and refinement\n\nFOR ACCURATE TIMELINE:\nContact Ali with your project details:\n📧 ${portfolioData.email}\n\nHe'll provide a specific, realistic timeline tailored to your requirements!`;
    }

    // Thank you
    if (/thank|thanks|appreciate|awesome|cool|nice|great|helpful|good job|excellent/i.test(lowerInput)) {
      return `You're very welcome! 😊 I'm so glad I could help!\n\nIf you have any other questions about Ali's skills, projects, experience, or availability, feel free to ask anytime. I'm here to assist!\n\nOr if you'd like to reach out to Ali directly:\n📧 ${portfolioData.email}\n📱 ${portfolioData.phone}\n\nIs there anything else you'd like to know?`;
    }

    // Goodbye
    if (/bye|goodbye|see you|exit|close|later|see ya|cya|gtg|farewell/i.test(lowerInput)) {
      return `Thanks for chatting with me! 👋 It's been great talking to you!\n\nRemember, you can always reach out to Ali:\n📧 ${portfolioData.email}\n📱 ${portfolioData.phone}\n🌐 ${portfolioData.portfolio}\n\nFeel free to come back if you have more questions. Have a wonderful day! ✨`;
    }

    // Unclear/Help
    if (/don't know|not sure|maybe|help|confused|what can you|unclear/i.test(lowerInput)) {
      return `No problem! Let me make it easier for you:\n\nPOPULAR QUESTIONS:\n1️⃣ \"Tell me about Ali\" - His background and expertise\n2️⃣ \"What are his skills?\" - Technical capabilities\n3️⃣ \"Show me his projects\" - Work with live links\n4️⃣ \"How can I contact him?\" - Get in touch\n5️⃣ \"Is he available?\" - Hiring information\n\nOR ASK ABOUT:\n• Python or Machine Learning expertise\n• React and web development skills\n• Education and professional experience\n• Specific projects he's built\n• Anything else related to Ali!\n\nWhat would you like to know?`;
    }

    // Personal/Out-of-scope questions
    if (/(hobby|hobbies|favorite|favourite|tour|travel|personal life|family|age|birthday|married|girlfriend|boyfriend|religion|political|music|movie|food|sport|game|pet)/i.test(lowerInput)) {
      return `That's a thoughtful question! However, I focus specifically on Ali's professional information rather than personal details.\n\nI don't have information about his personal life, hobbies, or preferences - my knowledge is limited to his professional work and career.\n\nIf you'd like to know more about Ali on a personal level, feel free to reach out to him directly:\n📧 ${portfolioData.email}\n📱 ${portfolioData.phone}\n\nBut I'd be happy to tell you about:\n• His professional skills and expertise\n• Projects he's built\n• His work experience\n• Technical capabilities\n• How to collaborate with him\n\nWhat would you like to know about Ali's professional work? 😊`;
    }

    // Default response for out-of-scope questions
    return `That's an interesting question! However, I don't have information about that in Ali's professional profile.\n\nI'm specifically trained to help with questions about Ali's:\n• Professional skills and expertise\n• Work projects and portfolio\n• Education and experience\n• Technical capabilities\n• Contact information\n\nFor questions outside his professional work (like personal interests, hobbies, or other topics), I'd recommend reaching out to him directly:\n\n📧 ${portfolioData.email}\n📱 ${portfolioData.phone}\n\nOr you can ask me something like:\n• \"What are Ali's technical skills?\"\n• \"Show me his projects\"\n• \"What's his experience in ML?\"\n• \"How can I hire him?\"\n\nHow can I help you learn about Ali's professional background? 😊`;
  };

  const typeMessage = (text) => {
    return new Promise((resolve) => {
      let index = 0;
      setCurrentlyTyping('');
      
      const interval = setInterval(() => {
        if (index < text.length) {
          setCurrentlyTyping((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 12);
    });
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isTyping) return;

    const userMessage = {
      type: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Show thinking dots for 3-5 seconds (random)
    const thinkingTime = Math.floor(Math.random() * 1000) + 1000; // 3000-5000ms
    await new Promise(resolve => setTimeout(resolve, thinkingTime));

    const responseText = getResponse(userInput);
    await typeMessage(responseText);
    
    const botResponse = {
      type: 'bot',
      text: responseText
    };
    
    setMessages(prev => [...prev, botResponse]);
    setCurrentlyTyping('');
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        type: 'bot',
        text: "Hi there! 👋 I'm Ali's AI assistant. I can help you learn about his skills, projects, and experience. What would you like to know?"
      }
    ]);
    setShowClearConfirm(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentlyTyping]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .perfect-chat-toggle {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00D4FF 0%, #0088CC 100%);
          border: none;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 999;
          font-family: 'Inter', sans-serif;
        }

        .perfect-chat-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(0, 212, 255, 0.5);
        }

        .perfect-chat-toggle.hidden {
          display: none;
        }

        .perfect-chat-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 400px;
          height: 480px;
          background: #1a2332;
          border-radius: 16px;
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
          animation: slideIn 0.3s ease;
          font-family: 'Inter', sans-serif;
          border: 1px solid rgba(0, 212, 255, 0.15);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .perfect-chat-header {
          background: linear-gradient(135deg, #1a2332 0%, #243447 100%);
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0, 212, 255, 0.15);
        }

        .perfect-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .perfect-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00D4FF 0%, #0088CC 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
          color: white;
          box-shadow: 0 2px 8px rgba(0, 212, 255, 0.3);
        }

        .perfect-header-info h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: white;
          letter-spacing: -0.2px;
        }

        .perfect-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: #00D4FF;
          margin-top: 2px;
        }

        .perfect-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00D4FF;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .perfect-header-actions {
          display: flex;
          gap: 6px;
        }

        .perfect-clear-btn, .perfect-close-btn {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s;
          line-height: 1;
        }

        .perfect-clear-btn:hover, .perfect-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
        }

        .perfect-messages {
          flex: 1;
          overflow-y: auto;
          padding: 18px;
          background: #0f1823;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .perfect-messages::-webkit-scrollbar {
          width: 5px;
        }

        .perfect-messages::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
        }

        .perfect-messages::-webkit-scrollbar-thumb {
          background: rgba(0, 212, 255, 0.3);
          border-radius: 3px;
        }

        .perfect-message {
          display: flex;
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .perfect-bot-message {
          justify-content: flex-start;
        }

        .perfect-user-message {
          justify-content: flex-end;
        }

        .perfect-message-content {
          max-width: 90%;
          padding: 11px 14px;
          border-radius: 14px;
          line-height: 1.5;
          font-size: 13px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .perfect-bot-message .perfect-message-content {
          background: rgba(255, 255, 255, 0.06);
          color: #e8eef5;
          border-bottom-left-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .perfect-user-message .perfect-message-content {
          background: linear-gradient(135deg, #00D4FF 0%, #0088CC 100%);
          color: white;
          border-bottom-right-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 212, 255, 0.3);
        }

        .perfect-typing-box {
          display: flex;
          align-items: flex-start;
          gap: 2px;
          padding: 11px 14px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          border-bottom-left-radius: 4px;
          max-width: 90%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          min-height: 42px;
        }

        .perfect-typing-text {
          color: #e8eef5;
          font-size: 13px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-wrap: break-word;
          flex: 1;
        }

        .perfect-cursor {
          display: inline-block;
          width: 2px;
          height: 16px;
          background: #00D4FF;
          margin-left: 1px;
          animation: blink 0.8s infinite;
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .perfect-thinking-dots {
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 4px 0;
        }

        .perfect-thinking-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00D4FF;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .perfect-thinking-dots span:nth-child(1) {
          animation-delay: 0s;
        }

        .perfect-thinking-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .perfect-thinking-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .perfect-clear-confirm {
          position: absolute;
          top: 60px;
          right: 18px;
          background: #1a2332;
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 12px;
          padding: 12px 14px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 10;
          animation: fadeIn 0.2s ease;
        }

        .perfect-clear-confirm p {
          margin: 0 0 10px 0;
          color: #e8eef5;
          font-size: 12px;
        }

        .perfect-clear-confirm-btns {
          display: flex;
          gap: 8px;
        }

        .perfect-confirm-yes, .perfect-confirm-no {
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 11px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .perfect-confirm-yes {
          background: #00D4FF;
          color: white;
        }

        .perfect-confirm-yes:hover {
          background: #00b8e6;
        }

        .perfect-confirm-no {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .perfect-confirm-no:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .perfect-input-area {
          padding: 14px 16px;
          background: #1a2332;
          border-top: 1px solid rgba(0, 212, 255, 0.15);
          display: flex;
          gap: 10px;
        }

        .perfect-input {
          flex: 1;
          padding: 11px 14px;
          border: 1.5px solid rgba(0, 212, 255, 0.2);
          border-radius: 12px;
          font-size: 13px;
          outline: none;
          transition: all 0.2s;
          background: rgba(255, 255, 255, 0.04);
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .perfect-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .perfect-input:focus {
          border-color: #00D4FF;
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.1);
        }

        .perfect-send-btn {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: linear-gradient(135deg, #00D4FF 0%, #0088CC 100%);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0, 212, 255, 0.3);
        }

        .perfect-send-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
        }

        .perfect-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .perfect-chat-container {
            width: calc(100vw - 20px);
            height: 480px;
            bottom: 10px;
            right: 10px;
          }

          .perfect-chat-toggle {
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>

      <button
        className={`perfect-chat-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {isOpen && (
        <div className="perfect-chat-container">
          <div className="perfect-chat-header">
            <div className="perfect-header-left">
              <div className="perfect-avatar">AA</div>
              <div className="perfect-header-info">
                <h3>Ali's AI Assistant</h3>
                <div className="perfect-status">
                  <span className="perfect-status-dot"></span>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <div className="perfect-header-actions">
              <button
                className="perfect-clear-btn"
                onClick={() => setShowClearConfirm(!showClearConfirm)}
                aria-label="Clear chat"
                title="Clear chat"
              >
                🗑️
              </button>
              <button
                className="perfect-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {showClearConfirm && (
            <div className="perfect-clear-confirm">
              <p>Clear all messages?</p>
              <div className="perfect-clear-confirm-btns">
                <button className="perfect-confirm-yes" onClick={handleClearChat}>
                  Yes
                </button>
                <button className="perfect-confirm-no" onClick={() => setShowClearConfirm(false)}>
                  No
                </button>
              </div>
            </div>
          )}

          <div className="perfect-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`perfect-message ${message.type === 'user' ? 'perfect-user-message' : 'perfect-bot-message'}`}
              >
                <div className="perfect-message-content">
                  {message.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="perfect-message perfect-bot-message">
                <div className="perfect-typing-box">
                  {currentlyTyping ? (
                    <>
                      <span className="perfect-typing-text">
                        {currentlyTyping}
                      </span>
                      <span className="perfect-cursor"></span>
                    </>
                  ) : (
                    <div className="perfect-thinking-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="perfect-input-area">
            <input
              type="text"
              className="perfect-input"
              placeholder="Ask me anything about Ali..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
            />
            <button
              className="perfect-send-btn"
              onClick={handleSendMessage}
              disabled={inputValue.trim() === '' || isTyping}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PerfectChatbot;
