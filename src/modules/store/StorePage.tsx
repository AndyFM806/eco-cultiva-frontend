interface StoreItem {
  id: string;
  name: string;
  description: string;
  category: "semillas" | "riego" | "sensores" | "fertilizantes";
  link?: string;
}

const items: StoreItem[] = [
  {
    id: "s1",
    name: "Kit de semillas para huerto urbano",
    description: "Tomate, lechuga, rabanito y hierbas aromáticas.",
    category: "semillas",
  },
  {
    id: "r1",
    name: "Kit de riego por goteo automático",
    description: "Ideal para macetas en balcón o terraza.",
    category: "riego",
  },
  {
    id: "c1",
    name: "Sensor de humedad de suelo",
    description: "Compatible con microcontroladores para tu cámara de cultivo.",
    category: "sensores",
  },
  {
    id: "f1",
    name: "Fertilizante ecológico universal",
    description: "Mezcla balanceada NPK, apto para huertos caseros.",
    category: "fertilizantes",
  },
];

export function StorePage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-emerald-400">
          🧪 Sugerencias de compra
        </h1>
        <p className="text-sm text-slate-300">
          Productos que complementan tu sistema de cultivo.
        </p>
      </header>

      <div className="space-y-2 text-sm">
        {items.map((i) => (
          <div
            key={i.id}
            className="bg-slate-900 rounded-xl p-3 border border-slate-800"
          >
            <p className="font-semibold">{i.name}</p>
            <p className="text-[11px] text-emerald-300 mb-1">
              {i.category.toUpperCase()}
            </p>
            <p className="text-xs text-slate-300 mb-2">{i.description}</p>
            {i.link && (
              <a
                href={i.link}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-emerald-400 underline"
              >
                Ver producto
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
