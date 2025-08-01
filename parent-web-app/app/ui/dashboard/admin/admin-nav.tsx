import Image from "next/image";

interface AdminNavProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export default function AdminNav({ activeTab, setActiveTab }: AdminNavProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-white p-5 rounded-xl shadow-md gap-4">
      {/* Left Side */}
      <div className="flex items-center gap-5">
        <Image
          src="/images/person.png"
          alt="Educesol logo"
          className="w-10 h-10"
          width={50}
          height={50}
        />
        {/* Name and ID */}
        <div>
          <div className="text-lg font-semibold text-gray-800">Radiance  Secondary School Admin</div>
          <div className="text-sm text-gray-500">Mrs  Sarah Ademola</div>
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveTab(0)}
          className={activeTab === 0 ? 'ring-2 ring-green-500 rounded-full' : ''}
        >
          <Image
            src="/images/admin.png"
            alt="View Info"
            width={30}
            height={30}
          />
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={activeTab === 1 ? 'ring-2 ring-green-500 rounded-full' : ''}
        >
          <Image
            src="/images/update.png"
            alt="Edit Info"
            width={30}
            height={30}
          />
        </button>
      </div>
    </div>
  );
}