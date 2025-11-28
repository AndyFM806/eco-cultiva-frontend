import { Link, useLocation } from "react-router-dom";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <main className="flex-1 overflow-y-auto p-4 pb-20 max-w-md mx-auto w-full">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800">
        <div className="max-w-md mx-auto flex justify-between px-4 py-2 text-xs">
          <NavItem to="/" label="Cultivos" current={location.pathname === "/"} />
          <NavItem to="/camera" label="Cámara" current={location.pathname === "/camera"} />
          <NavItem to="/ai" label="IA" current={location.pathname === "/ai"} />
          <NavItem to="/analytics" label="Analítica" current={location.pathname === "/analytics"} />
          <NavItem to="/community" label="Comunidad" current={location.pathname === "/community"} />
          <NavItem to="/profile" label="Perfil" current={location.pathname === "/profile"} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  to,
  label,
  current,
}: {
  to: string;
  label: string;
  current: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex-1 text-center ${
        current ? "text-emerald-400 font-semibold" : "text-slate-400"
      }`}
    >
      {label}
    </Link>
  );
}
