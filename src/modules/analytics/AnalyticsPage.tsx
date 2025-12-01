import { useState } from "react";

// Local type definitions to fix compilation errors
export interface Plant {
  id: string;
  name: string;
  type: string;        // Renamed from species
  sowingDate: string;  // Renamed from plantedAt
  stage: string;       // Renamed from status
  notes?: string;
}

export interface PlantLog {
  id: string;
  plantId: string;
  date: string;
  notes: string;
  heightCm?: number;
}


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Mock data for demonstration
const mockPlants: Plant[] = [
  {
    id: "plant-1",
    name: "Tomate Cherry #1",
    type: "Solanum lycopersicum var. cerasiforme",
    sowingDate: new Date(2024, 5, 1).toISOString(), // June 1, 2024
    stage: "floración",
  },
  {
    id: "plant-2",
    name: "Lechuga Romana",
    type: "Lactuca sativa var. longifolia",
    sowingDate: new Date(2024, 5, 15).toISOString(), // June 15, 2024
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


export function AnalyticsPage() {
  const [plants] = useState<Plant[]>(mockPlants);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(mockPlants[0]);
  const [logs] = useState<PlantLog[]>(mockLogs[mockPlants[0].id!]);

  const data = logs
    .filter((l) => typeof l.heightCm === "number")
    .map((l) => ({
      date: new Date(l.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
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
          Elige una planta para ver su progreso:
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
         <h2 className="section-title" style={{marginBottom: '24px'}}>Curva de Crecimiento (Altura en cm)</h2>

        {selectedPlant && data.length > 0 && (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#aaa" fontSize={12} />
                <YAxis stroke="#aaa" fontSize={12} unit="cm" />
                <Tooltip
                  contentStyle={{
                    background: "#111",
                    border: "1px solid #333",
                    color: "#eee",
                    fontSize: "14px",
                    borderRadius: '8px',
                  }}
                   itemStyle={{ color: '#4ade80' }}
                  labelStyle={{ color: '#aaa', fontWeight: 'bold' }}
                />
                <Line
                  type="monotone"
                  dataKey="height"
                  name="Altura"
                  stroke="#4ade80"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#4ade80' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
  );
}
