import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db, getCurrentUserId } from "./firebaseConfig";

const profilesCol = collection(db, "profiles");

export interface UserProfile {
  userId: string;
  displayName: string;
  experienceLevel: "principiante" | "intermedio" | "avanzado";
  preferredClimates: string[];
  createdAt: string;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const userId = getCurrentUserId();
  const ref = doc(profilesCol, userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

export async function saveUserProfile(data: Omit<UserProfile, "createdAt">) {
  const ref = doc(profilesCol, data.userId);
  const payload: UserProfile = {
    ...data,
    createdAt: new Date().toISOString(),
  };
  await setDoc(ref, payload);
}
