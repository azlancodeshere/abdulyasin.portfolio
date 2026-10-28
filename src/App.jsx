import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Journey from "./components/Journey.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Contributions from "./components/Contributions.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  // One observer drives every .reveal element on the page. Elements are also
  // added later (e.g. project cards re-rendered by the category filter), so a
  // MutationObserver keeps them in sync — otherwise they would stay at
  // opacity: 0 forever.
  useEffect(() => {
    const all = () => document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      all().forEach((n) => n.classList.add("is-visible"));
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

    const observe = (root) => {
      if (root.nodeType !== Node.ELEMENT_NODE) return;
      if (root.classList.contains("reveal")) observer.observe(root);
      root.querySelectorAll(".reveal").forEach((n) => observer.observe(n));
    };

    all().forEach((n) => observer.observe(n));

    // Reveal anything React mounts after the initial render.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(observe));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-page text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-page"
      >
        Skip to content
      </a>

      <Header />
      <main id="content" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Contributions />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
