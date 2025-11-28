import { Link } from "react-router-dom";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* NAV */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-emerald-700 flex items-center gap-2">
            🌿 EcoCultiva
          </h1>

          <div className="flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-emerald-600">Cultivos</Link>
            <Link to="/camera" className="hover:text-emerald-600">Cámara</Link>
            <Link to="/ai" className="hover:text-emerald-600">Asistente IA</Link>
            <Link to="/analytics" className="hover:text-emerald-600">Analítica</Link>
            <Link to="/community" className="hover:text-emerald-600">Comunidad</Link>
            <Link to="/profile" className="hover:text-emerald-600">Perfil</Link>
          </div>
        </div>
      </nav>

      <main className="container">{children}</main>
    </div>
  );
}
