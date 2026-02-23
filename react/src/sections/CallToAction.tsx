function CallToAction() {
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
        <span className="badge bg-amber-600 text-amber-100 mb-6">
          🤝 Parceiros exclusivos
        </span>
        <h2 className="section-title text-white">
          Quer ganhar 15% na próxima compra de parceiros?
        </h2>
        <p className="text-amber-100 text-lg mb-10">
          Cadastre-se na nossa newsletter e receba cupons exclusivos de marcas
          parceiras. Sem spam, prometemos.
        </p>

        <a
          href="#newsletter"
          className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          Quero meus descontos
        </a>
      </div>
    </section>
  );
}

export default CallToAction;
