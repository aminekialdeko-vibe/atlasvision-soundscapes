import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const [visibleParagraphs, setVisibleParagraphs] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = paragraphRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleParagraphs((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const paragraphs = [
    {
      title: t.about.journey.title,
      content: t.about.journey.content,
    },
    {
      title: t.about.sound.title,
      content: t.about.sound.content,
    },
    {
      title: t.about.vision.title,
      content: t.about.vision.content,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-gradient-cosmic relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-sunset">{t.about.title}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              ref={(el) => (paragraphRefs.current[index] = el)}
              className={`transition-all duration-1000 ${
                visibleParagraphs[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-border/50 hover:border-primary/30 transition-colors duration-500">
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-4">
                  {paragraph.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {paragraph.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
