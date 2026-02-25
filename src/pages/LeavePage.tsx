import React, { useState } from 'react';
import { ChevronLeft, Calendar, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Child, LeaveRequest } from '../types';
import { dataManager } from '../utils/dataManager';

interface LeavePageProps {
  activeChild: Child;
  onBack: () => void;
}

const LeavePage: React.FC<LeavePageProps> = ({ activeChild, onBack }) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '病假' as const,
    reason: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const history = dataManager.getLeaveRequests(activeChild.id);

  const handleSubmit = () => {
    if (!formData.reason.trim()) return;

    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      childId: activeChild.id,
      date: formData.date,
      type: formData.type,
      reason: formData.reason,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    dataManager.addLeaveRequest(newRequest);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ ...formData, reason: '' });
      setActiveTab('history');
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-100';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-orange-600 bg-orange-50 border-orange-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return '已通过';
      case 'rejected': return '已拒绝';
      default: return '待审批';
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 sticky top-0 z-20 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-all">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-slate-800">请假申请</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4">
        <div className="bg-white p-1 rounded-2xl flex shadow-sm border border-slate-100 mb-6">
          <button 
            onClick={() => setActiveTab('apply')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'apply' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500'}`}
          >
            申请请假
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500'}`}
          >
            申请记录
          </button>
        </div>

        {activeTab === 'apply' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">请假学生</label>
                <div className="w-full px-4 py-3.5 bg-slate-50 rounded-xl text-slate-500 font-medium border border-slate-100">
                  {activeChild.name}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">请假日期</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">请假类型</label>
                <div className="grid grid-cols-3 gap-3">
                  {['病假', '事假', '其他'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFormData({...formData, type: type as any})}
                      className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                        formData.type === type 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">请假事由</label>
                <textarea
                  value={formData.reason}
                  onChange={e => setFormData({...formData, reason: e.target.value})}
                  placeholder="请详细描述请假原因..."
                  className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800 h-32 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formData.reason}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none mt-4"
              >
                提交申请
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {history.length > 0 ? (
              history.map(record => (
                <div key={record.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        record.type === '病假' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {record.type}
                      </div>
                      <span className="font-bold text-slate-800">{record.date}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusColor(record.status)}`}>
                      {getStatusText(record.status)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl leading-relaxed mb-3">
                    {record.reason}
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>申请时间: {new Date(record.createdAt).toLocaleString()}</span>
                  </div>
                  {record.rejectReason && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="text-xs text-red-500 font-bold flex items-center gap-1 mb-1">
                        <AlertCircle size={12} /> 拒绝原因
                      </div>
                      <p className="text-xs text-slate-600">{record.rejectReason}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <FileText size={48} className="mb-4 opacity-20" />
                <p>暂无申请记录</p>
              </div>
            )}
          </div>
        )}
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <CheckCircle2 size={24} className="text-green-400" />
            <span className="font-bold">申请已提交，请等待老师审批</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeavePage;
