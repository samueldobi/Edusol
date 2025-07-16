'use client';

// import React, { useState } from 'react';
// import ManageCalendarModal from './manage-calendar';


const Calendar = () => {
  // const [showManageEvent, setShowManageEvent] =  useState(false)
  // const [currentMonth, setCurrentMonth] = useState(new Date()); 
  // const [newEvent, setNewEvent] = useState(false)
  // const handleManage= ()=>{
  //   setShowManageEvent(true)
  // }
  // const handleNewEvent = ()=>{
  //   setNewEvent(true);
  // }

  //These are the states for day and month
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // const goToPreviousMonth = () => {
  //   setCurrentMonth(
  //     new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
  //   );
  // };

  // const goToNextMonth = () => {
  //   setCurrentMonth(
  //     new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
  //   );
  // };
  //   setSelectedDate(
  //     new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
  //   );
  // };

  // const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  // const month = currentMonth.getMonth(); 
  // const year = currentMonth.getFullYear();
  // const firstDayOfMonth = new Date(year, month, 1).getDay()
  // const daysInMonth = new Date(year, month + 1, 0).getDate();
  // const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;




  // const firstDay = firstDayOfMonth(currentMonth.getMonth(), year);

  // const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // let dayCounter = 1;
  // let calendarRows = [];

  // for (let i = 0; i < 6; i++) {
  //   // Up to 6 rows to cover all months
  //   let row = [];
  //   for (let j = 0; j < 7; j++) {
  //     if (i === 0 && j < firstDay) {
  //       row.push(<td key={`${i}-${j}`} className="p-2 text-gray-400"></td>);
  //     } else if (dayCounter <= days) {
  //       const isSelected =
  //         selectedDate &&
  //         selectedDate.getFullYear() === year &&
  //         selectedDate.getMonth() === currentMonth.getMonth() &&
  //         selectedDate.getDate() === dayCounter;

  //       const isHighlighted = [6, 16, 21, 30].includes(dayCounter);

  //       row.push(
  //         <td
  //           key={`${i}-${j}`}
  //           className={`p-2  text-center cursor-pointer ${
  //             isSelected ? 'bg-blue-200' : ''
  //           } ${isHighlighted ? 'bg-[#66CC00] text-white rounded-2xl' : ''}`}
  //           onClick={() => handleDateClick(dayCounter)}
  //         >
  //           {dayCounter}
  //         </td>
  //       );
  //       dayCounter++;
  //     } else {
  //       row.push(<td key={`${i}-${j}`} className="p-2 text-gray-400"></td>);
  //     }
  //   }
  //   calendarRows.push(<tr key={i}>{row}</tr>);
  //   if (dayCounter > days) {
  //     break;
  //   }
  // }
  // 

  return (
    <>
    <p>calendar</p>
  {/* <div className="max-w-4xl mx-auto w-full bg-white rounded shadow overflow-hidden"> */}
      {/* Header Buttons */}
      {/* <div className="relative p-4 bg-white">
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
          onClick={handleManage}
          className="px-4 py-2 text-xs font-semibold uppercase rounded bg-green-600 text-white hover:shadow hover:-translate-y-0.5 transition">
            Manage
          </button>
          <button  */}
           {/* onClick={handleNewEvent}
          className="px-4 py-2 text-xs font-semibold uppercase rounded border-2 border-green-600 text-green-600 hover:bg-green-50 hover:shadow transition">
            New Event
          </button>
        </div> */}

        {/* Month Navigation */}
        {/* <div className="mt-20 md:mt-10">
          <div className="bg-green-600 px-4 py-3 rounded-lg shadow">
            <div className="flex items-center justify-between text-white font-semibold text-lg">
              <button 
              onClick={goToPreviousMonth}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white bg-white/20 hover:bg-white/30 transition">
                ‹
              </button>
              <div className="text-center text-xl font-bold tracking-wide">
                {monthName}  {year}
              </div>
              <button 
              onClick={goToNextMonth}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white bg-white/20 hover:bg-white/30 transition">
                ›
              </button>
            </div>
          </div>
        </div> */}
      {/* </div> */}

      {/* Weekdays Header */}
      {/* <div className="px-4 pb-2">
        <div className="grid grid-cols-7 gap-1 mb-1 text-sm font-semibold text-gray-600 text-center">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
      </div>

    
      <div className="px-4 pb-6">
  <div className="grid grid-cols-7 gap-1">
    {Array.from({ length: adjustedFirstDay }, (_, i) => (
      <div key={`empty-${i}`} className="aspect-square min-h-[60px] rounded" />
    ))}

    {Array.from({ length: daysInMonth }, (_, i) => (
      <div
        key={i}
        className="bg-white aspect-square min-h-[60px] border border-gray-200 rounded text-sm font-medium p-1 text-green-600 hover:bg-gray-50 transition"
      >
        {i + 1}
      </div>
    ))}
  </div>
    </div>


    </div> */}

 
    {/* {showManageEvent && (
      <ManageCalendarModal onClose={() => setShowManageEvent(false)} />
    )} */}

    </>
  );
};

export default Calendar;
