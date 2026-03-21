import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  Modal,
  IconButton,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import emailjs from '@emailjs/browser';
import { useLang } from '../utils/i18n';
import { FaInstagram } from "react-icons/fa";
import { TbBrandFiverr } from "react-icons/tb";

// ============================================================================
// IMPORTANT: Initialize EmailJS with your public key at the top of the file
// ============================================================================
emailjs.init('7tWecWbwsAYR4rVdD'); // Initialize with your public key

const UI = {
  en: {
    title: 'Let\'s Build Something',
    subtitle: 'Amazing Together',
    description: 'Have a machine learning project in mind? Let\'s discuss how we can turn your ideas into production-ready solutions.',
    form: {
      name: (
        <span>
          Full Name 
        </span>
      ),
      email: (
        <span>
          Email Address 
        </span>
      ),
      phone: (
        <span>
          Phone Number
        </span>
      ),
      project_type: (
        <span>
          Project Type 
        </span>
      ),
      select_project_type: 'Select Project Type',
      message: (
        <span>
          Project Details 
        </span>
      ),
      submit: 'Send Message',
      sending: 'Sending...',
    },
    subjects: [
      'LLM Assistant Development',
      'RAG Implementation',
      'AutoML Pipeline',
      'Data Analytics',
      'ML Consulting',
      'Azure ML Deployment',
      'Custom ML Solutions',
    ],
    contact: {
      title: 'Get In Touch',
      email: 'aliasghargh540@gmail.com',
      phone: '+92 3202376159',
      location: 'Naushero Feroz',
    },
    successModal: {
      title: 'Thank You!',
      message: 'Your message has been sent successfully. I\'ll get back to you within 24-48 hours.',
      backHome: 'Back to Home',
      close: 'Close',
    },
    error: 'Something went wrong. Please try again or contact me directly.',
    availability: 'Available for new projects',
    social: 'Connect With Me',
  },

  
  es: {
    title: 'Construyamos Algo',
    subtitle: 'Increíble Juntos',
    description: '¿Tienes un proyecto de machine learning en mente? Hablemos de cómo convertir tus ideas en soluciones listas para producción.',
    form: {
      name: (
        <span>
          Nombre Completo
        </span>
      ),
      email: (
        <span>
          Correo Electrónico 
        </span>
      ),
      phone: (
        <span>
          Teléfono 
        </span>
      ),
      project_type: (
        <span>
          Tipo de Proyecto 
        </span>
      ),
      select_project_type: 'Seleccionar Tipo de Proyecto',
      message: (
        <span>
          Detalles del Proyecto
        </span>
      ),
      submit: 'Enviar Mensaje',
      sending: 'Enviando...',
    },
    subjects: [
      'Desarrollo de Asistente LLM',
      'Implementación RAG',
      'Pipeline AutoML',
      'Analítica de Datos',
      'Consultoría ML',
      'Despliegue Azure ML',
      'Soluciones ML Personalizadas',
      'Otro',
    ],
    contact: {
      title: 'Contacto',
      email: 'aliasghargh540@gmail.com',
      phone: '+92 3202376159',
      location: 'Ferocious Nausher',
    },
    successModal: {
      title: '¡Gracias!',
      message: 'Tu mensaje ha sido enviado exitosamente. Te responderé en 24-48 horas.',
      backHome: 'Volver al Inicio',
      close: 'Cerrar',
    },
    error: 'Algo salió mal. Por favor intenta de nuevo o contáctame directamente.',
    availability: 'Disponible para nuevos proyectos',
    social: 'Conéctate Conmigo',
  },
};

// Styled 3D Card with enhanced effects
const Card3D = styled(motion.div)(({ theme }) => ({
  background: 'rgba(11, 18, 32, 0.6)',
  backdropFilter: 'blur(24px)',
  border: '1px solid rgba(6, 182, 212, 0.15)',
  borderRadius: '24px',
  padding: '48px',
  position: 'relative',
  transformStyle: 'preserve-3d',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '24px',
    padding: '2px',
    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.6), rgba(125, 211, 252, 0.3), rgba(6, 182, 212, 0.6))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: '-100px',
    background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(6, 182, 212, 0.15), transparent 50%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
    zIndex: -1,
  },
  '&:hover::after': {
    opacity: 1,
  },
  [theme.breakpoints.down('md')]: {
    padding: '32px 24px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '24px 16px',
    borderRadius: '16px',
  },
}));

// Enhanced Styled Input with phone validation
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'rgba(11, 18, 32, 0.8)',
    borderRadius: '16px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '16px',
    '& fieldset': {
      borderColor: 'rgba(6, 182, 212, 0.3)',
      borderWidth: '1.5px',
      transition: 'all 0.4s ease',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(6, 182, 212, 0.6)',
      borderWidth: '1.5px',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#06b6d4',
      borderWidth: '2px',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(6, 182, 212, 0.08)',
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(6, 182, 212, 0.2), 0 0 0 4px rgba(6, 182, 212, 0.1)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '16px',
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#06b6d4',
      fontWeight: 600,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '16px 18px',
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px rgba(11, 18, 32, 0.9) inset',
      WebkitTextFillColor: '#fff',
      borderRadius: '16px',
    },
  },
  '& .MuiSelect-select': {
    color: '#fff',
  },
  '& .MuiMenuItem-root': {
    color: '#fff',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      fontSize: '14px',
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '14px 16px',
    },
  },
}));

// Contact Info Item
const ContactItem = ({ icon: Icon, text, link }) => (
  <motion.a
    href={link}
    target={link?.startsWith('http') ? '_blank' : undefined}
    rel="noopener noreferrer"
    whileHover={{ x: 8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '18px 22px',
      background: 'rgba(11, 18, 32, 0.6)',
      borderRadius: '16px',
      border: '1px solid rgba(6, 182, 212, 0.2)',
      textDecoration: 'none',
      color: '#fff',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backdropFilter: 'blur(10px)',
    }}
  >
    <Box
      sx={{
        width: { xs: 44, sm: 52 },
        height: { xs: 44, sm: 52 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(125, 211, 252, 0.15))',
        border: '1px solid rgba(6, 182, 212, 0.4)',
        boxShadow: '0 4px 12px rgba(6, 182, 212, 0.2)',
      }}
    >
      <Icon sx={{ fontSize: { xs: 22, sm: 26 }, color: '#06b6d4' }} />
    </Box>
    <Typography sx={{ fontSize: { xs: 14, sm: 16 }, fontWeight: 500, wordBreak: 'break-word' }}>{text}</Typography>
  </motion.a>
);

// Floating particles background
const FloatingParticle = ({ delay, duration, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0.6, 0],
      scale: [0, 1.2, 1, 0],
      x: [x, x + Math.random() * 120 - 60],
      y: [y, y - Math.random() * 250],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{
      position: 'absolute',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: 'rgba(6, 182, 212, 0.8)',
      boxShadow: '0 0 15px rgba(6, 182, 212, 1), 0 0 30px rgba(6, 182, 212, 0.5)',
      pointerEvents: 'none',
    }}
  />
);

// Success Modal Component
const SuccessModal = ({ open, onClose, onGoHome, t }) => (
  <Modal
    open={open}
    onClose={onClose}
    closeAfterTransition
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
    }}
  >
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <Box
            sx={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(11, 18, 32, 0.98), rgba(8, 16, 26, 0.98))',
              backdropFilter: 'blur(20px)',
              borderRadius: { xs: '20px', sm: '24px' },
              padding: { xs: '24px 20px', sm: '32px' },
              maxWidth: '450px',
              width: '85vw',
              border: '2px solid rgba(6, 182, 212, 0.3)',
              boxShadow: '0 20px 60px rgba(6, 182, 212, 0.4), 0 0 0 1px rgba(6, 182, 212, 0.1)',
              textAlign: 'center',
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: { xs: 8, sm: 12 },
                top: { xs: 8, sm: 12 },
                color: 'rgba(255, 255, 255, 0.6)',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15 }}
            >
              <Box
                sx={{
                  width: { xs: 80, sm: 90 },
                  height: { xs: 80, sm: 90 },
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(125, 211, 252, 0.2))',
                  border: '2px solid rgba(6, 182, 212, 0.5)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -15,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)',
                    animation: 'pulse 2s infinite',
                  },
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                    '50%': { opacity: 0.5, transform: 'scale(1.05)' },
                  },
                }}
              >
                <CheckCircleIcon sx={{ fontSize: { xs: 42, sm: 48 }, color: '#06b6d4' }} />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Typography sx={{ fontSize: { xs: 36, sm: 42 }, mb: 1 }}>😊</Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 22, sm: 26, md: 30 },
                  mb: 1.5,
                  background: 'linear-gradient(90deg, #06b6d4, #7dd3fc)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {t.successModal.title}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: 13, sm: 15 },
                  lineHeight: 1.5,
                  mb: 2.5,
                  px: 1,
                }}
              >
                {t.successModal.message}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
                <Button
                  onClick={onGoHome}
                  variant="contained"
                  size="medium"
                  startIcon={<HomeIcon />}
                  sx={{
                    py: 1.2,
                    px: { xs: 2.5, sm: 3 },
                    fontSize: { xs: 13, sm: 14 },
                    fontWeight: 600,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    boxShadow: '0 6px 20px rgba(6, 182, 212, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0891b2, #06b6d4)',
                      boxShadow: '0 8px 24px rgba(6, 182, 212, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                    minWidth: '120px',
                  }}
                >
                  {t.successModal.backHome}
                </Button>
                <Button
                  onClick={onClose}
                  variant="outlined"
                  size="medium"
                  sx={{
                    py: 1.2,
                    px: { xs: 2.5, sm: 3 },
                    fontSize: { xs: 13, sm: 14 },
                    fontWeight: 600,
                    borderRadius: '10px',
                    borderColor: 'rgba(6, 182, 212, 0.5)',
                    color: '#06b6d4',
                    '&:hover': {
                      borderColor: '#06b6d4',
                      backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    },
                    minWidth: '120px',
                  }}
                >
                  {t.successModal.close}
                </Button>
              </Stack>
            </motion.div>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  </Modal>
);

export default function Contact() {
  const [lang] = useLang();
  const t = UI[lang] || UI.en;
  const cardRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // 3D card tilt effect with mouse tracking
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^(?:\+92\s?3\d{2}|03\d{2}|3\d{2})\s?\d{7}$/;
    return re.test(phone);
  };

  const formatPhoneNumber = (phone) => {
    const digits = phone.replace(/\D/g, '');
    
    if (digits.startsWith('92') && digits.length === 12) {
      return `+${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
    }
    
    if (digits.startsWith('0') && digits.length === 11) {
      return `+92 ${digits.slice(1,4)} ${digits.slice(4)}`;
    }
    
    if (digits.startsWith('3') && digits.length === 10) {
      return `+92 ${digits.slice(0,3)} ${digits.slice(3)}`;
    }
    
    return phone;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    
    if (name === 'phone') {
      newValue = value.replace(/[^\d\s+]/g, '');
      
      const digits = newValue.replace(/\D/g, '');
      if (digits.length <= 12) {
        if (digits.startsWith('92')) {
          newValue = `+${digits.slice(0,2)}${digits.length > 2 ? ' ' + digits.slice(2,5) : ''}${digits.length > 5 ? ' ' + digits.slice(5) : ''}`;
        } else if (digits.startsWith('0')) {
          newValue = `0${digits.slice(1,4)}${digits.length > 4 ? ' ' + digits.slice(4) : ''}`;
        } else if (digits.startsWith('3')) {
          newValue = `${digits.slice(0,3)}${digits.length > 3 ? ' ' + digits.slice(3) : ''}`;
        }
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (status.type === 'error') {
      setStatus({ type: '', message: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid Pakistani phone number (e.g., +92 3XX XXXXXXX or 03XX XXXXXXX)';
    }
    
    if (!formData.project_type.trim()) {
      newErrors.project_type = 'Please select a project type';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide project details';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Project details should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const extractSubjectFromMessage = (message) => {
    if (!message.trim()) return '';
    
    const lines = message.trim().split('\n');
    const firstLine = lines[0].trim();
    
    if (firstLine.length < 3) {
      const truncated = message.trim().substring(0, 50).trim();
      return truncated.endsWith('...') ? truncated : truncated + (message.trim().length > 50 ? '...' : '');
    }
    
    return firstLine.length > 50 
      ? firstLine.substring(0, 47) + '...' 
      : firstLine;
  };

  // Add this ALTERNATIVE handleSubmit function to your Contact.jsx
// Replace your existing handleSubmit with this one

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    setStatus({ type: 'error', message: 'Please fix the errors in the form' });
    return;
  }
  
  setIsSubmitting(true);
  setStatus({ type: '', message: '' });

  try {
    console.log('=== Using Alternative EmailJS Method ===');
    
    // EmailJS Configuration
    const serviceId = 'service_gg26ids';
    const templateId = 'template_d67tv1t'; 
    const replyTemplateId = 'template_g0dst2s';
    
    const currentTime = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const formattedPhone = formatPhoneNumber(formData.phone);
    const subject = extractSubjectFromMessage(formData.message);

    // Method 1: Try using fetch directly (bypass EmailJS library)
    console.log('Attempting direct API call...');
    
    const yourEmailData = {
      service_id: serviceId,
      template_id: templateId,
      user_id: '7tWecWbwsAYR4rVdD',
      template_params: {
        to_email: 'aliasghargh540@gmail.com',
        to_name: 'Ali Asghar',
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        reply_to: formData.email.trim(),
        full_name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formattedPhone,
        project_type: formData.project_type,
        subject: subject || 'Project Inquiry',
        message: formData.message.trim(),
        time: currentTime,
        date: new Date().toLocaleDateString(),
        website_name: 'Ali Asghar Portfolio',
        submitted_from: 'Contact Form',
        response_time: '24-48 hours',
      }
    };

    // Send to YOU using direct fetch
    const response1 = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(yourEmailData)
    });

    if (!response1.ok) {
      const errorText = await response1.text();
      throw new Error(`Email to you failed: ${errorText}`);
    }

    console.log('✓ Email to you sent successfully');

    // Send auto-reply to USER
    const userReplyData = {
      service_id: serviceId,
      template_id: replyTemplateId,
      user_id: '7tWecWbwsAYR4rVdD',
      template_params: {
        to_email: formData.email.trim(),
        to_name: formData.name.trim(),
        from_name: 'Ali Asghar',
        from_email: 'aliasghargh540@gmail.com',
        reply_to: 'aliasghargh540@gmail.com',
        project_type: formData.project_type,
        subject: subject || 'Project Inquiry',
        time: currentTime,
        date: new Date().toLocaleDateString(),
        response_time: '24-48 hours',
      }
    };

    const response2 = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userReplyData)
    });

    if (!response2.ok) {
      const errorText = await response2.text();
      console.warn('Auto-reply failed:', errorText);
      // Don't throw - main email was sent successfully
    } else {
      console.log('✓ Auto-reply sent successfully');
    }

    // SUCCESS
    setFormData({
      name: '',
      email: '',
      phone: '',
      project_type: '',
      message: '',
    });
    
    setErrors({
      name: '',
      email: '',
      phone: '',
      project_type: '',
      message: '',
    });
    
    setShowSuccessModal(true);
    setStatus({ type: '', message: '' });

  } catch (error) {
    console.error('=== Email Send Error ===');
    console.error('Error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    let errorMessage = t.error;
    
    // Check specific error types
    if (error.message && error.message.includes('Failed to fetch')) {
      errorMessage = `Network Error: Unable to connect to email service. 

Possible causes:
1. Check your internet connection
2. Try disabling browser extensions (AdBlock, etc.)
3. Try a different browser or incognito mode
4. Your network/firewall may be blocking EmailJS

Temporary solution: Contact me directly at aliasghargh540@gmail.com`;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setStatus({ 
      type: 'error', 
      message: errorMessage
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleGoHome = () => {
    setShowSuccessModal(false);
    window.location.href = '/';
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(180deg, #0b1220 0%, #08101a 50%, #05080f 100%)',
        color: '#fff',
        overflow: 'hidden',
        pt: { xs: 8, sm: 10, md: 12 },
        pb: { xs: 6, sm: 8, md: 12 },
      }}
    >
      {/* Animated background gradients */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* Top left glow */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            left: '-250px',
            top: '-250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Bottom right glow */}
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, -60, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            right: '-200px',
            bottom: '-200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(125,211,252,0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Center accent */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.4}
            duration={8 + Math.random() * 6}
            x={Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)}
            y={(typeof window !== 'undefined' ? window.innerHeight : 800) + Math.random() * 100}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 32, sm: 40, md: 60, lg: 72 },
                fontWeight: 900,
                letterSpacing: -2,
                lineHeight: 1.1,
                mb: 2,
                px: { xs: 2, sm: 0 },
              }}
            >
              {t.title}
              <Box
                component="span"
                sx={{
                  display: 'block',
                  background: 'linear-gradient(90deg, #06b6d4, #7dd3fc, #06b6d4)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 0 60px rgba(6, 182, 212, 0.4)',
                  animation: 'gradientShift 3s ease infinite',
                  '@keyframes gradientShift': {
                    '0%, 100%': { backgroundPosition: '0% center' },
                    '50%': { backgroundPosition: '100% center' },
                  },
                }}
              >
                {t.subtitle}
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 14, sm: 16, md: 19 },
                color: 'rgba(255, 255, 255, 0.75)',
                maxWidth: 720,
                mx: 'auto',
                lineHeight: 1.7,
                px: { xs: 2, sm: 3, md: 0 },
              }}
            >
              {t.description}
            </Typography>
          </Box>
        </motion.div>

        {/* Main Content Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.5fr 1fr' },
            gap: { xs: 3, sm: 4 },
          }}
        >
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card3D ref={cardRef}>
              <form ref={formRef} onSubmit={handleSubmit}>
                <Stack spacing={{ xs: 2.5, sm: 3 }}>
                  <Box>
                    <StyledTextField
                      fullWidth
                      label={t.form.name}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Box>

                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 2.5, sm: 3 } }}>
                    <Box>
                      <StyledTextField
                        fullWidth
                        label={t.form.email}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Box>

                    <Box>
                      <StyledTextField
                        fullWidth
                        label={t.form.phone}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        error={!!errors.phone}
                        helperText={errors.phone}
                        placeholder="+92 3XX XXXXXXX"
                      />
                    </Box>
                  </Box>

                  <Box>
                    <StyledTextField
                      fullWidth
                      select
                      label={t.form.project_type}
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      error={!!errors.project_type}
                      helperText={errors.project_type}
                      SelectProps={{
                        displayEmpty: true,
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              bgcolor: 'rgba(11, 18, 32, 0.95)',
                              backdropFilter: 'blur(20px)',
                              border: '1px solid rgba(6, 182, 212, 0.3)',
                              borderRadius: '12px',
                              mt: 1,
                              '& .MuiMenuItem-root': {
                                color: '#fff',
                                fontSize: { xs: '14px', sm: '16px' },
                                '&:hover': {
                                  bgcolor: 'rgba(6, 182, 212, 0.15)',
                                },
                                '&.Mui-selected': {
                                  bgcolor: 'rgba(6, 182, 212, 0.25)',
                                  '&:hover': {
                                    bgcolor: 'rgba(6, 182, 212, 0.3)',
                                  },
                                },
                              },
                            },
                          },
                        },
                      }}
                    >
                      <MenuItem value="" disabled sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        {t.form.select_project_type}
                      </MenuItem>
                      {t.subjects.map((projectType) => (
                        <MenuItem key={projectType} value={projectType}>
                          {projectType}
                        </MenuItem>
                      ))}
                    </StyledTextField>
                  </Box>

                  <Box>
                    <StyledTextField
                      fullWidth
                      label={t.form.message}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={{ xs: 5, sm: 6 }}
                      variant="outlined"
                      error={!!errors.message}
                      helperText={errors.message}
                      placeholder="Start with a brief project title on the first line, then describe your project requirements, timeline, and any specific details..."
                    />
                  </Box>

                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Alert 
                        severity={status.type} 
                        sx={{ 
                          borderRadius: 2,
                          bgcolor: status.type === 'error' 
                            ? 'rgba(239, 68, 68, 0.15)' 
                            : 'rgba(34, 197, 94, 0.15)',
                          color: '#fff',
                          border: `1px solid ${status.type === 'error' 
                            ? 'rgba(239, 68, 68, 0.3)' 
                            : 'rgba(34, 197, 94, 0.3)'}`,
                        }}
                      >
                        {status.message}
                      </Alert>
                    </motion.div>
                  )}

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      endIcon={!isSubmitting && <SendIcon />}
                      sx={{
                        py: { xs: 1.75, sm: 2 },
                        fontSize: { xs: 15, sm: 17 },
                        fontWeight: 700,
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                        boxShadow: '0 10px 40px rgba(6, 182, 212, 0.35)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                          transition: 'left 0.5s ease',
                        },
                        '&:hover': {
                          background: 'linear-gradient(135deg, #0891b2, #06b6d4)',
                          boxShadow: '0 15px 50px rgba(6, 182, 212, 0.5)',
                          transform: 'translateY(-2px)',
                          '&::before': {
                            left: '100%',
                          },
                        },
                        '&:disabled': {
                          background: 'rgba(6, 182, 212, 0.3)',
                          color: 'rgba(255, 255, 255, 0.5)',
                        },
                      }}
                    >
                      {isSubmitting ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            style={{ display: 'flex' }}
                          >
                            <SendIcon />
                          </motion.div>
                          {t.form.sending}
                        </Box>
                      ) : (
                        t.form.submit
                      )}
                    </Button>
                  </motion.div>
                </Stack>
              </form>
            </Card3D>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Stack spacing={{ xs: 2.5, sm: 3 }}>
              <Box
                sx={{
                  background: 'rgba(11, 18, 32, 0.6)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: { xs: '16px', sm: '24px' },
                  p: { xs: 3, sm: 4 },
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: 20, sm: 24 },
                    background: 'linear-gradient(90deg, #06b6d4, #7dd3fc)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {t.contact.title}
                </Typography>

                <Stack spacing={2}>
                  <ContactItem
                    icon={EmailIcon}
                    text={t.contact.email}
                    link={`mailto:${t.contact.email}`}
                  />
                  <ContactItem
                    icon={PhoneIcon}
                    text={t.contact.phone}
                    link={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                  />
                  <ContactItem
                    icon={LocationOnIcon}
                    text={t.contact.location}
                    link={`https://maps.google.com/?q=${encodeURIComponent(t.contact.location)}`}
                  />
                </Stack>
              </Box>

              {/* Social Links */}
              <Box
                sx={{
                  background: 'rgba(11, 18, 32, 0.6)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: { xs: '16px', sm: '24px' },
                  p: { xs: 3, sm: 4 },
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 3, color: 'rgba(255, 255, 255, 0.9)', fontSize: { xs: 18, sm: 20 } }}
                >
                  {t.social}
                </Typography>
                
                <Stack direction="row" spacing={2}>
                  {[
                    { icon: LinkedInIcon, link: 'https://linkedin.com/in/ali-asghar-a730322bb/' },
                    { icon: GitHubIcon, link: 'https://github.com/AsgharGhanghro' },
                    { 
                      icon: () => <TbBrandFiverr style={{ fontSize: '24px' }} />, 
                      link: 'https://www.fiverr.com/users/asghar_ned/manage_gigs' 
                    },
                    { 
                      icon: () => <FaInstagram style={{ fontSize: '24px' }} />, 
                      link: 'https://www.fiverr.com/users/asghar_ned/manage_gigs' 
                    }
                  ].map(({ icon: Icon, link }, i) => (
                    <motion.a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: 60,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(125, 211, 252, 0.15))',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(6, 182, 212, 0.2)',
                      }}
                    >
                      <Icon sx={{ fontSize: { xs: 26, sm: 30 }, color: '#06b6d4' }} />
                    </motion.a>
                  ))}
                </Stack>
              </Box>

              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    borderRadius: { xs: '16px', sm: '20px' },
                    p: { xs: 2.5, sm: 3 },
                    textAlign: 'center',
                    boxShadow: '0 8px 32px rgba(34, 197, 94, 0.2)',
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 12, sm: 14 },
                      height: { xs: 12, sm: 14 },
                      borderRadius: '50%',
                      background: '#22c55e',
                      boxShadow: '0 0 24px rgba(34, 197, 94, 1)',
                      display: 'inline-block',
                      mr: 2,
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                        '50%': { opacity: 0.6, transform: 'scale(1.1)' },
                      },
                    }}
                  />
                  <Typography sx={{ fontWeight: 700, display: 'inline', fontSize: { xs: 14, sm: 16 } }}>
                    {t.availability}
                  </Typography>
                </Box>
              </motion.div>
            </Stack>
          </motion.div>
        </Box>
      </Container>

      {/* Success Modal */}
      <SuccessModal
        open={showSuccessModal}
        onClose={handleCloseModal}
        onGoHome={handleGoHome}
        t={t}
      />
    </Box>
  );
}