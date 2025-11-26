//Zmiana tablicy testów na tekst CSV

export function testCasesToCsv(testCases) {
    const header = [
        "id",
        "name",
        "status",
        "type",
        "lastRunAt",
        "expectedResult",
    ];

    const headerRow = header.join(",") + "\n";

    const dataRows = testCases.map((tc) => {
        return [
            tc.id,
            escapeCsvValue(tc.name),
            tc.status,
            tc.type,
            tc.lastRunAt ?? "",
            escapeCsvValue(tc.expectedResult),
        ].join(",");
    }).join("\n");

    return [headerRow, ...dataRows]. join("\n");
}

//
function escapeCsvValue(value) {
    if (value == null) return "";
    
    const str = String(value);

      if (!/[",\n]/.test(str)) {
    return str;
  }

  // Problem w cudzyslow
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

export function downloadCsv(filename, csvString) {
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

export function singleTestCaseToCsv(testCase) {
    return testCasesToCsv([testCase]);
}