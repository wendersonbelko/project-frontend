import * as XLSX from 'xlsx';

interface ExportToExcelProps {
    data: any[];
    name: string;
}

function exportToExcel(props: ExportToExcelProps): void {
    const ws = XLSX.utils.json_to_sheet(props.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, props?.name ?? 'Sheet1');
    XLSX.writeFile(wb, `${props.name}.xlsx`);
}

export default {
    exportToExcel,
};
