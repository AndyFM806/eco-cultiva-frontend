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
    <div className="container">

      {/* HEADER */}
      <header className="header-section">
        <h1 className="title">🧭 Comunidad de cultivadores</h1>
        <p className="muted small">Comparte tus avances y aprende de otros.</p>
      </header>

      {/* FORMULARIO */}
      <section className="card">
        <h2 className="section-title">Publicar progreso</h2>

        <form onSubmit={handleCreatePost} className="form">
          <input
            className="input"
            placeholder="Nombre de la planta (ej: Tomate cherry)"
            value={form.plantName}
            onChange={(e) =>
              setForm((f) => ({ ...f, plantName: e.target.value }))
            }
          />

          <textarea
            className="textarea"
            placeholder="Cuenta cómo va tu cultivo..."
            value={form.content}
            onChange={(e) =>
              setForm((f) => ({ ...f, content: e.target.value }))
            }
          />

          <input
            className="input"
            placeholder="URL de foto (opcional)"
            value={form.photoUrl}
            onChange={(e) =>
              setForm((f) => ({ ...f, photoUrl: e.target.value }))
            }
          />

          <button type="submit" className="btn-primary full">
            Publicar
          </button>
        </form>
      </section>

      {/* LISTA DE POSTS */}
      <section className="feed">
        {posts.map((p) => (
          <article key={p.id} className="post-card">
            <p className="tag">{p.plantName}</p>
            <p className="post-content">{p.content}</p>

            {p.photoUrl && (
              <img
                src={p.photoUrl}
                alt={p.plantName}
                className="post-image"
              />
            )}

            <p className="post-meta">
              Likes: {p.likesCount} •{" "}
              {new Date(p.createdAt).toLocaleString("es-ES")}
            </p>
          </article>
        ))}

        {posts.length === 0 && (
          <p className="muted small">
            Aún no hay publicaciones. ¡Sé el primero en compartir tu cultivo! 🌱
          </p>
        )}
      </section>

    </div>
  );
}
