interface ClassMetric {
  className: string;
  metric: number;
  color: string;
}
export function ClassMetrics({ data }: { data: ClassMetric[] }) {
  return (
    <div className="w-full bg-white mt-7 p-4 sm:p-0">
      <div className="flex justify-between items-center mb-4">
        <p className="uppercase">Classes</p>
        <p className="uppercase">Metrics</p>
      </div>
      <ul className="space-y-12">
        {data.map((item, index) => (
          <li className="" key={index}>
            {/* Changed to <li> and moved mb-10 here */}
            <div className="flex justify-between items-center">
              <p>{item.className}</p>
              <p>{`${item.metric}%`}</p>
            </div>
            <div className="bg-[#D9D9D9] w-full h-1 rounded-md">
              <div
                className="h-1 rounded-md"
                style={{
                  width: `${Number(item.metric)}%`,
                  backgroundColor: item.color,
                }}
              ></div>
            </div>
          </li> 
        ))}
      </ul>
    </div>
  );
}

export default function ClassMetricsWrapper() {
  return (
    <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-20">
      <ClassMetrics
        data={[
          { className: 'SS3B', metric: 77, color: '#FFB400' },
          { className: 'SS1F', metric: 75, color: '#4A4C51' },
          { className: 'SS3B', metric: 70, color: '#4A4C51' },
          { className: 'SS2A', metric: 66, color: '#000000' },
          { className: 'SS3D', metric: 65, color: '#2D6EFF' },
        ]}
      />
      <ClassMetrics
        data={[
          { className: 'SS2B', metric: 50, color: '#FFB400' },
          { className: 'SS1F', metric: 49, color: '#4A4C51' },
          { className: 'SS3B', metric: 48, color: '#4A4C51' },
          { className: 'SS2A', metric: 45, color: '#000000' },
          { className: 'SS3D', metric: 44, color: '#2D6EFF' },
        ]}
      />
    </div>
  );
}
