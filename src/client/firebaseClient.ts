import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { UserProfile, UserProfileDoc } from '../interfaces/User';

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

const PROFILE_DB_NAME = 'UserProfile';

export const getUserProfile = async (
  userEmail: string
): Promise<UserProfile> => {
  //TODO set key to each doc as UID from user

  const returnedDoc = await getDoc(doc(db, PROFILE_DB_NAME, userEmail));
  const data = returnedDoc.data();

  console.log(data, 'data');
  return addDefaultValues(
    data.type == 'accountant'
      ? docToProfile(<UserProfileDoc>data)
      : <UserProfile>data
  );
};

export const writeRequiredFiles = async (
  requiredFiles: Array<string>,
  userId: string
): Promise<void> => {
  await setDoc(doc(db, 'UserRequiredFiles', userId), {
    files: requiredFiles,
    userId: userId,
  });
};

export const writeExistingFiles = async (
  existingFiles: Array<string>,
  userId: string
): Promise<void> => {
  await setDoc(doc(db, 'UserExistingFiles', userId), {
    files: existingFiles,
    userId: userId,
  });
};

export const getClientProfile = async (
  userId: string
): Promise<UserProfile> => {
  return <UserProfile>(await getDoc(doc(db, 'clientProfile', userId))).data();
};

export const upsertUserProfile = async (
  userId: string,
  profile: UserProfile,
  merge = false
): Promise<void> => {
  profile.avatar = '123';
  await setDoc(doc(db, PROFILE_DB_NAME, userId), profile, { merge: merge });
};

const docToProfile = (profileDoc: UserProfileDoc): UserProfile => {
  return {
    avatar: profileDoc.avatar,
    blurb: profileDoc.blurb,
    cases: profileDoc.cases,
    email: profileDoc.email,
    experiece: profileDoc.experiece.map((xp) => {
      const date = new Date(0);
      date.setUTCSeconds(xp.startDate.seconds);
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
    id: profileDoc.id,
    lastName: profileDoc.lastName,
    languages: profileDoc.languages,
    location: profileDoc.location,
    rating: profileDoc.rating,
    schooling: profileDoc.schooling.map((school) => {
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
    type: profileDoc.type,
    referralCode: profileDoc.referralCode,
  };
};

const addDefaultValues = (profile: UserProfile): UserProfile => {
  const defaultValues = {
    avatar: '',
    blurb: '',
    cases: 0,
    email: '',
    experiece: [],
    firstName: '',
    id: '',
    languages: [],
    lastName: '',
    location: '',
    rating: 0,
    schooling: [],
    referralCode: '',
    type: 'client',
  };

  for (const key in defaultValues) {
    if (profile[key] == undefined) {
      profile[key] = defaultValues[key];
    }
  }

  return profile;
};
