
"use client";
import { useMemo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function StayTimeWidget({ checkOut }: { checkOut: Date }) {
  const checkOutDate = useMemo(() => dayjs(checkOut), [checkOut]);
  
  const progress = useMemo(() => {
    const start = checkOutDate.subtract(1, 'day'); // Example stay start
    const total = checkOutDate.diff(start);
    const elapsed = dayjs().diff(start);
    return Math.min(Math.round((elapsed / total) * 100), 100);
  }, [checkOutDate]); // Added checkOutDate to dependency array

  return (
    <div className="bg-stone-900 border border-gold-500/20 p-6 rounded-3xl">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-stone-400 text-xs uppercase tracking-widest font-semibold">Stay Status</h3>
          <p className="text-white text-2xl font-light mt-1">Enjoying your stay</p>
        </div>
        <p className="text-gold-400 font-mono text-sm">
          {checkOutDate.fromNow(true)} left
        </p>
      </div>
      
      <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
        <div 
          // Updated to Tailwind v4 canonical class: bg-linear-to-r
          className="bg-linear-to-r from-gold-600 to-amber-400 h-full transition-all duration-1000" 
          style={{ width: `${progress}%` }} 
        />
      </div>
      <p className="text-[10px] text-stone-500 mt-3 text-right uppercase tracking-tighter">
        Scheduled Check-out: {checkOutDate.format("MMM D, YYYY - HH:mm")}
      </p>
    </div>
  );
}