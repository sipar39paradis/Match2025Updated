import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import React from 'react'

// ecelData must be in the format [{}]
// where the given object is an array of objects
export const exportToExcel = async (excelData: any[], fileName: string) =>{
    const fileType = 'application/vnd.openxmlformats-officialdocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, {bookType:'xlsx', type:'array'});
    const data = new Blob([excelBuffer], {type: fileType});
  
    FileSaver.saveAs(data, fileName + fileExtension);
}
