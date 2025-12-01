import { useState, useEffect } from 'react';
import './CameraPage.css';

// --- TIPOS Y DATOS MOCK ---
interface Metric {
  title: string;
  icon: string;
  value: number;
  unit: string;
  min: number;
  max: number;
}

const initialMetrics: Metric[] = [
  { title: "Temperatura", icon: "🌡️", value: 23.5, unit: "°C", min: 18, max: 26 },
  { title: "Humedad Ambiental", icon: "💧", value: 65, unit: "%", min: 60, max: 70 },
  { title: "Intensidad de Luz", icon: "💡", value: 14500, unit: "lux", min: 10000, max: 20000 },
  { title: "Humedad del Sustrato", icon: "🌱", value: 55, unit: "%", min: 50, max: 65 },
];

// --- LÓGICA DEL ASISTENTE DE IA ---
function getAIInterpretation(metrics: Metric[]): string {
    const temp = metrics.find(m => m.title === "Temperatura");
    const humidity = metrics.find(m => m.title === "Humedad Ambiental");
    const light = metrics.find(m => m.title === "Intensidad de Luz");
    const soilMoisture = metrics.find(m => m.title === "Humedad del Sustrato");

    if (!temp || !humidity || !light || !soilMoisture) return "Analizando datos...";

    const tempStatus = temp.value < temp.min ? 'baja' : temp.value > temp.max ? 'alta' : 'óptima';
    const soilStatus = soilMoisture.value < soilMoisture.min ? 'seco' : soilMoisture.value > soilMoisture.max ? 'muy húmedo' : 'húmedo';

    let advice = "";

    if (tempStatus === 'baja') advice += `La <strong>temperatura es baja</strong>, considera aumentar la calefacción. `;
    if (tempStatus === 'alta') advice += `La <strong>temperatura es alta</strong>, considera mejorar la ventilación. `;

    if (soilStatus === 'seco') advice += `El <strong>sustrato está seco</strong>, es momento de regar. `;
    if (soilStatus === 'muy húmedo') advice += `El <strong>sustrato está muy húmedo</strong>, evita regar por ahora. `;

    if (advice) return advice;
    
    return "Las condiciones son <strong>óptimas</strong>. ¡Tus plantas están en un entorno ideal!";
}


// --- COMPONENTE PRINCIPAL ---
export function CameraPage() {
  const [metrics, setMetrics] = useState<Metric[]>(initialMetrics);
  const [aiAdvice, setAiAdvice] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const newMetrics = metrics.map(metric => {
        let newValue = metric.value + (Math.random() - 0.5) * (metric.max - metric.min) * 0.05;
        newValue = Math.max(metric.min - 5, Math.min(metric.max + 5, newValue)); // Permitir que exceda un poco los límites
        return { ...metric, value: parseFloat(newValue.toFixed(1)) };
      });
      
      setMetrics(newMetrics);
      setAiAdvice(getAIInterpretation(newMetrics));

    }, 2000);

    return () => clearInterval(interval); 
  }, [metrics]);

  return (
    <div className="camera-page-container">
      <header className="header-section">
        <h1>Monitor de la Cámara de Cultivo</h1>
        <p className="muted">
          Visualiza en tiempo real las condiciones y métricas de tu cultivo automatizado.
        </p>
      </header>

      <div className="metrics-grid">
        {metrics.map(metric => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </div>

      <AiAssistantCard advice={aiAdvice} />
    </div>
  );
}

// --- COMPONENTES SECUNDARIOS ---
interface MetricCardProps {
  metric: Metric;
}

function MetricCard({ metric }: MetricCardProps) {
  const { title, icon, value, unit, min, max } = metric;
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const status = value < min ? 'Bajo' : value > max ? 'Alto' : 'Óptimo';

  return (
    <div className="metric-card">
      <div className="metric-header">
        <span className="icon">{icon}</span>
        <span className="title">{title}</span>
      </div>
      <div className="metric-value">
        {value}
        <span className="unit">{unit}</span>
      </div>
      <div className="status-bar">
        <div className="status-bar-fill" style={{ width: `${percentage}%` }} />
      </div>
      <div className="status-indicator">{status}</div>
    </div>
  );
}

interface AiAssistantCardProps {
    advice: string;
}

function AiAssistantCard({ advice }: AiAssistantCardProps) {
    return (
        <div className="ai-assistant-card">
            <div className="header">
                <span className="icon">🤖</span>
                <span>Asistente de Cultivo</span>
            </div>
            <div className="content">
                <p dangerouslySetInnerHTML={{ __html: advice || 'Analizando datos...' }} />
            </div>
        </div>
    );
}
