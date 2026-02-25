import React, { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import type { Child } from '../types';
import { dataManager } from '../utils/dataManager';

interface ReviewPageProps {
  activeChild: Child;
  onBack: () => void;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ activeChild, onBack }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const reviews = dataManager.getChildReviews(activeChild.id);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">表现点评</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 pb-10 space-y-4">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">综合评价:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    review.overallRating === '优秀' ? 'bg-green-50 text-green-600 border border-green-100' :
                    'bg-blue-50 text-blue-600 border border-blue-100'
                  }`}>
                    {review.overallRating || '待评'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">{review.date}</div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {review.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold border border-slate-100">
                    # {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-slate-700 leading-relaxed italic mb-4">
                "{review.content || '暂无详细评价'}"
              </p>

              {review.images && (
                <div className="grid grid-cols-3 gap-2">
                  {review.images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setPreviewImage(img)}
                      className="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/50 active:scale-95 transition-transform"
                    >
                      <img src={img} alt="Review" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <p>暂无表现点评</p>
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

export default ReviewPage;
