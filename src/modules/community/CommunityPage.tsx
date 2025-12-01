import { useState } from "react";

// Local type definition to fix compilation errors
export interface CommunityPost {
  id: string;
  userId: string;
  user: string; // Renamed from userDisplayName
  userAvatar: string; // Renamed from userPhotoUrl
  plantName: string;
  content: string;
  photoUrl?: string;
  likes: number; // Renamed from likesCount
  comments: number; // Renamed from commentsCount
  createdAt: string;
}

// Mock data for demonstration
const mockPosts: CommunityPost[] = [
  {
    id: "post-1",
    userId: "user-1",
    user: "Ana C.",
    userAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    plantName: "Tomates de balcón",
    content:
      "¡Mi primera cosecha de tomates cherry! 🍅 Después de 3 meses de cuidado, por fin están listos. El sabor es increíble, mucho mejor que los del supermercado.",
    photoUrl:
      "https://images.unsplash.com/photo-1598512752271-33f913a53283?q=80&w=1200&auto=format&fit=crop",
    likes: 18,
    comments: 5,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: "post-2",
    userId: "user-2",
    user: "Carlos G.",
    userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    plantName: "Huerto de aromáticas",
    content:
      "Mi pequeño rincón de hierbas en la cocina. Tengo albahaca, menta, romero y perejil. Es genial tenerlas a mano para cocinar. ¡El olor es fantástico!",
    photoUrl:
      "https://images.unsplash.com/photo-1604774659158-a0a7f20a2e50?q=80&w=1200&auto=format&fit=crop",
    likes: 25,
    comments: 7,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: "post-3",
    userId: "user-3",
    user: "Elena R.",
    userAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
    plantName: "Pimientos de Padrón",
    content:
      "¡Unos pican y otros no! 🌶️ Muy contento con mi planta de pimientos. Produjo un montón. Perfectos para una tarde de tapas.",
    photoUrl:
      "https://images.unsplash.com/photo-1615485499961-9011272d1a3c?q=80&w=1200&auto=format&fit=crop",
    likes: 12,
    comments: 3,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
];

export function CommunityPage() {
  const [posts] = useState<CommunityPost[]>(mockPosts);

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header-section">
        <h1 className="title">🧭 Comunidad de cultivadores</h1>
        <p className="muted small">Comparte tus avances y aprende de otros.</p>
      </header>

      {/* LISTA DE POSTS */}
      <section className="feed">
        {posts.map((p) => (
          <article key={p.id} className="post-card">
            <div className="post-header">
              <img
                src={p.userAvatar}
                alt={p.user}
                className="post-avatar"
              />
              <div>
                <p className="post-user">{p.user}</p>
                <p className="tag">{p.plantName}</p>
              </div>
            </div>

            <p className="post-content">{p.content}</p>

            {p.photoUrl && (
              <img
                src={p.photoUrl}
                alt={p.plantName}
                className="post-image"
              />
            )}

            <div className="post-footer">
              <p className="post-meta">❤️ {p.likes} Me gusta</p>
              <p className="post-meta">💬 {p.comments} Comentarios</p>
              <p className="post-meta">
                {new Date(p.createdAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
