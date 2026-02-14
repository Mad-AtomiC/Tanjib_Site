import { Instagram, Linkedin, Twitter, Mail, Facebook } from "lucide-react";
import { BehanceIcon, WhatsAppIcon, TelegramIcon } from "@/components/icons";

export const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/ta.asif20", label: "Facebook" },
    { icon: BehanceIcon, href: "https://www.behance.net/tanjibasif", label: "Behance", footerOnly: true },
    { icon: WhatsAppIcon, href: "https://wa.me/+8801815782269", label: "WhatsApp" },
    { icon: TelegramIcon, href: "https://t.me/taasif20", label: "Telegram" },
    { icon: Mail, href: "tanjib.tanjib204@gmail.com", label: "Email", excludeFromFooter: true },
];
