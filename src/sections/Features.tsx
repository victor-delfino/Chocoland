import FeatureCard from "../components/FeatureCard";

const features = [
  {
    id: 1,
    icon: "🌱",
    title: "Ingredientes Naturais",
    description:
      "Sem conservantes artificiais. Usamos apenas cacau premium, manteiga de cacau e ingredientes orgânicos selecionados.",
  },
  {
    id: 2,
    icon: "👨‍🍳",
    title: "Feito à Mão",
    description:
      "Cada chocolate é cuidadosamente moldado por nossos chocolatiers. Produção artesanal em pequenos lotes.",
  },
  {
    id: 3,
    icon: "🚀",
    title: "Entrega Expressa",
    description:
      "Embalagem térmica especial que mantém a qualidade. Entregamos em todo o Brasil em até 3 dias úteis.",
  },
  {
    id: 4,
    icon: "🎁",
    title: "Embalagem Premium",
    description:
      "Perfeito para presente. Caixas elegantes com opção de mensagem personalizada para quem você ama.",
  },
  {
    id: 5,
    icon: "🍃",
    title: "Sustentável",
    description:
      "Embalagens recicláveis e cacau de comércio justo. Cuidamos do planeta em cada etapa da produção.",
  },
  {
    id: 6,
    icon: "⭐",
    title: "+5.000 Avaliações 5★",
    description:
      "Nossos clientes amam. Avaliação média de 4.9 estrelas com mais de 5 mil avaliações verificadas.",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 bg-amber-50 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher a ChocoLand?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cada detalhe importa quando o assunto é chocolate de verdade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
