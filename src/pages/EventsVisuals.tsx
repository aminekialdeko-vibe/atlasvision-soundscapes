import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Event format images
import event1 from "@/assets/events/event-1.png";
import event2 from "@/assets/events/event-2.png";
import event3 from "@/assets/events/event-3.png";

// Poster images
import poster1 from "@/assets/events/poster-1.png";
import poster2 from "@/assets/events/poster-2.png";
import poster3 from "@/assets/events/poster-3.png";
import poster4 from "@/assets/events/poster-4.png";
import poster5 from "@/assets/events/poster-5.png";

const eventImages = [event1, event2, event3];
const posterImages = [poster1, poster2, poster3, poster4, poster5];

const EventsVisuals = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Title */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-wide">
            Events & Visuals
          </h1>
        </div>
      </section>

      {/* Event Formats Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventImages.map((img, index) => (
              <div 
                key={index} 
                className="overflow-hidden rounded-lg"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Posters & Flyers Section */}
      <section className="py-12 px-6 pb-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posterImages.map((img, index) => (
              <div 
                key={index} 
                className="overflow-hidden rounded-lg"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsVisuals;
