interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1 border border-gray-100">
      <div className="w-16 h-16 mx-auto mb-5 bg-amber-100 rounded-xl flex items-center justify-center text-3xl group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

export default FeatureCard;
