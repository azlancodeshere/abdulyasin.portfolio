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
  liveApps: 6, // repos with a deployed homepage
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
  ],

  others: [
    {
      name: "Syncora",
      category: "Full Stack",
      kind: "Appointment Booking",
      blurb:
        "Appointment platform connecting clients with Doctors, Lawyers, Barbers and Trainers — availability slots, request lifecycle and role-based access.",
      stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      code: `${REPO}/Appointment-booking`,
      repo: "Appointment-booking",
      stars: 1,
      image: null,
    },
    {
      name: "Ecommerce Full Stack",
      category: "Full Stack",
      kind: "E-Commerce",
      blurb: "Full-stack e-commerce application, live on Vercel with the source on GitHub.",
      stack: ["React", "Node.js", "Express", "MongoDB"],
      live: "https://ecommerce-full-stack-olive.vercel.app",
      code: `${REPO}/Ecommerce-Full-Stack`,
      repo: "Ecommerce-Full-Stack",
      stars: 1,
      image: "/projects/ecommerce.jpg",
    },
    {
      name: "Hospital System",
      category: "Full Stack",
      kind: "Healthcare Management",
      blurb: "Hospital management web app with patient records and appointments, deployed live on Vercel.",
      stack: ["React", "Node.js", "Express", "MongoDB"],
      live: "https://hospital-system-eosin-two.vercel.app",
      code: `${REPO}/Hospital-system`,
      repo: "Hospital-system",
      stars: 1,
      image: "/projects/hospital.jpg",
    },
    {
      name: "Ticket Booking",
      category: "Full Stack",
      kind: "Ticket Booking",
      blurb: "Ticket booking application with a React front end and Node.js backend, live on Vercel.",
      stack: ["React", "Node.js", "Express", "MongoDB"],
      live: "https://ticket-booking-lemon.vercel.app",
      code: `${REPO}/ticket-booking-`,
      repo: "ticket-booking-",
      stars: 1,
      image: "/projects/ticket-booking.jpg",
    },
    {
      name: "Chat Application",
      category: "Backend",
      kind: "Real-time Messaging",
      blurb:
        "Chat app with a React frontend and Node.js/Express backend, using MongoDB for persistent user and application data.",
      stack: ["React", "JavaScript", "Node.js", "Express", "MongoDB"],
      code: `${REPO}/chat-app`,
      repo: "chat-app",
      stars: 1,
      image: null,
    },
    {
      name: "Uber Full Stack",
      category: "Full Stack",
      kind: "Ride Booking Flow",
      blurb: "Full-stack rebuild of a ride-booking flow — frontend, APIs and database in one repo.",
      stack: ["React", "Node.js", "Express", "MongoDB"],
      code: `${REPO}/Uber-full-stack`,
      repo: "Uber-full-stack",
      stars: 2,
      image: null,
    },
  ],

  /* ---------------------------------------------------------------- skills */
  // Straight out of the resume's "Technical Skills" block.
  skills: [
    { group: "Languages", items: ["JavaScript", "TypeScript"] },
    { group: "Frontend", items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "React Router", "Vite"] },
    { group: "Backend", items: ["Node.js", "Express.js", "REST APIs", "MVC Architecture"] },
    { group: "Database", items: ["MongoDB", "Mongoose", "Data Modeling"] },
    { group: "Authentication", items: ["JWT", "HTTP-Only Cookies", "bcrypt", "Role-Based Access"] },
    { group: "Tools & DevOps", items: ["Git", "GitHub", "Postman", "Axios", "Vercel", "npm"] },
  ],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const skillCount = profile.skills.reduce((n, g) => n + g.items.length, 0);

export const stats = [
  { value: "24", label: "Public repositories" },
  { value: String(profile.liveApps), label: "Live apps deployed" },
  { value: String(skillCount), label: "Technologies in stack" },
  { value: profile.lighthouse, label: "Lighthouse accessibility" },
];
