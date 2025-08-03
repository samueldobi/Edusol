import { SchoolInformationType } from "@/app/src/api/services/schoolService";

interface AdminCardProps {
  schoolInfo: SchoolInformationType;
  onEdit?: () => void;
}

export default function AdminCard({ schoolInfo, onEdit }: AdminCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return(
        <>
        <div
      id="school-info"
      className="bg-white rounded-xl p-5 mb-5 shadow-md">
      <div className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-100">
        School Information
      </div>

      <table className="w-full border-collapse">
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">School Email</td>
            <td className="py-3 text-gray-900 font-semibold">{schoolInfo.school_email}</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">School Phone</td>
            <td className="py-3 text-gray-900 font-semibold">{schoolInfo.school_phone}</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">Address</td>
            <td className="py-3 text-gray-900 font-semibold">{schoolInfo.address}</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">Principal Name</td>
            <td className="py-3 text-gray-900 font-semibold">{schoolInfo.principal_name}</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">Website</td>
            <td className="py-3 text-gray-900 font-semibold">
              {schoolInfo.website ? (
                <a href={schoolInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {schoolInfo.website}
                </a>
              ) : (
                'Not provided'
              )}
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">Created At</td>
            <td className="py-3 text-gray-900 font-semibold">{formatDate(schoolInfo.created_at)}</td>
          </tr>
          <tr>
            <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">Last Updated</td>
            <td className="py-3 text-gray-900 font-semibold">{formatDate(schoolInfo.updated_at)}</td>
          </tr>
        </tbody>
      </table>

      <button
        className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg block mx-auto mt-8 hover:bg-green-700 hover:-translate-y-0.5 transition-transform duration-200"
        onClick={onEdit}
      >
        Update School Information
      </button>
    </div>
        </>
    )
}