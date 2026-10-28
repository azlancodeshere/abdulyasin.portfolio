/**
 * Single source of truth for the portfolio.
 *
 * Everything on the site is rendered from this file, and its values are kept
 * aligned with three places:
 *   1. GitHub profile  -> github.com/azlancodeshere  (name, bio, links, repos)
 *   2. Resume (v8)     -> Abdul_Yasin_Resume_Dev_v8.docx  (summary, skills, education)
 *   3. LinkedIn        -> linkedin.com/in/abdulyasin-devstack
 *
 * Repo-derived fields (stars, homepage, description) can be refreshed with:
 *   npm run sync
 */

import contributionsData from "./contributions.json";

const REPO = "https://github.com/azlancodeshere";

export const profile = {
  name: "Abdul Yasin",
  firstName: "Abdul",
  initials: "AY",
  role: "Full Stack Developer",
  roleLine: "Full Stack Developer · Backend Focused · Builder",
  location: "India 🇮🇳",
  // Same portrait as the GitHub profile so everything matches.
  avatar: "https://avatars.githubusercontent.com/u/250402182?v=4",

  email: "azlan.codes@gmail.com",
  phone: "+91 7858083218",
  github: "azlancodeshere",
  linkedin: "abdulyasin-devstack",
  resume: "/resume.pdf",

  // Matches the GitHub profile bio, word for word.
  bio: "Full Stack Developer | Backend Focused. Building web apps with React, Next.js, TypeScript, Node.js & MongoDB.",

  hero:
    "I build full-stack web apps end to end — REST APIs, JWT auth and MongoDB on the backend, React and Tailwind on the front. Shipped live on Vercel.",

  summary:
    "Full-Stack Web Developer with hands-on experience building real-world applications using React.js, TypeScript, Node.js, Express.js, MongoDB, and Tailwind CSS. Experienced in REST API development, authentication, role-based workflows, database integration, appointment scheduling, and responsive frontend development.",

  openTo: "Open to Full-Time roles, Internships and Collaborations.",

  links: {
    email: "mailto:azlan.codes@gmail.com",
    github: REPO,
    linkedin: "https://www.linkedin.com/in/abdulyasin-devstack",
    resume: "/resume.pdf",
  },

  /* ---------------------------------------------------------------- stats */
  // Derived, so they can never drift from the rest of the data.
  liveApps: 4, // repos with a deployed homepage
  starsGivenAt: "2025",
  lighthouse: "100", // accessibility score on Surhires (from the resume)

  /* ------------------------------------------------------------ experience */
  experience: [
    {
      org: "Government Engineering College, Ajmer",
      place: "Ajmer, Rajasthan",
      role: "Bachelor of Technology — Computer Science",
      period: "Sep 2025 — Jun 2029",
      points: [
        "Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks.",
        "Class 12th — JAC (Jharkhand Academic Council).",
        "Class 10th — CBSE (Central Board of Secondary Education).",
      ],
    },
  ],

  /* -------------------------------------------------------------- projects */
  featured: [
    {
      name: "Surhires",
      category: "Frontend",
      kind: "Recruitment Platform",
      blurb:
        "A responsive 3-page recruitment platform (Home, Jobs, Employers) built with the Next.js App Router and deployed live on Vercel.",
      points: [
        "Live job filtering by role, company, location and job type, plus a validated “Post a job” form with a success state.",
        "Lighthouse mobile scores of 96 Performance and 100 for Accessibility, Best Practices and SEO.",
        "Accessible UI: keyboard-usable FAQ accordion, ARIA-enabled mobile menu and reduced-motion support.",
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      live: "https://surhires.vercel.app",
      code: `${REPO}/hire-wise`,
      image: "/projects/surhires.jpg",
      repo: "hire-wise",
      stars: 0,
    },
    {
      name: "Notes Keeper AI",
      category: "Full Stack",
      kind: "AI-Powered Notes App",
      blurb:
        "Full-stack AI notes application — React frontend, Node.js/Express API, MongoDB for persistent storage.",
      points: [
        "Note creation, editing and deletion with data persisted in MongoDB.",
        "AI-assisted features wired into the note-taking workflow through dedicated API endpoints.",
        "GitHub Actions workflow set up; application deployed live on Vercel.",
      ],
      stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Vite"],
      live: "https://notes-keeper-silk.vercel.app",
      code: `${REPO}/notes-keeper`,
      image: "/projects/notes-keeper.jpg",
      repo: "notes-keeper",
      stars: 0,
    },
    {
      name: "Inventory Management",
      category: "Full Stack",
      kind: "Stock & Dashboard System",
      blurb:
        "Full-stack inventory system with product management, stock tracking and a dashboard that surfaces low and out-of-stock items.",
      points: [
        "Add, update and delete products; inventory calculations drive low-stock and out-of-stock detection.",
        "JWT authentication with secure cookies, bcrypt password hashing and protected routes.",
        "Responsive interface built with React, Vite, Tailwind and Axios, deployed on Vercel.",
      ],
      stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS", "Vite"],
      live: "https://inventory-management-omega-lemon.vercel.app",
      code: `${REPO}/inventory-management`,
      image: "/projects/inventory-management.jpg",
      repo: "inventory-management",
      stars: 1,
    },
    {
      name: "Ticket Booking",
      category: "Full Stack",
      kind: "Cinema Ticket Booking",
      blurb:
        "Cinema ticket booking platform — browse movies and showtimes, pick a seat and get a QR ticket, with a React front end and Node.js backend live on Vercel.",
      points: [
        "Seat-selection booking flow across movies and showtimes, confirmed end to end with a QR ticket.",
        "REST API built with Node.js and Express, with MongoDB storing movies, showtimes, users and bookings.",
        "Cinema landing experience with live show listings, deployed on Vercel and source hosted on GitHub.",
      ],
      stack: ["React", "Node.js", "Express", "MongoDB"],
      live: "https://ticket-booking-lemon.vercel.app",
      code: `${REPO}/ticket-booking-`,
      image: "/projects/ticket-booking.jpg",
      repo: "ticket-booking-",
      stars: 1,
    },
  ],

  others: [],

  /* ---------------------------------------------------------------- skills */
  // Straight out of the resume's "Technical Skills" block.
  // Each item carries a short note, rendered like a toolkit card.
  skills: [
    {
      group: "Languages",
      items: [
        { name: "JavaScript", note: "Daily driver" },
        { name: "TypeScript", note: "Type-safe apps" },
      ],
    },
    {
      group: "Frontend",
      items: [
        { name: "React.js", note: "Primary UI library" },
        { name: "Next.js", note: "App Router & SSR" },
        { name: "HTML5", note: "Semantic markup" },
        { name: "CSS3", note: "Modern layouts" },
        { name: "Tailwind CSS", note: "Styling system" },
        { name: "React Router", note: "Client routing" },
        { name: "Vite", note: "Build tooling" },
      ],
    },
    {
      group: "Backend",
      items: [
        { name: "Node.js", note: "Runtime of choice" },
        { name: "Express.js", note: "REST API framework" },
        { name: "REST APIs", note: "Design & integration" },
        { name: "MVC Architecture", note: "Project structure" },
      ],
    },
    {
      group: "Database",
      items: [
        { name: "MongoDB", note: "Primary NoSQL DB" },
        { name: "Mongoose", note: "Schema & validation" },
        { name: "Data Modeling", note: "Collections design" },
      ],
    },
    {
      group: "Authentication",
      items: [
        { name: "JWT", note: "Stateless sessions" },
        { name: "HTTP-Only Cookies", note: "Secure storage" },
        { name: "bcrypt", note: "Password hashing" },
        { name: "Role-Based Access", note: "Protected routes" },
      ],
    },
    {
      group: "Tools & DevOps",
      items: [
        { name: "Git", note: "Version control" },
        { name: "GitHub", note: "Hosted repositories" },
        { name: "Postman", note: "API testing" },
        { name: "Axios", note: "HTTP client" },
        { name: "Vercel", note: "Deployment" },
        { name: "npm", note: "Package management" },
      ],
    },
  ],

  /* --------------------------------------------------------------- journey */
  // Dated milestones — the story behind the stats, newest first.
  journey: [
    {
      period: "2026 — Now",
      tag: "Focus",
      title: "Building Full-Stack Products",
      org: "Surhires · Notes Keeper AI · Inventory Management",
      desc: "Shipping production-grade MERN apps end to end — JWT auth, REST APIs and MongoDB backends with polished React and Tailwind interfaces, all deployed live on Vercel.",
    },
    {
      period: "2025 — Dec",
      tag: "Open Source",
      title: "24+ Public Repositories",
      org: "github.com/azlancodeshere",
      desc: "Publishing full-stack builds openly — appointment booking, ticketing, chat and e-commerce systems — with consistent daily commits tracked on the contribution graph.",
    },
    {
      period: "2025 — Sep",
      tag: "Education",
      title: "B.Tech in Computer Science",
      org: "Government Engineering College, Ajmer",
      desc: "Started the bachelor's program with coursework in Data Structures & Algorithms, DBMS, Operating Systems and Computer Networks — the fundamentals behind every project here.",
    },
    {
      period: "2025",
      tag: "Milestone",
      title: "First Full-Stack Apps Shipped",
      org: "React + Node.js + MongoDB",
      desc: "Moved from tutorials to real products — built and deployed the first end-to-end applications with authentication, database integration and responsive frontends.",
    },
  ],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const skillCount = profile.skills.reduce((n, g) => n + g.items.length, 0);

export const stats = [
  { value: "24", label: "Public repositories", plus: true },
  { value: String(profile.liveApps), label: "Live apps deployed", plus: true },
  { value: String(contributionsData.total), label: "Contributions (last 12 mo)", plus: false, live: "contributions" },
  { value: profile.lighthouse, label: "Lighthouse accessibility", plus: false },
];
