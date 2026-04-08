import { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isAfter, isBefore, isWeekend, format } from "date-fns";
import { DayCell } from "./DayCell.jsx";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarGrid({ currentMonth, startDate, endDate, onDateClick, allNotes }) {
  const [hoveredDate, setHoveredDate] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const checkInRange = (date) => {
    if (startDate && endDate) {
      return isAfter(date, startDate) && isBefore(date, endDate);
    }
    return false;
  };

  const checkHoverRange = (date) => {
    if (startDate && !endDate && hoveredDate) {
      if (isAfter(hoveredDate, startDate)) {
        return (isAfter(date, startDate) && isBefore(date, hoveredDate)) || isSameDay(date, hoveredDate);
      }
      if (isBefore(hoveredDate, startDate)) {
        return (isBefore(date, startDate) && isAfter(date, hoveredDate)) || isSameDay(date, hoveredDate);
      }
    }
    return false;
  };

  return (
    <div className="flex flex-col w-full mb-10 h-full">
      <div className="grid grid-cols-7 mb-4 gap-x-2">
        {DAYS_OF_WEEK.map((day, idx) => (
          <div key={day} className="text-center py-2">
            <span className={`text-sm sm:text-lg font-black uppercase tracking-widest drop-shadow-md ${idx === 0 || idx === 6 ? "text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "text-white/40"}`}>
              {day}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-4 gap-x-2 relative" onMouseLeave={() => setHoveredDate(null)}>
        {days.map((day) => {
          const isSelectedStart = startDate ? isSameDay(day, startDate) : false;
          const isSelectedEnd = endDate ? isSameDay(day, endDate) : false;
          const isInRange = checkInRange(day);
          const isHoverRange = checkHoverRange(day);
          
          const noteKey = `day_${format(day, "yyyy-MM-dd")}`;
          const notePreview = allNotes[noteKey]?.content || null;

          return (
            <DayCell
              key={day.toISOString()}
              date={day}
              isCurrentMonth={isSameMonth(day, monthStart)}
              isSelectedStart={isSelectedStart}
              isSelectedEnd={isSelectedEnd}
              isInRange={isInRange}
              isHoverRange={isHoverRange}
              isWeekend={isWeekend(day)}
              notePreview={notePreview}
              onClick={onDateClick}
              onMouseEnter={(d) => setHoveredDate(d)}
            />
          );
        })}
      </div>
    </div>
  );
}
