'use client';

import React, { useState } from 'react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0)); // January 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay(); // 0 (Sunday) to 6 (Saturday)
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  const days = daysInMonth(currentMonth.getMonth(), year);
  const firstDay = firstDayOfMonth(currentMonth.getMonth(), year);

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let dayCounter = 1;
  let calendarRows = [];

  for (let i = 0; i < 6; i++) {
    // Up to 6 rows to cover all months
    let row = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        row.push(<td key={`${i}-${j}`} className="p-2 text-gray-400"></td>);
      } else if (dayCounter <= days) {
        const isSelected =
          selectedDate &&
          selectedDate.getFullYear() === year &&
          selectedDate.getMonth() === currentMonth.getMonth() &&
          selectedDate.getDate() === dayCounter;

        const isHighlighted = [6, 16, 21, 30].includes(dayCounter);

        row.push(
          <td
            key={`${i}-${j}`}
            className={`p-2  text-center cursor-pointer ${
              isSelected ? 'bg-blue-200' : ''
            } ${isHighlighted ? 'bg-[#66CC00] text-white rounded-2xl' : ''}`}
            onClick={() => handleDateClick(dayCounter)}
          >
            {dayCounter}
          </td>
        );
        dayCounter++;
      } else {
        row.push(<td key={`${i}-${j}`} className="p-2 text-gray-400"></td>);
      }
    }
    calendarRows.push(<tr key={i}>{row}</tr>);
    if (dayCounter > days) {
      break;
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          &lt;
        </button>
        <h2 className="text-xl font-medium">
          {monthName} {year}
        </h2>
        <button
          onClick={goToNextMonth}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          &gt;
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {dayLabels.map((label) => (
              <th
                key={label}
                className="p-2 text-left font-medium"
                style={{ color: 'rgba(74, 76, 81, 0.48)' }}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </table>

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="mt-4">
          <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
        </div>
      )}

      {/* National Day Holiday Display (Example) */}
      {currentMonth.getMonth() === 0 && (
        <div className="mt-4 p-3  rounded-md flex items-center space-x-5">
          <div
            className=" text-white rounded-full bg-[#66CC00] px-2 py-1 text-sm mr-2 w-10 h-10 flex items-center justify-center
           "
          >
            1
          </div>
          <div className="flex-1 bg-[#66CC00] text-[#333333] p-2 rounded-lg">
            National Day Holiday
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
