import React, { useState } from 'react';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_SEMESTERS,
  INITIAL_TRAVEL_STATE,
} from './data/initialData';
import { StudentProfile, SemesterData, TravelTrackerState } from './types';
import { Navigation, ActiveTab } from './components/Navigation';
import { Header } from './components/Header';
import { ProfileView } from './components/ProfileView';
import { MarksheetView } from './components/MarksheetView';
import { TravelExpenseView } from './components/TravelExpenseView';

export default function App() {
  const [student] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [semesters] = useState<SemesterData[]>(INITIAL_SEMESTERS);
  const [travel, setTravel] = useState<TravelTrackerState>(INITIAL_TRAVEL_STATE);

  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Sidebar Navigation - Strictly: My Profile, Marks & Percentage, Transport */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
        isMobileOpen={isMobileNavOpen}
        setIsMobileOpen={setIsMobileNavOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300">
        {/* Top Header */}
        <Header
          student={student}
          setIsMobileOpen={setIsMobileNavOpen}
        />

        {/* Dynamic Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto pb-12">
          {activeTab === 'profile' && (
            <ProfileView
              student={student}
              semesters={semesters}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'marks' && (
            <MarksheetView
              semesters={semesters}
              student={student}
            />
          )}

          {activeTab === 'transport' && (
            <TravelExpenseView
              travel={travel}
              onUpdateTravel={setTravel}
            />
          )}
        </main>
      </div>
    </div>
  );
}
