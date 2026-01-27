// PaginatedList.jsx
import React, { useEffect, useMemo, useState } from 'react';
import PaginationControls from './PaginationControls';
import PropTypes from 'prop-types';

export default function PaginatedList({
    items = [],
    pageSizeOptions = [5, 10, 25],
    initialPageSize = 10,
    initialPage = 1,
    renderItem,            // function(item, indexOnPage) => JSX
    renderEmpty,           // optional fallback when no items
    className = ''
}) {
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    // Reset page if items or pageSize change
    useEffect(() => {
        setCurrentPage(1);
    }, [items, pageSize]);

    // Ensure currentPage stays valid
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [currentPage, totalPages]);

    const pageItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return items.slice(start, start + pageSize);
    }, [items, currentPage, pageSize]);

    const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(totalItems, currentPage * pageSize);

    return (
        <div className={className}>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted">
                    Showing {totalItems === 0 ? '0' : `${startIndex}–${endIndex}`} of {totalItems}
                </small>

                <div className="d-flex align-items-center">
                    <label className="me-2 mb-0 small">Page size</label>
                    <select
                        className="form-select form-select-sm me-3"
                        style={{ width: 80 }}
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {pageSizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onChange={setCurrentPage}
                    />
                </div>
            </div>

            {totalItems === 0 ? (
                renderEmpty ? renderEmpty() : <div className="text-center text-muted">No records found</div>
            ) : (
                <>
                    {pageItems.map((it, idx) => renderItem(it, idx))}
                </>
            )}

            <div className="d-flex justify-content-end mt-2">
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={setCurrentPage}
                />
            </div>
        </div>
    );
}

PaginatedList.propTypes = {
    items: PropTypes.array,
    pageSizeOptions: PropTypes.array,
    initialPageSize: PropTypes.number,
    initialPage: PropTypes.number,
    renderItem: PropTypes.func.isRequired,
    renderEmpty: PropTypes.func,
    className: PropTypes.string
};
