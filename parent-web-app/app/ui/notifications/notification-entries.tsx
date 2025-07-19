export default function NotificationEntries(){
    return(
        <>
       <div className="p-4 space-y-4">
          
            <div className="text-[#1AA939] text-2xl  font-semibold">
                All Notifications
            </div>

      
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
           
                <div className=" p-2w-full md:w-auto">
                    <div className="p-1 flex items-center space-x-4">
                    <label htmlFor="rowsPerPage" className="mr-2">
                        Show
                    </label>
                    <select
                        id="rowsPerPage"
                        // value={entriesPerPage}
                        // onChange={(e) => setEntriesPerPage(Number(e.target.value))}

                        className="p-2 border rounded w-44"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <p>Entries</p>
                    </div>
                </div>

                
                <div className=" p-4  shadow w-full md:w-auto">
                <div className="relative ">
                        <input
                        type="text"
                        placeholder="Search Notification"
                        className="w-full pl-10 pr-4 py-2 text-base   shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">
                        🔍
                        </span>
                    </div>
                </div>
            </div>
            </div>

        </>
    )
}