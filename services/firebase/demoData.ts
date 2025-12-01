import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function generateDemoData() {
  const userId = "demo-user";

  // Crear planta
  const plant = await addDoc(collection(db, "plants"), {
    userId,
    name: "Tomate Cherry",
    type: "Tomate",
    sowingDate: "2025-11-05",
    stage: "plántula",
    notes: "Creciendo rápido 🌱",
    alertsEnabled: true,
    createdAt: new Date().toISOString(),
    careSchedule: {
      wateringEveryDays: 2,
      fertilizingEveryDays: 10,
      pruningEveryDays: 15,
    },
  });

  // Crear log de crecimiento
  await addDoc(collection(db, "plantLogs"), {
    plantId: plant.id,
    date: new Date().toISOString(),
    heightCm: 5,
    notes: "Primer registro de altura",
  });

  // Crear entorno
  const env = await addDoc(collection(db, "environments"), {
    userId,
    name: "Indoor Lechuga",
    targetTempMin: 20,
    targetTempMax: 25,
    targetHumidityMin: 60,
    targetHumidityMax: 75,
    targetLightHours: 16,
    autoModeEnabled: true,
  });

  // Crear métricas simuladas
  await addDoc(collection(db, "environmentMetrics"), {
    environmentId: env.id,
    temperature: 23.5,
    airHumidity: 67,
    soilMoisture: 52,
    lightLevel: 80,
    createdAt: new Date().toISOString(),
  });

  // Crear post en comunidad
  await addDoc(collection(db, "communityPosts"), {
    userId,
    plantName: "Lechuga Hidropónica",
    content: "¡Mi lechuga está creciendo muy bien! 🌿",
    photoUrl: "https://picsum.photos/400",
    createdAt: new Date().toISOString(),
    likesCount: 5,
  });

  alert("Datos DEMO generados correctamente 🎉");
}
