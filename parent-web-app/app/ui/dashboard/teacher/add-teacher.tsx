import Image from "next/image"
export default function AddTeacherModal({onClose}){
    return(
        <>
      {/* Overlay and Modal Wrapper */}
      <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
        
        {/* Scrollable Modal Content */}
        <div 
        onClick={(e)=>e.stopPropagation()}
        className="bg-white max-w-2xl w-full max-h-screen overflow-y-auto rounded-lg shadow-lg p-6 sm:p-8">
          {/* Title */}
          <div className="flex justify-between">
          <div className="text-green-600 font-bold text-lg mb-6">
            ADD TEACHER PROFILE INFORMATION
          </div>
          <button 
          onClick={onClose}
          className="text-red-600 text-3xl font-[1000] mb-6">
            X
          </button>
          </div>

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <span className="absolute bottom-0 right-0 bg-green-600 text-white w-7 h-7 flex items-center justify-center rounded-full border-2 border-white text-lg font-semibold">
                +
              </span>
              <Image
                src="/teacher.png"
                width={40}
                height={40}
                className="w-[56px] h-[70px] object-contain"
                alt="Profile Placeholder"
              />
            </div>
            <span className="text-gray-500 text-sm mt-2">
              Add profile Picture
            </span>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4">
            {[
              { label: "Bio", id: "bio" },
              { label: "Full Name", id: "fullname" },
              { label: "Department", id: "department" },
              { label: "Class", id: "class" },
              { label: "Subject Case", id: "subjectcase" },
              { label: "Extra Position", id: "extraposition" },
              { label: "Degree", id: "degree1" },
              { label: "Phone number", id: "phonenumber" },
              { label: "Degree", id: "degree2" },
            ].map((field) => (
              <div
                key={field.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full"
              >
                <label
                  htmlFor={field.id}
                  className="text-sm font-medium text-gray-700 min-w-[130px]"
                >
                  {field.label}
                </label>
                <input
                  type="text"
                  id={field.id}
                  className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            ))}

            {/* File Upload */}
            <div className="flex items-center gap-3 bg-gray-100 w-full sm:w-[67%] border border-gray-300 rounded-md p-3">
              <Image
                src="/teacher.png"
                width={40}
                height={40}
                className="w-[35px] h-[36px] object-contain"
                alt="Add File"
              />
              <label htmlFor="portfolio" className="flex-1 text-sm text-gray-700">
                Add file
              </label>
              <input type="file" id="portfolio" className="flex-1 text-sm" />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between">
                <div className=" mt-2">
                <button
                onClick={onClose}
                className="bg-red-600 text-white px-6 py-2 rounded-md font-bold hover:bg-red-900 transition"
              >
                CLOSE
              </button>
                </div>
             <div className=" mt-2">
              <button
                type="submit"
                onClick={onClose}
                className="bg-green-600 text-white px-6 py-2 rounded-md font-bold hover:bg-green-700 transition"
              >
                SAVE
              </button>
            </div>
            </div>
           
          </form>
        </div>
      </div>

        </>
    )
}