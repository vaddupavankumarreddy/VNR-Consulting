import { motion } from 'framer-motion';
import { Users, Briefcase, Target, TrendingUp } from 'lucide-react';

const services = [
  { icon: Users, title: 'Talent Acquisition', desc: 'We source and screen top-tier candidates across industries.' },
  { icon: Briefcase, title: 'Contract Staffing', desc: 'Flexible workforce solutions tailored to your project needs.' },
  { icon: Target, title: 'Executive Search', desc: 'Specialized placement for senior and C-level leadership roles.' },
  { icon: TrendingUp, title: 'HR Consulting', desc: 'Strategic HR advisory to optimize your workforce operations.' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient-brand">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            End-to-end recruitment solutions designed to power your growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-cta flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <s.icon className="text-primary-foreground" size={24} />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-card-foreground">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
