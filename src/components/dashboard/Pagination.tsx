"use client"
import React from 'react'

export default function Pagination({total, loaded, limit, onPageChange}: any) {
    const [pageNo, setPageNo] = React.useState(1);

    const handlePageChange = (page: number) => {
        setPageNo(page);
        onPageChange(page);
    };


  return (
    <div className="flex justify-center items-center gap-2">
        <button onClick={() => {handlePageChange(pageNo - 1)}} disabled={pageNo === 1} className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded cursor-pointer">Previous</button>
        <span>Page {pageNo} of {Math.ceil(total / limit)}</span>
        <button onClick={() => {handlePageChange(pageNo + 1)}} disabled={pageNo === Math.ceil(total / limit)} className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded cursor-pointer">Next</button>
    </div>
  )
}
