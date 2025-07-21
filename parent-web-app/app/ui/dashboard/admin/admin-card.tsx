export default function AdminCard(){
    return(
        <>
        <div
      id="student-info"
      className="bg-white rounded-xl p-5 mb-5 shadow-md">
      <div className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-100">
        Admin Information
      </div>

      <table className="w-full border-collapse">
        <tbody>
          {[
            ['Full Name', 'Tola Diamond'],
            ['Email Addres', 'tendertouch@gmail.com'],
            ['Phone number', '08037743942'],
            ['School Name', 'Tenderkids School'],
            ['Role', 'Principal'],
            ['Teachers Name', 'Mr JS Brown'],
            ['Account Created On', '10-12-2023'],
            ["Total Students", '456'],
            ['Number of Clases', '25'],
            ['Parent / Guardian Relationship', 'Mother'],
          ].map(([label, value], index, arr) => (
            <tr
              key={label}
              className={index !== arr.length - 1 ? 'border-b border-gray-100' : ''}
            >
              <td className="py-3 pr-3 text-gray-600 font-medium w-2/5">{label}</td>
              <td className="py-3 text-gray-900 font-semibold">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg block mx-auto mt-8 hover:bg-green-700 hover:-translate-y-0.5 transition-transform duration-200"
      >
        Update
      </button>
    </div>
        </>
    )
}