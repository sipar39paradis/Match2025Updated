export interface User {
  name: string
  email: string
  avatar: string
}

export interface AccountantProfile {
  blurb: string
  casesCompleted: number
  email: string
  experiece: Array<Experience>
  firstName: string
  lastName: string
  languages: Array<string>
  location: string
  rating: number
  schooling: Array<Schooling>
}

export interface Experience {
  businessName: string
  blurb: string
  durationMonths: number
  durationYears: number
  jobTitle: string
  startDate: Time
  startDateObj: Date
  verified: boolean
}

export interface Schooling {
  blurb: string
  degree: string
  graduationDate: Time
  graduationDateObj: Date
  school: string
  verified: boolean
}

export interface Time {
  seconds: number
  nanoseconds: number
}