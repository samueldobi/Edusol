export default function MetricCardWrapper() {
  return (
    <>
      <MetricCard
        title="Students"
        value="589"
        avatarSrc="/images/student.png"
        color="text-yellow-500"
      />
      <MetricCard
        title="Teachers"
        value="49"
        avatarSrc="/images/teacher.png"
        color="text-teal-600"
      />
      <MetricCard
        title="Guardians"
        value="20"
        avatarSrc="/images/parents.png"
        color="text-purple-600"
      />
      <MetricCard
        title="Users"
        value="630"
        avatarSrc="/images/users.png"
        color="text-green-600"
      />
    </>
  );
}

// MetricCard.js
export function MetricCard({
  title,
  value,
  avatarSrc,
  color,
}: {
  title: string;
  value: string;
  avatarSrc: string;
  color: string;
}) {
  return (
    <div className={`p-4 rounded-lg flex items-center space-x-4`}>
      <img
        src={avatarSrc}
        alt={`${title} Avatar`}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="text-sm text-neutral-600 font-semibold uppercase">
          {title}
        </p>
        <p className={`${color} text-2xl font-semibold`}>{value}</p>
      </div>
    </div>
  );
}
