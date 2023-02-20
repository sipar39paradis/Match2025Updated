import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import {
  deleteObject,
  FirebaseStorage,
  getStorage,
  listAll,
  ref,
} from 'firebase/storage';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FilesDoc } from '../interfaces/Files';
import { UserProfile, UserProfileDoc } from '../interfaces/User';
import { Questionnaire } from '../views/loggedin/TaxDeclaration/types/Questionnaire';
import { Respondent } from '../views/loggedin/TaxDeclaration/types/Respondent/Respondent';

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
const storage = getStorage();

const PROFILE_DB_NAME = 'UserProfile';
const STORAGE_BASE_FOLDER = 'customerdata/';

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

export const getAllQuestionaires = async (
  userId: string
): Promise<Respondent[]> => {
  const querySnapshot = await getDocs(
    collection(db, 'taxReport', userId, 'questionnaires')
  );

  return querySnapshot.docs.map(
    (questionaire) => <Respondent>questionaire.data()
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

export const appendRequiredFiles = async (
  fileName: string,
  userId: string
): Promise<void> => {
  getRequiredFiles(userId).then((res) => {
    if (res == undefined) {
      writeRequiredFiles([fileName], userId);
    } else {
      res?.files?.push(fileName);
      writeRequiredFiles(res?.files, userId);
    }
  });
};

export const appendExistingFiles = async (
  fileName: string,
  userId: string
): Promise<void> => {
  getExistingFiles(userId).then((res) => {
    if (res == undefined) {
      writeExistingFiles([fileName], userId);
    } else {
      res?.files.push(fileName);
      writeExistingFiles(res?.files, userId);
    }
  });
};

export const removeExistingfile = async (
  fileName: string,
  userId: string
): Promise<void> => {
  getExistingFiles(userId).then((res) => {
    if (res != undefined) {
      console.log(res.files);
      writeExistingFiles(
        res?.files?.filter((file) => file != fileName),
        userId
      );
      appendRequiredFiles(fileName, userId);
      removeUserFile(fileName, userId);
    }
  });
};

export const removeUserFile = async (
  fileName: string,
  userId: string
): Promise<void> => {
  const filesListRef = ref(storage, STORAGE_BASE_FOLDER + userId);
  listAll(filesListRef).then((res) => {
    const fileRefToRemove = res?.items?.filter((itemRef) =>
      itemRef.name.includes(fileName)
    )[0];
    deleteObject(fileRefToRemove).catch((err) => {
      console.log('There was an issue deleting the file ' + fileName);
    });
  });
};

export const removeRequiredfile = async (
  fileName: string,
  userId: string
): Promise<void> => {
  getRequiredFiles(userId).then((res) => {
    const newReqFiles = res?.files?.filter((file) => file != fileName);
    writeRequiredFiles(newReqFiles, userId);
  });
};

export const getExistingFiles = async (userId: string): Promise<FilesDoc> => {
  return <FilesDoc>(await getDoc(doc(db, 'UserExistingFiles', userId))).data();
};

export const getRequiredFiles = async (userId: string): Promise<FilesDoc> => {
  return <FilesDoc>(await getDoc(doc(db, 'UserRequiredFiles', userId))).data();
};

export const getClientProfile = async (
  userId: string
): Promise<UserProfile> => {
  return <UserProfile>(await getDoc(doc(db, 'clientProfile', userId))).data();
};

export const getAllUserProfiles = async (): Promise<Array<UserProfile>> => {
  //TODO set key to each doc as UID from user

  const returnedDocs = await getDocs(collection(db, PROFILE_DB_NAME));
  return returnedDocs.docs.map((returnedDoc) => {
    const data = returnedDoc.data();
    console.log(data, 'data');
    return addDefaultValues(
      data.type == 'accountant'
        ? docToProfile(<UserProfileDoc>data)
        : <UserProfile>data
    );
  });
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
