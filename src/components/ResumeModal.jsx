import React from 'react';
import './ResumeModal.css';
import homeConfig from '../assets/configs/homeConfig';

const ResumeModal = ({ isOpen, onClose, language = 'en' }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = homeConfig.resumeConfig.filePath;
      link.download = homeConfig.resumeConfig.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Fallback: open in new tab
      window.open(homeConfig.resumeConfig.filePath, '_blank');
    }
  };

  const resumeText = homeConfig.resume_i18n[language];
  const personalInfo = homeConfig.resumeConfig.personalInfo;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{resumeText.modalTitle}</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="resume-content">
          <div className="resume-header">
            <h1 className="resume-name">{personalInfo.name}</h1>
            <h2 className="resume-position">
              {language === 'es' ? personalInfo.title_i18n?.es || personalInfo.title : personalInfo.title}
            </h2>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                {personalInfo.email}
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                {personalInfo.phone}
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                {personalInfo.address}
              </div>
            </div>
          </div>
          
          <div className="section-divider"></div>
          
          <div className="section">
            <h3 className="section-title">{resumeText.sectionSummary}</h3>
            <p className="section-content">
              {resumeText.summary}
            </p>
          </div>
          
          <div className="section">
            <h3 className="section-title">{resumeText.sectionExperience}</h3>
            {homeConfig.workTimeline.map((work) => (
              <div key={work.id} className="experience-section">
                <div className="experience-header">
                  <h4 className="experience-title">{work.title_i18n[language]}</h4>
                  <span className="experience-period">{work.date}</span>
                </div>
                <p className="experience-company">{work.company}</p>
                <p className="experience-description">{work.description_i18n[language]}</p>
                <div className="experience-tags">
                  {work.tags.map((tag, index) => (
                    <span key={index} className="experience-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="section">
            <h3 className="section-title">{resumeText.sectionEducation}</h3>
            {homeConfig.resumeConfig.education.map((edu, index) => (
              <div key={index} className="education-section">
                <div className="education-header">
                  <h4 className="education-degree">
                    {language === 'es' ? edu.degree_i18n?.es || edu.degree : edu.degree}
                  </h4>
                  <span className="education-period">{edu.period}</span>
                </div>
                <p className="education-institution">{edu.institution}</p>
                <p className="education-description">
                  {language === 'es' ? edu.description_i18n?.es || edu.description : edu.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="pdf-note">
            <p>
              <strong>Complete Resume:</strong> Click the "Download PDF" button below to get the complete version of my resume with all details.
            </p>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>
            {resumeText.closeButton}
          </button>
          <button className="primary-btn" onClick={handleDownload}>
            {resumeText.downloadButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;