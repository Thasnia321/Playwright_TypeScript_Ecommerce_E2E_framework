import * as XLSX from 'xlsx'
import path from 'path' 

export type LoginData = {
    username: string;
    password: string;
    expected: string;
    run: string
}

export function readExcel(filePath: string, SheetName:string) : LoginData[]{
    const fullPath = path.resolve(filePath);
    console.log(fullPath);

    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[SheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;

}