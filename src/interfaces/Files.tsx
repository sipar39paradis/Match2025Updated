import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, WithFieldValue, SnapshotOptions} from 'firebase/firestore'

type Files = {
  files: Array<string>
}

export const FileListConverter: FirestoreDataConverter<Files> = {
  toFirestore(files: WithFieldValue<Files>): DocumentData {
    return { files: files.files};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Files {
    const data = snapshot.data(options);
    return {
      files: data.files,
    };
  },
};

