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
const simulationPosts: CommunityPost[] = [
  {
    id: "post-1",
    userId: "user-1",
    user: "Laura Gómez",
    userAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    plantName: "Tomates Cherry Solares",
    content:
      "¡Mi primera cosecha de tomates cherry! 🍅 Después de 3 meses de mucho sol y cuidado, por fin están listos. El sabor es increíblemente dulce, nada que ver con los del supermercado. Usé un fertilizante orgánico que preparé en casa.",
    photoUrl:
      "https://images.unsplash.com/photo-1598512752271-33f913a53283?q=80&w=1200&auto=format&fit=crop",
    likes: 42,
    comments: 12,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: "post-2",
    userId: "user-2",
    user: "Javier Pérez",
    userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    plantName: "Albahaca Genovesa",
    content:
      "Mi rincón de hierbas aromáticas en la cocina va creciendo. La albahaca está súper frondosa. Perfecta para el pesto que voy a preparar esta noche. ¿Algún consejo para evitar que se espigue?",
    photoUrl:
      "https://images.unsplash.com/photo-1604774659158-a0a7f20a2e50?q=80&w=1200&auto=format&fit=crop",
    likes: 35,
    comments: 8,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: "post-3",
    userId: "user-3",
    user: "Sofía Castro",
    userAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
    plantName: "Pimientos de Padrón",
    content:
      "¡La cosecha de pimientos ha sido un éxito! 🌶️ Unos pican y otros no, como manda la tradición. Los preparé fritos con un poco de sal gorda. ¡Una delicia! La planta ha sido muy productiva.",
    photoUrl:
      "https://images.unsplash.com/photo-1615485499961-9011272d1a3c?q=80&w=1200&auto=format&fit=crop",
    likes: 28,
    comments: 6,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: "post-4",
    userId: "user-4",
    user: "Mateo Vargas",
    userAvatar: "https://randomuser.me/api/portraits/men/88.jpg",
    plantName: "Lechugas Romanas",
    content:
      "🥬 ¡Ensalada fresca directa del huerto! Estas lechugas han crecido súper rápido en mi sistema hidropónico. El sabor es crujiente y fresco. Cero pesticidas, 100% natural. ¿Alguien más cultiva con hidroponía?",
    photoUrl:
      "https://images.unsplash.com/photo-1556782242-a71c5905f31a?q=80&w=1200&auto=format&fit=crop",
    likes: 55,
    comments: 15,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
  },
    {
    id: "post-5",
    userId: "user-5",
    user: "Isabella Reyes",
    userAvatar: "https://randomuser.me/api/portraits/women/50.jpg",
    plantName: "Fresas Silvestres",
    content:
      "🍓 ¡No puedo creer que estas fresas hayan crecido en mi balcón! Son pequeñas pero increíblemente sabrosas. Ha sido una grata sorpresa. Recolecté un pequeño bol para el postre de hoy.",
    photoUrl:
      "https://images.unsplash.com/photo-1587393855524-7ab3f94a4342?q=80&w=1200&auto=format&fit=crop",
    likes: 72,
    comments: 20,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
  },
];

export function CommunityPage() {
  const [posts] = useState<CommunityPost[]>(simulationPosts);

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
