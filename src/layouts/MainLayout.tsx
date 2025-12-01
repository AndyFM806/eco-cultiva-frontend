import { NavLink, Link } from "react-router-dom";
import './MainLayout.css';

const navLinks = [
  { path: "/", label: "Cultivos", icon: "🌱" },
  { path: "/camera", label: "Cámara", icon: "📸" },
  { path: "/ai", label: "Asistente", icon: "🤖" },
  { path: "/community", label: "Comunidad", icon: "🧭" },
  { path: "/analytics", label: "Analítica", icon: "📊" },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-layout">
      {/* --- NAVEGACIÓN SUPERIOR (ESCRITORIO) --- */}
      <nav className="main-nav">
        <div className="main-nav-content">
          <Link to="/" className="logo">
            🌿 EcoCultiva
          </Link>
          <div className="nav-links">
            {navLinks.map(link => (
              <NavLink key={link.path} to={link.path}>{link.label}</NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="container">{children}</main>

      {/* --- NAVEGACIÓN INFERIOR (MÓVIL) --- */}
      <nav className="mobile-nav">
        {navLinks.map(link => (
          <NavLink key={link.path} to={link.path} className={({ isActive }) =>
            `mobile-nav-link ${isActive ? "active" : ""}`
          }>
            <span className="icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
