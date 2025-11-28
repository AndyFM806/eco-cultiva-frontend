import { useEffect, useState } from "react";
import {
  listenPlants,
  type Plant,
  getPlantLogs,
  type PlantLog,
} from "../../../services/firebase/cropsService";

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
      date: l.date.slice(5, 10), // formato mm-dd
      height: l.heightCm,
    }));

  return (
    <div className="container">

      {/* HEADER */}
      <header className="header-section">
        <h1 className="title">📊 Analítica del cultivo</h1>
        <p className="muted small">
          Visualiza el crecimiento de tus plantas a lo largo del tiempo.
        </p>
      </header>

      {/* Selección de planta */}
      <section className="space-y">
        <p className="muted tiny">
          Elige una planta con registros de altura:
        </p>

        <div className="chip-list">
          {plants.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlant(p)}
              className={`chip ${selectedPlant?.id === p.id ? "chip-active" : ""}`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </section>

      {/* GRAFICO */}
      <section className="card" style={{ marginTop: "16px" }}>
        {!selectedPlant && (
          <p className="muted small">
            Selecciona una planta para ver su curva de crecimiento.
          </p>
        )}

        {selectedPlant && data.length === 0 && (
          <p className="muted small">
            Esta planta aún no tiene registros. Agrega logs desde Gestión de Cultivos.
          </p>
        )}

        {selectedPlant && data.length > 0 && (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{
                    background: "#111",
                    border: "1px solid #333",
                    color: "#eee",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="height"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
  );
}
