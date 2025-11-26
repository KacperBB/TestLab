export function parseTestCasesCsv(csvString) {
    const trimmed = csvString.trim();
    if(!trimmed) return[];

    const lines = trimmed.split(/\r?\n/);

    const [headerLine, ...dataLines] = lines;
    const header = headerLine.split(",");

    const expectedHeader = [
        "id",
        "name",
        "status",
        "type",
        "lastRunAt",
        "expectedResult",  
    ];

    if (!arraysEqual(header, expectedHeader)) {
        throw new Error("Nieprawidłowy nagłówek CSV");
    }

    const testCases = dataLines
    .filter((line) => line.trim() !== "")
    .map((line) => {
        const values = parseCsvLine(line);
        const [id, name, status, type, lastRunAt, expectedResult] = values;

        return {
            id,
            name,
            status,
            type,
            lastRunAt: lastRunAt || null,
            expectedResult,
        };
    }); 
    return testCases;
}

function parseCsvLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            result.push(current);
            current = "";
        } else {
            current += char;
        }

    }
    result.push(current);
    return result;  

}

function arraysEqual(a, b) {
    if(a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
}