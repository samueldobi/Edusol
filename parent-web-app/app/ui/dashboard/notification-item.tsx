// NotificationItem.js
import clsx from 'clsx';
export default function NotificationItemWrapper() {
  return (
    <>
      <NotificationItem
        type="Teachers"
        name="Mr. Ben Roman"
        message="I have an objection about the school new formation on class!"
      />
      <NotificationItem
        type="Student"
        name="Mr. Ben Roman"
        message="I have an objection about the school new formation on class!"
      />
      <NotificationItem
        type="School"
        name="Mr. Ben Roman"
        message="I have an objection about the school new formation on class!"
      />
      <NotificationItem
        type="Teachers"
        name="Mr. Ben Roman"
        message="I have an objection about the school new formation on class!"
      />
    </>
  );
}

export function NotificationItem({
  type,
  name,
  message,
}: {
  type: string;
  name: string;
  message: string;
}) {
  let borderColor = 'bg-green-500';
  if (type === 'Student') {
    borderColor = 'bg-yellow-500';
  } else if (type === 'School') {
    borderColor = 'bg-red-500';
  }
  return (
    <div className={`flex items-center space-x-4 p-2  mb-2 w-full`}>
      <div className={`flex-shrink-0 ${borderColor} w-16 h-16 rounded-full`}>
        <img src="/teacher.png" alt="avatar of a teacher" />
      </div>

      <div className="flex flex-col w-full">
        {/* Name - Shrinks and truncates if necessary */}
        <p className="font-semibold truncate">{name}</p>

        {/* Message - Breaks words properly and wraps within container */}
        <p
          className=" break-words w-full max-w-xs sm:max-w-md"
          style={{ fontSize: '0.70rem' }}
        >
          {message}
        </p>
        <span className={`${borderColor} w-full h-1 rounded-sm`}></span>
      </div>
    </div>
  );
}
