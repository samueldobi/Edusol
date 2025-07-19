export default function AlertItem() {
  return (
    <>
      <div className="flex flex-col items-center mb-10 w-full justify-between border-b-2 border-gray-200 pb-4">
        <h2
          className="text-2xl text-center font-semibold mb-4 uppercase"
          style={{
            color: '#1AA939',
          }}
        >
          Notifications
        </h2>
        <div className="flex justify-between w-full">
          <div className="flex items-center space-x-2">
            <span
              className=" w-3 h-3 "
              style={{ backgroundColor: '#1AA939' }}
            ></span>
            <span>Teachers</span>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className=" w-3 h-3 "
              style={{ backgroundColor: '#FFB400' }}
            ></span>
            <span>Student</span>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className="bg-red-500 w-3 h-3 "
              style={{ backgroundColor: '#F84141' }}
            ></span>
            <span>School</span>
          </div>
        </div>
      </div>
    </>
  );
}
