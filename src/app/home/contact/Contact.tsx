"use client";

import React, { memo, useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  message: string;
  interests: string[];
}

const interestOptions = [
  "Web Development",
  "AI/ML",
  "Cybersecurity",
  "Mobile Apps",
  "Blockchain",
  "UI/UX Design",
];

const Contact = memo(() => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    interests: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        message: "",
        interests: [],
      });
    }, 3000);
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Matrix Code Rain Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <div className="absolute inset-0 opacity-5">
          {/* Matrix code columns */}
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="border-r border-[var(--matrix-color-30)] h-full"
                style={{
                  animation: `matrixRain ${
                    Math.random() * 2 + 1
                  }s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
              Join The Matrix
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Ready to be part of something extraordinary? Connect with us and
            let&apos;s build the future together.
          </p>
        </motion.div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            className="bg-black/90 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Success Message */}
            <motion.div
              className={`absolute inset-0 bg-black/95 flex items-center justify-center ${
                submitted ? "pointer-events-auto" : "pointer-events-none"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: submitted ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: submitted ? 1 : 0.5 }}
                className="text-center"
              >
                <div className="text-[var(--matrix-color)] text-6xl mb-4">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-[var(--matrix-color)] mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-300">
                  We&apos;ll get back to you as soon as possible.
                </p>
              </motion.div>
            </motion.div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-[var(--matrix-color)] mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-[var(--matrix-color-30)] rounded-lg text-white focus:outline-none focus:border-[var(--matrix-color)] transition-colors"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[var(--matrix-color)] mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-[var(--matrix-color-30)] rounded-lg text-white focus:outline-none focus:border-[var(--matrix-color)] transition-colors"
                  required
                />
              </div>

              {/* Interests */}
              <div>
                <label className="block text-[var(--matrix-color)] mb-2">
                  Areas of Interest
                </label>
                <div className="flex flex-wrap gap-3">
                  {interestOptions.map((interest) => (
                    <motion.button
                      key={interest}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-4 py-2 rounded-full border ${
                        formData.interests.includes(interest)
                          ? "bg-[var(--matrix-color)] text-black border-[var(--matrix-color)]"
                          : "border-[var(--matrix-color-30)] text-[var(--matrix-color)]"
                      } transition-colors`}
                    >
                      {interest}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-[var(--matrix-color)] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-[var(--matrix-color-30)] rounded-lg text-white focus:outline-none focus:border-[var(--matrix-color)] transition-colors h-32 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-[var(--matrix-color)] text-black font-semibold rounded-lg hover:bg-[var(--matrix-glow)] transition-colors relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black" />
                  </div>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[var(--matrix-color-50)]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[var(--matrix-color-50)]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[var(--matrix-color-50)]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[var(--matrix-color-50)]" />
          </motion.form>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
