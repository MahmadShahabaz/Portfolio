import React, { useState, useEffect } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { sendContact } from '../services/api';
import './styles/ContactForm.css';

interface FormState {
  fullName: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isTouched, setIsTouched] = useState<Record<keyof FormState, boolean>>({
    fullName: false,
    email: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Auto-dismiss notifications after 7 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Validation function
  const validate = (name: string, value: string): string => {
    let errorMsg = '';
    if (name === 'fullName') {
      if (!value.trim()) {
        errorMsg = 'Full name is required';
      } else if (value.trim().length < 2) {
        errorMsg = 'Name must be at least 2 characters';
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        errorMsg = 'Email address is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMsg = 'Please enter a valid email address';
        }
      }
    } else if (name === 'message') {
      if (!value.trim()) {
        errorMsg = 'Message is required';
      } else if (value.trim().length < 10) {
        errorMsg = 'Message must be at least 10 characters';
      }
    }
    return errorMsg;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (isTouched[name as keyof FormState]) {
      const errorMsg = validate(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: errorMsg || undefined,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIsTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validate(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg || undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Set all fields to touched to trigger full validation
    const fullTouched = { fullName: true, email: true, message: true };
    setIsTouched(fullTouched);

    const nameError = validate('fullName', formData.fullName);
    const emailError = validate('email', formData.email);
    const messageError = validate('message', formData.message);

    const formErrors: FormErrors = {
      ...(nameError && { fullName: nameError }),
      ...(emailError && { email: emailError }),
      ...(messageError && { message: messageError }),
    };

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      await sendContact(formData);
      setNotification({
        type: 'success',
        message: 'Thank you! Your message has been received.',
      });
      // Clear form and states
      setFormData({ fullName: '', email: '', message: '' });
      setIsTouched({ fullName: false, email: false, message: false });
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'An error occurred. Please try again.';
      setNotification({
        type: 'error',
        message: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h4 className="contact-form-title">Send a Message</h4>

      {notification && (
        <div className={`notification ${notification.type}`}>
          <span className="notification-icon">
            {notification.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          </span>
          <span className="notification-text">{notification.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            placeholder="Your Name"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
            data-cursor="disable"
          />
          {errors.fullName && (
            <span className="error-message">
              <FiAlertCircle /> {errors.fullName}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
            data-cursor="disable"
          />
          {errors.email && (
            <span className="error-message">
              <FiAlertCircle /> {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
            placeholder="What would you like to build together?"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
            data-cursor="disable"
          />
          {errors.message && (
            <span className="error-message">
              <FiAlertCircle /> {errors.message}
            </span>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={loading} data-cursor="disable">
          {loading ? (
            <>
              <BiLoaderAlt className="spinner" /> Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
