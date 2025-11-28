import { useEffect, useState } from "react";
import {
  type CommunityPost,
  listenCommunityPosts,
  addCommunityPost,
} from "../../../services/firebase/communityService";

export function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [form, setForm] = useState({
    plantName: "",
    content: "",
    photoUrl: "",
  });

  useEffect(() => {
    const unsub = listenCommunityPosts(setPosts);
    return () => unsub();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.content.trim()) return;
    await addCommunityPost({
      plantName: form.plantName || "Mi cultivo",
      content: form.content.trim(),
      photoUrl: form.photoUrl || undefined,
    });
    setForm({ plantName: "", content: "", photoUrl: "" });
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-emerald-400">
          🧭 Comunidad de cultivadores
        </h1>
        <p className="text-sm text-slate-300">
          Comparte tus avances y aprende de otros.
        </p>
      </header>

      <section className="bg-slate-900 rounded-xl p-3 space-y-2 text-sm">
        <h2 className="text-sm font-semibold text-emerald-300">
          Publicar progreso
        </h2>
        <form onSubmit={handleCreatePost} className="space-y-2 text-xs">
          <input
            className="w-full bg-slate-800 rounded-lg px-3 py-2"
            placeholder="Nombre de la planta (ej: Tomate cherry)"
            value={form.plantName}
            onChange={(e) =>
              setForm((f) => ({ ...f, plantName: e.target.value }))
            }
          />
          <textarea
            className="w-full bg-slate-800 rounded-lg px-3 py-2"
            placeholder="Cuenta cómo va tu cultivo..."
            value={form.content}
            onChange={(e) =>
              setForm((f) => ({ ...f, content: e.target.value }))
            }
          />
          <input
            className="w-full bg-slate-800 rounded-lg px-3 py-2"
            placeholder="URL de foto (opcional, por ahora pegada desde la web)"
            value={form.photoUrl}
            onChange={(e) =>
              setForm((f) => ({ ...f, photoUrl: e.target.value }))
            }
          />
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg py-2"
          >
            Publicar
          </button>
        </form>
      </section>

      <section className="space-y-2 text-sm">
        {posts.map((p) => (
          <article
            key={p.id}
            className="bg-slate-900 rounded-xl p-3 border border-slate-800"
          >
            <p className="text-xs text-emerald-300 mb-1">{p.plantName}</p>
            <p className="text-xs text-slate-100 mb-2">{p.content}</p>
            {p.photoUrl && (
              <img
                src={p.photoUrl}
                alt={p.plantName}
                className="w-full max-h-48 object-cover rounded-lg mb-2"
              />
            )}
            <p className="text-[10px] text-slate-500">
              Likes: {p.likesCount} •{" "}
              {new Date(p.createdAt).toLocaleString("es-ES")}
            </p>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-xs text-slate-400">
            Aún no hay publicaciones. ¡Sé el primero en compartir tu cultivo! 🌱
          </p>
        )}
      </section>
    </div>
  );
}
