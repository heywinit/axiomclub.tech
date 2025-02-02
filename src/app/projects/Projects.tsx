"use client";

import React, { memo, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Terminal,
  ExternalLink,
  Github,
} from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  status: "Completed" | "In Progress" | "Planning";
  github?: string;
  demo?: string;
}

const ITEMS_PER_PAGE = 5;

const ProjectRow = memo(
  ({ project, index }: { project: Project; index: number }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="border-b border-[var(--matrix-color-30)] hover:bg-[var(--matrix-color-10)]"
      >
        <div
          onClick={() => setExpanded(!expanded)}
          className="flex items-center py-3 px-4 cursor-pointer group"
        >
          <Terminal size={16} className="text-[var(--matrix-color)] mr-3" />
          <span className="text-[var(--matrix-color)] font-mono">
            {project.title}
          </span>
          <span
            className={`ml-4 text-sm px-2 py-0.5 rounded ${
              project.status === "Completed"
                ? "bg-green-500/20 text-green-400"
                : project.status === "In Progress"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {project.status}
          </span>
          <div className="ml-auto flex items-center space-x-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
            {expanded ? (
              <ChevronUp size={16} className="text-[var(--matrix-color)]" />
            ) : (
              <ChevronDown size={16} className="text-[var(--matrix-color)]" />
            )}
          </div>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-4 font-mono"
            >
              <div className="pl-6 border-l border-[var(--matrix-color-30)]">
                <p className="text-gray-300 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-[var(--matrix-color-20)] text-[var(--matrix-color)] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

ProjectRow.displayName = "ProjectRow";

const Projects = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "status">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sample projects data
  const projects = [
    {
      title: "Axiom Club Website",
      description:
        "The official website for Axiom Club featuring a unique retro-futuristic interface built with Next.js and React.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "Completed" as const,
      github: "https://github.com/axiomclub/website",
      demo: "https://axiomclub.tech",
    },
    {
      title: "AI Study Assistant",
      description:
        "An AI-powered study assistant that helps students organize their learning materials and create personalized study plans.",
      tech: ["Python", "TensorFlow", "FastAPI", "React", "MongoDB"],
      status: "In Progress" as const,
      github: "https://github.com/axiomclub/study-assistant",
    },
    {
      title: "IoT Smart Campus",
      description:
        "A network of IoT devices to monitor and optimize energy usage, attendance, and resource management across the campus.",
      tech: ["Arduino", "ESP32", "MQTT", "Node.js", "InfluxDB"],
      status: "Planning" as const,
    },
    {
      title: "Blockchain Voting System",
      description:
        "A secure and transparent voting system for student elections using blockchain technology.",
      tech: ["Solidity", "Ethereum", "Web3.js", "React", "Node.js"],
      status: "In Progress" as const,
      github: "https://github.com/axiomclub/blockchain-voting",
    },
    {
      title: "AR Campus Navigator",
      description:
        "An augmented reality app to help students and visitors navigate the campus and discover points of interest.",
      tech: ["Unity", "ARCore", "C#", "Firebase"],
      status: "Planning" as const,
    },
    {
      title: "Code Review Bot",
      description:
        "A GitHub bot that automates code reviews and enforces coding standards for club projects.",
      tech: ["Python", "GitHub API", "Docker", "ML"],
      status: "Completed" as const,
      github: "https://github.com/axiomclub/review-bot",
    },
  ];

  // Get unique tech stack items
  const uniqueTech = useMemo(() => {
    const techSet = new Set(projects.flatMap((p) => p.tech));
    return Array.from(techSet);
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch =
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.tech.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          );
        const matchesStatus =
          selectedStatus === "all" || project.status === selectedStatus;
        const matchesTech =
          selectedTech === "all" || project.tech.includes(selectedTech);
        return matchesSearch && matchesStatus && matchesTech;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        } else {
          return sortOrder === "asc"
            ? a.status.localeCompare(b.status)
            : b.status.localeCompare(a.status);
        }
      });
  }, [projects, searchQuery, selectedStatus, selectedTech, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="min-h-screen py-10 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left side - Terminal style */}
              <div className="text-left font-mono">
                <div className="flex items-center gap-2 text-[var(--matrix-color)] mb-3">
                  <Terminal size={18} />
                  <span className="text-lg font-bold">PROJECT INDEX</span>
                </div>
                <div className="text-gray-400">
                  Viewing {filteredProjects.length} projects •{" "}
                  {projects.filter((p) => p.status === "Completed").length}{" "}
                  completed
                </div>
              </div>

              {/* Right side - Status & Suggest */}
              <div className="text-right font-mono flex items-center justify-end gap-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/30 rounded-lg border border-[var(--matrix-color-30)]">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-gray-300">System Active</span>
                </div>
                <motion.a
                  href="https://github.com/axiom-svgu/axiomclub.tech/issues/new?labels=project-suggestion&template=project_suggestion.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--matrix-color)] text-black rounded-lg hover:bg-[var(--matrix-glow)] transition-colors font-bold"
                >
                  <span>+</span>
                  <span>Suggest Project</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area with Fixed Height */}
          <div className="flex flex-col h-[calc(100vh-250px)] min-h-[500px]">
            {/* Controls */}
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg focus:outline-none focus:border-[var(--matrix-color)] font-mono"
                  />
                </div>
                <div className="flex gap-2 sm:gap-4">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg focus:outline-none focus:border-[var(--matrix-color)] font-mono text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                  </select>
                  <select
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="px-3 py-2 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg focus:outline-none focus:border-[var(--matrix-color)] font-mono text-sm"
                  >
                    <option value="all">Tech Stack</option>
                    {uniqueTech.map((tech) => (
                      <option key={tech} value={tech}>
                        {tech}
                      </option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "name" | "status")
                    }
                    className="px-3 py-2 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg focus:outline-none focus:border-[var(--matrix-color)] font-mono text-sm"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="status">Sort by Status</option>
                  </select>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="px-3 py-2 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg hover:bg-[var(--matrix-color-20)] font-mono"
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>
              </div>
            </div>

            {/* Projects List with Scroll */}
            <div className="flex-1 overflow-y-auto mb-4 rounded-lg border border-[var(--matrix-color-30)]">
              <div className="bg-black/20">
                {paginatedProjects.length > 0 ? (
                  paginatedProjects.map((project, index) => (
                    <ProjectRow
                      key={project.title}
                      project={project}
                      index={index}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-400 font-mono">
                    No projects match your search criteria
                  </div>
                )}
              </div>
            </div>

            {/* Fixed Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center px-4 py-3 bg-black/30 border border-[var(--matrix-color-30)] rounded-lg font-mono">
                <div className="text-gray-400 text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? "bg-[var(--matrix-color)] text-black"
                            : "hover:bg-[var(--matrix-color-20)]"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
                <div className="text-gray-400 text-sm">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredProjects.length
                  )}{" "}
                  of {filteredProjects.length}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
