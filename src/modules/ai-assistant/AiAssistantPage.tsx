import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AiAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hola 👩‍🌾 Soy tu IA Agricultora. Pregúntame qué puedes sembrar, riegos, plagas, etc.",
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };
    const reply: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: generateResponse(input.trim()),
    };

    setMessages((prev) => [...prev, userMsg, reply]);
    setInput("");
  };

  return (
    <div className="assistant-container">
      {/* HEADER */}
      <header className="assistant-header">
        <h1 className="assistant-title">🤖 IA Agricultora</h1>
        <p className="assistant-sub">Consulta sobre cultivos, cuidados y plagas.</p>
      </header>

      {/* CHAT */}
      <div className="chat-area">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`bubble-row ${
              m.role === "user" ? "row-user" : "row-bot"
            }`}
          >
            <div
              className={`bubble ${
                m.role === "user" ? "bubble-user" : "bubble-bot"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          className="chat-input"
          placeholder="Escribe tu duda…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="chat-send" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

function generateResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("clima") || q.includes("sembrar")) {
    return "Para climas templados puedes sembrar tomate, lechuga, espinaca y hierbas. Si me dices tu clima exacto, te doy sugerencias más precisas 🌱.";
  }
  if (q.includes("riego") || q.includes("agua")) {
    return "Las hortalizas de hoja requieren riegos más frecuentes; tomates y pimientos prefieren riegos más profundos pero menos frecuentes 💧.";
  }
  if (q.includes("plaga") || q.includes("pulgon") || q.includes("hongos")) {
    return "Puedes usar jabón potásico, neem o infusión de ajo. Envíame una foto en la siguiente versión para identificar la plaga 🐛.";
  }
  if (q.includes("fertiliz") || q.includes("abono") || q.includes("compost")) {
    return "Un NPK equilibrado funciona para crecimiento; para floración usa uno más rico en fósforo/potasio. El compost mejora mucho el sustrato ♻️.";
  }
  if (q.includes("tomate")) {
    return "El tomate requiere 6–8 h de sol, riegos profundos, tutorado y evitar mojar las hojas para prevenir hongos 🍅.";
  }

  return "Buena pregunta 👌. Dime el tipo de planta (tomate, lechuga, aromáticas, etc.) y te doy un plan exacto.";
}
