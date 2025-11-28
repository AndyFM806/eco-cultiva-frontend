import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db, getCurrentUserId } from "./firebaseConfig";

const postsCol = collection(db, "communityPosts");

export interface CommunityPost {
  id?: string;
  userId: string;
  plantName: string;
  content: string;
  photoUrl?: string;
  createdAt: string;
  likesCount: number;
}

export function listenCommunityPosts(
  callback: (posts: CommunityPost[]) => void
) {
  const q = query(postsCol, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const data: CommunityPost[] = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as any),
    }));
    callback(data);
  });
}

export async function addCommunityPost(input: {
  plantName: string;
  content: string;
  photoUrl?: string;
}) {
  const payload: CommunityPost = {
    userId: getCurrentUserId(),
    plantName: input.plantName,
    content: input.content,
    photoUrl: input.photoUrl,
    createdAt: new Date().toISOString(),
    likesCount: 0,
  };
  await addDoc(postsCol, payload);
}
