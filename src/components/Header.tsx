import React from 'react';
import { Menu, Printer, User } from 'lucide-react';
import { StudentProfile } from '../types';

interface HeaderProps {
  student: StudentProfile;
  setIsMobileOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  setIsMobileOpen,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between no-print">
      <div className="flex items-center gap-3">
        <button
          id="mobile-menu-btn"
          onClick={() => setIsMobileOpen(true)}
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
            Current: {student.currentSemester}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">•</span>
          <span className="text-xs text-slate-600 hidden sm:inline">
            {student.college}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          id="header-quick-print-btn"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200/80 transition-colors"
          title="Print page"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Print Page</span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
            A
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-xs font-bold text-slate-800 leading-tight">
              {student.name}
            </div>
            <div className="text-[10px] font-mono text-slate-500 leading-tight">
              {student.registerNumber}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
