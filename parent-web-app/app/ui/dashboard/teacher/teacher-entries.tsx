interface TeacherEntriesProps {
  entriesPerPage: number;
  setEntriesPerPage: (value: number) => void;
}

export default function  TeacherEntries({entriesPerPage, setEntriesPerPage}: TeacherEntriesProps){
    return(
        <>
       <div className="flex items-center justify-between gap-4 mb-2 flex-nowrap w-full p-2">
        <label className="flex items-center text-sm gap-2 flex-shrink-0">
            Show
            <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-green-600 transition-all w-[110px]">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>75</option>
            </select>
            Entries
        </label>

        <input
            type="search"
            placeholder="Search"
            className="px-3 py-1 border border-gray-300 rounded text-sm w-[180px] flex-shrink-0"
        />
</div>


        </> 
    )
}