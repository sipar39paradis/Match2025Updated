import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { AccountantProfile, Experience, Schooling } from '../interfaces/User';

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
  const returnedDoc = await getDoc(doc(db, 'accountantProfile', userEmail));
  const profile = <AccountantProfile>returnedDoc.data();
  profile.experiece.forEach((xp, i) => {
    const date = new Date(0);
    date.setUTCSeconds(xp.startDate.seconds);
    profile.experiece[i].startDateObj = date;
  });
  profile.schooling.forEach((school, i) => {
    const date = new Date(0);
    date.setUTCSeconds(school.graduationDate.seconds);
    profile.schooling[i].graduationDateObj = date;
  });
  return profile;
  // console.log(returnedDoc);
  // return {
  //   casesCompleted: returnedDoc.casesCompleted,
  //   email: returnedDoc.email,
  //   experiece: returnedDoc.experience.map(
  //     (experiece) =>
  //       <Experience>{
  //         businessName: experiece.businessName,
  //         duration: experiece.duration,
  //         jobTitle: experiece.jobTitle,
  //         startDate: experiece.startDate.seconds,
  //         verified: experiece.verified,
  //       }
  //   ),
  //   firstName: returnedDoc.firstName,
  //   lastName: returnedDoc.lastName,
  //   rating: returnedDoc.rating,
  //   schooling: returnedDoc.schooling.map(
  //     (schooling) =>
  //       <Schooling>{
  //         degree: schooling.degree,
  //         graduationDate: schooling.graduationDate.seconds,
  //         school: schooling.school,
  //         verified: schooling.verified,
  //       }
  //   ),
  // };
};
