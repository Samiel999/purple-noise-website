import { useState, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

const contactInfo = {
  email: "info@purple-noise.de",
  phone: "+49 (0)30 12345678",
  socialMedia: [
    { name: "Facebook", url: "#", icon: "facebook" },
    { name: "Instagram", url: "#", icon: "instagram" },
    { name: "YouTube", url: "#", icon: "youtube" },
  ],
};

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Validates form fields and returns error messages
 */
const validateForm = (formData: ContactForm): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = "Bitte gib deinen Namen ein.";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Der Name muss mindestens 2 Zeichen lang sein.";
  }

  if (!formData.email.trim()) {
    errors.email = "Bitte gib deine E-Mail-Adresse ein.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  }

  if (!formData.message.trim()) {
    errors.message = "Bitte gib eine Nachricht ein.";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Die Nachricht muss mindestens 10 Zeichen lang sein.";
  }

  return errors;
};

/**
 * Contact Component
 * Displays contact information and a contact form with validation.
 */
export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  }, [formData]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  return (
    <section id="contact" className="py-20 bg-(--color-accent)">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <h2 className="text-4xl md:text-5xl font-bold text-(--color-dark) mb-4">
            Kontakt
          </h2>
          <p className="text-(--color-dark)/80 text-lg max-w-2xl mx-auto">
            Hast du Fragen oder möchtest du mehr über unseren Chor erfahren? Wir freuen uns auf deine Nachricht!
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="fade-in-section">
            <h3 className="text-2xl font-semibold text-(--color-dark) mb-8">Kontaktinformationen</h3>

            <div className="space-y-6">
              {/* Email */}
              <a href={`mailto:${contactInfo.email}`} className="flex items-start group">
                <div className="w-14 h-14 bg-(--color-primary)/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-(--color-primary)/30 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-(--color-primary)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-(--color-dark)/70">E-Mail</p>
                  <p className="text-(--color-dark) text-lg group-hover:text-(--color-primary) transition-colors duration-200">{contactInfo.email}</p>
                </div>
              </a>

              {/* Phone */}
              <a href={`tel:${contactInfo.phone}`} className="flex items-start group">
                <div className="w-14 h-14 bg-(--color-primary)/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-(--color-primary)/30 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-(--color-primary)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-(--color-dark)/70">Telefon</p>
                  <p className="text-(--color-dark) text-lg group-hover:text-(--color-primary) transition-colors duration-200">{contactInfo.phone}</p>
                </div>
              </a>

              {/* Social Media */}
              <div>
                <p className="text-sm text-(--color-dark)/70 mb-4">Folge uns auf</p>
                <div className="flex space-x-4">
                  {contactInfo.socialMedia.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-(--color-primary)/20 rounded-lg flex items-center justify-center hover:bg-(--color-primary)/30 transition-colors duration-200"
                      aria-label={social.name}
                    >
                      {social.icon === 'facebook' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-(--color-primary)" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      )}
                      {social.icon === 'instagram' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-(--color-primary)" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      )}
                      {social.icon === 'youtube' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-(--color-primary)" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-in-section">
            <h3 className="text-2xl font-semibold text-(--color-dark) mb-8">Schreib uns</h3>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg" role="alert" aria-live="polite">
                <p className="font-medium">Vielen Dank für deine Nachricht!</p>
                <p className="text-sm mt-1">Wir werden uns bald bei dir melden.</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-(--color-dark)/70 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-(--color-dark) placeholder-(--color-dark)/50 focus:outline-none focus:ring-1 transition-colors duration-200 ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-(--color-primary)/30 focus:border-(--color-primary) focus:ring-(--color-primary)'
                  }`}
                  placeholder="Dein Name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-(--color-dark)/70 mb-2">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-(--color-dark) placeholder-(--color-dark)/50 focus:outline-none focus:ring-1 transition-colors duration-200 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-(--color-primary)/30 focus:border-(--color-primary) focus:ring-(--color-primary)'
                  }`}
                  placeholder="deine@email.de"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-(--color-dark)/70 mb-2">Nachricht</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border rounded-lg text-(--color-dark) placeholder-(--color-dark)/50 focus:outline-none focus:ring-1 transition-colors duration-200 resize-none ${
                    errors.message 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-(--color-primary)/30 focus:border-(--color-primary) focus:ring-(--color-primary)'
                  }`}
                  placeholder="Deine Nachricht an uns..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition-colors duration-200 transform hover:scale-[1.02] ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-(--color-primary) hover:bg-(--color-primary-dark)'
                }`}
              >
                {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
