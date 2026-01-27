import { useState } from "react";
import { ChevronDown, ChevronUp, Music as MusicIcon } from "lucide-react";

interface TrackProps {
  title: string;
  embedUrl: string;
  description: string;
}

const Track = ({ title, embedUrl, description }: TrackProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/20 transition-colors duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <MusicIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
        <div className="text-muted-foreground">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-6 pb-6">
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={embedUrl}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

const Music = () => {
  const tracks: TrackProps[] = [
    {
      title: "Desert Dawn",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234567890&color=%23d4a056&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
      description: "Downtempo journey through golden dunes",
    },
    {
      title: "Cosmic Whispers",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234567891&color=%23d4a056&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
      description: "Melodic psytrance exploration",
    },
    {
      title: "Ancient Echoes",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234567892&color=%23d4a056&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
      description: "Psychill meditation",
    },
  ];

  return (
    <section id="music" className="py-24 md:py-32 bg-background relative">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-sunset">Music</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Immerse yourself in sonic landscapes crafted to transport your mind
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {tracks.map((track, index) => (
            <Track key={index} {...track} />
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-8 text-sm">
          Click on a track to expand and listen
        </p>
      </div>
    </section>
  );
};

export default Music;