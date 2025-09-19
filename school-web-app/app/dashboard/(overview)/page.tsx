// Page.js (Main Dashboard Layout)
'use client';

import React from 'react';
import MetricCardWrapper from '@/app/ui/dashboard/metric-card';
import ChartData from '@/app/ui/dashboard/chart';
import NotificationItemWrapper from '@/app/ui/dashboard/notification-item';
import AlertItem from '@/app/ui/dashboard/alert-item';
import { ClassOverviewCard, AssignmentCard } from '@/app/ui/dashboard/teacher-dashboard/teacherDashboard';
// import Calendar from '@/app/ui/dashboard/calendar/calendar';
// import ClassMetricsWrapper from '@/app/ui/dashboard/class-metric';
import RecentPaymentsTable from '@/app/ui/dashboard/recent-payment-table';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/contexts/AuthContext';


export default function Page() {
  const { user } = useAuth();
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
                {/* <MetricCardWrapper /> */}
                {["ADMIN", "SUPER_ADMIN"].includes(user?.role || "") && <MetricCardWrapper />}
                {["SUPER_ADMIN"].includes(user?.role || "") && 
                   <div className="w-full flex-1 min-w-0 sm:col-span-2 lg:col-span-4">
                    <ClassOverviewCard
                      teacherName={user?.name || "Mr. John Doe"}
                      className="JSS1A"
                      studentCount={45}
                    />
                 </div>}
                
                  <div className="min-w-[16px] sm:hidden" />
              </div>
            </motion.div>
       
          </div>

          {/* Weekly Overview Chart */}
          <div className="mb-8">
             {["ADMIN"].includes(user?.role || "") && <ChartData />}
              {["SUPER_ADMIN"].includes(user?.role || "") && (
                <AssignmentCard
                  totalAssignments={20}
                  submittedAssignments={15}
                  dueAssignments={5}
                />
              )}
          </div>
        </div>

        {/* Right Side: Notifications */}
        <div className="flex flex-col w-auto">
          <AlertItem />
          {["ADMIN", "SUPER_ADMIN"].includes(user?.role || "") && <NotificationItemWrapper />}
          
        </div>
      </div>
      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
       
      </div>
      <div>
        
        <RecentPaymentsTable />
      </div>
    </main>
  );
}
