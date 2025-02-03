"use client";

import React, { memo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  message: string;
  interests: string[];
}

interface ValidationErrors {
  [key: string]: string;
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

  const [errors, setErrors] = useState<ValidationErrors>({});
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Validation functions
  const validateField = (field: keyof FormData): string => {
    const value = formData[field];

    switch (field) {
      case "name":
        if (!value || typeof value !== "string")
          return "ERROR: Name is required";
        if (value.trim().length < 2)
          return "ERROR: Name must be at least 2 characters";
        return "";

      case "email":
        if (!value || typeof value !== "string")
          return "ERROR: Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "ERROR: Invalid email format";
        return "";

      case "interests":
        if (!Array.isArray(value) || !value.length)
          return "ERROR: Select at least one interest";
        return "";

      case "message":
        if (!value || typeof value !== "string")
          return "ERROR: Message is required";
        if (value.trim().length < 10)
          return "ERROR: Message must be at least 10 characters";
        return "";

      default:
        return "";
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentField = ["name", "email", "interests", "message"][
      currentStep
    ] as keyof FormData;
    const error = validateField(currentField);

    if (error) {
      setErrors((prev) => ({ ...prev, [currentField]: error }));
      return false;
    }

    setErrors((prev) => ({ ...prev, [currentField]: "" }));
    return true;
  };

  // Scroll to the bottom of terminal when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentStep, submitted, errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before final submission
    const allErrors: ValidationErrors = {
      name: validateField("name"),
      email: validateField("email"),
      interests: validateField("interests"),
      message: validateField("message"),
    };

    if (Object.values(allErrors).some((error) => error)) {
      setErrors(allErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
    setErrors({});

    setTimeout(() => {
      setSubmitted(false);
      setCurrentStep(0);
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

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !isSubmitting) {
      e.preventDefault();

      if (currentStep < 3) {
        if (validateCurrentStep()) {
          setCurrentStep((prev) => prev + 1);
        }
      } else {
        if (validateCurrentStep()) {
          handleSubmit(e as unknown as React.FormEvent);
        }
      }
    }
  };

  const renderPrompt = () => {
    const prompts = [
      { label: "name", value: formData.name },
      { label: "email", value: formData.email },
      { label: "interests", value: formData.interests.join(", ") },
      { label: "message", value: formData.message },
    ];

    return prompts.map((prompt, index) => (
      <div
        key={prompt.label}
        className={`mb-4 ${index > currentStep ? "hidden" : ""}`}
      >
        <div className="flex items-center text-[var(--matrix-color)] mb-1">
          <span className="mr-2">root@axiom:~$</span>
          <span>enter_{prompt.label}</span>
          {prompt.label === "interests" && (
            <span className="ml-2 text-[var(--matrix-color-70)] text-sm">
              (Click to select, ENTER when done)
            </span>
          )}
        </div>
        {index === currentStep && !submitted ? (
          <>
            <div className="flex items-center">
              <span className="text-[var(--matrix-color-70)]">{"> "}</span>
              {prompt.label !== "interests" ? (
                <input
                  type={prompt.label === "email" ? "email" : "text"}
                  value={prompt.value}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [prompt.label]: e.target.value,
                    }))
                  }
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent border-none outline-none text-[var(--matrix-color)] ml-2 font-mono"
                />
              ) : (
                <div className="flex-1">
                  <div
                    className="flex flex-wrap gap-2 mt-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isSubmitting) {
                        e.preventDefault();
                        if (validateCurrentStep()) {
                          setCurrentStep((prev) => prev + 1);
                        }
                      }
                    }}
                    tabIndex={0}
                  >
                    {interestOptions.map((interest, i) => (
                      <button
                        key={interest}
                        onClick={(e) => {
                          e.preventDefault();
                          handleInterestToggle(interest);
                        }}
                        type="button"
                        className={`px-2 py-1 font-mono text-sm ${
                          formData.interests.includes(interest)
                            ? "text-black bg-[var(--matrix-color)]"
                            : "text-[var(--matrix-color)] border border-[var(--matrix-color-30)]"
                        } hover:border-[var(--matrix-color)]`}
                      >
                        [{i + 1}] {interest}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {errors[prompt.label] && (
              <div className="mt-2 text-red-500 font-mono">
                <span className="mr-2">!</span>
                {errors[prompt.label]}
              </div>
            )}
          </>
        ) : index < currentStep ? (
          <div className="text-[var(--matrix-color-70)] font-mono">
            <span className="mr-2">{">"}</span>
            {prompt.value || "[empty]"}
          </div>
        ) : null}
      </div>
    ));
  };

  return (
    <section className="py-20 relative overflow-hidden bg-black" id="contact">
      <div className="container mx-auto px-4 pb-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--matrix-color)] mb-4">
            Contact Us
          </h2>
          <p className="text-[var(--matrix-color-70)] text-lg max-w-2xl mx-auto">
            Ready to start your next project? Drop us a message through our
            secure terminal interface.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-black border border-[var(--matrix-color-30)] rounded">
            {/* Terminal Header */}
            <div className="border-b border-[var(--matrix-color-30)] p-2 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-[var(--matrix-color-70)] text-sm font-mono">
                AxiomClub Terminal - Contact Interface v1.0.0
              </div>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="p-4 font-mono h-[400px] overflow-y-auto custom-scrollbar"
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="h-full">
                  <div className="mb-4 text-[var(--matrix-color)]">
                    <span className="text-[var(--matrix-color-70)]">
                      Last login: {new Date().toUTCString()}
                    </span>
                    <div className="mt-2">
                      Welcome to AxiomClub Contact Terminal. Press ENTER after
                      each input to continue.
                    </div>
                  </div>
                  {renderPrompt()}
                </form>
              ) : (
                <div className="text-[var(--matrix-color)]">
                  <div className="mb-2">Message sent successfully!</div>
                  <div className="text-[var(--matrix-color-70)]">
                    Connection closing in 3 seconds...
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
