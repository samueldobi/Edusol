export default function ClassMetricsWrapper() {
  return (
    <div className="p-4 flex space-x-4">
      <ClassMetrics
        data={[
          { className: 'SS3B', metric: 77, color: 'yellow' },
          { className: 'SS1F', metric: 75, color: 'gray' },
          { className: 'SS3B', metric: 70, color: 'gray' },
          { className: 'SS2A', metric: 66, color: 'gray' },
          { className: 'SS3D', metric: 65, color: 'blue' },
        ]}
      />
      <ClassMetrics
        data={[
          { className: 'SS2B', metric: 50, color: 'yellow' },
          { className: 'SS1F', metric: 49, color: 'gray' },
          { className: 'SS3B', metric: 48, color: 'gray' },
          { className: 'SS2A', metric: 45, color: 'gray' },
          { className: 'SS3D', metric: 44, color: 'blue' },
        ]}
      />
    </div>
  );
}

export function ClassMetrics({ data }: { data: any[] }) {
  return (
    <div className="w-full rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">CLASSES</h2>
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="text-gray-700">{item.className}</span>
            <div className="w-3/4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className={`bg-${item.color}-500 h-2.5 rounded-full`}
                style={{ width: `${item.metric}%` }}
              ></div>
            </div>
            <span className="text-green-500">{item.metric}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
