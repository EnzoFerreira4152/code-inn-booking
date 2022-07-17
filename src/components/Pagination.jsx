import React from 'react'

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) return null;

    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1)

    return (
        <div>
            <div>Nada</div>
            <ul>
                {pages.map(page => (
                    <li key={page}>
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={() => onPageChange(page)}
                        >{page}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination