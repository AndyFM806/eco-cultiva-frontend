import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Mock conversation data
const mockConversation: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hola 👩‍🌾 Soy tu IA Agricultora. Pregúntame qué puedes sembrar, riegos, plagas, etc.",
  },
  {
    id: "2",
    role: "user",
    content: "Quiero plantar tomates, ¿qué debo saber?",
  },
  {
    id: "3",
    role: "assistant",
    content: `¡Excelente elección! El tomate (Solanum lycopersicum) es una planta gratificante. Para empezar, necesitarás:

- **Luz:** Al menos 6-8 horas de sol directo al día.
- **Sustrato:** Bien drenado y rico en materia orgánica. Una mezcla de compost, turba y perlita es ideal.
- **Riego:** Constante y profundo, evitando mojar las hojas para prevenir hongos. Riega la base de la planta.
- **Temperatura:** Prefieren climas cálidos, entre 21°C y 27°C.`,
  },
  {
    id: "4",
    role: "user",
    content: "¿Y qué hay de las plagas?",
  },
  {
    id: "5",
    role: "assistant",
    content: `Las plagas más comunes del tomate son el pulgón, la mosca blanca y la araña roja. Puedes combatirlas de forma ecológica con:

- **Jabón potásico:** Diluido en agua, es eficaz contra el pulgón.
- **Aceite de Neem:** Un gran insecticida y fungicida natural.
- **Trampas cromáticas:** Las amarillas atrapan mosca blanca.

Revisa tus plantas regularmente, especialmente el envés de las hojas.`,
  },
    {
    id: "6",
    role: "user",
    content: "Gracias, muy útil",
  },
];

export function AiAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockConversation);

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
