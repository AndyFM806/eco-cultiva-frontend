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
    alert("Registro agregado");
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-emerald-400">
          🌱 Gestión de Cultivos
        </h1>
        <p className="text-sm text-slate-300">
          Registra tus plantas y lleva un seguimiento de su crecimiento.
        </p>
      </header>

      {/* Formulario nueva planta */}
      <section className="bg-slate-900 rounded-xl p-3 space-y-3">
        <h2 className="text-sm font-semibold text-emerald-300">
          Registrar nueva planta
        </h2>
        <form onSubmit={handleCreatePlant} className="space-y-2 text-sm">
          <input
            className="w-full rounded-lg bg-slate-800 px-3 py-2"
            placeholder="Nombre de la planta (ej: Tomate balcón)"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="w-full rounded-lg bg-slate-800 px-3 py-2"
            placeholder="Tipo (tomate, lechuga, albahaca...)"
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
          />
          <label className="flex flex-col gap-1 text-xs text-slate-300">
            Fecha de siembra
            <input
              type="date"
              className="rounded-lg bg-slate-800 px-3 py-2"
              value={form.sowingDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, sowingDate: e.target.value }))
              }
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-300">
            Etapa
            <select
              className="rounded-lg bg-slate-800 px-3 py-2"
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
            className="w-full rounded-lg bg-slate-800 px-3 py-2"
            placeholder="Notas (opcional)"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          />
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg py-2 mt-1"
          >
            Guardar planta
          </button>
        </form>
      </section>

      {/* Lista de plantas */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-emerald-300">
          Mis plantas
        </h2>
        {plants.length === 0 && (
          <p className="text-xs text-slate-400">
            Aún no tienes plantas registradas.
          </p>
        )}
        <div className="space-y-2">
          {plants.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlant(p)}
              className={`w-full text-left bg-slate-900 rounded-xl p-3 text-sm border ${
                selectedPlant?.id === p.id
                  ? "border-emerald-400"
                  : "border-slate-800"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-slate-400">
                    {p.type} • Etapa: {p.stage}
                  </p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-1 rounded-full">
                  Seguimiento
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Panel rápido de log de crecimiento */}
      {selectedPlant && (
        <section className="bg-slate-900 rounded-xl p-3 space-y-2 text-sm">
          <h3 className="font-semibold text-emerald-300">
            Historial rápido: {selectedPlant.name}
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              className="flex-1 rounded-lg bg-slate-800 px-3 py-2"
              placeholder="Altura (cm)"
              value={logHeight}
              onChange={(e) => setLogHeight(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddLog}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg px-3"
            >
              + Log
            </button>
          </div>
          <textarea
            className="w-full rounded-lg bg-slate-800 px-3 py-2"
            placeholder="Notas (plagas, estado, etc.)"
            value={logNotes}
            onChange={(e) => setLogNotes(e.target.value)}
          />
          <p className="text-[11px] text-slate-400">
            *Los logs se usarán en la sección de Analítica para ver
            crecimiento y patrones.
          </p>
        </section>
      )}
    </div>
  );
}
