import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceGallery from "@/components/ExperienceGallery";
import StoryGallery from "@/components/StoryGallery";
import Music from "@/components/Music";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <ExperienceGallery />
      <StoryGallery />
      <Music />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;