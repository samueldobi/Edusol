type NotificationItem = {
  icon: string;
  type: string;
  date: string;
  time: string;
  heading: string;
  info: string;
};
export default function NotificationTable({
  notificationsData,
}: {
  notificationsData: NotificationItem[];
}){

    function getTypeColor(type:string) {
  switch (type) {
    case 'alert':
      return 'bg-blue-100 text-blue-700';
    case 'success':
      return 'bg-red-100 text-red-700';
    case 'reminder':
      return 'bg-purple-100 text-purple-700';
    case 'update':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}
    return(
        <>
        {notificationsData.map((item, index)=>{
            return(
                <div 
                key={index}
                className="flex items-start p-4 md:p-5 border-b border-gray-100 gap-4 hover:bg-gray-100 transition-colors">
            
            <div className="w-9 h-9 md:w-10 md:h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm md:text-base flex-shrink-0">
                {item.icon}
            </div>

            {/* Notification Content */}
            <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                <span className={`bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded
                        ${getTypeColor(item.type)}
                    `}>
                    {item.type}
                </span>
                <span className="font-semibold text-gray-800 text-sm">
                    {item.heading}
                </span>
                </div>

                {/* Body Text */}
                <div className="text-gray-600 text-sm leading-relaxed">
                {item.info}
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-gray-400 text-xs mt-2">
                <span>{item.date}</span>
                <span>{item.time}</span>
                </div>
            </div>
            </div>
            )
            
        })}
         

        </>
    )
}