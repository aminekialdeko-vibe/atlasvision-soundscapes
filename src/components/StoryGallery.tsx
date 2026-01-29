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
    <section id="story" className="py-6 min-h-[75vh] bg-background relative overflow-visible">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />

      <div className="w-full px-4 md:px-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-sunset">The Story</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore the universe of Atlas Vision, step by step
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        {/* Gallery Container - Full width immersive */}
        <div className="relative w-full max-w-[1920px] mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 hover:border-white/40 transition-all duration-300 group"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 hover:border-white/40 transition-all duration-300 group"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Image Display - Immersive full width */}
          <div className="relative w-full overflow-hidden rounded-lg md:rounded-xl">
            <div
              className={`w-full transition-opacity duration-300 ease-in-out ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <img
                src={images[currentIndex]}
                alt={`Atlas Vision story ${currentIndex + 1} of ${images.length}`}
                className="w-full h-auto min-h-[50vh] max-h-[70vh] object-contain object-center"
              />
            </div>
          </div>

          {/* Image Counter */}
          <div className="flex items-center justify-center gap-3 mt-6">
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

          <p className="text-center text-muted-foreground mt-3 text-sm md:text-base">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StoryGallery;
