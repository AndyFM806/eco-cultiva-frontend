import { useEffect, useState } from "react";
import {
  type Plant,
  listenPlants,
  addPlant,
  addPlantLog,
} from "../../../services/firebase/cropsService";

export function CropsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    sowingDate: "",
    stage: "semilla",
    notes: "",
  });

  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [logHeight, setLogHeight] = useState("");
  const [logNotes, setLogNotes] = useState("");

  useEffect(() => {
    const unsub = listenPlants(setPlants);
    return () => unsub();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.sowingDate) return;

    await addPlant(form);

    setForm({
      name: "",
      type: "",
      sowingDate: "",
      stage: "semilla",
      notes: "",
    });
  };

  const handleAddLog = async () => {
    if (!selectedPlant) return;
    await addPlantLog(selectedPlant.id!, {
      heightCm: logHeight ? Number(logHeight) : undefined,
      notes: logNotes,
    });

    setLogHeight("");
    setLogNotes("");
  };

  return (
    <div className="container">

      {/* HEADER */}
      <h1>🌱 Gestión de Cultivos</h1>
      <p className="muted">Registra tus plantas y monitorea su crecimiento con datos reales.</p>

      {/* FORMULARIO + LISTA */}
      <div className="two-grid" style={{ marginTop: "20px" }}>

        {/* FORMULARIO */}
        <div className="card">
          <h2>Registrar nueva planta</h2>

          <form className="space-y" onSubmit={handleCreate}>
            <div className="field">
              <label className="label">Nombre de la planta</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Tomate Cherry"
              />
            </div>

            <div className="field">
              <label className="label">Tipo</label>
              <input
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                placeholder="Lechuga, tomate, albahaca…"
              />
            </div>

            <div className="field">
              <label className="label">Fecha de siembra</label>
              <input
                type="date"
                value={form.sowingDate}
                onChange={(e) =>
                  setForm({ ...form, sowingDate: e.target.value })
                }
              />
            </div>

            <div className="field">
              <label className="label">Etapa actual</label>
              <select
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
              >
                <option value="semilla">Semilla</option>
                <option value="plántula">Plántula</option>
                <option value="vegetativo">Vegetativo</option>
                <option value="floración">Floración</option>
                <option value="cosecha">Cosecha</option>
              </select>
            </div>

            <div className="field">
              <label className="label">Notas</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Riego, plagas, observaciones…"
              />
            </div>

            <button type="submit" className="btn">Guardar planta</button>
          </form>
        </div>

        {/* LISTA DE PLANTAS */}
        <div>
          <h2>Mis plantas</h2>

          {plants.length === 0 && (
            <p className="muted">No tienes plantas registradas aún.</p>
          )}

          <div className="space-y">
            {plants.map((p) => (
              <div
                key={p.id}
                className={`list-card selectable ${
                  selectedPlant?.id === p.id ? "active" : ""
                }`}
                onClick={() => setSelectedPlant(p)}
              >
                <div className="list-content">
                  <div>
                    <p className="list-title">{p.name}</p>
                    <p className="tiny muted">{p.type} • Etapa: {p.stage}</p>
                  </div>
                  <span className="tag">Ver logs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LOG DE CRECIMIENTO */}
      {selectedPlant && (
        <div className="card" style={{ marginTop: "20px" }}>
          <h2>Registro de crecimiento — {selectedPlant.name}</h2>

          <div className="three-grid">
            <input
              className="small-input"
              type="number"
              placeholder="Altura (cm)"
              value={logHeight}
              onChange={(e) => setLogHeight(e.target.value)}
            />

            <button className="btn" onClick={handleAddLog}>
              + Registrar
            </button>
          </div>

          <textarea
            placeholder="Notas: estado, plagas, riego, etc."
            value={logNotes}
            onChange={(e) => setLogNotes(e.target.value)}
          />

          <p className="tiny muted">
            Este historial aparece en la sección de Analítica 📊
          </p>
        </div>
      )}
    </div>
  );
}
