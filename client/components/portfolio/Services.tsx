import { motion } from "framer-motion";
import { Palette, Layers, Monitor, PenTool, LayoutTemplate, MessageSquare } from "lucide-react";

const skills = [
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Social Media Design",
    description: "Engaging visuals for Facebook, Instagram, and other platforms to boost brand presence."
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Print Design",
    description: "High-quality brochures, flyers, posters, and marketing materials ready for production."
  },
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "Website Graphics",
    description: "Custom assets and visual elements that enhance user experience on web platforms."
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Branding & Identity",
    description: "Comprehensive brand guidelines, logos, and visual systems that tell your story."
  },
  {
    icon: <LayoutTemplate className="w-8 h-8" />,
    title: "UI/UX Design",
    description: "User-centric interface designs that prioritize usability and aesthetic appeal."
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Soft Skills",
    description: "Customer service, team collaboration, and meeting tight deadlines with high accuracy."
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left -z-10" />
      <div className="container mx-auto">
        <div className="max-w-2xl mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-6 bg-gradient-to-br from-violet-300 via-primary to-purple-400 bg-clip-text text-transparent pb-2">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A diverse skillset combining technical proficiency in Adobe Creative Suite with creative problem-solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 glass-card rounded-[2rem] hover:-translate-y-2"
            >
              <div className="mb-6 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
                {skill.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">{skill.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
