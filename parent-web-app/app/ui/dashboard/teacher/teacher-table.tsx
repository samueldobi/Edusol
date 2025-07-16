import Image from "next/image";
import { teachersTable } from "@/app/lib/placeholder-data";
export default function TeacherTable({data}){
  const visibleTeachers = data;
    return(
        <>
        <div className="w-full">
      {/*Card layout for mobile */}
      <div className="block md:hidden space-y-4">
        {visibleTeachers.map((teacher, idx) => (
          <div
            key={idx}
            className="bg-white shadow p-4 rounded-md border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-2">
           <Image
              src={teacher.photo}
              width={30}
              height={30}
              alt={teacher.name}
            />
              <div>
                <p className="font-bold text-gray-800">{teacher.name}</p>
                <p className="text-sm text-gray-500">{teacher.subject}</p>
              </div>
            </div>
            <p className="text-sm mb-1">
              <span className="font-semibold">Class:</span> {teacher.class}
            </p>
            <div className="flex justify-between items-center mt-3">
              <button className="text-green-700 text-sm font-semibold underline">View Profile</button>
              <div className="flex gap-2">
                          <Image
              src={teacher.chatIcon}
              width={30}
              height={30}
              alt={teacher.name}
            />
                           <Image
              src={teacher.editIcon}
              width={30}
              height={30}
              alt={teacher.name}
            />
                           <Image
              src={teacher.deleteIcon}
              width={30}
              height={30}
              alt={teacher.name}
            />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*  Table layout for larger screens */}
      <div className="hidden md:block">
        <div className="grid grid-cols-8 bg-gray-100 text-green-600 font-bold text-sm p-3 rounded-t-md">
          <div>Name</div>
          <div>Photo</div>
          <div>About</div>
          <div>Class</div>
          <div>Subject</div>
          <div>Chat</div>
          <div>Edit</div>
          <div>Delete</div>
        </div>

        {visibleTeachers.map((teacher, idx) => (
          <div
            key={idx}
            className="grid grid-cols-8 gap-2 items-center border-b border-gray-100 px-3 py-2 text-sm"
          >
            <div>{teacher.name}</div>
            <div>
            <Image
              src={teacher.photo}
              width={30}
              height={30}
              alt={teacher.name}
            />
            </div>
            <div className="text-green-700 cursor-pointer font-medium">View</div>
            <div>{teacher.class}</div>
            <div>{teacher.subject}</div>
            <div>
            <Image
              src={teacher.chatIcon}
              width={30}
              height={30}
              alt={teacher.name}
            />
            </div>
            <div>
            <Image
              src={teacher.editIcon}
              width={30}
              height={30}
              alt={teacher.name}
            />
            </div>
            <div>
            <Image
              src={teacher.deleteIcon}
              width={25}
              height={25}
              alt={teacher.name}
            />
            </div>
          </div>
        ))}
      </div>

      {/* pagination */}
        
 

      </div>


        </>
    )
}