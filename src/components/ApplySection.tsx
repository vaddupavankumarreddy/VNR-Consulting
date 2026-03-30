import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ApplySection() {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', position: '', experience: '', resume: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Application submitted successfully! We will get back to you soon.');
      setForm({ fullName: '', email: '', phone: '', position: '', experience: '', resume: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  const inputClass = "w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-body text-sm";

  return (
    <section id="apply" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Submit Your <span className="text-gradient-brand">Application</span>
          </h2>
          <p className="text-muted-foreground">
            Interested in joining our talent pool? Fill out the form below.
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
            <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full Name *" className={inputClass} />
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email Address *" className={inputClass} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="Phone Number *" className={inputClass} />
            <select name="experience" value={form.experience} onChange={handleChange} required className={inputClass}>
              <option value="" disabled>Years of Experience *</option>
              <option value="0-1">0-1 Years</option>
              <option value="2-4">2-4 Years</option>
              <option value="5-7">5-7 Years</option>
              <option value="8+">8+ Years</option>
            </select>
          </div>
          <input name="position" value={form.position} onChange={handleChange} required placeholder="Position Applying For *" className={inputClass} />
          <input name="resume" type="url" value={form.resume} onChange={handleChange} placeholder="Resume Link (Google Drive, Dropbox, etc.)" className={inputClass} />
          <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Cover Letter / Additional Information" className={inputClass} />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-cta text-primary-foreground font-heading font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
