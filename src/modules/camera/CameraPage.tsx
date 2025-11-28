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
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-emerald-400">
          🌿 Cámara de Cultivo (Simulada)
        </h1>
        <p className="text-sm text-slate-300">
          Define parámetros de tu cultivo indoor y simula lecturas de sensores.
        </p>
      </header>

      {/* Crear entorno */}
      <section className="bg-slate-900 rounded-xl p-3 space-y-2 text-sm">
        <h2 className="font-semibold text-emerald-300">
          Nuevo entorno de cultivo
        </h2>
        <form onSubmit={handleCreateEnv} className="space-y-2">
          <input
            className="w-full rounded-lg bg-slate-800 px-3 py-2"
            placeholder="Nombre (ej: Indoor tomates)"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="flex flex-col gap-1">
              Temp. min (°C)
              <input
                type="number"
                className="rounded-lg bg-slate-800 px-2 py-1"
                value={form.targetTempMin}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    targetTempMin: Number(e.target.value),
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-1">
              Temp. máx (°C)
              <input
                type="number"
                className="rounded-lg bg-slate-800 px-2 py-1"
                value={form.targetTempMax}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    targetTempMax: Number(e.target.value),
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-1">
              Humedad min (%)
              <input
                type="number"
                className="rounded-lg bg-slate-800 px-2 py-1"
                value={form.targetHumidityMin}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    targetHumidityMin: Number(e.target.value),
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-1">
              Humedad máx (%)
              <input
                type="number"
                className="rounded-lg bg-slate-800 px-2 py-1"
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
          <label className="flex items-center gap-2 text-xs">
            <span>Horas de luz/día</span>
            <input
              type="number"
              className="rounded-lg bg-slate-800 px-2 py-1 w-16"
              value={form.targetLightHours}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  targetLightHours: Number(e.target.value),
                }))
              }
            />
          </label>
          <label className="flex items-center gap-2 text-xs">
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
            <span>Modo automático (simulado)</span>
          </label>
          <button
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg py-2"
            type="submit"
          >
            Guardar entorno
          </button>
        </form>
      </section>

      {/* Lista de entornos */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-emerald-300">
          Mis entornos
        </h2>
        <div className="space-y-2">
          {envs.map((env) => (
            <button
              key={env.id}
              onClick={() => setSelectedEnv(env)}
              className={`w-full text-left bg-slate-900 rounded-xl p-3 text-sm border ${
                selectedEnv?.id === env.id
                  ? "border-emerald-400"
                  : "border-slate-800"
              }`}
            >
              <p className="font-semibold">{env.name}</p>
              <p className="text-xs text-slate-400">
                Temp óptima: {env.targetTempMin}–{env.targetTempMax}°C • Humedad{" "}
                {env.targetHumidityMin}–{env.targetHumidityMax}%
              </p>
            </button>
          ))}
          {envs.length === 0 && (
            <p className="text-xs text-slate-400">
              Crea un entorno para empezar a simular tu cámara de cultivo.
            </p>
          )}
        </div>
      </section>

      {/* Métricas en tiempo (simulado) */}
      {selectedEnv && (
        <section className="bg-slate-900 rounded-xl p-3 space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-emerald-300">
              Sensores (simulados) – {selectedEnv.name}
            </h3>
            <button
              onClick={handleSimulate}
              className="text-xs bg-emerald-500 text-slate-950 px-2 py-1 rounded-lg"
            >
              Simular lectura
            </button>
          </div>

          {!lastMetric && (
            <p className="text-xs text-slate-400">
              Aún no hay lecturas. Pulsa “Simular lectura”.
            </p>
          )}

          {lastMetric && (
            <div className="grid grid-cols-2 gap-2 text-xs">
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

          <p className="text-[11px] text-slate-400">
            *En una versión con hardware real, estos valores vendrían de
            sensores físicos y podrían activar riego / ventilación.
          </p>
        </section>
      )}
    </div>
  );
}

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
    <div
      className={`rounded-lg px-3 py-2 border ${
        alert ? "border-red-500 bg-red-500/10" : "border-slate-800 bg-slate-800"
      }`}
    >
      <p className="text-[11px] text-slate-300">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
      {alert && (
        <p className="text-[10px] text-red-300 mt-1">
          Fuera de rango óptimo ⚠️
        </p>
      )}
    </div>
  );
}
