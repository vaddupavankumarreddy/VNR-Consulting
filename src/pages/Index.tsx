import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import JobsSection from '@/components/JobsSection';
import ApplySection from '@/components/ApplySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <JobsSection />
      <ApplySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
