// NotificationItem.js
export default function NotificationItem({
  type,
  name,
  message,
}: {
  type: string;
  name: string;
  message: string;
}) {
  let borderColor = 'border-green-500';
  if (type === 'Student') {
    borderColor = 'border-yellow-500';
  } else if (type === 'School') {
    borderColor = 'border-red-500';
  }
  return (
    <div
      className={`flex items-center space-x-4 p-2 border rounded-md ${borderColor} mb-2 w-full`}
    >
      <span className="text-xl">🧑</span>
      <div className="flex flex-col w-full">
        {/* Name - Shrinks and truncates if necessary */}
        <p className="font-semibold truncate">{name}</p>

        {/* Message - Breaks words properly and wraps within container */}
        <p className="text-sm break-words w-full max-w-xs sm:max-w-md">
          {message}
        </p>
      </div>
    </div>
  );
}
