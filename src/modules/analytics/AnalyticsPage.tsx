import { useEffect, useState } from "react";
import { listenPlants, type Plant, getPlantLogs, type PlantLog } from "../../../services/firebase/cropsService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export function AnalyticsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [logs, setLogs] = useState<PlantLog[]>([]);

  useEffect(() => {
    const unsub = listenPlants(setPlants);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!selectedPlant?.id) return;
    getPlantLogs(selectedPlant.id).then(setLogs);
  }, [selectedPlant?.id]);

  const data = logs
    .filter((l) => typeof l.heightCm === "number")
    .map((l) => ({
      date: l.date.slice(5, 10), // mm-dd
      height: l.heightCm,
    }));

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-emerald-400">
          📊 Analítica del cultivo
        </h1>
        <p className="text-sm text-slate-300">
          Visualiza el crecimiento de tus plantas a lo largo del tiempo.
        </p>
      </header>

      <section className="space-y-2">
        <p className="text-xs text-slate-400 mb-1">
          Elige una planta con registros de altura:
        </p>
        <div className="flex gap-2 overflow-x-auto text-xs">
          {plants.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlant(p)}
              className={`px-3 py-1 rounded-full border ${
                selectedPlant?.id === p.id
                  ? "bg-emerald-500 text-slate-950 border-emerald-400"
                  : "bg-slate-900 text-slate-200 border-slate-700"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 rounded-xl p-3">
        {!selectedPlant && (
          <p className="text-xs text-slate-400">
            Selecciona una planta para ver su curva de crecimiento.
          </p>
        )}

        {selectedPlant && data.length === 0 && (
          <p className="text-xs text-slate-400">
            Esta planta aún no tiene registros de altura. Agrega logs desde
            el módulo de Gestión de Cultivos.
          </p>
        )}

        {selectedPlant && data.length > 0 && (
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="height" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
  );
}
