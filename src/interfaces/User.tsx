export interface UserProfile {
  blurb?: string;
  cases?: number;
  email: string;
  experiece?: Array<Experience>;
  firstName: string;
  referralCode: string;
  id: string;
  lastName: string;
  languages?: Array<string>;
  location?: string;
  rating?: number;
  schooling?: Array<Schooling>;
  avatar: string;
  type?: 'accountant' | 'client';
}

export interface Experience {
  businessName: string;
  blurb: string;
  durationMonths: number;
  durationYears: number;
  jobTitle: string;
  startDate: Time;
  startDateObj: Date;
  verified: boolean;
}

export interface Schooling {
  blurb: string;
  degree: string;
  graduationDate: Time;
  graduationDateObj: Date;
  school: string;
  verified: boolean;
}

export interface UserProfileDoc {
  avatar: string;
  blurb?: string;
  cases?: number;
  email: string;
  experiece?: Array<ExperienceDoc>;
  firstName: string;
  id: string;
  lastName: string;
  referralCode: string;
  languages?: Array<string>;
  location?: string;
  rating?: number;
  schooling?: Array<SchoolingDoc>;
  type?: 'accountant' | 'client';
}

export interface ExperienceDoc {
  businessName: string;
  blurb: string;
  durationMonths: number;
  durationYears: number;
  jobTitle: string;
  startDate: Time;
  startDateObj: Time;
  verified: boolean;
}

export interface SchoolingDoc {
  blurb: string;
  degree: string;
  graduationDate: Time;
  graduationDateObj: Time;
  school: string;
  verified: boolean;
}

export interface Time {
  seconds: number;
  nanoseconds: number;
}

export type InErr = {
  [key: string]: boolean;
};
