// Page.js (Main Dashboard Layout)
'use client';

import React from 'react';
import MetricCardWrapper from '@/app/ui/dashboard/metric-card';
import ChartData from '@/app/ui/dashboard/chart';
import NotificationItemWrapper from '@/app/ui/dashboard/notification-item';
import AlertItem from '@/app/ui/dashboard/alert-item';
import Calendar from '@/app/ui/dashboard/calendar';
import ClassMetricsWrapper from '@/app/ui/dashboard/class-metric';
export default function Page() {
  return (
    <main className=" p-0 sm:p-6">
      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        {/* Left Side: Metrics, Financial Cards, and Chart */}
        <div className="flex flex-col">
          {/* Top Metrics */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCardWrapper />
            </div>
          </div>

          {/* Weekly Overview Chart */}
          <div className="mb-8">
            <ChartData />
          </div>
        </div>

        {/* Right Side: Notifications */}
        <div className="flex flex-col w-auto">
          <AlertItem />
          <NotificationItemWrapper />
        </div>
      </div>
      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        <div>
          <p className="font-medium">TOP TEN CLASSES BY AVERAGE</p>
          <ClassMetricsWrapper />
        </div>
        <div>
          <p className="font-medium">CALENDER & EVENTS</p>
          <Calendar />
        </div>
      </div>
    </main>
  );
}
