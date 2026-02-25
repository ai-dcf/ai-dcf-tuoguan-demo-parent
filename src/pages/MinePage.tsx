import React from 'react';
import { Settings, ChevronRight, UserCircle, Phone, Info, MessageSquare, HelpCircle, LogOut, ShieldCheck } from 'lucide-react';
import type { Child } from '../types';

interface MinePageProps {
  activeChild: Child;
  children: Child[];
}

const MinePage: React.FC<MinePageProps> = ({ activeChild, children }) => {
  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white px-5 py-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <UserCircle size={40} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">王大宝家长</h2>
            <div className="flex items-center gap-1.5 text-slate-400 mt-1">
              <Phone size={12} />
              <span className="text-xs font-medium tracking-wide">138****8888</span>
            </div>
          </div>
        </div>
        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-2xl active:scale-90 transition-all">
          <Settings size={20} />
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* My Children */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">我的孩子</h3>
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            {children.map((child, index) => (
              <div 
                key={child.id} 
                className={`p-4 flex items-center justify-between group active:bg-slate-50 transition-colors ${index !== children.length - 1 ? 'border-b border-slate-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${activeChild.id === child.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    {child.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{child.name}</div>
                    <p className="text-[10px] text-slate-400 font-medium">{child.school} | {child.grade}{child.class}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activeChild.id === child.id && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">当前</span>
                  )}
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Tools */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">常用工具</h3>
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            {[
              { icon: Info, label: '机构信息', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: ShieldCheck, label: '订阅设置', color: 'text-green-500', bg: 'bg-green-50' },
              { icon: MessageSquare, label: '意见反馈', color: 'text-orange-500', bg: 'bg-orange-50' },
              { icon: Phone, label: '联系老师', color: 'text-purple-500', bg: 'bg-purple-50' },
            ].map((tool, index, arr) => (
              <button 
                key={tool.label}
                className={`w-full p-4 flex items-center justify-between group active:bg-slate-50 transition-colors ${index !== arr.length - 1 ? 'border-b border-slate-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 ${tool.bg} ${tool.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <tool.icon size={18} />
                  </div>
                  <span className="font-bold text-slate-700 text-sm">{tool.label}</span>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}
          </div>
        </section>

        {/* System */}
        <section>
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            {[
              { icon: HelpCircle, label: '使用指南' },
              { icon: Info, label: '版本信息', extra: 'v1.0.0' },
            ].map((item, index, arr) => (
              <button 
                key={item.label}
                className={`w-full p-4 flex items-center justify-between group active:bg-slate-50 transition-colors ${index !== arr.length - 1 ? 'border-b border-slate-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                    <item.icon size={18} />
                  </div>
                  <span className="font-bold text-slate-700 text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.extra && <span className="text-[10px] font-medium text-slate-400">{item.extra}</span>}
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <button className="w-full py-4 bg-white border border-red-100 text-red-500 rounded-3xl font-black text-sm shadow-sm active:scale-95 transition-all mt-4 mb-8">
          <div className="flex items-center justify-center gap-2">
            <LogOut size={18} />
            退出登录
          </div>
        </button>
      </div>
    </div>
  );
};

export default MinePage;
