import React, { useState } from 'react';
import { Download, Printer, CheckCircle2, FileText, X } from 'lucide-react';
import { SemesterData, StudentProfile } from '../types';
import { formatPercentage } from '../utils/academicCalculations';

interface MarksheetViewProps {
  semesters: SemesterData[];
  student: StudentProfile;
}

export const MarksheetView: React.FC<MarksheetViewProps> = ({
  semesters,
  student,
}) => {
  // Only Semesters 1 to 4
  const validSemesters = semesters.filter(
    (s) => s.semesterNumber >= 1 && s.semesterNumber <= 4
  );

  const [selectedSemNumber, setSelectedSemNumber] = useState<number>(1);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const activeSem =
    validSemesters.find((s) => s.semesterNumber === selectedSemNumber) ||
    validSemesters[0];

  // Cumulative calculations (Sem 1 to 4)
  const totalObtainedAll = validSemesters.reduce(
    (acc, s) => acc + s.totalMarksObtained,
    0
  );
  const totalMaxAll = validSemesters.reduce(
    (acc, s) => acc + s.totalMarksMax,
    0
  );
  const totalPercentageObtained = validSemesters.reduce(
    (acc, s) => acc + s.percentageMarksObtained,
    0
  );
  const totalPercentageMax = validSemesters.reduce(
    (acc, s) => acc + s.percentageMarksMax,
    0
  );
  const cumulativePercentage =
    totalPercentageMax > 0
      ? (totalPercentageObtained / totalPercentageMax) * 100
      : 0;
  const totalCredits = validSemesters.reduce(
    (acc, s) => acc + s.creditsCompleted,
    0
  );

  const handleDownloadMarksheet = () => {
    setIsPrintModalOpen(true);
  };

  const handlePrintDocument = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* 4-Semester Overall Cumulative Summary Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Academic Performance (Semesters 1 – 4)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cumulative academic record for {student.name} ({student.registerNumber})
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5" />
            All 4 Semesters Cleared
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Total Marks (All Subjects)
            </span>
            <span className="text-lg font-bold font-mono text-slate-900">
              {totalObtainedAll} / {totalMaxAll}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Overall Percentage
            </span>
            <span className="text-lg font-black font-mono text-indigo-700">
              {cumulativePercentage.toFixed(2)}%
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Total Credits Earned
            </span>
            <span className="text-lg font-bold font-mono text-slate-900">
              {totalCredits} Credits
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Result Classification
            </span>
            <span className="text-sm font-bold text-emerald-700 mt-0.5 block">
              First Class Distinction
            </span>
          </div>
        </div>
      </div>

      {/* Semester Selection Tabs & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 no-print">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {validSemesters.map((sem) => {
            const isActive = sem.semesterNumber === selectedSemNumber;
            return (
              <button
                key={sem.semesterNumber}
                id={`semester-tab-${sem.semesterNumber}`}
                onClick={() => setSelectedSemNumber(sem.semesterNumber)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <span>{sem.semesterName}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? 'bg-indigo-700 text-indigo-100'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {formatPercentage(sem.percentage)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Download Marksheet Button */}
        <button
          id="download-marksheet-btn"
          onClick={handleDownloadMarksheet}
          className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs w-full sm:w-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download Marksheet</span>
        </button>
      </div>

      {/* Marksheet Display Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Marksheet Title Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-700">
              {student.college} (Autonomous)
            </h3>
            <p className="text-[11px] text-slate-500">
              Madurai - 625009, Tamil Nadu
            </p>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 pt-1 uppercase">
              Statement of Marks — {activeSem.semesterName}
            </h2>
          </div>

          {/* Student Info Bar */}
          <div className="mt-4 pt-4 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                Name
              </span>
              <span className="font-bold text-slate-900 text-sm">
                {student.name}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                Register No
              </span>
              <span className="font-bold font-mono text-slate-900 text-sm">
                {student.registerNumber}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                Program
              </span>
              <span className="font-bold text-slate-900">
                {student.program}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                Result
              </span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Passed
              </span>
            </div>
          </div>
        </div>

        {/* Subjects Marksheet Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 text-center w-10">#</th>
                <th className="py-3 px-3 font-mono">Code</th>
                <th className="py-3 px-3 min-w-[220px]">Course Title</th>
                <th className="py-3 px-3 text-center">Internal</th>
                <th className="py-3 px-3 text-center">External</th>
                <th className="py-3 px-3 text-center font-bold text-slate-900">Total</th>
                <th className="py-3 px-3 text-center font-mono">Grade Point</th>
                <th className="py-3 px-3 text-center">Grade</th>
                <th className="py-3 px-3 text-center">Credit</th>
                <th className="py-3 px-3 text-center">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeSem.subjects.map((sub, idx) => (
                <tr
                  key={sub.code || idx}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-[11px]">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">
                    {sub.code}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">
                    {sub.name}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-600">
                    {sub.internal}/{sub.internalMax}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-600">
                    {sub.external}/{sub.externalMax}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900">
                    {sub.final}/{sub.finalMax}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-semibold text-slate-700">
                    {sub.gradePoint.toFixed(1)}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        sub.grade === 'O'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          : sub.grade === 'A'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                          : sub.grade === 'B'
                          ? 'bg-teal-50 text-teal-700 border border-teal-200/60'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {sub.grade}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-medium text-slate-700">
                    {sub.credit}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      {sub.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Semester Summary */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/60">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Total Marks
              </span>
              <span className="text-base font-bold font-mono text-slate-900">
                {activeSem.totalMarksObtained} / {activeSem.totalMarksMax}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Percentage
              </span>
              <span className="text-base font-black font-mono text-indigo-700">
                {formatPercentage(activeSem.percentage)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Credits Earned
              </span>
              <span className="text-base font-bold font-mono text-slate-900">
                {activeSem.creditsCompleted} / {activeSem.creditsRegistered}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Result
              </span>
              <span className="text-base font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Passed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Download / Print Modal (Clean Marksheet without signatures or official institutional disclaimers) */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
            {/* Modal Controls Bar (Hidden during print) */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold">
                  Marksheet — {activeSem.semesterName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintDocument}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Marksheet Document Body */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-900 bg-white" id="printable-marksheet-area">
              {/* Institution Header */}
              <div className="text-center border-b border-slate-300 pb-4">
                <h1 className="text-base font-extrabold uppercase text-slate-900 tracking-wide">
                  {student.college} (Autonomous)
                </h1>
                <p className="text-xs text-slate-600">
                  Madurai - 625009, Tamil Nadu
                </p>
                <h2 className="text-sm font-bold text-slate-800 uppercase mt-2">
                  Statement of Marks — {activeSem.semesterName}
                </h2>
              </div>

              {/* Student Details Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Student Name</span>
                  <span className="font-bold text-slate-900">{student.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Register Number</span>
                  <span className="font-bold font-mono text-slate-900">{student.registerNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Program</span>
                  <span className="font-bold text-slate-900">{student.program}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Result Status</span>
                  <span className="font-bold text-emerald-700">Passed</span>
                </div>
              </div>

              {/* Subjects Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-300 border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-300 font-semibold text-[11px]">
                      <th className="py-2 px-2.5 border-r border-slate-300 text-center w-8">#</th>
                      <th className="py-2 px-2.5 border-r border-slate-300 font-mono">Code</th>
                      <th className="py-2 px-2.5 border-r border-slate-300">Course Title</th>
                      <th className="py-2 px-2 border-r border-slate-300 text-center">Int</th>
                      <th className="py-2 px-2 border-r border-slate-300 text-center">Ext</th>
                      <th className="py-2 px-2 border-r border-slate-300 text-center font-bold">Total</th>
                      <th className="py-2 px-2 border-r border-slate-300 text-center">GP</th>
                      <th className="py-2 px-2 border-r border-slate-300 text-center">Grade</th>
                      <th className="py-2 px-2 border-r border-slate-300 text-center">Credit</th>
                      <th className="py-2 px-2 text-center">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {activeSem.subjects.map((sub, i) => (
                      <tr key={sub.code || i} className="border-b border-slate-200">
                        <td className="py-2 px-2.5 border-r border-slate-200 text-center text-slate-500 font-mono">
                          {i + 1}
                        </td>
                        <td className="py-2 px-2.5 border-r border-slate-200 font-mono font-bold text-slate-900">
                          {sub.code}
                        </td>
                        <td className="py-2 px-2.5 border-r border-slate-200 font-medium text-slate-800">
                          {sub.name}
                        </td>
                        <td className="py-2 px-2 border-r border-slate-200 text-center font-mono">
                          {sub.internal}
                        </td>
                        <td className="py-2 px-2 border-r border-slate-200 text-center font-mono">
                          {sub.external}
                        </td>
                        <td className="py-2 px-2 border-r border-slate-200 text-center font-mono font-bold">
                          {sub.final}
                        </td>
                        <td className="py-2 px-2 border-r border-slate-200 text-center font-mono">
                          {sub.gradePoint.toFixed(1)}
                        </td>
                        <td className="py-2 px-2 border-r border-slate-200 text-center font-mono font-bold">
                          {sub.grade}
                        </td>
                        <td className="py-2 px-2 border-r border-slate-200 text-center font-mono">
                          {sub.credit}
                        </td>
                        <td className="py-2 px-2 text-center font-semibold text-emerald-700">
                          {sub.result}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Box */}
              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50/70">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Total Marks</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {activeSem.totalMarksObtained} / {activeSem.totalMarksMax}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Percentage</span>
                    <span className="font-mono font-black text-indigo-700 text-sm">
                      {formatPercentage(activeSem.percentage)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Credits Earned</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {activeSem.creditsCompleted}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Examination Result</span>
                    <span className="font-bold text-emerald-700 text-sm">
                      PASSED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
