import path from 'path'
import { readCSV } from '../utils/csvReader'
import { readExcel } from '../utils/excelReader'
import fs, { readFileSync } from 'fs'

export function readData(filePath: string, sheetName?: string) {
    const ext = path.extname(filePath).toLowerCase();

    switch (ext) {
        case ".cvs":
            console.log("Im reading a CSV")
            return readCSV(filePath);

        case ".xlsx":
            console.log("Im reading a Excel")
            return readExcel(filePath, sheetName);

        case ".json":
            console.log("Im reading a json file")
            const JSONData = fs.readFileSync(filePath, 'utf8')
            return JSON.parse(JSONData);
         
        default:
            throw new Error (`Unsupported ile format - ${ext}`)    

    }


}