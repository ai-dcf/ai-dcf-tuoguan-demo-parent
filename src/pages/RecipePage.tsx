import React from 'react';
import { ChevronLeft, Utensils, Clock, Sun, Moon, Coffee } from 'lucide-react';
import { dataManager } from '../utils/dataManager';

interface RecipePageProps {
  onBack: () => void;
}

const RecipePage: React.FC<RecipePageProps> = ({ onBack }) => {
  const recipe = dataManager.getTodayRecipe();

  if (!recipe) {
    return (
      <div className="flex flex-col min-h-full bg-slate-50">
        <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-0 z-20 flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg text-slate-800 ml-2">今日食谱</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-10">
          <Utensils size={48} className="mb-4 opacity-20" />
          <p>今日食谱尚未发布</p>
        </div>
      </div>
    );
  }

  const MealCard = ({ 
    title, 
    icon: Icon, 
    items, 
    image, 
    colorClass, 
    bgClass 
  }: { 
    title: string, 
    icon: any, 
    items: string[], 
    image?: string, 
    colorClass: string, 
    bgClass: string 
  }) => (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm mb-6">
      <div className={`px-5 py-4 flex items-center gap-2 border-b border-slate-50 ${bgClass}`}>
        <div className={`p-2 rounded-xl bg-white ${colorClass}`}>
          <Icon size={20} />
        </div>
        <h3 className="font-bold text-lg text-slate-800">{title}</h3>
      </div>
      
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {items.map((item, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold border border-slate-100">
              {item}
            </span>
          ))}
        </div>
        
        {image && (
          <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">今日食谱</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-5 pb-10">
        <div className="mb-6 flex items-center gap-2 text-slate-500 text-sm font-medium px-1">
          <Clock size={16} />
          <span>{recipe.date}</span>
        </div>

        <MealCard 
          title="午餐" 
          icon={Sun} 
          items={recipe.lunch} 
          image={recipe.lunchImage} 
          colorClass="text-orange-500" 
          bgClass="bg-orange-50/30" 
        />

        <MealCard 
          title="点心" 
          icon={Coffee} 
          items={recipe.snack} 
          image={recipe.snackImage} 
          colorClass="text-green-500" 
          bgClass="bg-green-50/30" 
        />

        <MealCard 
          title="晚餐" 
          icon={Moon} 
          items={recipe.dinner} 
          image={recipe.dinnerImage} 
          colorClass="text-indigo-500" 
          bgClass="bg-indigo-50/30" 
        />
      </div>
    </div>
  );
};

export default RecipePage;
