import { Link } from "react-router-dom";
import './MainLayout.css';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-layout">
      {/* NAV */}
      <nav className="main-nav">
        <div className="main-nav-content">
          <h1 className="logo">
            🌿 EcoCultiva
          </h1>

          <div className="nav-links">
            <Link to="/">Cultivos</Link>
            <Link to="/camera">Cámara</Link>
            <Link to="/ai">Asistente IA</Link>
            <Link to="/analytics">Analítica</Link>
            <Link to="/community">Comunidad</Link>
            <Link to="/profile">Perfil</Link>
          </div>
        </div>
      </nav>

      <main className="container">{children}</main>
    </div>
  );
}
