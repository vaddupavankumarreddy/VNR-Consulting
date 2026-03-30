import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
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
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Mail, label: 'Email', value: 'info@vnrconsulting.com' },
            { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
            { icon: MapPin, label: 'Office', value: 'New York, NY, USA' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-card border border-border rounded-xl p-6"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-cta flex items-center justify-center mx-auto mb-3">
                <item.icon className="text-primary-foreground" size={20} />
              </div>
              <h3 className="font-heading font-bold text-card-foreground mb-1">{item.label}</h3>
              <p className="text-muted-foreground text-sm">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
