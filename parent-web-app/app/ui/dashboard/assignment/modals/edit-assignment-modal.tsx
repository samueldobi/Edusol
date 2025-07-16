interface EditAssignmentModalProps {
  onClose: () => void;
  onSuccess: () => void;
  onDelete: () => void;
}

export default function EditAssignmentModal({ onClose, onSuccess, onDelete }: EditAssignmentModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h3 className="text-[#1AA939] font-bold text-xl mb-5 uppercase">Edit Assignment</h3>

        <div className="space-y-4">
          <input type="text" placeholder="Update Topic" className="w-full border border-gray-300 px-4 py-2 rounded" />
          <input type="date" className="w-full border border-gray-300 px-4 py-2 rounded" />
          <input type="date" className="w-full border border-gray-300 px-4 py-2 rounded" />
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={onDelete} className="text-red-600 font-semibold hover:underline">Delete</button>
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
  );
}
