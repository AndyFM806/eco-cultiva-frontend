import { useState, useEffect } from 'react';
import './EnvironmentsPage.css'; // Importar los nuevos estilos

// --- TIPOS Y DATOS MOCK ---
interface Environment {
  id: string;
  name: string;
  optimalTemp: string;
  optimalHumidity: string;
}

const mockEnvironments: Environment[] = [
  { id: 'env-1', name: 'Cultivo de Tomates Cherry', optimalTemp: '21–26°C', optimalHumidity: '65–75%' },
  { id: 'env-2', name: 'Germinación de Lechugas', optimalTemp: '18–22°C', optimalHumidity: '70–80%' },
];

const initialSensorData = {
  temperature: 23.4,
  airHumidity: 72,
  substrateHumidity: 60,
  light: 93,
};

// --- COMPONENTE PRINCIPAL ---
export function EnvironmentsPage() {
  const [environments] = useState<Environment[]>(mockEnvironments);
  const [sensorData, setSensorData] = useState(initialSensorData);

  // Simular actualización de sensores
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prevData => ({
        temperature: parseFloat((prevData.temperature + (Math.random() - 0.5) * 0.2).toFixed(1)),
        airHumidity: Math.round(prevData.airHumidity + (Math.random() - 0.5) * 1),
        substrateHumidity: Math.round(prevData.substrateHumidity + (Math.random() - 0.5) * 1),
        light: Math.round(prevData.light + (Math.random() - 0.5) * 2),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="environments-page-container">
      {/* HEADER */}
      <header className="header-section">
        <h1>🏡 Mis Entornos</h1>
        <p className="muted">Monitoriza las condiciones de tus cultivos en tiempo real.</p>
      </header>

      {/* SECCIÓN DE ENTORNOS */}
      <div className="section-card">
        <h2>Entornos Guardados</h2>
        <div className="environments-grid">
          {environments.map(env => (
            <div key={env.id} className="env-card">
              <div className="env-card-header">{env.name}</div>
              <div className="env-card-body">
                <span>Temp óptima: {env.optimalTemp}</span> • <span>Humedad {env.optimalHumidity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN DE SENSORES */}
      <div className="section-card">
        <h2>Sensores (simulados) — Cultivo de Tomates Cherry</h2>
        <div className="sensors-grid">
          <SensorCard icon="🌡️" label="Temperatura" value={sensorData.temperature} unit="°C" iconClass="icon-temp" />
          <SensorCard icon="💧" label="Humedad aire" value={sensorData.airHumidity} unit="%" iconClass="icon-humidity" />
          <SensorCard icon="🌱" label="Humedad sustrato" value={sensorData.substrateHumidity} unit="%" iconClass="icon-soil" />
          <SensorCard icon="☀️" label="Luz" value={sensorData.light} unit="%" iconClass="icon-light" />
        </div>
        <p className="update-notice">
          *Los datos se actualizan automáticamente cada 2 segundos para simular un entorno real.
        </p>
      </div>
    </div>
  );
}

// --- COMPONENTE DE TARJETA DE SENSOR ---
interface SensorCardProps {
  icon: string;
  label: string;
  value: number;
  unit: string;
  iconClass: string;
}

function SensorCard({ icon, label, value, unit, iconClass }: SensorCardProps) {
  return (
    <div className="sensor-card">
      <div className="sensor-label">{label}</div>
      <div className={`sensor-value ${iconClass}`}>
        <span className="sensor-icon">{icon}</span>
        {value}
        <span className="unit">{unit}</span>
      </div>
    </div>
  );
}
