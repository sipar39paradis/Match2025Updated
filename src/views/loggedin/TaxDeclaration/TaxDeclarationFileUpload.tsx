import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useContext } from 'react';
import { getRequiredFiles } from '../../../client/firebaseClient';
import { AppContext, AppContextType } from '../../../context/AppContext';


const db = getFirestore()

export function TaxDeclarationFileUpload (){
    const { user } = useContext(AppContext) as AppContextType
    const userId = 'C5jx5sbMJQbE0rSHnfVzQnc3Ngj1'


    console.log(getDoc(doc(db, 'UserRequiredFiles', userId)).then((res) => {
        console.log(res.data())
        console.log(res)
    })
)
    return <>

    </>
}