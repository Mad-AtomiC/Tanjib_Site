import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Download, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/config";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// About Image Logic
const aboutImages = import.meta.glob('@/assets/about/*', { eager: true, query: '?url', import: 'default' });
const aboutImage = Object.values(aboutImages)[0] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200";

export const Experience = () => {
    const { toast } = useToast();

    // Social Click Logic
    const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof siteConfig.socialLinks[0]) => {
        if (link.label === "Email") {
            e.preventDefault();
            // Fallback for older browsers or insecure contexts
            const copyToClipboard = async (text: string) => {
                try {
                    await navigator.clipboard.writeText(text);
                    toast({ description: "Email copied to clipboard!", duration: 3000 });
                } catch (err) {
                    try {
                        const textArea = document.createElement("textarea");
                        textArea.value = text;
                        textArea.style.position = "fixed";
                        textArea.style.left = "-9999px";
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        toast({ description: "Email copied to clipboard!", duration: 3000 });
                    } catch (fallbackErr) {
                        console.error('Failed to copy', err);
                        toast({ variant: "destructive", description: "Failed to copy email.", duration: 3000 });
                    }
                }
            };
            copyToClipboard(link.href);
        }
    };

    return (
        <section id="about" className="py-24 px-6 relative bg-secondary/5 overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="container mx-auto max-w-6xl">

                {/* --- HEADER TITLE --- */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-7xl font-display font-black mb-16 text-center tracking-tighter bg-gradient-to-br from-violet-300 via-primary to-purple-400 bg-clip-text text-transparent pb-2 uppercase italic"
                >
                    The Journey
                </motion.h2>

                <Tabs defaultValue="about" className="w-full">

                    {/* --- TABS NAVIGATION --- */}
                    <div className="flex justify-center mb-16">
                        <TabsList className="bg-secondary/50 backdrop-blur-md border border-white/10 p-1 rounded-full h-auto">
                            <TabTrigger value="about" icon={<User className="w-4 h-4" />}>About Me</TabTrigger>
                            <TabTrigger value="employment" icon={<Briefcase className="w-4 h-4" />}>Employment</TabTrigger>
                            <TabTrigger value="education" icon={<GraduationCap className="w-4 h-4" />}>Education</TabTrigger>
                        </TabsList>
                    </div>

                    {/* --- TAB: ABOUT ME --- */}
                    <TabsContent value="about" className="outline-none focus:outline-none mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            {/* Image - Spans 5 columns */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="lg:col-span-5 relative"
                            >
                                <div className="aspect-[4/5] bg-secondary/50 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl glass-card relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 opactiy-50" />
                                    <img
                                        src={aboutImage as string}
                                        alt="Portrait"
                                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                    />
                                </div>
                            </motion.div>

                            {/* Bio - Spans 7 columns */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="lg:col-span-7 space-y-8"
                            >
                                <h3 className="text-4xl font-display font-bold">
                                    Visualizing the <span className="text-primary">Impossible.</span>
                                </h3>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    I'm Tanjib Ahmed, a dynamic and innovative Graphic Designer with over four years of experience in creating impactful visual solutions. I blend deep-blue aesthetics with purposeful pixels to help brands stand out.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    With a background in Computer Science, I bridge the gap between technical precision and artistic expression. My work isn't just about looking good—it's about telling a story that resonates.
                                </p>

                                <div className="pt-4 flex flex-wrap gap-4">
                                    {siteConfig.socialLinks.filter(link => !link.footerOnly).map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.label === "Email" ? `mailto:${link.href}` : link.href}
                                            target={link.label === "Email" ? undefined : "_blank"}
                                            rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                                            onClick={(e) => handleSocialClick(e, link)}
                                            className="w-12 h-12 bg-secondary/50 border border-white/10 flex items-center justify-center rounded-xl hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                                        >
                                            <link.icon className="w-5 h-5" />
                                        </a>
                                    ))}

                                    {/* UPDATED BUTTON TEXT: "Resume" only */}
                                    <Button asChild size="lg" className="h-12 rounded-xl px-8 text-lg bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300">
                                        <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
                                            <Download className="mr-2 w-5 h-5" />
                                            Resume
                                        </a>
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </TabsContent>

                    {/* --- TAB: EMPLOYMENT --- */}
                    <TabsContent value="employment" className="outline-none focus:outline-none mt-0">
                        <ExperienceList
                            items={[
                                {
                                    title: "Graphic Designer",
                                    subtitle: "Game Over Zone",
                                    period: "Jan 2026 – Present",
                                    location: "Dhaka",
                                    description: ["Creating dynamic visual content and branding for gaming and digital media."]
                                },
                                {
                                    title: "Graphic Designer (Volunteer)",
                                    subtitle: "Alokito Poribesh Foundation",
                                    period: "May 2024 – Present",
                                    location: "Dhaka",
                                    description: ["Contributing to non-profit initiatives through impactful visual storytelling and design."]
                                },
                                {
                                    title: "Graphic Designer",
                                    subtitle: "A Trip Z",
                                    period: "Mar 2024 – Apr 2025",
                                    location: "Dhaka",
                                    description: ["Designed social media campaigns and diverse marketing initiatives."]
                                },
                                {
                                    title: "Graphic Designer",
                                    subtitle: "Hidayah Shop",
                                    period: "Mar 2022 – Jan 2023",
                                    location: "Lakshmipur",
                                    description: ["Boosted online presence through strategic social media designs."]
                                },
                                {
                                    title: "Thumbnail Designer",
                                    subtitle: "COCOEED",
                                    period: "Nov 2021 – May 2022",
                                    location: "Dhaka",
                                    description: ["Developed branding consistency and visual content for video platforms."]
                                }
                            ]}
                        />
                    </TabsContent>

                    {/* --- TAB: EDUCATION --- */}
                    <TabsContent value="education" className="outline-none focus:outline-none mt-0">
                        <ExperienceList
                            items={[
                                {
                                    title: "BSc in Computer Science & Engineering",
                                    subtitle: "Southeast University",
                                    period: "Jul 2023 – Present",
                                    location: "Dhaka"
                                },
                                {
                                    title: "Higher Secondary School Certificate",
                                    subtitle: "Dr. Mahbubur Rahman Mollah College",
                                    period: "Apr 2019 – Aug 2021",
                                    location: "Dhaka"
                                },
                                {
                                    title: "Secondary School Certificate",
                                    subtitle: "Shamsul Hoque Khan School & College",
                                    period: "Jan 2017 – Mar 2019",
                                    location: "Dhaka"
                                },
                                {
                                    title: "Junior School Certificate",
                                    subtitle: "Shamsul Hoque Khan School & College",
                                    period: "Jan 2016 – Dec 2016",
                                    location: "Dhaka"
                                }
                            ]}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

const TabTrigger = ({ value, children, icon }: { value: string, children: React.ReactNode, icon: React.ReactNode }) => (
    <TabsTrigger
        value={value}
        className="rounded-full px-6 py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 flex items-center gap-2"
    >
        {icon}
        {children}
    </TabsTrigger>
);

interface TimelineItemProps {
    title: string;
    subtitle: string;
    period: string;
    location: string;
    description?: string[];
}

const ExperienceList = ({ items }: { items: TimelineItemProps[] }) => {
    return (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {items.map((item, index) => (
                <ExperienceItem key={index} {...item} index={index} />
            ))}
        </div>
    );
};

const ExperienceItem = ({ title, subtitle, period, location, description, index }: TimelineItemProps & { index: number }) => {
    const isActive = period.toLowerCase().includes("present");
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden group cursor-default
                ${isActive
                    ? "bg-primary/5 border-primary/40 shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                    : "bg-secondary/30 border-white/5 hover:bg-secondary/50 hover:border-white/10"}
            `}
        >
            {/* Glow effect for Active Items */}
            {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-50" />
            )}

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-2">
                    <h3 className={`text-xl font-bold ${isActive ? "text-primary" : "text-white group-hover:text-primary transition-colors"}`}>
                        {subtitle}
                    </h3>
                    <span className={`
                        text-xs font-mono px-3 py-1 rounded-full w-fit uppercase tracking-wider
                        ${isActive
                            ? "bg-primary/20 text-primary border border-primary/20"
                            : "bg-white/5 text-muted-foreground border border-white/5"}
                    `}>
                        {period}
                    </span>
                </div>

                <h4 className="text-lg text-white/80 font-medium mb-1">{title}</h4>

                {/* Animated Details */}
                <motion.div
                    initial={false}
                    animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="pt-4 mt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <MapPin className="w-4 h-4 text-primary" />
                            {location}
                        </div>
                        {description && (
                            <div className="space-y-1">
                                {description.map((line, i) => (
                                    <p key={i} className="text-sm text-muted-foreground/80 leading-relaxed pl-6 border-l-2 border-primary/30">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Decoration for unexpanded state hint */}
                {!isHovered && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/10 rounded-full opacity-50 group-hover:opacity-0 transition-opacity duration-300" />
                )}
            </div>
        </motion.div>
    );
};
