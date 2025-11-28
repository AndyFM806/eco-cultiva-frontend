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
    filter === "all"
      ? videos
      : videos.filter((v) => v.category === filter);

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-emerald-400">
          🎥 Contenido recomendado
        </h1>
        <p className="text-sm text-slate-300">
          Aprende con videos prácticos según tu interés.
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto text-xs">
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
            className={`px-3 py-1 rounded-full border ${
              filter === b.id
                ? "bg-emerald-500 text-slate-950 border-emerald-400"
                : "bg-slate-900 text-slate-300 border-slate-700"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="space-y-2 text-sm">
        {filtered.map((v) => (
          <a
            key={v.id}
            href={v.url}
            target="_blank"
            rel="noreferrer"
            className="block bg-slate-900 rounded-xl p-3 hover:border-emerald-400 border border-slate-800"
          >
            <p className="font-semibold">{v.title}</p>
            <p className="text-[11px] text-slate-400">
              Categoría: {v.category}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
  
}
