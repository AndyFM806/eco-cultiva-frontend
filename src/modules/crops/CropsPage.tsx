import { useEffect, useState } from "react";
import {
  type Plant,
  listenPlants,
  addPlant,
  addPlantLog,
} from "../../../services/firebase/cropsService";

export function CropsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    sowingDate: "",
    stage: "semilla",
    notes: "",
  });
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [logHeight, setLogHeight] = useState("");
  const [logNotes, setLogNotes] = useState("");

  useEffect(() => {
    const unsub = listenPlants(setPlants);
    return () => unsub();
  }, []);

  const handleCreatePlant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.sowingDate) return;

    await addPlant(form);

    setForm({
      name: "",
      type: "",
      sowingDate: "",
      stage: "semilla",
      notes: "",
    });
  };

  const handleAddLog = async () => {
    if (!selectedPlant) return;

    await addPlantLog(selectedPlant.id!, {
      heightCm: logHeight ? Number(logHeight) : undefined,
      notes: logNotes,
    });

    setLogHeight("");
    setLogNotes("");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <header className="pb-2 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-emerald-400 flex items-center gap-2">
          🌱 Gestión de Cultivos
        </h1>
        <p className="text-sm text-slate-400">
          Registra tus plantas y monitorea su crecimiento con datos en tiempo real.
        </p>
      </header>

      {/* FORM + LISTA EN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* FORMULARIO */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4 shadow-md shadow-emerald-600/5">
          <h2 className="text-lg font-semibold text-emerald-300">
            Registrar nueva planta
          </h2>

          <form onSubmit={handleCreatePlant} className="space-y-3 text-sm">
            <input
              className="w-full rounded-lg bg-slate-800 px-3 py-2 focus:ring-2 ring-emerald-400 outline-none"
              placeholder="Nombre (ej: Tomate Cherry)"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />

            <input
              className="w-full rounded-lg bg-slate-800 px-3 py-2 focus:ring-2 ring-emerald-400 outline-none"
              placeholder="Tipo (lechuga, tomate, albahaca...)"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            />

            <label className="flex flex-col gap-1 text-xs text-slate-300">
              Fecha de siembra
              <input
                type="date"
                className="rounded-lg bg-slate-800 px-3 py-2 focus:ring-2 ring-emerald-400 outline-none"
                value={form.sowingDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sowingDate: e.target.value }))
                }
              />
            </label>

            <label className="flex flex-col gap-1 text-xs text-slate-300">
              Etapa actual
              <select
                className="rounded-lg bg-slate-800 px-3 py-2 focus:ring-2 ring-emerald-400 outline-none"
                value={form.stage}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stage: e.target.value }))
                }
              >
                <option value="semilla">Semilla</option>
                <option value="plántula">Plántula</option>
                <option value="vegetativo">Vegetativo</option>
                <option value="floración">Floración</option>
                <option value="cosecha">Cosecha</option>
              </select>
            </label>

            <textarea
              className="w-full rounded-lg bg-slate-800 px-3 py-2 focus:ring-2 ring-emerald-400 outline-none"
              placeholder="Notas adicionales"
              rows={3}
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
            />

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold rounded-lg py-2 transition"
            >
              Guardar planta
            </button>
          </form>
        </section>

        {/* LISTA DE PLANTAS */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-emerald-300">
            Mis plantas
          </h2>

          {plants.length === 0 && (
            <p className="text-xs text-slate-500">
              No tienes plantas registradas aún.
            </p>
          )}

          <div className="space-y-2">
            {plants.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlant(p)}
                className={`w-full text-left bg-slate-900/80 p-4 rounded-xl border transition ${
                  selectedPlant?.id === p.id
                    ? "border-emerald-400"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-emerald-200">{p.name}</p>
                    <p className="text-xs text-slate-400">
                      {p.type} • Etapa: {p.stage}
                    </p>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-1 rounded-full">
                    Ver logs
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* LOG PANEL */}
      {selectedPlant && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 shadow-md shadow-emerald-600/5 text-sm">
          <h3 className="font-semibold text-emerald-300 text-lg">
            Registro de crecimiento — {selectedPlant.name}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="number"
              className="rounded-lg bg-slate-800 px-3 py-2 focus:ring-2 ring-emerald-400 outline-none"
              placeholder="Altura (cm)"
              value={logHeight}
              onChange={(e) => setLogHeight(e.target.value)}
            />

            <button
              type="button"
              onClick={handleAddLog}
              className="bg-emerald-500 hover:bg-emerald-600 rounded-lg text-slate-900 font-semibold px-3 transition"
            >
              + Registrar
            </button>
          </div>

          <textarea
            className="w-full rounded-lg bg-slate-800 px-3 py-2 focus:ring-2 ring-emerald-400 outline-none"
            placeholder="Notas (estado, plagas, riego, etc.)"
            rows={3}
            value={logNotes}
            onChange={(e) => setLogNotes(e.target.value)}
          />

          <p className="text-[11px] text-slate-500">
            Este historial aparecerá en la sección de Analítica para visualizar
            progreso y patrones de crecimiento.
          </p>
        </section>
      )}
    </div>
  );
}
