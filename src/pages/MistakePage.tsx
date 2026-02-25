import React, { useState } from 'react';
import { ChevronLeft, X, Image as ImageIcon } from 'lucide-react';
import type { Child } from '../types';
import { dataManager } from '../utils/dataManager';

interface MistakePageProps {
  activeChild: Child;
  onBack: () => void;
}

const MistakePage: React.FC<MistakePageProps> = ({ activeChild, onBack }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const mistakes = dataManager.getChildMistakes(activeChild.id);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">错题本</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 pb-10 space-y-4">
        {mistakes.length > 0 ? (
          mistakes.map(mistake => (
            <div key={mistake.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                 <button 
                  onClick={() => setPreviewImage(mistake.imageUrl)}
                  className="w-20 h-20 bg-slate-100 rounded-2xl flex-shrink-0 overflow-hidden border border-slate-200/50"
                >
                  <img src={mistake.imageUrl} alt="Mistake" className="w-full h-full object-cover" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-red-50 text-red-600 rounded-md">
                      {mistake.subject}
                    </span>
                    <span className="text-[10px] text-slate-400">{mistake.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm truncate mb-1">{mistake.knowledgePoint}</h3>
                   <p className="text-[10px] text-slate-500 font-medium bg-slate-50 p-2 rounded-lg">原因: {mistake.reason}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                 <button 
                  onClick={() => setPreviewImage(mistake.imageUrl)}
                  className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <ImageIcon size={14} /> 查看大图
                </button>
              </div>
            </div>
          ))
        ) : (
           <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <p>暂无错题记录</p>
          </div>
        )}
      </div>

       {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setPreviewImage(null)}>
          <button 
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <X size={24} />
          </button>
          <img 
            src={previewImage} 
            alt="Preview" 
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl animate-in zoom-in-95 duration-200" 
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default MistakePage;
