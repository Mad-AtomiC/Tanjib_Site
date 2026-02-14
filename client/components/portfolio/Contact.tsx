import { motion } from "framer-motion";
import { Mail, ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/config";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const Contact = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    const email = "tanjib.tanjib204@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast({ description: "Email copied to clipboard!", duration: 3000 });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback logic
      try {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        toast({ description: "Email copied to clipboard!", duration: 3000 });
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        toast({ variant: "destructive", description: "Failed to copy email.", duration: 3000 });
      }
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-secondary/5">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-8xl font-display font-black mb-8 tracking-tighter uppercase italic bg-gradient-to-br from-white via-white/80 to-white/50 bg-clip-text text-transparent">
            Let's Talk.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative glass-card p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none" />

          {/* Email Section */}
          <div className="relative z-10 flex flex-col items-center gap-8 mb-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(124,58,237,0.2)]">
              <Mail className="w-8 h-8 text-primary" />
            </div>

            <h3 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              tanjib.tanjib204@gmail.com
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:scale-105 transition-all duration-300 group"
                onClick={() => window.location.href = `mailto:${siteConfig.inquiryEmail}`}
              >
                Say Hello <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg rounded-xl border-white/10 hover:bg-white/5 hover:text-white transition-all duration-300"
                onClick={handleCopyEmail}
              >
                {copied ? <Check className="mr-2 w-5 h-5 text-green-400" /> : <Copy className="mr-2 w-5 h-5" />}
                {copied ? "Copied!" : "Copy Email"}
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

          {/* Social Links */}
          <div className="relative z-10">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">Connect Instantly</p>
            <div className="flex flex-wrap justify-center gap-6">
              {siteConfig.socialLinks
                .filter(link => ["WhatsApp", "LinkedIn", "Telegram", "Facebook"].includes(link.label))
                .map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <link.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-semibold text-white/80 group-hover:text-white transition-colors">{link.label}</span>
                  </a>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
