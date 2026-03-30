import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Your details have been submitted! We will reach out to you soon.');
      setForm({ name: '', email: '', phone: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  const inputClass = "w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-body text-sm";

  return (
    <section id="contact" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient-brand">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Interested in connecting? Submit your details and we'll reach out to you.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-5 bg-card border border-border rounded-2xl p-8"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name *" className={inputClass} />
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email Address *" className={inputClass} />
          </div>
          <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="Phone Number *" className={inputClass} />
          <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="How can we help you?" className={inputClass} />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-cta text-primary-foreground font-heading font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Details'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
