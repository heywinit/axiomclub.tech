"use client";

import TerminalContact from "@/app/home/contact/Contact";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Terminal,
  Binary,
  Webhook,
  Wifi,
  Youtube,
  MessageSquare,
  MapPin,
  Mail,
  Instagram,
  Twitter,
  Bot,
  Rocket,
} from "lucide-react";
import CrypticText from "@/components/CrypticText";

const quickContacts = [
  {
    name: "Vinesh Rajpurohit",
    role: "Founder & Leader",
    email: "vinesh@axiomclub.tech",
  },
  {
    name: "Vaidehi Shah",
    role: "Frontend Lead",
    email: "vaidehi@axiomclub.tech",
  },
  {
    name: "Deepraj Bhati",
    role: "Backend Lead",
    email: "deep@axiomclub.tech",
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/axiom-svgu/",
    icon: Linkedin,
  },
  { name: "GitHub", url: "https://github.com/axiom-svgu", icon: Github },
  { name: "Twitter", url: "https://x.com/Axiom_Svgu", icon: Twitter },
  {
    name: "Instagram",
    url: "https://instagram.com/axiom_svgu",
    icon: Instagram,
  },
  { name: "YouTube", url: "https://youtube.com/@axiom_svgu", icon: Youtube },
  {
    name: "Discord",
    url: "https://discord.gg/YebuA3HmYn",
    icon: MessageSquare,
  },
];

const location = {
  city: "Ahmedabad",
  address: "Sardar Vallabhbhai Global University - UCP Institute Of Technology",
  coordinates: "23.0734° N, 72.5246° E",
  timezone: "IST (UTC+5:30)",
  ping: "< 1ms from campus WiFi 😉",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-mono">
      {/* Matrix Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,var(--background)_2px)] bg-[length:100%_4px] animate-scan" />
        <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
        <div className="absolute inset-0 [background:repeating-linear-gradient(90deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,var(--matrix-glow-30),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_800px,var(--matrix-color-20),transparent)]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 text-center relative z-20"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <Terminal className="w-8 h-8 sm:w-12 sm:h-12 text-[var(--matrix-color)]" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--matrix-color)] [text-shadow:0_0_10px_var(--matrix-color-30)]">
                <CrypticText text="sudo contact us" />
              </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-[var(--matrix-color-70)] text-base sm:text-xl md:text-2xl">
              <Binary className="w-4 h-4 sm:w-6 sm:h-6" />
              <p className="font-mono">
                <span className="text-[var(--matrix-color)]">$</span>{" "}
                ./connect.sh
              </p>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-12 sm:py-20">
          {/* Quick Contacts Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 sm:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--matrix-color)] mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <Bot className="w-6 h-6 sm:w-8 sm:h-8" />
              <span>cat team_leads.txt</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {quickContacts.map((contact, index) => (
                <motion.div
                  key={contact.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  className="p-4 sm:p-6 border border-[var(--matrix-color-30)] rounded-lg hover:border-[var(--matrix-color)] transition-all duration-300 bg-black/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--matrix-color)]" />
                    <h3 className="text-[var(--matrix-color)] font-bold text-sm sm:text-base">
                      {contact.name}
                    </h3>
                  </div>
                  <p className="text-[var(--matrix-color-70)] text-xs sm:text-sm mb-2 sm:mb-3">
                    {contact.role}
                  </p>
                  <motion.a
                    href={`mailto:${contact.email}`}
                    whileHover={{ x: 5 }}
                    className="text-[var(--matrix-color-90)] hover:text-[var(--matrix-color)] transition-colors flex items-center gap-2 text-xs sm:text-sm break-all"
                  >
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    {contact.email}
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Location Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12 sm:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--matrix-color)] mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
              <span>ping -c 1 axiom_hq</span>
            </h2>
            <div className="flex justify-center px-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full max-w-2xl p-4 sm:p-8 border border-[var(--matrix-color-30)] rounded-lg hover:border-[var(--matrix-color)] transition-all duration-300 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,0,0.1)]"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--matrix-color)]" />
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--matrix-color)]">
                      {location.city}
                    </h3>
                  </div>
                  <p className="text-[var(--matrix-color-70)] text-sm sm:text-lg flex items-center gap-2">
                    <Terminal className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    {location.address}
                  </p>
                  <p className="text-[var(--matrix-color-70)] text-xs sm:text-base flex items-center gap-2">
                    <Binary className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    {location.coordinates}
                  </p>
                  <p className="text-[var(--matrix-color-70)] text-xs sm:text-base flex items-center gap-2">
                    <Webhook className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    {location.timezone}
                  </p>
                  <p className="text-[var(--matrix-color-70)] text-xs sm:text-base flex items-center gap-2">
                    <Wifi className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    {location.ping}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--matrix-color)] mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-3">
              <Wifi className="w-6 h-6 sm:w-8 sm:h-8" />
              <span>netstat -a</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="text-[var(--matrix-color-70)] hover:text-[var(--matrix-color)] transition-all duration-300 text-sm sm:text-lg font-semibold flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {link.name}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Terminal Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <TerminalContact />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
