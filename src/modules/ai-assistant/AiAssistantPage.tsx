import { useState, useRef, useEffect } from "react";
import "./AiAssistantPage.css"; // Importar los nuevos estilos

// --- TIPOS Y DATOS MOCK ---
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const mockConversation: Message[] = [
    { id: "1", role: "assistant", content: "Hola 👩‍🌾 Soy tu IA Agricultora. Pregúntame qué puedes sembrar, riegos, plagas, etc." },
    { id: "2", role: "user", content: "Quiero plantar tomates, ¿qué debo saber?" },
    { id: "3", role: "assistant", content: "¡Excelente elección! El tomate (Solanum lycopersicum) es una planta gratificante. Para empezar, necesitarás:\n\n- **Luz:** Al menos 6-8 horas de sol directo al día.\n- **Sustrato:** Bien drenado y rico en materia orgánica.\n- **Riego:** Constante y profundo, evitando mojar las hojas." },
    { id: "4", role: "user", content: "¿Y qué hay de las plagas?" },
    { id: "5", role: "assistant", content: "Las plagas más comunes son el pulgón, la mosca blanca y la araña roja. Puedes combatirlas de forma ecológica con:\n\n- **Jabón potásico:** Diluido en agua.\n- **Aceite de Neem:** Insecticida y fungicida natural.\n- **Trampas cromáticas:** Las amarillas atrapan mosca blanca." },
    { id: "6", role: "user", content: "Gracias, muy útil" },
];

// --- COMPONENTE PRINCIPAL ---
export function AiAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockConversation);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Efecto para hacer scroll al final cuando llegan mensajes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: input.trim() };
    const reply: Message = { id: crypto.randomUUID(), role: "assistant", content: generateResponse(input.trim()) };

    setMessages((prev) => [...prev, userMsg, reply]);
    setInput("");
  };

  return (
    <div className="assistant-page-container">
      <header className="header-section">
        <h1>🤖 IA Agricultora</h1>
        <p className="muted">Tu asistente personal para el cultivo.</p>
      </header>

      <div className="chat-window">
        {messages.map((m) => (
          <div key={m.id} className={`chat-message ${m.role}`}>
            <FormattedMessageContent content={m.content} />
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-area">
        <form className="chat-form" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Escribe tu duda..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-primary">Enviar</button>
        </form>
      </div>
    </div>
  );
}

// --- HELPERS ---

// Componente para formatear el contenido del mensaje
function FormattedMessageContent({ content }: { content: string }) {
    const htmlContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negrita
        .replace(/\n/g, '<br />'); // Saltos de línea

    return <p dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

// Función para generar respuestas (sin cambios)
function generateResponse(question: string): string {
    const q = question.toLowerCase();
    if (q.includes("clima")) return "Para climas templados puedes sembrar tomate, lechuga y espinaca. Dime tu clima y te doy sugerencias más precisas 🌱.";
    if (q.includes("riego")) return "Las hortalizas de hoja requieren riegos frecuentes; los tomates prefieren riegos profundos pero menos seguidos 💧.";
    if (q.includes("plaga")) return "Usa jabón potásico o aceite de Neem. Envíame una foto en la siguiente versión para identificarla 🐛.";
    if (q.includes("fertiliz")) return "Un NPK equilibrado funciona bien. El compost siempre es una gran opción para mejorar el sustrato ♻️.";
    if (q.includes("tomate")) return "El tomate requiere 6–8 h de sol, riegos profundos y tutorado para crecer fuerte 🍅.";
    return "Buena pregunta 👌. Dime el tipo de planta y te doy un plan exacto.";
}
