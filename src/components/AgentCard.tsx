import { ExternalLink, Star } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  url: string;
  logo_url?: string;
  features: string[];
  pricing: string;
  rating: number;
}

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const pricingColors = {
    Free: 'bg-green-900 text-green-200',
    Paid: 'bg-orange-900 text-orange-200',
    Freemium: 'bg-blue-900 text-blue-200'
  };

  const pricingColor = pricingColors[agent.pricing as keyof typeof pricingColors] || 'bg-slate-700 text-slate-200';

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group neo-border">
      {/* Header with logo and pricing */}
      <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 p-4 flex items-start justify-between">
        {agent.logo_url ? (
          <img
            src={agent.logo_url}
            alt={agent.name}
            className="w-12 h-12 object-contain rounded animate-float"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-12 h-12 bg-slate-600 rounded flex items-center justify-center text-slate-400 animate-pulse-slow">
            {agent.name.charAt(0)}
          </div>
        )}
        <span className={`px-2.5 py-1 rounded text-xs font-semibold ${pricingColor} animate-glow`}>
          {agent.pricing}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
          <p className="text-slate-300 text-sm">{agent.description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(agent.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">{agent.rating.toFixed(1)}</span>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {agent.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
            {agent.features.length > 3 && (
              <span className="text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">
                +{agent.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <a
          href={agent.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200 group-hover:gap-3"
        >
          Visit
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
