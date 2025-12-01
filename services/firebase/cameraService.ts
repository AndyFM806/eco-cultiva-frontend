import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, getCurrentUserId } from "./firebaseConfig";

const envCol = collection(db, "environments");
const metricsCol = collection(db, "environmentMetrics");

export interface Environment {
  id?: string;
  userId: string;
  name: string;
  targetTempMin: number;
  targetTempMax: number;
  targetHumidityMin: number;
  targetHumidityMax: number;
  targetLightHours: number;
  autoModeEnabled: boolean;
  createdAt: string;
}

export interface EnvironmentMetric {
  id?: string;
  environmentId: string;
  timestamp: string;
  temperature: number;
  airHumidity: number;
  soilMoisture: number;
  lightLevel: number;
}

export function listenEnvironments(callback: (envs: Environment[]) => void) {
  const userId = getCurrentUserId();
  const q = query(envCol, where("userId", "==", userId));
  return onSnapshot(q, (snap) => {
    const data: Environment[] = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as any),
    }));
    callback(data);
  });
}

export function listenMetrics(
  envId: string,
  callback: (metrics: EnvironmentMetric[]) => void
) {
  const q = query(
    metricsCol,
    where("environmentId", "==", envId),
    orderBy("timestamp", "desc")
  );
  return onSnapshot(q, (snap) => {
    const data: EnvironmentMetric[] = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as any),
    }));
    callback(data);
  });
}

export async function addEnvironment(input: {
  name: string;
  targetTempMin: number;
  targetTempMax: number;
  targetHumidityMin: number;
  targetHumidityMax: number;
  targetLightHours: number;
  autoModeEnabled: boolean;
}) {
  const userId = getCurrentUserId();
  const payload: Environment = {
    userId,
    ...input,
    createdAt: new Date().toISOString(),
  };
  await addDoc(envCol, payload);
}

// Simulación de lectura de sensores:
export async function simulateMetric(envId: string) {
  const payload: EnvironmentMetric = {
    environmentId: envId,
    timestamp: new Date().toISOString(),
    temperature: 22 + Math.random() * 5,
    airHumidity: 60 + Math.random() * 20,
    soilMoisture: 40 + Math.random() * 30,
    lightLevel: 50 + Math.random() * 50,
  };
  await addDoc(metricsCol, payload);
}
