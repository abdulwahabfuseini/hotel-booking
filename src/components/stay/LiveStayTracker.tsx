"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function LiveStayTracker({
  checkOutDate,
}: {
  checkOutDate: Date;
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs();
      const end = dayjs(checkOutDate);
      const diff = end.diff(now);

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / 1000 / 60) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [checkOutDate]);

  return (
    <div className="grid grid-cols-4 gap-4 bg-stone-950 p-8 rounded-3xl border border-stone-800">
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} className="text-center">
          <span className="text-4xl font-light text-white font-mono">
            {val.toString().padStart(2, "0")}
          </span>
          <p className="text-[10px] uppercase text-stone-500 tracking-tighter mt-1">
            {unit}
          </p>
        </div>
      ))}
    </div>
  );
}
