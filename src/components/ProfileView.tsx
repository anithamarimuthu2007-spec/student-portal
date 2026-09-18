import React from 'react';
import {
  User,
  GraduationCap,
  MapPin,
  Mail,
  School,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import { StudentProfile, SemesterData } from '../types';
import { formatPercentage } from '../utils/academicCalculations';
import { ActiveTab } from './Navigation';

interface ProfileViewProps {
  student: StudentProfile;
  semesters: SemesterData[];
  onNavigate: (tab: ActiveTab) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  student,
  semesters,
  onNavigate,
}) => {
  const validSemesters = semesters.filter(
    (s) => s.semesterNumber >= 1 && s.semesterNumber <= 4
  );

  const totalCredits = validSemesters.reduce((acc, s) => acc + s.creditsCompleted, 0);
  const totalObtained = validSemesters.reduce((acc, s) => acc + s.totalMarksObtained, 0);
  const totalMax = validSemesters.reduce((acc, s) => acc + s.totalMarksMax, 0);
  const totalPctObtained = validSemesters.reduce((acc, s) => acc + s.percentageMarksObtained, 0);
  const totalPctMax = validSemesters.reduce((acc, s) => acc + s.percentageMarksMax, 0);
  const overallPercentage = totalPctMax > 0 ? (totalPctObtained / totalPctMax) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Student Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-teal-800 px-6 py-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-2xl text-white shadow-inner">
                AM
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                    {student.name}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white">
                    {student.gender}
                  </span>
                </div>
                <p className="text-xs text-indigo-100 font-medium mt-0.5">
                  {student.program} • {student.college}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                Current: {student.currentSemester}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Register Number
            </span>
            <span className="text-sm font-bold font-mono text-slate-900">
              {student.registerNumber}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Degree & Major
            </span>
            <span className="text-sm font-bold text-slate-900">
              {student.program}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Institution
            </span>
            <span className="text-sm font-bold text-slate-900 truncate block">
              {student.college}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Current Status
            </span>
            <span className="text-sm font-bold text-indigo-700">
              {student.currentSemester} (Studying)
            </span>
          </div>
        </div>

        {/* Contact & Residential Details */}
        <div className="px-6 pb-6 pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              Residential Address
            </span>
            <div className="p-3 rounded-xl bg-slate-50 text-slate-700 leading-relaxed font-medium">
              <p className="font-bold text-slate-900">{student.name}</p>
              <p>{student.address.line1}, {student.address.line2}</p>
              <p>{student.address.area}, <span className="font-bold text-indigo-700">{student.address.cityAndPincode}</span></p>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400" />
              Email & Student Communication
            </span>
            <div className="p-3 rounded-xl bg-slate-50 text-slate-700 leading-relaxed">
              <p className="font-bold text-slate-900">{student.email}</p>
              <p className="text-[11px] text-slate-500 mt-1">Official student notification contact address</p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Record Summary (Semesters 1 to 4) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Academic Summary (Semesters 1 to 4)
            </h2>
            <p className="text-xs text-slate-500">
              Overall cumulative academic standing
            </p>
          </div>
          <button
            onClick={() => onNavigate('marks')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            <span>View Marksheets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Total Marks
            </span>
            <span className="text-base font-bold font-mono text-slate-900">
              {totalObtained} / {totalMax}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Overall Percentage
            </span>
            <span className="text-base font-black font-mono text-indigo-700">
              {overallPercentage.toFixed(2)}%
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Credits Earned
            </span>
            <span className="text-base font-bold font-mono text-slate-900">
              {totalCredits} Credits
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Status
            </span>
            <span className="text-sm font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Passed
            </span>
          </div>
        </div>

        {/* Short Clean Semester Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <th className="py-2.5 px-3">Semester</th>
                <th className="py-2.5 px-3">Subjects</th>
                <th className="py-2.5 px-3 text-center">Total Marks</th>
                <th className="py-2.5 px-3 text-center">Percentage</th>
                <th className="py-2.5 px-3 text-center">Credits</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {validSemesters.map((sem) => (
                <tr key={sem.semesterNumber} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {sem.semesterName}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {sem.subjects.length} Subjects
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-semibold text-slate-800">
                    {sem.totalMarksObtained} / {sem.totalMarksMax}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-indigo-700">
                    {formatPercentage(sem.percentage)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-700">
                    {sem.creditsCompleted}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      Passed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
