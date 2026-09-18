export interface Subject {
  code: string;
  name: string;
  internal: number;
  internalMax: number;
  external: number;
  externalMax: number;
  final: number;
  finalMax: number;
  gradePoint: number;
  grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F' | string;
  credit: number;
  result: 'Pass' | 'Fail' | 'Not Available';
  isExcludedFromPercentage: boolean; // Tamil, English, Value Ed, Apiculture, NSS, etc.
}

export interface SemesterData {
  semesterNumber: number;
  semesterName: string;
  status: 'Completed' | 'Currently Studying' | 'Upcoming';
  subjects: Subject[];
  creditsRegistered: number;
  creditsCompleted: number;
  // Computed values
  totalMarksObtained: number;
  totalMarksMax: number;
  percentageMarksObtained: number;
  percentageMarksMax: number;
  percentage: number | null; // null if Not Available
  passedSubjectsCount: number;
  excludedSubjectNames: string[];
}

export interface StudentProfile {
  name: string;
  registerNumber: string;
  gender: string;
  program: string;
  college: string;
  currentSemester: string;
  address: {
    line1: string;
    line2: string;
    area: string;
    cityAndPincode: string;
  };
  email?: string;
}

export interface MonthWorkingDayConfig {
  id: string;
  monthName: string;
  year: number;
  days: number;
  semester: number; // 1 to 6
}

export interface TravelTrackerState {
  transportMode: string;
  morningCost: number;
  afternoonCost: number;
  morningRoute: string[];
  afternoonRoute: string[];
  selectedMonthId: string;
  monthlyWorkingDays: MonthWorkingDayConfig[];
  semesterWorkingDays: number;
  academicYearWorkingDays: number;
}
