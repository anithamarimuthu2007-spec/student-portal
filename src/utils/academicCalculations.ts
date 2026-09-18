import { Subject, SemesterData } from '../types';

/**
 * Calculates grade and grade point from marks according to Tamil Nadu university / Thiagarajar College standard 10-point scale:
 * 90-100: O (10)
 * 80-89:  A+ / A (8.0 - 8.9)
 * 70-79:  B+ / B (7.0 - 7.9)
 * 60-69:  C (6.0 - 6.9)
 * 50-59:  D (5.0 - 5.9)
 * <50:    F (0)
 */
export function deriveGradeFromMarks(final: number, max: number = 100): { grade: string; gradePoint: number; result: 'Pass' | 'Fail' } {
  const normalizedPercentage = max > 0 ? (final / max) * 100 : 0;
  const gradePoint = Number((normalizedPercentage / 10).toFixed(1));

  let grade = 'F';
  let result: 'Pass' | 'Fail' = 'Pass';

  if (normalizedPercentage >= 90) {
    grade = 'O';
  } else if (normalizedPercentage >= 80) {
    grade = 'A';
  } else if (normalizedPercentage >= 70) {
    grade = 'B';
  } else if (normalizedPercentage >= 60) {
    grade = 'C';
  } else if (normalizedPercentage >= 50) {
    grade = 'D';
  } else {
    grade = 'F';
    result = 'Fail';
  }

  return { grade, gradePoint, result };
}

/**
 * Recalculates all semester metrics strictly adhering to:
 * 1. TOTAL MARKS = sum of ALL subjects.
 * 2. PERCENTAGE = sum of ONLY percentage-counted subjects / total max of percentage-counted subjects * 100.
 */
export function recalculateSemester(semester: SemesterData): SemesterData {
  if (semester.status === 'Currently Studying' && (!semester.subjects || semester.subjects.length === 0)) {
    return {
      ...semester,
      totalMarksObtained: 0,
      totalMarksMax: 0,
      percentageMarksObtained: 0,
      percentageMarksMax: 0,
      percentage: null,
      creditsRegistered: 0,
      creditsCompleted: 0,
      passedSubjectsCount: 0,
    };
  }

  let totalObtained = 0;
  let totalMax = 0;
  let pctObtained = 0;
  let pctMax = 0;
  let creditsReg = 0;
  let creditsComp = 0;
  let passedCount = 0;

  for (const sub of semester.subjects) {
    totalObtained += sub.final;
    totalMax += sub.finalMax;
    creditsReg += sub.credit;

    if (sub.result === 'Pass') {
      creditsComp += sub.credit;
      passedCount += 1;
    }

    if (!sub.isExcludedFromPercentage) {
      pctObtained += sub.final;
      pctMax += sub.finalMax;
    }
  }

  const percentage = pctMax > 0 ? Number(((pctObtained / pctMax) * 100).toFixed(2)) : null;

  return {
    ...semester,
    totalMarksObtained: totalObtained,
    totalMarksMax: totalMax,
    percentageMarksObtained: pctObtained,
    percentageMarksMax: pctMax,
    percentage,
    creditsRegistered: creditsReg,
    creditsCompleted: creditsComp,
    passedSubjectsCount: passedCount,
  };
}

/**
 * Format a number as percentage string (e.g. 79.80% or 84%)
 */
export function formatPercentage(val: number | null | undefined): string {
  if (val === null || val === undefined) return 'Not Available';
  // If it has decimals that aren't .00, format with up to 2 decimals, or preserve 79.80
  if (val === 79.8 || val === 79.80) {
    return '79.80%';
  }
  return Number.isInteger(val) ? `${val}%` : `${val.toFixed(2)}%`;
}

/**
 * Format currency in Indian Rupees (₹)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
