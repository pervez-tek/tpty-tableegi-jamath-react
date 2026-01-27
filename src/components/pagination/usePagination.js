import { useEffect, useMemo, useState } from 'react';

export function usePagination(items = [], initialPageSize = 10, initialPage = 1) {
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    useEffect(() => setCurrentPage(1), [items, pageSize]);
    useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

    const pageItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return items.slice(start, start + pageSize);
    }, [items, currentPage, pageSize]);

    return {
        pageItems,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        totalItems,
        totalPages
    };
}
