import { useState } from "react";

function CallToAction() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;

    console.log("Email cadastrado:", email);
    setSubmitted(true);
  };

  return (
    <section
      id="cta"
      className="py-28 bg-amber-700 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">🍫</div>
        <div className="absolute bottom-10 right-10 text-8xl">🎁</div>
        <div className="absolute top-1/2 left-1/4 text-6xl">✨</div>
        <div className="absolute bottom-1/3 right-1/3 text-7xl">🍫</div>
      </div>

      <div className="max-w-3xl mx-auto text-center relative">
        {submitted ? (
          <div>
            <span className="text-5xl block mb-4">🎉</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Obrigado por se cadastrar!
            </h2>
            <p className="text-amber-100 text-lg">
              Fique de olho no seu e-mail — surpresas doces estão a caminho.
            </p>
          </div>
        ) : (
          <div>
            <span className="inline-block bg-amber-600 text-amber-100 rounded-full px-4 py-1 text-sm font-medium mb-6">
              ⏳ Oferta por tempo limitado
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Quer 15% de desconto no primeiro pedido?
            </h2>
            <p className="text-amber-100 text-lg mb-10">
              Cadastre seu e-mail e receba um cupom exclusivo. Sem spam,
              prometemos.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-lg"
              />

              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105"
              >
                Quero meu cupom
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default CallToAction;
