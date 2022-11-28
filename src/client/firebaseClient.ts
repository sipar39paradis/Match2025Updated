import { initializeApp } from 'firebase/app';
import {
  doc,
  collection,
  getDoc,
  getFirestore,
  query,
  setDoc,
  where,
  getDocs,
} from 'firebase/firestore';
import {
  AccountantProfile,
  AccountantProfileDoc,
  Experience,
  Schooling,
} from '../interfaces/User';

const firebaseConfig = {
  apiKey: 'AIzaSyBlDTJ__d4BGvkE1aNX5l9UWMbh6Cloz-E',

  authDomain: 'impot-match.firebaseapp.com',

  projectId: 'impot-match',

  storageBucket: 'impot-match.appspot.com',

  messagingSenderId: '689989068082',

  appId: '1:689989068082:web:a480fd7ebb3c0276cf632b',

  measurementId: 'G-6JTV1BLMVR',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getProfile = async (
  userEmail: string
): Promise<AccountantProfile> => {
  //TODO set key to each doc as UID from user

  const returnedDoc = await getDoc(doc(db, 'accountantProfile', userEmail));
  const profile = docToProfile(<AccountantProfileDoc>returnedDoc.data());

  // profile.experiece.forEach((xp, i) => {
  //   const date = new Date(0);
  //   date.setUTCSeconds(xp.startDate.seconds);
  //   profile.experiece[i].startDateObj = date;
  // });
  // profile.schooling.forEach((school, i) => {
  //   const date = new Date(0);
  //   date.setUTCSeconds(school.graduationDate.seconds);
  //   profile.schooling[i].graduationDateObj = date;
  // });
  return profile;
};

export const upsertProfile = async (
  userEmail: string,
  profile: AccountantProfile
): Promise<void> => {
  await setDoc(doc(db, 'accountantProfile', userEmail), profile);
};

const docToProfile = (profileDoc: AccountantProfileDoc): AccountantProfile => {
  return {
    blurb: profileDoc.blurb,
    casesCompleted: profileDoc.casesCompleted,
    email: profileDoc.email,
    experiece: profileDoc.experiece.map((xp, i) => {
      const date = new Date(0);
      date.setUTCSeconds(xp.startDateObj.seconds);
      return {
        businessName: xp.businessName,
        blurb: xp.blurb,
        durationMonths: xp.durationMonths,
        durationYears: xp.durationYears,
        jobTitle: xp.jobTitle,
        startDate: xp.startDate,
        startDateObj: date,
        verified: xp.verified,
      };
    }),
    firstName: profileDoc.firstName,
    lastName: profileDoc.lastName,
    languages: profileDoc.languages,
    location: profileDoc.location,
    rating: profileDoc.rating,
    schooling: profileDoc.schooling.map((school, i) => {
      const date = new Date(0);
      date.setUTCSeconds(school.graduationDateObj.seconds);
      return {
        blurb: school.blurb,
        degree: school.degree,
        graduationDate: school.graduationDate,
        graduationDateObj: date,
        school: school.school,
        verified: school.verified,
      };
    }),
  };
};
