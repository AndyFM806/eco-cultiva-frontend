import { useState } from "react";
import "./AnalyticsPage.css"; // Importar los nuevos estilos

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// --- TIPOS Y DATOS MOCK (sin cambios) ---
export interface Plant {
  id: string;
  name: string;
  type: string;
  sowingDate: string;
  stage: string;
  notes?: string;
}

export interface PlantLog {
  id: string;
  plantId: string;
  date: string;
  notes: string;
  heightCm?: number;
}

const mockPlants: Plant[] = [
  {
    id: "plant-1",
    name: "Tomate Cherry #1",
    type: "Solanum lycopersicum var. cerasiforme",
    sowingDate: new Date(2024, 5, 1).toISOString(),
    stage: "floración",
  },
  {
    id: "plant-2",
    name: "Lechuga Romana",
    type: "Lactuca sativa var. longifolia",
    sowingDate: new Date(2024, 5, 15).toISOString(),
    stage: "vegetativo",
  },
];

const mockLogs: { [key: string]: PlantLog[] } = {
  "plant-1": [
    { id: "log-1-1", plantId: "plant-1", date: new Date(2024, 5, 10).toISOString(), notes: "Primeras hojas verdaderas", heightCm: 5 },
    { id: "log-1-2", plantId: "plant-1", date: new Date(2024, 5, 17).toISOString(), notes: "Crecimiento vigoroso", heightCm: 15 },
    { id: "log-1-3", plantId: "plant-1", date: new Date(2024, 5, 24).toISOString(), notes: "Aparición de primeros botones florales", heightCm: 25 },
    { id: "log-1-4", plantId: "plant-1", date: new Date(2024, 6, 1).toISOString(), notes: "Planta saludable", heightCm: 35 },
    { id: "log-1-5", plantId: "plant-1", date: new Date(2024, 6, 8).toISOString(), notes: "Inicio de cuajado de frutos", heightCm: 48 },
  ],
  "plant-2": [
    { id: "log-2-1", plantId: "plant-2", date: new Date(2024, 5, 22).toISOString(), notes: "Germinación exitosa", heightCm: 3 },
    { id: "log-2-2", plantId: "plant-2", date: new Date(2024, 5, 29).toISOString(), notes: "Desarrollo de hojas", heightCm: 8 },
    { id: "log-2-3", plantId: "plant-2", date: new Date(2024, 6, 6).toISOString(), notes: "Formando un buen cogollo", heightCm: 14 },
  ],
};

// --- COMPONENTE PRINCIPAL ---
export function AnalyticsPage() {
  const [plants] = useState<Plant[]>(mockPlants);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(mockPlants[0]?.id || null);

  const selectedPlantLogs = mockLogs[selectedPlantId || ''] || [];

  const chartData = selectedPlantLogs
    .filter((l) => typeof l.heightCm === "number")
    .map((l) => ({
      date: new Date(l.date).toLocaleDateString("es-ES", { month: "short", day: "numeric" }),
      height: l.heightCm,
    }));

  return (
    <div className="analytics-page-container">
      {/* HEADER */}
      <header className="header-section">
        <h1>📊 Analítica del cultivo</h1>
        <p className="muted">
          Visualiza el crecimiento de tus plantas a lo largo del tiempo.
        </p>
      </header>

      {/* CONTENEDOR DEL GRÁFICO */}
      <div className="chart-container">
        <h2>Curva de Crecimiento (Altura en cm)</h2>

        {/* Selección de planta */}
        <div className="plant-selector">
          {plants.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlantId(p.id)}
              className={`btn-secondary ${selectedPlantId === p.id ? "selected" : ""}`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} unit="cm" />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  borderRadius: "var(--radius)",
                }}
                itemStyle={{ color: "var(--green)" }}
                labelStyle={{ color: "var(--text-muted)", fontWeight: 'normal' }}
              />
              <Line
                type="monotone"
                dataKey="height"
                name="Altura"
                stroke="var(--green)"
                strokeWidth={2}
                dot={{ r: 4, fill: "var(--green)" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-placeholder">
            <span className="icon">🌱</span>
            <p>No hay datos de crecimiento para esta planta todavía.</p>
            <p className="muted small">Añade registros en la sección de Cultivos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
