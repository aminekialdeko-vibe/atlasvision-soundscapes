import { ChevronDown, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import heroImage from "@/assets/hero-desert-cosmic.jpg";

const Hero = () => {
  const { t } = useLanguage();

  const scrollToMusic = () => {
    const element = document.getElementById("music");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Animated Stars Effect */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground rounded-full animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-up">
          <span className="text-gradient-sunset">{t.hero.title}</span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 font-light mb-6 animate-fade-up-delay-1 font-display italic">
          {t.hero.subtitle}
        </p>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up-delay-2 leading-relaxed">
          {t.hero.description}
        </p>

        <div className="animate-fade-up-delay-3">
          <Button
            variant="hero"
            size="lg"
            onClick={scrollToMusic}
            className="group"
          >
            <Headphones className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            {t.hero.cta}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/60 hover:text-primary transition-colors duration-300 animate-float"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
