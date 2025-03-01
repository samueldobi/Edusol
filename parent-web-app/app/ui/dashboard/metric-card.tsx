export default function MetricCard({
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
    <div className={`p-4 rounded-lg  text-white flex items-start space-x-4`}>
      <img
        src={avatarSrc}
        alt={`${title} Avatar`}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm text-neutral-600 font-semibold uppercase">
          {title}
        </p>
        <p className={`text-2xl ${color} font-semibold`}>{value}</p>
      </div>
    </div>
  );
}
