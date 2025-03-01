'use client';

import React from 'react';

export default function BarChart() {
  const data1 = [800000, 300000, 1200000, 900000, 900000, 1300000, 800000];
  const data2 = [700000, 200000, 1100000, 800000, 800000, 1200000, 700000];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const chartHeight = 200; // Fixed chart height
  const maxValue = Math.max(...data1, ...data2);
  const numberOfYAxisLabels = 6;

  return (
    <div className="relative w-[30%] h-64">
      {/* Y-Axis Labels */}
      <div className="absolute left-0 top-0 h-full w-10 flex flex-col justify-between items-end">
        {Array.from({ length: numberOfYAxisLabels }, (_, i) => {
          const value = Math.round(
            (maxValue / (numberOfYAxisLabels - 1)) *
              (numberOfYAxisLabels - 1 - i)
          );
          return (
            <span key={i} className="text-xs text-gray-500">
              {value.toLocaleString()}
            </span>
          );
        })}
      </div>

      {/* Grid Lines */}
      <div className="absolute top-0 left-10 w-[100%] h-full">
        {Array.from({ length: numberOfYAxisLabels - 1 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{
              top: `${(i / (numberOfYAxisLabels - 1)) * 100}%`,
              height: '1px',
              borderBottom: '1px dashed #ccc',
            }}
          />
        ))}
      </div>

      {/* Bars */}
      <div className="relative flex items-end h-full ml-10">
        {labels.map((label, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-x-2 mr-9"
          >
            <div className="flex items-end">
              {/* First Bar */}
              <div
                className="w-4"
                style={{
                  height: `${(data1[index] / maxValue) * chartHeight}px`,
                  backgroundColor: '#1AA939',
                }}
              ></div>

              {/* Second Bar */}
              <div
                className="w-4"
                style={{
                  height: `${(data2[index] / maxValue) * chartHeight}px`,
                  backgroundColor: '#FFB400',
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
