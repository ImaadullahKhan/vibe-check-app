import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateTimePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const generateTimeSlots = () => {
  const slots: string[] = [];
  // 2:00 PM to 11:30 PM
  for (let h = 14; h <= 23; h++) {
    const displayHour = h === 12 ? 12 : h - 12;
    slots.push(`${displayHour}:00 PM`);
    slots.push(`${displayHour}:30 PM`);
  }
  return slots;
};

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(new Date(today));

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const isPast = (d: number) => {
    const date = new Date(year, month, d);
    return date < today;
  };

  const isSelected = (d: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === d
    );
  };

  const handleDateClick = (d: number) => {
    if (isPast(d)) return;
    onDateSelect(new Date(year, month, d));
    // Reset time if we change date, or keep it. Let's keep it if valid.
  };

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-6">
      
      {/* Calendar View */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white text-sm sm:text-base">Select Date</h3>
          <div className="flex items-center gap-2 text-slate-300">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold w-24 text-center">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-[10px] font-bold text-slate-500 mb-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-2 gap-x-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1;
            const past = isPast(d);
            const selected = isSelected(d);
            
            return (
              <button
                key={d}
                type="button"
                disabled={past}
                onClick={() => handleDateClick(d)}
                className={`
                  w-8 h-8 sm:w-9 sm:h-9 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-all
                  ${past ? 'text-slate-700 cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-slate-800 text-slate-300'}
                  ${selected && !past ? 'bg-rose-600 text-white font-bold hover:bg-rose-500 shadow-md shadow-rose-900/50' : ''}
                `}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots View (only show if date is selected) */}
      <div className={`flex-1 border-t md:border-t-0 md:border-l border-slate-800 pt-5 md:pt-0 md:pl-6 ${!selectedDate ? 'opacity-50 pointer-events-none' : ''}`}>
        <h3 className="font-bold text-white text-sm sm:text-base mb-4">
          {selectedDate ? (
            <>Available Times for <span className="text-rose-400">{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span></>
          ) : (
            'Select a date first'
          )}
        </h3>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {timeSlots.map((time) => {
            const isTimeSelected = selectedTime === time;
            
            // Check if the time slot has already passed today
            let isPastTime = false;
            if (selectedDate) {
              const now = new Date();
              if (
                selectedDate.getDate() === now.getDate() &&
                selectedDate.getMonth() === now.getMonth() &&
                selectedDate.getFullYear() === now.getFullYear()
              ) {
                const [timeStr, period] = time.split(' ');
                let [hours, minutes] = timeStr.split(':').map(Number);
                if (period === 'PM' && hours !== 12) hours += 12;
                if (period === 'AM' && hours === 12) hours = 0;
                
                const slotTime = new Date(selectedDate);
                slotTime.setHours(hours, minutes, 0, 0);
                
                isPastTime = slotTime <= now;
              }
            }

            return (
              <button
                key={time}
                type="button"
                disabled={isPastTime}
                onClick={() => !isPastTime && onTimeSelect(time)}
                className={`
                  py-2.5 px-3 rounded-xl text-xs font-semibold text-center transition-all border
                  ${isPastTime 
                    ? 'opacity-30 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-600' 
                    : isTimeSelected
                      ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/50'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-rose-500/50 hover:bg-slate-800'
                  }
                `}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.6);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(51, 65, 85, 0.8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 1);
        }
      `}</style>
    </div>
  );
};
