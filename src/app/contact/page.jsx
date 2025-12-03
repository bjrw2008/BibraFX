'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-vh-100 bg-light pt-5">
      <div className="container mt-5 py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/" className="text-decoration-none">
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact Us
            </li>
          </ol>
        </nav>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <h1 className="display-5 fw-bold text-dark mb-1">Contact Us</h1>
                <p className="text-muted mb-4">
                  Have questions? We're here to help!
                </p>

                {submitStatus === 'success' ? (
                  <div className="alert alert-success" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    Thank you for your message! We'll get back to you soon.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-medium">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label fw-medium">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label fw-medium">Subject *</label>
                        <input
                          type="text"
                          name="subject"
                          className="form-control"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="How can we help?"
                        />
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label fw-medium">Message *</label>
                        <textarea
                          name="message"
                          className="form-control"
                          rows="6"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Type your message here..."
                        ></textarea>
                      </div>
                      
                      <div className="col-12">
                        <button 
                          type="submit" 
                          className="btn btn-primary px-4 py-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <i className="fas fa-spinner fa-spin me-2"></i>
                              Sending...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane me-2"></i>
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold text-dark mb-4">
                  <i className="fas fa-info-circle text-primary me-2"></i>
                  Contact Information
                </h5>
                
                <div className="contact-info">
                  <div className="d-flex align-items-start mb-4">
                    <div className="contact-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{width: '45px', height: '45px'}}>
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-1">Email</h6>
                      <p className="text-muted mb-0">support@bibrafx.com</p>
                      <p className="text-muted mb-0">info@bibrafx.com</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start mb-4">
                    <div className="contact-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{width: '45px', height: '45px'}}>
                      <i className="fas fa-headset"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-1">Support Hours</h6>
                      <p className="text-muted mb-0">Monday - Friday: 9AM - 6PM</p>
                      <p className="text-muted mb-0">Saturday: 10AM - 4PM</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start">
                    <div className="contact-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{width: '45px', height: '45px'}}>
                      <i className="fas fa-globe"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-1">Connect With Us</h6>
                      <div className="social-links mt-2">
                        <a href="https://twitter.com/bibrafx" className="text-primary me-3" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a href="https://facebook.com/bibrafx" className="text-primary me-3" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-facebook fa-lg"></i>
                        </a>
                        <a href="https://linkedin.com/bibrafx" className="text-primary" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-linkedin fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}