import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Contributions from "./components/Contributions.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  // One observer drives every .reveal element on the page.
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-page text-ink">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-page"
      >
        Skip to content
      </a>

      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contributions />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
