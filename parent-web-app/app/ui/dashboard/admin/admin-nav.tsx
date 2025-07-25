import Image from "next/image";
export default function AdminNav(){
    return(
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-white p-5 rounded-xl shadow-md gap-4">
      {/* Left Side */}
      <div className="flex items-center gap-5">
        <Image
          src="/person.png"
          alt="Educesol logo"
          className="w-10 h-10"
          width={50}
          height={50}/>
       

        {/* Name and ID */}
        <div>
          <div className="text-lg font-semibold text-gray-800">Tenderkids Secondary School Admin</div>
          <div className="text-sm text-gray-500">Mr Ajayi</div>
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        <Image
          src="/shape.png"
          alt="Educesol logo"
          // className="w-10 h-10"
          width={40}
          height={40}/>
        <Image
          src="/contact.png"
          alt="Educesol logo"
          // className="w-10 h-10"
          width={30}
          height={30}/>
        <Image
          src="/bank.png"
          alt="Educesol logo"
          // className="w-10 h-10"
          width={30}
          height={30}/>
        <Image
          src="/setting.png"
          alt="Educesol logo"
          // className="w-10 h-10"
          width={40}
          height={40}/>
      </div>
    </div>
    )
}