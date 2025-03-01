import MetricCard from '@/app/ui/dashboard/metric-card';
export default async function Page() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Students"
          value="589"
          avatarSrc="/student.png"
          color="text-yellow-500"
        />
        <MetricCard
          title="Teachers"
          value="49"
          avatarSrc="/teacher.png"
          color="text-teal-600"
        />
        <MetricCard
          title="Events"
          value="20"
          avatarSrc="/calendar.JPG"
          color="text-purple-600"
        />
        <MetricCard
          title="Users"
          value="630"
          avatarSrc="/backpack.png"
          color="text-green-600"
        />
      </div>
    </div>
  );
}
