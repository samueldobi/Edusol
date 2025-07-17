interface ManageCalendarModalProps {
  onClose: () => void;
}
export default function ManageCalendarModal({onClose}:ManageCalendarModalProps){
    return(
        <>
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 bg-gray-100 border-b border-gray-200">
        <h2 className="text-green-600 font-bold text-sm tracking-wide">MANAGE EVENTS</h2>
        <div className="flex gap-2 items-center">
          <button className="bg-green-600 text-white text-xs font-semibold uppercase px-3 py-1 rounded hover:shadow">
            Manage
          </button>
          <button 
          className="border-2 border-green-600 text-green-600 text-xs font-semibold uppercase px-3 py-1 rounded hover:shadow">
            Compose New
          </button>
          <button
          onClick={onClose} 
          className="text-5xl font-bold px-2 text-red-600 hover:text-red-900">×</button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Show</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-3 py-1 text-sm w-52"
          />
        </div>

        {/* Events Table */}
        <table className="w-full border border-gray-200 text-sm mb-4">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="text-left px-3 py-2 border-r">Event Name</th>
              <th className="text-left px-3 py-2 border-r">Recipients</th>
              <th className="text-left px-3 py-2 border-r">Info</th>
              <th className="text-left px-3 py-2 border-r">Date</th>
              <th className="text-left px-3 py-2 border-r">Edit</th>
              <th className="text-left px-3 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(4)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-2 border-r">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full text-white uppercase bg-green-600">
                    Event Name
                  </span>
                </td>
                <td className="px-3 py-2 border-r">All</td>
                <td className="px-3 py-2 border-r">View notification</td>
                <td className="px-3 py-2 border-r">1/1/2025</td>
                <td className="px-3 py-2 border-r">
                  <button className="text-sm hover:bg-gray-100 px-2 py-1 rounded">✏️</button>
                </td>
                <td className="px-3 py-2">
                  <button className="text-sm hover:bg-gray-100 px-2 py-1 rounded">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-gray-200 pt-4 text-sm text-gray-600">
          <div>Showing 1 to 4 of 4 entries</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded text-sm opacity-50 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border rounded bg-green-600 text-white">1</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
        </div>
        </div>
    
        </>
    )
}