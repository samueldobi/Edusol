'use client';

import React from 'react';
import FinancialCardWrapper from './financial-card';

export default function Chart() {
  const data1 = [800000, 300000, 1200000, 900000, 900000, 1300000, 800000];
  const data2 = [700000, 200000, 1100000, 800000, 800000, 1200000, 700000];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const chartHeight = 300; // Increased for better visualization
  const maxValue = Math.max(...data1, ...data2);
  const numberOfYAxisLabels = 6;

  // Generate Y-axis labels
  const generateYAxis = (max: number, count: number) => {
    const interval = Math.ceil(max / (count - 1));
    return Array.from({ length: count }, (_, i) => i * interval).reverse();
  };

  const yAxisLabels = generateYAxis(maxValue, numberOfYAxisLabels);

  return (
    <div className="w-full md:w-auto">
      <div className="p-4">
        {/* Financial Metrics */}
        <FinancialCardWrapper />
        <div className="grid grid-cols-8 items-end gap-2">
          {/* Y-Axis Labels (on the left) */}
          <div
            className="hidden lg:flex flex-col justify-between text-sm text-gray-400"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label.toLocaleString()}</p>
            ))}
          </div>

          {/* Bars */}
          {labels.map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="flex items-end justify-center">
                  <div
                    className="w-3 sm:w-4"
                    style={{
                      height: `${(data1[index] / maxValue) * chartHeight}px`,
                      backgroundColor: '#1AA939',
                    }}
                  ></div>
                  <div
                    className="w-3 sm:w-4"
                    style={{
                      height: `${(data2[index] / maxValue) * chartHeight}px`,
                      backgroundColor: '#FFB400',
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
