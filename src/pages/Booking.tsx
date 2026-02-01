import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import atlasMountainsBg from "@/assets/atlas-mountains-bg.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const Booking = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Atlas Mountains Background */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${atlasMountainsBg})` }}
        />
        
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-background/75" />
        
        {/* Content */}
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-gradient-sunset">{t.booking.title}</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              {t.booking.subtitle}
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>
          
          <BookingForm />
          
          {/* Disclaimer */}
          <p className="text-center text-muted-foreground/70 text-sm mt-8 max-w-xl mx-auto">
            {t.booking.disclaimer}
          </p>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Booking;
