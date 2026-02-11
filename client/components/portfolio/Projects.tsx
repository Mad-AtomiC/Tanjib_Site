import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Dynamic asset loading
const logoImages = import.meta.glob('@/assets/projects/logos/*', { eager: true, as: 'url' });
const thumbnailImages = import.meta.glob('@/assets/projects/thumbnails/*', { eager: true, as: 'url' });
const socialImages = import.meta.glob('@/assets/projects/socials/*', { eager: true, as: 'url' });

const logoList = Object.values(logoImages);
const thumbnailList = Object.values(thumbnailImages);
const socialList = Object.values(socialImages);

const CarouselRow = ({
  title,
  items,
  direction = "left",
  speed,
  aspectRatio = 16 / 10
}: {
  title: string,
  items: string[],
  direction?: "left" | "right",
  speed?: string,
  aspectRatio?: number | "mixed"
}) => {
  if (items.length === 0) return null;
  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items, ...items]; // Quadruple to ensure enough content for smooth scroll

  // Calculate duration dynamically if speed is not provided
  // Factor of 15s per original item ensures constant scanning speed regardless of count
  const duration = speed || `${Math.max(items.length * 15, 40)}s`;

  return (
    <div className="py-12 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-left">
        <h3 className="text-3xl font-display font-black text-primary/80 tracking-tighter uppercase italic">{title}</h3>
      </div>

      <div className="flex relative overflow-hidden group">
        <div
          className="flex gap-6 animate-infinite-scroll group-hover:pause-scroll will-change-transform"
          style={{
            animationDuration: duration,
            animationDirection: direction === "right" ? "reverse" : "normal"
          }}
        >
          {duplicatedItems.map((item, index) => {
            // Logic for mixed ratios in Social Media (alternating 1:1 and 4:5)
            const currentRatio = title === "Social Media Designs"
              ? (index % 2 === 0 ? 1 : 4 / 5)
              : (typeof aspectRatio === "number" ? aspectRatio : 16 / 10);

            // Adjust container width based on ratio to maintain consistent height
            const widthClass = title === "Logo Designs"
              ? "w-72 md:w-80"
              : title === "Thumbnail Designs"
                ? "w-72 md:w-[450px]"
                : currentRatio === 1
                  ? "w-72 md:w-[350px]" // Square
                  : "w-72 md:w-[280px]"; // Portrait 4:5

            return (
              <div
                key={`${title}-${index}`}
                className={`${widthClass} flex-shrink-0 relative rounded-3xl overflow-hidden glass-card transition-all duration-500`}
              >
                <AspectRatio ratio={currentRatio}>
                  <img
                    src={item}
                    alt={`${title} project`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    decoding="async"
                  />
                </AspectRatio>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <section id="work" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-8xl font-display font-black mb-6 tracking-tighter uppercase italic bg-gradient-to-br from-violet-300 via-primary to-purple-400 bg-clip-text text-transparent pb-2">
            Selected Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Exploring the boundaries of visual communication through specialized design categories.
          </p>
        </motion.div>
      </div>

      <div className="space-y-4">
        {logoList.length > 0 && (
          <CarouselRow
            title="Logo Designs"
            items={logoList}
            direction="left"
            aspectRatio={1}
          />
        )}
        {thumbnailList.length > 0 && (
          <CarouselRow
            title="Thumbnail Designs"
            items={thumbnailList}
            direction="right"
            aspectRatio={16 / 9}
          />
        )}
        {socialList.length > 0 && (
          <CarouselRow
            title="Social Media Designs"
            items={socialList}
            direction="left"
            aspectRatio={4 / 5}
          />
        )}
        {logoList.length === 0 && thumbnailList.length === 0 && socialList.length === 0 && (
          <div className="text-center text-muted-foreground py-20">
            <p>Add images to <code>client/assets/projects/</code> folders to see them here.</p>
          </div>
        )}
      </div>
    </section>
  );
};
