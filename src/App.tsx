import { useState, useEffect } from 'react';
import { Search, Star, ExternalLink, Sparkles, Twitter, Github, MessageCircle, Heart } from 'lucide-react';
import { supabase } from './lib/supabase';
import CategoryFilter from './components/CategoryFilter';
import AgentCard from './components/AgentCard';

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  category_id: string;
  url: string;
  logo_url: string;
  features: string[];
  pricing: string;
  rating: number;
}

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, agentsRes] = await Promise.all([
        supabase.from('categories').select('*'),
        supabase.from('ai_agents').select('*')
      ]);

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (agentsRes.data) setAgents(agentsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || agent.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin" />
          <p className="text-slate-300 text-lg">Loading AI Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Particle Background */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10 text-blue-400 mr-3 animate-float" />
            <h1 className="text-5xl md:text-6xl font-bold text-white bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-glow">
              AI ZAYA
            </h1>
          </div>
          <p className="text-xl text-slate-300 mb-2 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            Your gateway to every AI agent in one unified platform
          </p>
          <p className="text-slate-400 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            Access the most powerful AI tools instantly
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search AI agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
            />
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className="text-slate-400">
            {filteredAgents.length} AI agent{filteredAgents.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-300 text-lg">No AI agents found matching your search</p>
            <p className="text-slate-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-700">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
            <div className="flex justify-center space-x-6 mb-4 text-sm text-slate-400">
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300 transition-colors">About Us</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 AI ZAYA. All rights reserved. Developed by Rahul Yadav.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
