import React, { useState } from 'react';
import { Car, Clock, MapPin, Calculator, RefreshCw } from 'lucide-react';
import { TravelTrackerState } from '../types';

interface TravelExpenseViewProps {
  travel: TravelTrackerState;
  onUpdateTravel: (updated: TravelTrackerState) => void;
}

export const TravelExpenseView: React.FC<TravelExpenseViewProps> = ({
  travel,
  onUpdateTravel,
}) => {
  const [morningCost, setMorningCost] = useState<number>(travel.morningCost || 30);
  const [afternoonCost, setAfternoonCost] = useState<number>(travel.afternoonCost || 30);
  const [monthlyDays, setMonthlyDays] = useState<number>(22);
  const [semesterDays, setSemesterDays] = useState<number>(90);

  const dailyTotal = morningCost + afternoonCost;
  const monthlyTotal = dailyTotal * monthlyDays;
  const semesterTotal = dailyTotal * semesterDays;

  const handleMorningChange = (val: number) => {
    const clamped = Math.max(0, val);
    setMorningCost(clamped);
    onUpdateTravel({ ...travel, morningCost: clamped });
  };

  const handleAfternoonChange = (val: number) => {
    const clamped = Math.max(0, val);
    setAfternoonCost(clamped);
    onUpdateTravel({ ...travel, afternoonCost: clamped });
  };

  const handleResetDefaults = () => {
    setMorningCost(30);
    setAfternoonCost(30);
    setMonthlyDays(22);
    setSemesterDays(90);
    onUpdateTravel({
      ...travel,
      morningCost: 30,
      afternoonCost: 30,
    });
  };

  return (
    <div className="space-y-6">
      {/* Title & Route Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-1 border border-teal-100">
              <Car className="w-3.5 h-3.5" />
              <span>Transit Route: Villapuram ↔ Thiagarajar College</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Transport Expense Calculator
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily transit between Home (Villapuram) and Thiagarajar College via Teppakulam.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 text-right">
              <span className="text-[10px] uppercase font-bold text-teal-700 block">
                Daily Commute Total
              </span>
              <span className="text-xl font-extrabold font-mono text-teal-800">
                ₹{dailyTotal} <span className="text-xs font-normal text-teal-600">/ day</span>
              </span>
            </div>
          </div>
        </div>

        {/* Transit Route Details */}
        <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Morning Trip */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                Morning Leg (To College)
              </span>
              <span className="font-bold font-mono text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                ₹{morningCost}
              </span>
            </div>
            <p className="text-slate-600 font-medium">
              Home (Villapuram) → Teppakulam → Thiagarajar College
            </p>
            <p className="text-[11px] text-slate-400">
              Mode: Auto transit • Morning shift travel
            </p>
          </div>

          {/* Afternoon Trip */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                Afternoon Leg (Return Home)
              </span>
              <span className="font-bold font-mono text-teal-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                ₹{afternoonCost}
              </span>
            </div>
            <p className="text-slate-600 font-medium">
              Thiagarajar College → Teppakulam → Home (Villapuram)
            </p>
            <p className="text-[11px] text-slate-400">
              Mode: Auto transit • Return trip home
            </p>
          </div>
        </div>
      </div>

      {/* Calculator & Cost Projection Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">
              Commute Expense Estimator
            </h2>
          </div>
          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
            title="Reset to default ₹30 per trip"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              Morning Fare (₹)
            </label>
            <input
              type="number"
              min="0"
              value={morningCost}
              onChange={(e) => handleMorningChange(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              Afternoon Fare (₹)
            </label>
            <input
              type="number"
              min="0"
              value={afternoonCost}
              onChange={(e) => handleAfternoonChange(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              Monthly Working Days
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={monthlyDays}
              onChange={(e) => setMonthlyDays(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              Semester Working Days
            </label>
            <input
              type="number"
              min="1"
              max="150"
              value={semesterDays}
              onChange={(e) => setSemesterDays(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Calculated Expense Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Daily Expense
            </span>
            <div className="text-xl font-bold font-mono text-slate-900">
              ₹{dailyTotal}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              ₹{morningCost} Morning + ₹{afternoonCost} Afternoon
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
            <span className="text-[10px] uppercase font-bold text-indigo-700 block mb-1">
              Monthly Expense ({monthlyDays} Days)
            </span>
            <div className="text-2xl font-black font-mono text-indigo-700">
              ₹{monthlyTotal.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-indigo-600 mt-1">
              ₹{dailyTotal} × {monthlyDays} college days
            </p>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100">
            <span className="text-[10px] uppercase font-bold text-teal-700 block mb-1">
              Semester Total ({semesterDays} Days)
            </span>
            <div className="text-2xl font-black font-mono text-teal-700">
              ₹{semesterTotal.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-teal-600 mt-1">
              ₹{dailyTotal} × {semesterDays} semester days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
