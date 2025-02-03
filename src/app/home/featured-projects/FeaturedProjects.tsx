"use client";

import React, { memo, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ExternalLink,
  Github,
  Code2,
  Folder,
  MonitorPlay,
  Bot,
  Shield,
  Database,
  Cpu,
  Car,
} from "lucide-react";
import { Project } from "@/types/project";
import { getAllProjects } from "@/services/projectService";

// Icon mapping for different project types
const getProjectIcon = (project: Project) => {
  const iconProps = {
    size: 32,
    className:
      "text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors",
  };

  if (project.tech.includes("AI") || project.tech.includes("OpenAI API")) {
    return <Bot {...iconProps} />;
  }
  if (project.tech.includes("React Native")) {
    return <MonitorPlay {...iconProps} />;
  }
  if (
    project.tech.includes("Cybersecurity") ||
    project.tech.includes("Security")
  ) {
    return <Shield {...iconProps} />;
  }
  if (project.tech.includes("PostgreSQL") || project.tech.includes("MongoDB")) {
    return <Database {...iconProps} />;
  }
  if (project.tech.includes("Assembly") || project.tech.includes("C")) {
    return <Cpu {...iconProps} />;
  }
  if (project.title === "Rootus") {
    return <Car {...iconProps} />;
  }
  return <Folder {...iconProps} />;
};

const ProjectIcon = memo(
  ({
    project,
    isSelected,
    onClick,
  }: {
    project: Project;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    return (
      <motion.button
        onClick={onClick}
        className={`group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-[var(--matrix-color-10)] transition-colors ${
          isSelected ? "bg-[var(--matrix-color-10)]" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {getProjectIcon(project)}
        <span className="text-sm font-mono text-center text-[var(--matrix-color)] group-hover:text-[var(--matrix-glow)] transition-colors">
          {project.title}
        </span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            project.status === "Completed"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : project.status === "In Progress"
              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
          }`}
        >
          {project.status}
        </span>
      </motion.button>
    );
  }
);

ProjectIcon.displayName = "ProjectIcon";

const ProjectDetails = memo(({ project }: { project: Project | null }) => {
  return (
    <AnimatePresence mode="wait">
      {project ? (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="h-full"
        >
          <div className="bg-black/70 backdrop-blur-sm border border-[var(--matrix-color-30)] rounded-lg p-6 h-full">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {getProjectIcon(project)}
                <div>
                  <h2 className="text-2xl font-bold text-[var(--matrix-color)] font-mono">
                    {project.title}
                  </h2>
                  <span
                    className={`text-sm px-2 py-0.5 rounded-full font-medium ${
                      project.status === "Completed"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : project.status === "In Progress"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[var(--matrix-color-10)] text-[var(--matrix-color)] rounded-lg border border-[var(--matrix-color-30)] hover:bg-[var(--matrix-color-20)] transition-colors"
                  >
                    <Github size={20} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[var(--matrix-color)] text-black rounded-lg hover:bg-[var(--matrix-glow)] transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-gray-300 mb-6">{project.description}</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-[var(--matrix-color)] font-mono mb-2 flex items-center gap-2">
                  <Code2 size={16} />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm bg-[var(--matrix-color-10)] text-[var(--matrix-color)] rounded-full border border-[var(--matrix-color-30)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full flex items-center justify-center"
        >
          <div className="text-center text-gray-400 font-mono">
            <Terminal size={32} className="mx-auto mb-4 opacity-50" />
            <p>Select a project to view details</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ProjectDetails.displayName = "ProjectDetails";

const FeaturedProjects = memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get featured projects (using first 6 projects for now)
  const projects = useMemo(() => getAllProjects().slice(0, 6), []);

  return (
    <section className="min-h-screen relative py-20 bg-gradient-to-b from-black/50 to-black/30">
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
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Explore our latest innovations and breakthrough projects that push
            the boundaries of technology.
          </p>
        </motion.div>

        {/* Split Layout: Project Icons Grid and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Icons Grid */}
          <div className="bg-black/20 border border-[var(--matrix-color-30)] rounded-lg p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {projects.map((project) => (
                <ProjectIcon
                  key={project.title}
                  project={project}
                  isSelected={selectedProject?.title === project.title}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="h-[calc(100vh-30rem)] sticky top-20">
            <ProjectDetails project={selectedProject} />
          </div>
        </div>
      </div>
    </section>
  );
});

FeaturedProjects.displayName = "FeaturedProjects";

export default FeaturedProjects;
