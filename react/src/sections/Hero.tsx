function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-amber-50 to-white px-4 text-center">
      <span className="badge mb-6">Feito à mão, com amor 🍫</span>

      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-3xl">
        Chocolates artesanais que
        <span className="text-amber-700"> derretem na boca</span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
        Descubra sabores únicos feitos com cacau premium, sem conservantes e com
        ingredientes selecionados. Do nosso ateliê direto para sua casa.
      </p>

      <a
        href="#cta"
        className="mt-10 inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
      >
        Quero experimentar
      </a>
    </section>
  );
}

export default Hero;
