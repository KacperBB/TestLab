import { useState, useMemo, useEffect } from "react";

export default function usePagination(items, pageSize = 10) {
    const [ currentPage, setCurrentPage ] = useState(1);

    // Calculate total pages
    const pageCount = useMemo(() => {
        return Math.max(1, Math.ceil(items.length / pageSize));
    }, [items.length, pageSize]);

    useEffect(() => {
        if (currentPage > pageCount) {
            setCurrentPage(pageCount);
        }
    }, [currentPage, pageCount]);

    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return items.slice(start, end);
    }, [items, currentPage, pageSize]);

    function goToPage(page) {
        if (page < 1 || page > pageCount) return;
        setCurrentPage(page);
    }

    function nextPage() {
        setCurrentPage((prev) => (prev < pageCount ? prev + 1 : prev));
    }

    function prevPage() {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    }

    return {
        currentPage,
        pageCount,
        pageSize,
        currentItems,
        goToPage,
        nextPage,
        prevPage,
    };
}