import React, { useState } from 'react';
import { ChevronLeft, Image as ImageIcon, X, FileText, CheckCircle2 } from 'lucide-react';
import type { Child, ViewState } from '../types';
import { dataManager } from '../utils/dataManager';

interface LearningPageProps {
  activeChild: Child;
  onBack: () => void;
  onNavigate: (view: ViewState) => void;
}

const LearningPage: React.FC<LearningPageProps> = ({ activeChild, onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'history'>('today');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const homeworks = dataManager.getChildHomeworks(activeChild.id);
  const review = dataManager.getChildReviews(activeChild.id)[0];
  const mistakes = dataManager.getChildMistakes(activeChild.id);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">学情详情</h1>
        <div className="w-10"></div>
      </div>

      {/* Tab Switcher */}
      <div className="p-4">
        <div className="bg-white p-1 rounded-2xl flex shadow-sm border border-slate-100">
          <button 
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'today' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500'}`}
          >
            今日学情
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500'}`}
          >
            历史记录
          </button>
        </div>
      </div>

      {activeTab === 'today' ? (
        <div className="px-4 pb-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Homework Section */}
          <section>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              <h2 className="font-bold text-slate-800">作业完成情况</h2>
            </div>
            <div className="space-y-3">
              {homeworks.map(hw => (
                <div key={hw.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs ${
                        hw.subject === '数学' ? 'bg-blue-50 text-blue-600' :
                        hw.subject === '英语' ? 'bg-indigo-50 text-indigo-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {hw.subject[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">{hw.title}</h3>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{hw.submitTime || '尚未提交'}</p>
                      </div>
                    </div>
                    {hw.rating && (
                      <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center border-2 border-orange-200">
                        <span className="text-orange-600 font-black text-lg">{hw.rating}</span>
                      </div>
                    )}
                  </div>
                  {hw.feedback && (
                    <div className="bg-slate-50 p-3 rounded-2xl text-xs text-slate-600 leading-relaxed border border-slate-100">
                      <span className="font-bold text-blue-600 mr-1">老师评语:</span>
                      {hw.feedback}
                    </div>
                  )}
                  {hw.status === 'completed' && (
                    <button 
                      onClick={() => setPreviewImage('https://via.placeholder.com/600x800?text=Homework+Detail')}
                      className="mt-3 w-full py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                      <ImageIcon size={14} /> 查看作业照片
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Review Section */}
          <section>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-1 h-4 bg-yellow-500 rounded-full"></div>
              <h2 className="font-bold text-slate-800">今日表现点评</h2>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">综合评价:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    review?.overallRating === '优秀' ? 'bg-green-50 text-green-600 border border-green-100' :
                    'bg-blue-50 text-blue-600 border border-blue-100'
                  }`}>
                    {review?.overallRating || '待评'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">{review?.date}</div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {review?.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold border border-slate-100">
                    # {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-slate-700 leading-relaxed italic mb-4">
                "{review?.content || '暂无详细评价'}"
              </p>

              {review?.images && (
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
          </section>

          {/* Mistakes Section */}
          <section>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-1 h-4 bg-red-500 rounded-full"></div>
              <h2 className="font-bold text-slate-800">新增错题记录</h2>
            </div>
            <div className="space-y-3">
              {mistakes.map(mistake => (
                <div key={mistake.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 group active:scale-98 transition-all">
                  <button 
                    onClick={() => setPreviewImage(mistake.imageUrl)}
                    className="w-16 h-16 bg-slate-100 rounded-2xl flex-shrink-0 overflow-hidden border border-slate-200/50"
                  >
                    <img src={mistake.imageUrl} alt="Mistake" className="w-full h-full object-cover" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-red-50 text-red-600 rounded-md">
                        {mistake.subject}
                      </span>
                      <h3 className="font-bold text-slate-800 text-sm truncate">{mistake.knowledgePoint}</h3>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">原因: {mistake.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
              <h2 className="font-bold text-slate-800">家校服务</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onNavigate('leave-apply')}
                className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3 active:scale-95 transition-all"
              >
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                  <FileText size={20} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-800 text-sm">申请请假</div>
                  <div className="text-[10px] text-slate-400">在线提交申请</div>
                </div>
              </button>
              <button 
                className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3 active:scale-95 transition-all opacity-50"
              >
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <CheckCircle2 size={20} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-800 text-sm">查看进度</div>
                  <div className="text-[10px] text-slate-400">暂无进行中</div>
                </div>
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <FileText size={48} className="mb-4 opacity-20" />
          <p>暂无历史记录</p>
          <p className="text-xs mt-2">（演示版本暂未包含历史数据）</p>
        </div>
      )}

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

export default LearningPage;
