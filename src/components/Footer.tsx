const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-background border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl font-semibold text-gradient-sunset">
            Atlas Vision
          </div>
          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} Atlas Vision. All rights reserved.
          </p>
          <p className="text-muted-foreground/60 text-xs">
            Sound journeys for the soul
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;