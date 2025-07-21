import { notificationsData } from '../../lib/placeholder-data';
interface ManageNotificationModalProps {
  onClose: () => void;
}
export default function ManageNotificationModal({onClose}:ManageNotificationModalProps) {
  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        onClick={onClose}>
      <div 
        onClick={(e)=> e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl max-h-[80vh] overflow-y-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-3 font-semibold border-b">Type</th>
              <th className="p-3 font-semibold border-b">Heading</th>
              <th className="p-3 font-semibold border-b">Info</th>
              <th className="p-3 font-semibold border-b">Date</th>
              <th className="p-3 font-semibold border-b">Edit</th>
              <th className="p-3 font-semibold border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {notificationsData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.heading}</td>
                <td className="p-3">{item.info}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">
                  <button className="text-cyan-600 hover:bg-cyan-50 rounded p-1">✏️</button>
                </td>
                <td className="p-3">
                  <button className="text-red-500 hover:bg-red-50 rounded p-1">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
