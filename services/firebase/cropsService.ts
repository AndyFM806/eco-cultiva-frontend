import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db, getCurrentUserId } from "./firebaseConfig";

const plantsCol = collection(db, "plants");
const plantLogsCol = collection(db, "plantLogs");

export interface Plant {
  id?: string;
  userId: string;
  name: string;
  type: string;
  sowingDate: string; // ISO
  stage: string;
  notes?: string;
  careSchedule?: {
    wateringEveryDays?: number;
    fertilizingEveryDays?: number;
    pruningEveryDays?: number;
  };
  alertsEnabled: boolean;
  createdAt: string;
}

export interface PlantLog {
  id?: string;
  plantId: string;
  date: string;
  heightCm?: number;
  notes?: string;
  pestsDetected?: string[];
}

export function listenPlants(callback: (plants: Plant[]) => void) {
  const userId = getCurrentUserId();
  const q = query(
    plantsCol,
    where("userId", "==", userId),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snap) => {
    const data: Plant[] = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as any),
    }));
    callback(data);
  });
}

export async function addPlant(input: {
  name: string;
  type: string;
  sowingDate: string;
  stage: string;
  notes?: string;
}) {
  const userId = getCurrentUserId();
  const payload: Plant = {
    userId,
    name: input.name,
    type: input.type,
    sowingDate: input.sowingDate,
    stage: input.stage,
    notes: input.notes ?? "",
    alertsEnabled: true,
    createdAt: new Date().toISOString(),
    careSchedule: {
      wateringEveryDays: 2,
      fertilizingEveryDays: 10,
      pruningEveryDays: 15,
    },
  };
  await addDoc(plantsCol, payload);
}

export async function addPlantLog(plantId: string, log: Partial<PlantLog>) {
  const payload: PlantLog = {
    plantId,
    date: new Date().toISOString(),
    ...log,
  };
  await addDoc(plantLogsCol, payload);
}

export async function getPlantLogs(plantId: string): Promise<PlantLog[]> {
  const q = query(
    plantLogsCol,
    where("plantId", "==", plantId),
    orderBy("date", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}
