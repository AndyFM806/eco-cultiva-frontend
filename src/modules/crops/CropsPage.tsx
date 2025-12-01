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


// Mock data for demonstration
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
  {
    id: "plant-3",
    name: "Albahaca Genovesa",
    type: "Ocimum basilicum",
    sowingDate: new Date(2024, 6, 2).toISOString(),
    stage: "cosecha",
  },
];

const mockLogs: { [key: string]: PlantLog[] } = {
  "plant-1": [
    { id: "log-1-1", plantId: "plant-1", date: new Date(2024, 5, 10).toISOString(), notes: "Primeras hojas verdaderas", heightCm: 5 },
    { id: "log-1-2", plantId: "plant-1", date: new Date(2024, 5, 17).toISOString(), notes: "Crecimiento vigoroso", heightCm: 15 },
    { id: "log-1-3", plantId: "plant-1", date: new Date(2024, 5, 24).toISOString(), notes: "Aparición de primeros botones florales", heightCm: 25 },
  ],
  "plant-2": [
    { id: "log-2-1", plantId: "plant-2", date: new Date(2024, 5, 22).toISOString(), notes: "Germinación exitosa", heightCm: 3 },
    { id: "log-2-2", plantId: "plant-2", date: new Date(2024, 5, 29).toISOString(), notes: "Desarrollo de hojas", heightCm: 8 },
  ],
    "plant-3": [
    { id: "log-3-1", plantId: "plant-3", date: new Date(2024, 6, 10).toISOString(), notes: "Cosechando hojas para pesto. ¡Qué aroma!", heightCm: 18 },
  ],
};

export function CropsPage() {
  const [plants] = useState<Plant[]>(mockPlants);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  return (
    <div className="container">
      <header className="header-section">
        <h1 className="title">🌱 Gestión de Cultivos</h1>
        <p className="muted small">Registra tus plantas y monitorea su crecimiento.</p>
      </header>
      <section className="section-list">
        <h2 className="section-title">Mis plantas</h2>
        <div className="space-y">
          {plants.map((p) => (
            <div
              key={p.id}
              className="card selectable"
              onClick={() => setSelectedPlant(p)}
            >
              <div className="item-title">{p.name} <span className="tag">{p.stage}</span></div>
              <p className="muted small">
                {p.type} • Sembrado el {new Date(p.sowingDate).toLocaleDateString('es-ES')}
              </p>
            </div>
          ))}
        </div>
      </section>
      {selectedPlant && (
        <section className="card" style={{ marginTop: "20px" }}>
          <h2 className="section-title">Historial de: {selectedPlant.name}</h2>
          <div className="space-y" style={{marginTop: '16px'}}>
            {(mockLogs[selectedPlant.id!] || []).map(log => (
              <div key={log.id} className="log-entry">
                <p className="log-date">{new Date(log.date).toLocaleDateString('es-ES', {day: 'numeric', month: 'long'})}</p>
                <p className="log-notes">{log.notes}</p>
                {log.heightCm && <p className="log-height">Altura registrada: {log.heightCm} cm</p>}
              </div>
            ))}
            {(mockLogs[selectedPlant.id!] || []).length === 0 && (
              <p className="muted small">No hay registros para esta planta todavía.</p>
            )}
          </div>
          <p className="muted tiny" style={{marginTop: '16px'}}>
            * Para añadir un nuevo registro, hazlo desde el formulario principal.
          </p>
        </section>
      )}
    </div>
  );
}
