export default function FinancialCard({
  title,
  value,
  iconSrc,
  color,
}: {
  title: string;
  value: string;
  iconSrc: string;
  color: string;
}) {
  return (
    <div
      className={`p-4 rounded-lg ${color} text-white flex items-center space-x-4`}
    >
      <img
        src={iconSrc}
        alt={`${title} Icon`}
        className={`w-10 h-10 bg-${color} rounded-full`}
      />
      <div>
        <p className="text-lg text-black font-semibold uppercase">{title}</p>
        <p className={`text-2xl font-semibold text-${color}`}>{value}</p>
      </div>
    </div>
  );
}
