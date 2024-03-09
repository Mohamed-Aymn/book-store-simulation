interface Record {
    [key: string]: any;
}

export const formattedTablePrint = (records: Record[]): void => {
    const headers = Object.keys(records[0]);
    const gap = 15;

    const columnWidths: Record = {};
    for (const header of headers) {
        let maxWidth = 0;
        for (const record of records) {
            const value = String(record[header]);
            if (value.length > maxWidth) {
                maxWidth = value.length;
            }
        }
        columnWidths[header] = maxWidth;
    }

    let table = '';

    // Header row
    for (const header of headers) {
        table += header.padEnd(columnWidths[header] + gap);
    }
    table += '\n';

    // Data rows
    for (const record of records) {
        for (const header of headers) {
            table += String(record[header]).padEnd(columnWidths[header] + gap);
        }
        table += '\n';
    }

    console.log(table)
}

export const formattedObjectPrint = (object: { [key: string]: string }): void => {
    Object.keys(object).forEach(key => {
        console.log(`${key}:  ${object[key]}`);
    });
}