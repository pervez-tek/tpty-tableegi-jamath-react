import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export default function PaginationControls({ currentPage, totalPages, onChange }) {
    if (totalPages <= 1) return null;
    const pages = [];
    const maxButtons = 1;
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    return (
        <Pagination>
            <Pagination.First onClick={() => onChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => onChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />
            {/* {start > 1 && <Pagination.Ellipsis disabled />} */}
            {pages.map(p => <Pagination.Item key={p} active={p === currentPage} onClick={() => onChange(p)}>{p}</Pagination.Item>)}
            {/* {end < totalPages && <Pagination.Ellipsis disabled />} */}
            <Pagination.Next onClick={() => onChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => onChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
    );
}
