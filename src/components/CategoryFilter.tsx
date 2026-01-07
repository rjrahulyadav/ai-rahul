import { MessageSquare, Image, Code, Search, Mic, Video, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const iconMap: { [key: string]: React.ReactNode } = {
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Image: <Image className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  Mic: <Mic className="w-5 h-5" />,
  Video: <Video className="w-5 h-5" />,
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center flex-wrap gap-3">
        {/* All button */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
            selectedCategory === null
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          All Categories
        </button>

        {/* Category buttons */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            title={category.description}
          >
            {iconMap[category.icon] || <MessageSquare className="w-5 h-5" />}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
