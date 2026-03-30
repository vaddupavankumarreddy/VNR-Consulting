import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Scene3D from './Scene3D';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6"
        >
          <span className="text-gradient-brand">Connecting Talent</span>
          <br />
          <span className="text-primary-foreground">With Opportunity</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-primary-foreground/70 font-body"
        >
          VNR Consulting Services — your trusted partner in recruitment. We match exceptional candidates with industry-leading companies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#jobs" className="bg-gradient-cta px-8 py-4 rounded-lg font-heading font-bold text-primary-foreground hover:opacity-90 transition-opacity">
            Browse Jobs
          </a>
          <a href="#apply" className="glass-card px-8 py-4 rounded-lg font-heading font-bold text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
            Submit Your Resume
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
