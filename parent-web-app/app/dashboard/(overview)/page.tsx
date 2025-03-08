// Page.js (Main Dashboard Layout)
'use client';

import React from 'react';
import MetricCardWrapper from '@/app/ui/dashboard/metric-card';

import ChartData from '@/app/ui/dashboard/chart';
import NotificationItem from '@/app/ui/dashboard/notification-item';

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
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-green-500 w-3 h-3 rounded-full"></span>
            <span>Teachers</span>
            <span className="bg-yellow-500 w-3 h-3 rounded-full"></span>
            <span>Student</span>
            <span className="bg-red-500 w-3 h-3 rounded-full"></span>
            <span>School</span>
          </div>
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
        </div>
      </div>
    </main>
  );
}
