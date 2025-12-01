import { useEffect, useState } from "react";
import type {
  Environment,
  EnvironmentMetric,
} from "../../../services/firebase/cameraService";

// Mock data for demonstration
const mockEnvironments: Environment[] = [
  {
    id: "mock-env-1",
    name: "Cultivo de Tomates Cherry",
    targetTempMin: 21,
    targetTempMax: 26,
    targetHumidityMin: 65,
    targetHumidityMax: 75,
    targetLightHours: 18,
    autoModeEnabled: true,
    userId: "mock-user",
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-env-2",
    name: "Germinación de Lechugas",
    targetTempMin: 18,
    targetTempMax: 22,
    targetHumidityMin: 70,
    targetHumidityMax: 80,
    targetLightHours: 14,
    autoModeEnabled: true,
    userId: "mock-user",
    createdAt: new Date().toISOString(),
  },
];

const mockMetrics: { [key: string]: EnvironmentMetric[] } = {
  "mock-env-1": [
    {
      id: "metric-1",
      environmentId: "mock-env-1",
      timestamp: new Date().toISOString(),
      temperature: 23.5,
      airHumidity: 72,
      soilMoisture: 60,
      lightLevel: 95,
    },
  ],
  "mock-env-2": [
    {
      id: "metric-2",
      environmentId: "mock-env-2",
      timestamp: new Date().toISOString(),
      temperature: 20.1,
      airHumidity: 75,
      soilMoisture: 68,
      lightLevel: 80,
    },
  ],
};

export function CameraPage() {
  const [envs] = useState<Environment[]>(mockEnvironments);
  const [selectedEnv, setSelectedEnv] = useState<Environment | null>(
    mockEnvironments[0]
  );
  const [metrics, setMetrics] = useState<EnvironmentMetric[]>(
    mockMetrics[mockEnvironments[0].id!]
  );

  useEffect(() => {
    if (!selectedEnv?.id) return;

    // Simulate real-time data for the selected environment
    const interval = setInterval(() => {
      setMetrics((prevMetrics) => {
        const lastMetric = prevMetrics[0] || mockMetrics[selectedEnv.id!][0];
        const newMetric: EnvironmentMetric = {
          id: `metric-${Date.now()}`,
          environmentId: selectedEnv.id!,
          timestamp: new Date().toISOString(),
          temperature: lastMetric.temperature + (Math.random() - 0.5) * 0.5,
          airHumidity: lastMetric.airHumidity + (Math.random() - 0.5) * 2,
          soilMoisture: lastMetric.soilMoisture + (Math.random() - 0.5) * 1,
          lightLevel: lastMetric.lightLevel + (Math.random() - 0.5) * 5,
        };
        return [newMetric, ...prevMetrics];
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [selectedEnv?.id]);

  const lastMetric = metrics[0];

  const isOutOfRange = (value: number, min: number, max: number) =>
    value < min || value > max;

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header-section">
        <h1 className="title">🌿 Cámara de Cultivo (Simulación)</h1>
        <p className="muted small">
          Visualización en tiempo real de las métricas del cultivo.
        </p>
      </header>

      {/* LISTA DE ENTORNOS */}
      <section className="section-list">
        <h2 className="section-title">Mis entornos</h2>

        {envs.map((env) => (
          <button
            key={env.id}
            className={`card selectable ${
              selectedEnv?.id === env.id ? "active" : ""
            }`}
            onClick={() => {
              setSelectedEnv(env);
              setMetrics(mockMetrics[env.id!] || []);
            }}
          >
            <p className="item-title">{env.name}</p>
            <p className="muted small">
              Temp óptima: {env.targetTempMin}–{env.targetTempMax}°C •
              Humedad {env.targetHumidityMin}–{env.targetHumidityMax}%
            </p>
          </button>
        ))}
      </section>

      {/* METRICAS */}
      {selectedEnv && (
        <section className="card">
          <div className="row-between">
            <h3 className="section-title">
              Sensores (simulados) — {selectedEnv.name}
            </h3>
          </div>

          {!lastMetric && (
            <p className="muted small">Generando datos de simulación...</p>
          )}

          {lastMetric && (
            <div className="grid-2">
              <MetricCard
                label="Temperatura"
                value={`${lastMetric.temperature.toFixed(1)} °C`}
                alert={isOutOfRange(
                  lastMetric.temperature,
                  selectedEnv.targetTempMin,
                  selectedEnv.targetTempMax
                )}
              />

              <MetricCard
                label="Humedad aire"
                value={`${lastMetric.airHumidity.toFixed(0)} %`}
                alert={isOutOfRange(
                  lastMetric.airHumidity,
                  selectedEnv.targetHumidityMin,
                  selectedEnv.targetHumidityMax
                )}
              />

              <MetricCard
                label="Humedad sustrato"
                value={`${lastMetric.soilMoisture.toFixed(0)} %`}
                alert={false} // No alert for soil moisture in this mock
              />

              <MetricCard
                label="Luz"
                value={`${lastMetric.lightLevel.toFixed(0)} %`}
                alert={lastMetric.lightLevel < 60} // Example alert for light
              />
            </div>
          )}
           <p className="muted tiny">
            *Los datos se actualizan automáticamente cada 2 segundos para simular un entorno real.
          </p>
        </section>
      )}
    </div>
  );
}

/* METRIC CARD PURE CSS VERSION */
function MetricCard({
  label,
  value,
  alert,
}: {
  label: string;
  value: string;
  alert: boolean;
}) {
  return (
    <div className={`metric-card ${alert ? "alert" : ""}`}>
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
      {alert && <p className="metric-alert">Fuera de rango ⚠️</p>}
    </div>
  );
}
