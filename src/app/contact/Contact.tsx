"use client";

import TerminalContact from "@/app/home/contact/Contact";
import { motion } from "framer-motion";

const contactInfo = [
  {
    title: "General Inquiries",
    email: "hello@axiomclub.tech",
    phone: "+1 (555) 123-4567",
  },
  {
    title: "Business Development",
    email: "business@axiomclub.tech",
    phone: "+1 (555) 234-5678",
  },
  {
    title: "Technical Support",
    email: "support@axiomclub.tech",
    phone: "+1 (555) 345-6789",
  },
];

const locations = [
  {
    city: "Ahmedabad",
    address: "Sardar Vallabhbhai Global University - UCP Institute Of Technology",
  },
];

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/axiom-svgu/" },
  { name: "GitHub", url: "https://github.com/axiom-svgu" },
  { name: "Twitter", url: "https://x.com/Axiom_Svgu" },
];


export default function Contact() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Matrix Overlay with more dynamic effects */}
      <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,var(--background)_2px)] bg-[length:100%_4px] animate-scan" />
    <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
    <div className="absolute inset-0 [background:repeating-linear-gradient(90deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,var(--matrix-glow-30),transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_800px,var(--matrix-color-20),transparent)]" />
  </div>
      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 text-center relative z-20"
          >
            <h1 className="text-6xl md:text-7xl font-bold text-[var(--matrix-color)] mb-6 [text-shadow:0_0_10px_var(--matrix-color-30)]">
              Get in Touch
            </h1>
            <p className="text-[var(--matrix-color-70)] text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re looking to start a project, join our team, or
              just say hello, we&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>

        {/* Enhanced Contact Methods Grid */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 border border-[var(--matrix-color-30)] rounded-lg hover:border-[var(--matrix-color)] transition-all duration-300 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,0,0.1)]"
              >
                <h3 className="text-[var(--matrix-color)] text-2xl font-bold mb-6">
                  {info.title}
                </h3>
                <div className="space-y-4 text-[var(--matrix-color-70)]">
                  <motion.p
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[var(--matrix-color)]">Email: </span>
                    <a
                      href={`mailto:${info.email}`}
                      className="hover:text-[var(--matrix-color)] transition-colors"
                    >
                      {info.email}
                    </a>
                  </motion.p>
                  <motion.p
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[var(--matrix-color)]">Phone: </span>
                    <a
                      href={`tel:${info.phone}`}
                      className="hover:text-[var(--matrix-color)] transition-colors"
                    >
                      {info.phone}
                    </a>
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Locations Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-[var(--matrix-color)] mb-12 text-center [text-shadow:0_0_10px_var(--matrix-color-30)]">
              Our Location
            </h2>
            <div className="flex justify-center">
              {locations.map((location) => (
                <motion.div
                  key={location.city}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-8 border border-[var(--matrix-color-30)] rounded-lg hover:border-[var(--matrix-color)] transition-all duration-300 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,0,0.1)]"
              
                >
                  <div className="absolute inset-0 bg-[var(--matrix-color)] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <h3 className="text-[var(--matrix-color)] text-2xl font-bold mb-4">
                    {location.city}
                  </h3>
                  <p className="text-[var(--matrix-color-70)] text-lg">
                    {location.address}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-[var(--matrix-color)] mb-12 [text-shadow:0_0_10px_var(--matrix-color-30)]">
              Connect With Us
            </h2>
            <div className="flex justify-center gap-8">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="text-[var(--matrix-color-70)] hover:text-[var(--matrix-color)] transition-all duration-300 text-lg font-semibold"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Terminal Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <TerminalContact />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
