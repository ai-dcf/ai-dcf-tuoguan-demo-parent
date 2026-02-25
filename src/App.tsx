import { useState } from 'react';
import { Home, BookOpen, User } from 'lucide-react';
import HomePage from './pages/HomePage';
import LearningPage from './pages/LearningPage';
import MinePage from './pages/MinePage';
import RecipePage from './pages/RecipePage';
import LeavePage from './pages/LeavePage';
import MistakePage from './pages/MistakePage';
import ReviewPage from './pages/ReviewPage';
import type { ViewState, Child } from './types';
import { dataManager } from './utils/dataManager';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [children] = useState<Child[]>(dataManager.getChildren());
  const [activeChild, setActiveChild] = useState<Child>(children[0]);

  // Handle child switching
  const handleChildSwitch = (child: Child) => {
    setActiveChild(child);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {currentView === 'home' && (
          <HomePage 
            activeChild={activeChild} 
            children={children} 
            onChildSwitch={handleChildSwitch}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}
        {currentView === 'learning' && (
          <LearningPage 
            activeChild={activeChild}
            onBack={() => setCurrentView('home')}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}
        {currentView === 'recipe' && (
          <RecipePage 
            onBack={() => setCurrentView('home')}
          />
        )}
        {currentView === 'leave-apply' && (
          <LeavePage 
            activeChild={activeChild}
            onBack={() => setCurrentView('home')}
          />
        )}
        {currentView === 'mistake-detail' && (
          <MistakePage 
            activeChild={activeChild}
            onBack={() => setCurrentView('home')}
          />
        )}
        {currentView === 'review' && (
          <ReviewPage 
            activeChild={activeChild}
            onBack={() => setCurrentView('home')}
          />
        )}
        {currentView === 'mine' && (
          <MinePage 
            activeChild={activeChild}
            children={children}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 glass pb-safe z-50">
        <div className="flex justify-around items-center h-16 px-2">
          <button 
            onClick={() => setCurrentView('home')}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all duration-300 ${currentView === 'home' ? 'text-blue-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${currentView === 'home' ? 'bg-blue-50' : 'bg-transparent'}`}>
              <Home size={24} strokeWidth={currentView === 'home' ? 2.5 : 2} className="transition-transform duration-300" />
            </div>
            <span className="text-[10px] font-bold mt-0.5">首页</span>
          </button>
          
          <button 
            onClick={() => setCurrentView('learning')}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all duration-300 ${currentView === 'learning' ? 'text-blue-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${currentView === 'learning' ? 'bg-blue-50' : 'bg-transparent'}`}>
              <BookOpen size={24} strokeWidth={currentView === 'learning' ? 2.5 : 2} className="transition-transform duration-300" />
            </div>
            <span className="text-[10px] font-bold mt-0.5">学情</span>
          </button>
          
          <button 
            onClick={() => setCurrentView('mine')}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all duration-300 ${currentView === 'mine' ? 'text-blue-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${currentView === 'mine' ? 'bg-blue-50' : 'bg-transparent'}`}>
              <User size={24} strokeWidth={currentView === 'mine' ? 2.5 : 2} className="transition-transform duration-300" />
            </div>
            <span className="text-[10px] font-bold mt-0.5">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
