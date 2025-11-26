import { useMemo } from "react";

export default function useFilteredTests(
    testCases, 
    statusFilter, 
    sortBy,
    searchTerm,
    typeFilter ) {
    const result = useMemo (() => {
        let data = [...testCases];
        


        if (statusFilter != "all") {
            data = data.filter(tc => tc.status === statusFilter);
        }

        
        if (searchTerm && searchTerm.trim() !== "") {
        const lower = searchTerm.toLowerCase();
        data = data.filter((tc) =>
            tc.name.toLowerCase().includes(lower)
        );
        }

        if (typeFilter != "all") {
            data = data.filter(tc => tc.type === typeFilter);
        }


        if (sortBy === "name") {
            data.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "lastRunAt") {
            data.sort((a, b) =>
            (a.lastRunAt || "").localeCompare(b.lastRunAt || "")
        );
        }

        
        return data;
    }, [testCases, statusFilter, typeFilter, sortBy, searchTerm]);

    return result;
}