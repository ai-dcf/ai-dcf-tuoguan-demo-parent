import React, { useState } from 'react';
import { ChevronDown, Bell, Clock, BookOpen, Star, AlertCircle, Utensils, ChevronRight } from 'lucide-react';
import type { Child, ViewState } from '../types';
import { dataManager } from '../utils/dataManager';

interface HomePageProps {
  activeChild: Child;
  children: Child[];
  onChildSwitch: (child: Child) => void;
  onNavigate: (view: ViewState) => void;
}

const HomePage: React.FC<HomePageProps> = ({ activeChild, children, onChildSwitch, onNavigate }) => {
  const [showChildPicker, setShowChildPicker] = useState(false);
  const attendance = dataManager.getChildAttendance(activeChild.id, '2026-02-25');
  const homeworks = dataManager.getChildHomeworks(activeChild.id);
  const review = dataManager.getChildReviews(activeChild.id)[0];
  const mistakes = dataManager.getChildMistakes(activeChild.id);

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-white px-5 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 z-20">
        <div className="relative">
          <button 
            onClick={() => setShowChildPicker(!showChildPicker)}
            className="flex items-center gap-2 active:scale-95 transition-all"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shadow-sm">
              {activeChild.name[0]}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-900">{activeChild.name}</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${showChildPicker ? 'rotate-180' : ''}`} />
              </div>
              <span className="text-[10px] text-slate-500">{activeChild.grade} {activeChild.class}</span>
            </div>
          </button>

          {showChildPicker && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowChildPicker(false)}></div>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {children.map(child => (
                  <button
                    key={child.id}
                    onClick={() => {
                      onChildSwitch(child);
                      setShowChildPicker(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors ${activeChild.id === child.id ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${activeChild.id === child.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {child.name[0]}
                    </div>
                    <span className={`text-sm font-medium ${activeChild.id === child.id ? 'text-blue-600' : 'text-slate-700'}`}>{child.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 relative active:scale-90 transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* Today's Status Card */}
        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">今日动态</h2>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-6 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2 text-blue-100">
                  <Clock size={16} />
                  <span className="text-xs font-medium">到班时间</span>
                </div>
                <div className="text-2xl font-black">{attendance?.checkIn || '--:--'}</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2 text-blue-100">
                  <Clock size={16} className="rotate-180" />
                  <span className="text-xs font-medium">离班时间</span>
                </div>
                <div className="text-2xl font-black">{attendance?.checkOut || '--:--'}</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 relative z-10">
              <div className="text-center">
                <div className="text-lg font-bold">{homeworks.filter(h => h.status === 'completed').length}/{homeworks.length}</div>
                <div className="text-[10px] text-blue-100">作业完成</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-lg font-bold">{review?.overallRating || '待评'}</div>
                <div className="text-[10px] text-blue-100">今日表现</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{mistakes.length}</div>
                <div className="text-[10px] text-blue-100">新增错题</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate('learning')}
              className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <span className="font-bold text-slate-700">学情详情</span>
            </button>
            <button 
              onClick={() => onNavigate('learning')}
              className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                <AlertCircle size={24} />
              </div>
              <span className="font-bold text-slate-700">错题本</span>
            </button>
            <button 
              onClick={() => onNavigate('learning')}
              className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                <Star size={24} />
              </div>
              <span className="font-bold text-slate-700">表现点评</span>
            </button>
            <button 
              className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                <Utensils size={24} />
              </div>
              <span className="font-bold text-slate-700">今日食谱</span>
            </button>
          </div>
        </section>

        {/* Institution Notification */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">机构动态</h2>
            <button className="text-xs text-blue-600 font-bold flex items-center">查看全部 <ChevronRight size={14} /></button>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex gap-4 group cursor-pointer">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex-shrink-0 overflow-hidden">
                <img src="https://via.placeholder.com/100" alt="Notice" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">关于2026年劳动节放假安排的通知</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">尊敬的家长，根据国家节假日安排，本中心将于5月1日至5月5日放假...</p>
                <div className="text-[10px] text-slate-400 mt-2 font-medium">2026-02-24</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
