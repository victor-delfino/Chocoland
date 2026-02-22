import { useState } from "react";

const API_URL = "http://localhost:3001";

const pastEditions = [
  {
    id: 1,
    title: "A origem do cacau: da Amazônia para o mundo",
    date: "14 Fev 2026",
    preview:
      "Descubra como o cacau saiu das florestas tropicais e se tornou o ingrediente mais amado do planeta.",
  },
  {
    id: 2,
    title: "Temperagem: o segredo do brilho perfeito",
    date: "07 Fev 2026",
    preview:
      "Por que alguns chocolates quebram com aquele 'snap' satisfatório? Tudo começa na temperatura certa.",
  },
  {
    id: 3,
    title: "Bean-to-bar: o movimento artesanal",
    date: "31 Jan 2026",
    preview:
      "Conheça produtores que controlam cada etapa — da seleção do grão até a barra final.",
  },
];

function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch(`${API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao se inscrever");
      }

      setStatus("success");
      setName("");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Erro ao conectar com o servidor",
      );
    }
  };

  return (
    <section
      id="newsletter"
      className="py-28 bg-amber-50/60 px-4 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-100 text-amber-800 rounded-full px-4 py-1 text-sm font-medium mb-4">
            Newsletter semanal
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            O mundo do chocolate no seu email
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Toda semana, uma edição com curiosidades, receitas, bastidores da
            produção artesanal e novidades do universo cacau.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Formulário de inscrição */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Inscreva-se gratuitamente
            </h3>

            {status === "success" ? (
              <div className="text-center py-8">
                <span className="text-5xl block mb-4">🎉</span>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Inscrição confirmada!
                </h4>
                <p className="text-gray-600">
                  Fique de olho no seu email — a próxima edição está a caminho.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-amber-700 font-medium hover:underline cursor-pointer"
                >
                  Inscrever outro email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">
                    ❌ {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white py-4 rounded-xl text-lg font-semibold transition-all cursor-pointer shadow-md hover:shadow-lg"
                >
                  {status === "loading" ? "Enviando..." : "Quero receber"}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Sem spam. Cancele quando quiser.
                </p>
              </form>
            )}
          </div>

          {/* Edições anteriores */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Edições anteriores
            </h3>
            <div className="space-y-4">
              {pastEditions.map((edition) => (
                <div
                  key={edition.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                      {edition.title}
                    </h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                      {edition.date}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {edition.preview}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
