import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import React from 'react'
import { Questionnaire } from '../views/loggedin/TaxDeclaration/types/Questionnaire/Questionnaire'
import { ProvinceEnum } from '../views/loggedin/TaxDeclaration/types/Questionnaire/ContactDetails'

// ecelData must be in the format [{}]
// where the given object is an array of objects
const exportToExcel = async (excelData: any[], fileName: string) =>{
    const fileType = 'application/vnd.openxmlformats-officialdocument.spreadsheetml.sheet;charset=UTF-8'

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, {bookType:'xlsx', type:'array'});
    const data = new Blob([excelBuffer], {type: fileType});
    const arrBuf = await data.arrayBuffer();
    return arrBuf;
}


export const personalInformationAsExcel = (questionnaire: Questionnaire) => {
    console.log(questionnaire)
    const asJson = {
        'FirstNames': questionnaire?.personalInformations?.firstName,
        'LastNames': questionnaire?.personalInformations?.lastName,
        'PostalAddress': questionnaire?.contactDetails?.address,
        'PostalNumber': questionnaire?.contactDetails?.postal,
        'PostalApt': questionnaire?.contactDetails?.appartment,
        'PostalCity': questionnaire?.contactDetails?.city,
        'PostalProvince': (questionnaire?.contactDetails?.isDifferentProvince) ? questionnaire?.contactDetails?.differentProvince : ProvinceEnum.QUEBEC,
        'PostalCountry': 'Canada',
        'CellPhone': questionnaire?.contactDetails?.phoneNumber,
        'EmailAddress': questionnaire?.personalInformations?.email,
        'SIN': questionnaire?.personalInformations?.socialInsuranceNumber,
        'DataOfBirth': questionnaire?.personalInformations?.birthDay
    }

    return exportToExcel([asJson], questionnaire?.personalInformations?.firstName + '_' + questionnaire?.personalInformations?.lastName)
}