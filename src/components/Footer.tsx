import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="py-8 bg-background border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl font-semibold text-gradient-sunset">
            Atlas Vision
          </div>
          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} Atlas Vision. {t.footer.rights}
          </p>
          <p className="text-muted-foreground/60 text-xs">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
