import type { SiteData } from "../types";

export const defaultSite: SiteData = {
  profile: {
    name: "Avery Stone",
    role: "Independent Systems Designer",
    tagline:
      "Designing quiet, durable digital systems for founders, research teams, and high-trust services.",
    biography:
      "Avery works between product strategy, interface systems, and operational tooling. The practice focuses on making complex work feel legible, calm, and beautifully controlled.",
    location: "New York / Remote",
    availability: "Selective advisory and product systems work",
    email: "hello@averystone.studio",
    portraitUrl: "",
    heroImageUrl: "/assets/hero-atelier.png",
  },
  sections: [
    { id: "hero", title: "Hero", visible: true, order: 1 },
    { id: "about", title: "About", visible: true, order: 2 },
    { id: "projects", title: "Selected Work", visible: true, order: 3 },
    { id: "experience", title: "Experience", visible: true, order: 4 },
    { id: "writing", title: "Writing", visible: true, order: 5 },
    { id: "media", title: "Media", visible: true, order: 6 },
    { id: "services", title: "Services", visible: true, order: 7 },
    { id: "contact", title: "Contact", visible: true, order: 8 },
  ],
  projects: [
    {
      id: "p-atelier-os",
      title: "Atelier OS",
      category: "Product System",
      description:
        "A private operating layer for a boutique strategy studio, connecting client memory, delivery rituals, and executive reporting.",
      status: "Live",
      year: "2026",
      link: "https://example.com/atelier-os",
      featured: true,
      visible: true,
    },
    {
      id: "p-civic-signal",
      title: "Civic Signal Room",
      category: "Research Interface",
      description:
        "A command surface for policy researchers tracking weak signals, source confidence, and decision memos.",
      status: "Pilot",
      year: "2025",
      link: "https://example.com/civic-signal",
      featured: true,
      visible: true,
    },
    {
      id: "p-meridian",
      title: "Meridian Briefing",
      category: "Executive Tooling",
      description:
        "A daily briefing product that turns fragmented operational data into a single editorial-grade decision view.",
      status: "Private",
      year: "2025",
      link: "https://example.com/meridian",
      featured: false,
      visible: true,
    },
  ],
  experience: [
    {
      id: "e-independent",
      organization: "Avery Stone Studio",
      role: "Principal",
      period: "2024 - Present",
      description:
        "Independent practice for complex product systems, executive workflows, and editorial software.",
      highlights: ["Founder advisory", "Design systems", "Operational interfaces"],
      visible: true,
    },
    {
      id: "e-northline",
      organization: "Northline Labs",
      role: "Head of Product Design",
      period: "2021 - 2024",
      description:
        "Led interface strategy for AI-assisted research products used by analysts and operators.",
      highlights: ["Scaled design practice", "Launched research console", "Reduced workflow drift"],
      visible: true,
    },
    {
      id: "e-studio",
      organization: "Independent Clients",
      role: "Systems Consultant",
      period: "2018 - 2021",
      description:
        "Designed decision tools, internal platforms, and service blueprints for high-trust teams.",
      highlights: ["Private tools", "Service systems", "Founder strategy"],
      visible: true,
    },
  ],
  writing: [
    {
      id: "w-calm-tools",
      title: "Calm Tools for High-Stakes Work",
      summary:
        "Why the best operational software behaves more like a private room than a control tower.",
      tag: "Interface",
      date: "2026-05-16",
      url: "https://example.com/calm-tools",
      published: true,
    },
    {
      id: "w-memory",
      title: "Designing Institutional Memory",
      summary:
        "A practical model for turning recurring decisions into durable organizational knowledge.",
      tag: "Systems",
      date: "2026-03-08",
      url: "https://example.com/memory",
      published: true,
    },
  ],
  media: [
    {
      id: "m-hero",
      title: "Studio System Study",
      type: "image",
      url: "/assets/hero-atelier.png",
      caption: "Generated visual language study for the portfolio environment.",
      visible: true,
    },
    {
      id: "m-talk",
      title: "Designing for Executive Attention",
      type: "talk",
      url: "https://example.com/talk",
      caption: "Private salon talk on focus, workflow shape, and trust.",
      visible: true,
    },
    {
      id: "m-press",
      title: "Interface Notes",
      type: "press",
      url: "https://example.com/notes",
      caption: "A short interview on quiet tools and decision rhythm.",
      visible: true,
    },
  ],
  services: [
    {
      id: "s-product",
      title: "Product Systems",
      description:
        "Shape product surfaces, workflows, and component language for complex services.",
      visible: true,
    },
    {
      id: "s-advisory",
      title: "Founder Advisory",
      description:
        "Translate ambiguous product direction into clear operating choices and execution rhythm.",
      visible: true,
    },
    {
      id: "s-interface",
      title: "Executive Interfaces",
      description:
        "Create high-signal tools for briefs, decisions, rituals, and institutional memory.",
      visible: true,
    },
  ],
  links: [
    { id: "l-email", label: "Email", url: "mailto:hello@averystone.studio", visible: true },
    { id: "l-linkedin", label: "LinkedIn", url: "https://linkedin.com", visible: true },
    { id: "l-archive", label: "Archive", url: "https://example.com/archive", visible: true },
  ],
  appearance: {
    theme: "noir",
    accent: "#9f7a4f",
    density: "calm",
    motion: "full",
    language: "zh",
  },
  seo: {
    title: "Avery Stone | Independent Systems Designer",
    description:
      "Premium personal portfolio for systems design, product strategy, and high-trust digital tools.",
    keywords: "systems design, product strategy, portfolio, interface design",
    ogImage: "/assets/hero-atelier.png",
  },
  admin: {
    password: "atelier",
    lastSavedAt: "",
  },
};
