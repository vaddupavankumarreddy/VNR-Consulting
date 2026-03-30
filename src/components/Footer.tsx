import vnrLogo from '@/assets/vnr-logo.jpg';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={vnrLogo} alt="VNR Consulting Services" className="h-8 w-auto" />
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} VNR Consulting Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
