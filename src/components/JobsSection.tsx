import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const jobs = [
  { title: 'Senior Software Engineer', location: 'Remote', type: 'Full-Time', salary: '$120k - $160k', category: 'Technology' },
  { title: 'Product Manager', location: 'New York, NY', type: 'Full-Time', salary: '$110k - $140k', category: 'Management' },
  { title: 'Data Analyst', location: 'Chicago, IL', type: 'Contract', salary: '$80k - $100k', category: 'Analytics' },
  { title: 'UX Designer', location: 'San Francisco, CA', type: 'Full-Time', salary: '$100k - $130k', category: 'Design' },
  { title: 'DevOps Engineer', location: 'Remote', type: 'Full-Time', salary: '$115k - $150k', category: 'Technology' },
  { title: 'HR Business Partner', location: 'Austin, TX', type: 'Full-Time', salary: '$90k - $120k', category: 'Human Resources' },
];

export default function JobsSection() {
  return (
    <section id="jobs" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Open <span className="text-gradient-brand">Positions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our latest openings and find your next career move.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all group"
            >
              <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                {job.category}
              </span>
              <h3 className="font-heading font-bold text-lg mt-3 mb-3 text-card-foreground group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2"><MapPin size={14} /> {job.location}</div>
                <div className="flex items-center gap-2"><Clock size={14} /> {job.type}</div>
                <div className="flex items-center gap-2"><DollarSign size={14} /> {job.salary}</div>
              </div>
              <a href="#apply" className="block text-center bg-gradient-cta text-primary-foreground font-heading font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm">
                Apply Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
