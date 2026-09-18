import React from 'react';
import { User, GraduationCap, Car } from 'lucide-react';
import { StudentProfile } from '../types';

export type ActiveTab = 'profile' | 'marks' | 'transport';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  student: StudentProfile;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  student,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'marks', label: 'Marks & Percentage', icon: GraduationCap },
    { id: 'transport', label: 'Transport', icon: Car },
  ];

  const handleSelect = (id: ActiveTab) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          id="mobile-backdrop"
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } no-print`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-sm font-bold text-base">
            AM
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-slate-900 truncate">
              {student.name}
            </h1>
            <p className="text-[11px] font-mono text-slate-500 truncate">
              {student.registerNumber}
            </p>
          </div>
        </div>

        {/* Minimal Navigation Items */}
        <nav className="p-3 space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100/80 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-indigo-600' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Student Metadata */}
        <div className="p-4 border-t border-slate-100 text-xs text-slate-500 bg-slate-50/50 space-y-1">
          <div className="font-semibold text-slate-800 truncate">
            {student.college}
          </div>
          <div className="text-[11px] text-slate-500">
            {student.program}
          </div>
          <div className="text-[10px] font-mono text-indigo-700 pt-1">
            Current: {student.currentSemester}
          </div>
        </div>
      </aside>
    </>
  );
};
