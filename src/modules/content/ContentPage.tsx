import React from "react";

interface Video {
  id: string;
  title: string;
  url: string;
  category: "primeros-pasos" | "hidroponia" | "plagas" | "compost" | "tomates";
  stage?: "semilla" | "plántula" | "vegetativo" | "floración" | "cosecha";
}

const videos: Video[] = [
  {
    id: "1",
    title: "Primer huerto en macetas para principiantes",
    url: "https://www.youtube.com/watch?v=XXXXXXXX",
    category: "primeros-pasos",
  },
  {
    id: "2",
    title: "Introducción a la hidroponía casera",
    url: "https://www.youtube.com/watch?v=YYYYYYYY",
    category: "hidroponia",
  },
  {
    id: "3",
    title: "Control biológico de plagas en huertos urbanos",
    url: "https://www.youtube.com/watch?v=ZZZZZZZZ",
    category: "plagas",
  },
  {
    id: "4",
    title: "Cómo hacer compost en casa paso a paso",
    url: "https://www.youtube.com/watch?v=AAAAAAA",
    category: "compost",
  },
  {
    id: "5",
    title: "Guía completa para cultivar tomates en maceta",
    url: "https://www.youtube.com/watch?v=BBBBBBB",
    category: "tomates",
  },
];

export function ContentPage() {
  const [filter, setFilter] = React.useState<Video["category"] | "all">("all");

  const filtered =
    filter === "all" ? videos : videos.filter((v) => v.category === filter);

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header-section">
        <h1 className="title">🎥 Contenido recomendado</h1>
        <p className="muted small">
          Aprende con videos prácticos según tu interés.
        </p>
      </header>

      {/* BOTONES DE FILTRO */}
      <div className="tags-row">
        {[
          { id: "all", label: "Todos" },
          { id: "primeros-pasos", label: "Primeros pasos" },
          { id: "tomates", label: "Tomates" },
          { id: "hidroponia", label: "Hidroponía" },
          { id: "plagas", label: "Plagas" },
          { id: "compost", label: "Compost" },
        ].map((b) => (
          <button
            key={b.id}
            onClick={() => setFilter(b.id as any)}
            className={`btn-tag ${filter === b.id ? "active" : ""}`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* LISTA DE VIDEOS */}
      <div className="list">
        {filtered.map((v) => (
          <a key={v.id} href={v.url} target="_blank" className="list-card">
            <p className="list-title">{v.title}</p>
            <p className="muted tiny">Categoría: {v.category}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
