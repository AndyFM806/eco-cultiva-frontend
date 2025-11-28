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
    <div className="flex flex-col h-full gap-3">
      <header>
        <h1 className="text-2xl font-bold text-emerald-400">
          🤖 IA Agricultora
        </h1>
        <p className="text-sm text-slate-300">
          Consulta sobre cultivos, riego y cuidados básicos.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto bg-slate-900 rounded-xl p-3 space-y-2 text-sm">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                m.role === "user"
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-slate-800 text-slate-100"
              } text-xs`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className="flex gap-2 items-center bg-slate-900 rounded-xl p-2"
      >
        <input
          className="flex-1 bg-transparent text-sm px-2 py-1 outline-none"
          placeholder="Escribe tu duda (ej: ¿cada cuánto riego mi tomate?)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="text-xs bg-emerald-500 text-slate-950 px-3 py-1 rounded-lg font-semibold"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

function generateResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("clima") || q.includes("sembrar")) {
    return "Para climas templados puedes sembrar tomate, lechuga, espinaca, rabanito y hierbas como albahaca o perejil. Si me dices tu clima específico puedo sugerirte un cultivo concreto 🌱.";
  }
  if (q.includes("riego") || q.includes("agua")) {
    return "En general, la mayoría de hortalizas de hoja requieren riegos frecuentes con poca agua, mientras que tomates y pimientos prefieren riegos más espaciados pero profundos. Revisa que el sustrato se seque ligeramente entre riegos 💧.";
  }
  if (q.includes("plaga") || q.includes("pulgon") || q.includes("hongos")) {
    return "Para el control básico de plagas domésticas puedes usar jabón potásico, aceite de neem o infusiones de ajo/ají. Evita químicos fuertes en cultivos de consumo. Idealmente identifica la plaga con una foto para un diagnóstico más preciso 🐛.";
  }
  if (q.includes("fertiliz") || q.includes("abono") || q.includes("compost")) {
    return "Utiliza un fertilizante equilibrado NPK para crecimiento y uno con más fósforo y potasio para floración y fruto. El compost maduro es una excelente base para mejorar el sustrato ♻️.";
  }
  if (q.includes("tomate")) {
    return "El tomate requiere mucho sol (6–8 horas diarias), riegos profundos pero no diarios, tutorado cuando alcance 30–40 cm y un buen drenaje. Evita mojar las hojas para reducir hongos 🍅.";
  }

  return "Buena pregunta 👌. De forma general: mantén un sustrato aireado, riego moderado, luz adecuada y revisa hojas semanalmente. Si me das el tipo de planta (tomate, lechuga, hierbas, etc.) puedo darte un plan más específico.";
}
