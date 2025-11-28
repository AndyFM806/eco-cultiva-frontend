import { useEffect, useState } from "react";
import {
  getUserProfile,
  saveUserProfile,
  type UserProfile,
} from "../../../services/firebase/profileService";

export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [form, setForm] = useState({
    displayName: "",
    experienceLevel: "principiante",
    preferredClimates: "",
  });

  // Cargar perfil al entrar
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

  // Guardar perfil
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
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-emerald-400">⚙ Perfil del usuario</h1>

      <div className="bg-slate-900 p-4 rounded-xl space-y-3 text-sm">
        <label className="flex flex-col gap-1">
          Nombre:
          <input
            className="bg-slate-800 rounded-lg px-3 py-2"
            value={form.displayName}
            onChange={(e) =>
              setForm((f) => ({ ...f, displayName: e.target.value }))
            }
          />
        </label>

        <label className="flex flex-col gap-1">
          Nivel de experiencia:
          <select
            className="bg-slate-800 rounded-lg px-3 py-2"
            value={form.experienceLevel}
            onChange={(e) =>
              setForm((f) => ({ ...f, experienceLevel: e.target.value }))
            }
          >
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          Climas preferidos (separados por coma):
          <input
            className="bg-slate-800 rounded-lg px-3 py-2"
            value={form.preferredClimates}
            onChange={(e) =>
              setForm((f) => ({ ...f, preferredClimates: e.target.value }))
            }
          />
        </label>

        <button
          onClick={handleSave}
          className="w-full py-2 bg-emerald-500 text-slate-900 rounded-lg font-semibold"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
