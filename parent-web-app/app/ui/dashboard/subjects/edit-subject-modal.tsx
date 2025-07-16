interface EditSubjectModalProps {
  onClose: () => void;
  onSuccess: () => void;
}
export default function EditSubjectModal({onClose, onSuccess}: EditSubjectModalProps){
    return(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] overflow-y-auto">
        <h3 className="text-[#1AA939] font-bold text-xl mb-5 uppercase">List of Teachers </h3>

        <div className="space-y-4 text-[#071331] font-bold">
          <p>List of teachers</p>
          <p>Mr. Adeyemi <span></span></p>
          <p>Mrs. Okafor</p>
          <p>Mr. Yusuf</p>
          <p>Mr. Nkem</p>
          <p>Mr. Fred</p>
          <p>Mr. Yusuf</p>
          <p>Mrs. Johnson</p>
          <p>Mr. Micheal</p>

        </div>

        <div className="flex justify-between mt-6">
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button onClick={onSuccess} className="px-6 py-2 bg-[#1AA939] text-white font-bold rounded hover:bg-[#1d5329]">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}