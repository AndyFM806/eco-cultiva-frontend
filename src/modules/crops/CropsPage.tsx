import React, { useState } from "react";
import "./CropsPage.css";

// --- TIPOS Y DATOS MOCK ---
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

const mockPlantsData: Plant[] = [
  { id: "plant-1", name: "Tomate Cherry #1", type: "Solanum lycopersicum var. cerasiforme", sowingDate: new Date(2024, 5, 1).toISOString(), stage: "floración" },
  { id: "plant-2", name: "Lechuga Romana", type: "Lactuca sativa var. longifolia", sowingDate: new Date(2024, 5, 15).toISOString(), stage: "vegetativo" },
  { id: "plant-3", name: "Albahaca Genovesa", type: "Ocimum basilicum", sowingDate: new Date(2024, 6, 2).toISOString(), stage: "cosecha" },
];

const mockLogsData: { [key: string]: PlantLog[] } = {
  "plant-1": [
    { id: "log-1-1", plantId: "plant-1", date: new Date(2024, 5, 10).toISOString(), notes: "Primeras hojas verdaderas", heightCm: 5 },
    { id: "log-1-2", plantId: "plant-1", date: new Date(2024, 5, 17).toISOString(), notes: "Crecimiento vigoroso", heightCm: 15 },
  ],
  "plant-2": [
    { id: "log-2-1", plantId: "plant-2", date: new Date(2024, 5, 22).toISOString(), notes: "Germinación exitosa", heightCm: 3 },
  ],
  "plant-3": [],
};

// --- INTERFACES DE PROPS ---
interface AddPlantSectionProps {
    plants: Plant[];
    setPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
}

interface PlantCardItemProps {
    plant: Plant;
    isSelected: boolean;
    onSelect: () => void;
}

interface PlantDetailViewProps {
    plant: Plant;
    logs: PlantLog[];
    setLogs: React.Dispatch<React.SetStateAction<{ [key: string]: PlantLog[] }>>;
}

interface AddLogFormProps {
    plantId: string;
    setLogs: React.Dispatch<React.SetStateAction<{ [key: string]: PlantLog[] }>>;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

// --- COMPONENTE PRINCIPAL ---
export function CropsPage() {
  const [plants, setPlants] = useState<Plant[]>(mockPlantsData);
  const [logs, setLogs] = useState<{ [key: string]: PlantLog[] }>(mockLogsData);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  const handleSelectPlant = (plantId: string) => {
    setSelectedPlantId(currentId => (currentId === plantId ? null : plantId));
  };

  const selectedPlant = plants.find(p => p.id === selectedPlantId);

  return (
    <div className="crops-page-container">
      <header className="header-section">
        <h1>🌱 Gestión de Cultivos</h1>
        <p className="muted">Registra tus plantas y monitorea su crecimiento.</p>
      </header>

      <AddPlantSection plants={plants} setPlants={setPlants} />

      <div className="plants-list-container">
        <h2>Mis Plantas</h2>
        <div className="plants-grid">
          {plants.map((p) => (
            <PlantCardItem
              key={p.id}
              plant={p}
              isSelected={selectedPlantId === p.id}
              onSelect={() => handleSelectPlant(p.id)}
            />
          ))}
        </div>
      </div>

      {selectedPlant && <PlantDetailView plant={selectedPlant} logs={logs[selectedPlant.id] || []} setLogs={setLogs} />}
    </div>
  );
}

// --- SECCIÓN PARA AÑADIR PLANTAS ---
function AddPlantSection({ plants, setPlants }: AddPlantSectionProps) {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPlant: Plant = {
            id: `plant-${Date.now()}`,
            name, type,
            sowingDate: new Date(date).toISOString(),
            stage: 'germinación',
        };
        setPlants([newPlant, ...plants]);
        setShowForm(false);
        setName(''); setType(''); setDate('');
    };

    if (!showForm) {
        return <button className="form-toggle-button" onClick={() => setShowForm(true)}>+ Añadir Nueva Planta</button>;
    }

    return (
        <div className="form-card">
            <form onSubmit={handleSubmit} className="plant-form">
                <h3>Añadir Nueva Planta</h3>
                <div className="form-fields">
                    <input type="text" placeholder="Nombre (ej. Tomate Cherry)" value={name} onChange={e => setName(e.target.value)} required />
                    <input type="text" placeholder="Especie (ej. Solanum lycopersicum)" value={type} onChange={e => setType(e.target.value)} required />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
                    <button type="submit" className="btn-primary">Guardar</button>
                </div>
            </form>
        </div>
    );
}

// --- TARJETA DE PLANTA ---
function PlantCardItem({ plant, isSelected, onSelect }: PlantCardItemProps) {
  return (
    <div className={`plant-card-item ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="plant-card-header">
        <span className="plant-card-title">{plant.name}</span>
        <span className="tag">{plant.stage}</span>
      </div>
      <div className="plant-card-body">
        <div className="plant-info">
          <span><strong>Especie:</strong> {plant.type}</span>
          <span><strong>Siembra:</strong> {new Date(plant.sowingDate).toLocaleDateString('es-ES')}</span>
        </div>
      </div>
    </div>
  );
}

// --- VISTA DE DETALLES Y REGISTROS ---
function PlantDetailView({ plant, logs, setLogs }: PlantDetailViewProps) {
    const [showLogForm, setShowLogForm] = useState(false);

    return (
        <div className="plant-detail-view">
            <h3>Registros de Crecimiento para {plant.name}</h3>
            {logs.length > 0 ? (
                <div className="logs-list">
                    {logs.map((log) => (
                        <div key={log.id} className="log-item">
                            <div className="log-item-header">
                                <span className="date">{new Date(log.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</span>
                                {log.heightCm && <span>Altura: <strong>{log.heightCm} cm</strong></span>}
                            </div>
                            <p>{log.notes}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-logs-message">No hay registros para esta planta todavía.</div>
            )}
            {showLogForm ? (
                <AddLogForm plantId={plant.id} setLogs={setLogs} setShowForm={setShowLogForm} />
            ) : (
                <button className="form-toggle-button" onClick={() => setShowLogForm(true)}>+ Añadir Registro</button>
            )}
        </div>
    );
}

// --- FORMULARIO PARA AÑADIR REGISTRO ---
function AddLogForm({ plantId, setLogs, setShowForm }: AddLogFormProps) {
    const [notes, setNotes] = useState('');
    const [height, setHeight] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLog: PlantLog = {
            id: `log-${Date.now()}`,
            plantId,
            date: new Date(date).toISOString(),
            notes,
            heightCm: height ? parseFloat(height) : undefined,
        };
        
        setLogs(prevLogs => ({
            ...prevLogs,
            [plantId]: [newLog, ...(prevLogs[plantId] || [])]
        }));
        
        setShowForm(false);
    };

    return (
        <div className="form-card" style={{ marginTop: '16px' }}>
             <form onSubmit={handleSubmit} className="log-form">
                <h3>Nuevo Registro</h3>
                <div className="form-fields">
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                    <input type="number" placeholder="Altura (cm, opcional)" value={height} onChange={e => setHeight(e.target.value)} />
                    <textarea placeholder="Notas sobre el crecimiento, riego, etc." value={notes} onChange={e => setNotes(e.target.value)} required />
                </div>
                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
                    <button type="submit" className="btn-primary">Guardar Registro</button>
                </div>
            </form>
        </div>
    );
}
