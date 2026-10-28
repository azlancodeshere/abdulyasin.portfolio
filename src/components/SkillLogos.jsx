import { Boxes, Code2, Cookie, KeyRound, Layers, ShieldCheck, Waypoints } from "lucide-react";
import {
  siAxios,
  siCss,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siMongodb,
  siMongoose,
  siNextdotjs,
  siNodedotjs,
  siNpm,
  siPostman,
  siReact,
  siReactrouter,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
} from "simple-icons";

const BRANDS = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  "React.js": siReact,
  "Next.js": siNextdotjs,
  HTML5: siHtml5,
  CSS3: siCss,
  "Tailwind CSS": siTailwindcss,
  "React Router": siReactrouter,
  Vite: siVite,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  MongoDB: siMongodb,
  Mongoose: siMongoose,
  JWT: siJsonwebtokens,
  Git: siGit,
  GitHub: siGithub,
  Postman: siPostman,
  Axios: siAxios,
  Vercel: siVercel,
  npm: siNpm,
};

const GLYPHS = {
  "REST APIs": Waypoints,
  "MVC Architecture": Layers,
  "Data Modeling": Boxes,
  "HTTP-Only Cookies": Cookie,
  bcrypt: KeyRound,
  "Role-Based Access": ShieldCheck,
};

const TILE_BG = "#141d30"; 

const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const channel = (v) => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const contrast = (l) => (l + 0.05) / (luminance(toRgb(TILE_BG)) + 0.05);
const toHex = (rgb) =>
  `#${rgb.map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("")}`;

function readable(hex) {
  const rgb = toRgb(hex);
  if (luminance(rgb) < 0.05) return "#f8fafc"; 

  for (let t = 0; t <= 0.9; t += 0.15) {
    const mixed = rgb.map((v) => Math.round(v + (255 - v) * t));
    if (contrast(luminance(mixed)) >= 3.2) return toHex(mixed);
  }
  return "#f8fafc";
}

export function SkillLogo({ name, className = "size-7" }) {
  const brand = BRANDS[name];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={name}
        className={className}
        fill={readable(brand.hex)}
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const Glyph = GLYPHS[name] || Code2;
  return <Glyph className={`${className} text-accent`} aria-hidden="true" />;
}
