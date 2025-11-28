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
    <div className="container">
      <header>
        <h1>🧪 Sugerencias de compra</h1>
        <p className="muted">
          Productos que complementan tu sistema de cultivo.
        </p>
      </header>

      <div className="store-list">
        {items.map((item) => (
          <div key={item.id} className="store-card">
            <p className="store-title">{item.name}</p>

            <p className="store-category">{item.category.toUpperCase()}</p>

            <p className="store-description">{item.description}</p>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="store-link"
              >
                Ver producto →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
