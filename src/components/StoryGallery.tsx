import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import story0 from "@/assets/gallery/story-0.png";
import story1 from "@/assets/gallery/story-1.png";
import story2 from "@/assets/gallery/story-2.png";
import story3 from "@/assets/gallery/story-3.png";

// Images 0, 1, 2, 3 assigned to The Story section
const images = [story0, story1, story2, story3];

const StoryGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section id="story" className="py-10 min-h-[600px] md:min-h-[900px] bg-background relative overflow-visible">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-sunset">The Story</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore the universe of Atlas Vision, step by step
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        {/* Gallery Container - Professional editorial size */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 hover:bg-card transition-all duration-300 group"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 hover:bg-card transition-all duration-300 group"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Image Display - Professional portfolio size */}
          <div className="relative bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden shadow-lg">
            <div
              className={`w-full flex items-center justify-center transition-opacity duration-300 ease-in-out p-3 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <img
                src={images[currentIndex]}
                alt={`Atlas Vision story ${currentIndex + 1} of ${images.length}`}
                className="max-w-full max-h-[320px] md:max-h-[420px] w-auto h-auto object-contain object-center rounded-lg"
              />
            </div>
          </div>

          {/* Image Counter */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isTransitioning || index === currentIndex) return;
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 300);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-4 text-sm md:text-base">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StoryGallery;
