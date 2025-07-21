// Page.js (Main Dashboard Layout)
'use client';

import React from 'react';
import MetricCardWrapper from '../../ui/dashboard/metric-card';
import ChartData from '../../ui/dashboard/chart';
import NotificationItemWrapper from '../../ui/dashboard/notification-item';
import AlertItem from '../../ui/dashboard/alert-item';
// import Calendar from '../../ui/dashboard/calendar/calendar';
import ClassMetricsWrapper from '../../ui/dashboard/class-metric';
import RecentPaymentsTable from '../../ui/dashboard/recent-payment-table';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <main className=" p-0 sm:p-6">
      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        {/* Left Side: Metrics, Financial Cards, and Chart */}
        <div className="flex flex-col">
          {/* Top Metrics */}
          <div className="mb-8">
            <motion.div
              className="overflow-x-auto sm:overflow-visible"
              whileTap={{ cursor: "grabbing" }}
            >
              <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-0 min-w-[max-content] sm:min-w-0">
                <MetricCardWrapper />
                  <div className="min-w-[16px] sm:hidden" />
              </div>
            </motion.div>
       
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
          <p className="font-medium text-center sm:text-left mt-8 sm:mt-0">
            TOP TEN CLASSES BY AVERAGE
          </p>
          <ClassMetricsWrapper />
        </div>
        <div>
          <p className="font-medium mb-4 uppercase">CALENDER & EVENTS</p>
          {/* <Calendar /> */}
        </div>
      </div>
      <div>
        
        <RecentPaymentsTable />
      </div>
    </main>
  );
}
