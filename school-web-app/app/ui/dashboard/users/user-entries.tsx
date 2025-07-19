import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
interface UserEntriesProps {
  entriesPerPage: number;
  setEntriesPerPage: (value: number) => void;
}
export default function UserEntries({
  entriesPerPage,
  setEntriesPerPage,
}: UserEntriesProps){
    return(
        <>
                    <div className="flex justify-between">
                    <div className=" p-6 flex items-center space-x-4">
                    <label htmlFor="rowsPerPage" className="mr-2">
                        Show
                    </label>
                    <select
                        id="rowsPerPage"
                        value={entriesPerPage}
                        onChange={(e) => setEntriesPerPage(Number(e.target.value))}

                        className="p-2 border rounded w-44"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <p>Entries</p>
                    </div>

                    <div className="p-6">
                    <input
                        placeholder="Search Users"
                        className=" shadow-md rounded-full pl-12 py-3 w-full font-normal text-xl text-[#2C2C2C] focus:outline-[#2C2C2C]"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-3 w-6 h-6 text-[#AEAEAE]" />
                    </div>
        </div>
        </>
    )
}