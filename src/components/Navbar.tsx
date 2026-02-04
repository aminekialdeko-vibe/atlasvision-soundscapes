import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const isBookingPage = location.pathname.includes("/booking");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (isBookingPage) {
      // Navigate to home page first, then scroll
      navigate(`/${language}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const goToBooking = () => {
    navigate(`/${language}/booking`);
    setIsMobileMenuOpen(false);
  };

  const goToHome = () => {
    navigate(`/${language}`);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "story", label: t.nav.story },
    { id: "music", label: t.nav.music },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={goToBooking}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium"
            >
              {t.nav.booking}
            </button>
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex w-full items-center justify-center gap-4 md:hidden">
            <LanguageSelector />
            <button
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border">
            <div className="flex flex-col py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-6 py-3 text-left text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={goToBooking}
                className="px-6 py-3 text-left text-primary font-medium hover:bg-muted/50 transition-colors duration-300"
              >
                {t.nav.booking}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
