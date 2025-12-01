import { useEffect, useState } from "react";
import {
  getUserProfile,
  saveUserProfile,
  type UserProfile,
} from "../../../services/firebase/profileService";
import { generateDemoData } from "../../../services/firebase/demoData";


export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [form, setForm] = useState({
    displayName: "",
    experienceLevel: "principiante",
    preferredClimates: "",
  });

  useEffect(() => {
    async function load() {
      const data = await getUserProfile();
      if (data) {
        setProfile(data);
        setForm({
          displayName: data.displayName,
          experienceLevel: data.experienceLevel,
          preferredClimates: data.preferredClimates.join(", "),
        });
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    if (!form.displayName) {
      alert("Debes ingresar un nombre.");
      return;
    }

    await saveUserProfile({
      userId: profile?.userId ?? "demo-user",
      displayName: form.displayName,
      experienceLevel: form.experienceLevel as UserProfile["experienceLevel"],
      preferredClimates: form.preferredClimates
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c.length > 0),
    });

    alert("Perfil guardado ✔");
  };

  return (
    <div className="container">
      <h1>⚙ Perfil del usuario</h1>
      <p className="muted">Actualiza tus preferencias y datos personales.</p>

      <div className="card">

        <div className="field">
          <span className="label">Nombre:</span>
          <input
            className=""
            value={form.displayName}
            onChange={(e) =>
              setForm((f) => ({ ...f, displayName: e.target.value }))
            }
          />
        </div>

        <div className="field">
          <span className="label">Nivel de experiencia:</span>
          <select
            className=""
            value={form.experienceLevel}
            onChange={(e) =>
              setForm((f) => ({ ...f, experienceLevel: e.target.value }))
            }
          >
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        <div className="field">
          <span className="label">Climas preferidos (separados por coma):</span>
          <input
            className=""
            value={form.preferredClimates}
            onChange={(e) =>
              setForm((f) => ({ ...f, preferredClimates: e.target.value }))
            }
          />
        </div>

        <button onClick={handleSave} className="btn">
          Guardar cambios
        </button>
        <button
  onClick={generateDemoData}
  className="btn-primary full"
  style={{ marginTop: "20px", background: "#6366f1" }}
>
  Cargar datos DEMO (solo yo)
</button>


      </div>
    </div>
  );
}
