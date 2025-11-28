import { useEffect, useState } from "react";
import {
  type Environment,
  type EnvironmentMetric,
  listenEnvironments,
  listenMetrics,
  addEnvironment,
  simulateMetric,
} from "../../../services/firebase/cameraService";

export function CameraPage() {
  const [envs, setEnvs] = useState<Environment[]>([]);
  const [selectedEnv, setSelectedEnv] = useState<Environment | null>(null);
  const [metrics, setMetrics] = useState<EnvironmentMetric[]>([]);

  const [form, setForm] = useState({
    name: "",
    targetTempMin: 20,
    targetTempMax: 25,
    targetHumidityMin: 60,
    targetHumidityMax: 75,
    targetLightHours: 16,
    autoModeEnabled: true,
  });

  useEffect(() => {
    const unsub = listenEnvironments(setEnvs);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!selectedEnv?.id) return;
    const unsub = listenMetrics(selectedEnv.id, setMetrics);
    return () => unsub();
  }, [selectedEnv?.id]);

  const handleCreateEnv = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;

    await addEnvironment({
      name: form.name,
      targetTempMin: Number(form.targetTempMin),
      targetTempMax: Number(form.targetTempMax),
      targetHumidityMin: Number(form.targetHumidityMin),
      targetHumidityMax: Number(form.targetHumidityMax),
      targetLightHours: Number(form.targetLightHours),
      autoModeEnabled: form.autoModeEnabled,
    });

    setForm({
      name: "",
      targetTempMin: 20,
      targetTempMax: 25,
      targetHumidityMin: 60,
      targetHumidityMax: 75,
      targetLightHours: 16,
      autoModeEnabled: true,
    });
  };

  const handleSimulate = async () => {
    if (!selectedEnv?.id) return;
    await simulateMetric(selectedEnv.id);
  };

  const lastMetric = metrics[0];

  const isOutOfRange = (value: number, min: number, max: number) =>
    value < min || value > max;

  return (
    <div className="container">

      {/* HEADER */}
      <header className="header-section">
        <h1 className="title">🌿 Cámara de Cultivo (Simulada)</h1>
        <p className="muted small">
          Define parámetros de tu cultivo indoor y simula lecturas reales.
        </p>
      </header>

      {/* FORMULARIO ENTORNO */}
      <section className="card">
        <h2 className="section-title">Nuevo entorno de cultivo</h2>

        <form onSubmit={handleCreateEnv} className="form">
          <input
            className="input"
            placeholder="Nombre del entorno"
            value={form.name}
            onChange={(e) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
          />

          <div className="grid-2">
            <label className="label">
              Temp. min (°C)
              <input
                type="number"
                className="input"
                value={form.targetTempMin}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    targetTempMin: Number(e.target.value),
                  }))
                }
              />
            </label>

            <label className="label">
              Temp. máx (°C)
              <input
                type="number"
                className="input"
                value={form.targetTempMax}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    targetTempMax: Number(e.target.value),
                  }))
                }
              />
            </label>

            <label className="label">
              Humedad min (%)
              <input
                type="number"
                className="input"
                value={form.targetHumidityMin}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    targetHumidityMin: Number(e.target.value),
                  }))
                }
              />
            </label>

            <label className="label">
              Humedad máx (%)
              <input
                type="number"
                className="input"
                value={form.targetHumidityMax}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    targetHumidityMax: Number(e.target.value),
                  }))
                }
              />
            </label>
          </div>

          <label className="label-inline">
            Horas de luz/día
            <input
              type="number"
              className="input small-input"
              value={form.targetLightHours}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  targetLightHours: Number(e.target.value),
                }))
              }
            />
          </label>

          <label className="label-inline">
            <input
              type="checkbox"
              checked={form.autoModeEnabled}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  autoModeEnabled: e.target.checked,
                }))
              }
            />
            Modo automático
          </label>

          <button type="submit" className="btn-primary full">
            Guardar entorno
          </button>
        </form>
      </section>

      {/* LISTA DE ENTORNOS */}
      <section className="section-list">
        <h2 className="section-title">Mis entornos</h2>

        {envs.length === 0 && (
          <p className="muted small">
            Crea un entorno para empezar a simular tu cámara.
          </p>
        )}

        {envs.map((env) => (
          <button
            key={env.id}
            className={`card selectable ${
              selectedEnv?.id === env.id ? "active" : ""
            }`}
            onClick={() => setSelectedEnv(env)}
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

            <button className="btn-secondary small" onClick={handleSimulate}>
              Simular lectura
            </button>
          </div>

          {!lastMetric && (
            <p className="muted small">
              Aún no hay lecturas. Pulsa “Simular lectura”.
            </p>
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
                alert={false}
              />

              <MetricCard
                label="Luz"
                value={`${lastMetric.lightLevel.toFixed(0)} %`}
                alert={false}
              />
            </div>
          )}

          <p className="muted tiny">
            *En una versión real, estos valores provendrían de sensores físicos.
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
