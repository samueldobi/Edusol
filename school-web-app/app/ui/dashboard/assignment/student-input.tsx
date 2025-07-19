export default function StudendInput(){
    return(
        <>
    <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 mb-10">
        {/* Search Input with Icon */}
        <div className="relative flex-1 min-w-[250px]">
            <input
            type="text"
            placeholder="Enter Student ID"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-base"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        </div>

        {/* Readonly Student Name */}
        <input
            type="text"
            id="studentName"
            value="Damilare Kayode Gabriel"
            readOnly
            className="flex-1 min-w-[250px] px-4 py-2 rounded-lg border border-gray-300 text-base font-semibold text-gray-800 bg-white cursor-pointer"
        />
        </div>

        </>
    )
}