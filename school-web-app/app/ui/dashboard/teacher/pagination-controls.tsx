interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
}
export default function PaginationControls({ currentPage, totalPages, changePage }: PaginationControlsProps){
    return(
        <>
        {/* Entries Info */}
          <div className="w-full text-right text-[13px] text-gray-700 mt-2">
                Showing <span>1</span> to <span>10</span> of <span>502</span> entries
            </div>
            {/* Pagination Controls */}
                <div className="flex justify-end items-center gap-2 mt-3 flex-wrap">
                    <button 
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-1.5 rounded text-sm transition">
                        Previous
                    </button>
                    <button 
                     onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-1.5 rounded text-sm transition">
                    Next
                    </button>
                </div>
        </>
    )
}