import { useState } from "react";

import godiva from "../assets/godiva.jpg";
import laMaison from "../assets/la maison.jpg";
import teuscher from "../assets/teuscher.jpg";

const chocolates = [
  {
    id: 1,
    name: "Godiva",
    origin: "Bélgica, 1926",
    image: godiva,
    description:
      "Fundada em Bruxelas por Joseph Draps, a Godiva leva o nome de Lady Godiva, símbolo de generosidade. É conhecida mundialmente pelos seus truffles aveludados e pralinés refinados, mantendo quase um século de tradição artesanal belga.",
  },
  {
    id: 2,
    name: "La Maison du Chocolat",
    origin: "França, 1977",
    image: laMaison,
    description:
      "Criada por Robert Linxe em Paris, La Maison revolucionou a chocolataria ao tratar o chocolate como alta gastronomia. Seus ganaches são feitos com cacau de origem única e ingredientes frescos, resultando em sabores intensos e elegantes.",
  },
  {
    id: 3,
    name: "Teuscher",
    origin: "Suíça, 1932",
    image: teuscher,
    description:
      "Da pequena cidade de Zurique, a Teuscher produz seus chocolates com ingredientes naturais sem conservantes. Famosa pela trufa de champanhe, cada peça é feita à mão seguindo receitas que passam de geração em geração há mais de 90 anos.",
  },
];

function Showcase() {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    if (index < 0) return setCurrent(chocolates.length - 1);
    if (index >= chocolates.length) return setCurrent(0);
    setCurrent(index);
  };

  const chocolate = chocolates[current];

  return (
    <section id="showcase" className="py-24 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Conheça os melhores chocolates do mundo
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tradição, sabor e história em cada mordida. Descubra as marcas que
            inspiram a nossa paixão por chocolate.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Imagem com efeito de zoom */}
          <div className="relative w-full lg:w-1/2 flex items-center justify-center">
            {/* Seta esquerda */}
            <button
              onClick={() => goTo(current - 1)}
              className="absolute left-2 z-10 bg-white/80 hover:bg-white text-amber-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              ‹
            </button>

            {/* Container da imagem */}
            <div className="w-full max-w-lg aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                key={chocolate.id}
                src={chocolate.image}
                alt={chocolate.name}
                className="w-full h-full object-cover animate-[zoomIn_0.5s_ease-out]"
              />
            </div>

            {/* Seta direita */}
            <button
              onClick={() => goTo(current + 1)}
              className="absolute right-2 z-10 bg-white/80 hover:bg-white text-amber-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              ›
            </button>
          </div>

          {/* Texto descritivo */}
          <div
            key={chocolate.id}
            className="w-full lg:w-1/2 animate-[fadeIn_0.5s_ease-out]"
          >
            <span className="inline-block bg-amber-100 text-amber-800 rounded-full px-4 py-1 text-sm font-medium mb-4">
              {chocolate.origin}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {chocolate.name}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {chocolate.description}
            </p>

            {/* Indicadores (bolinhas) */}
            <div className="flex gap-3">
              {chocolates.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    index === current
                      ? "bg-amber-700 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Showcase;
