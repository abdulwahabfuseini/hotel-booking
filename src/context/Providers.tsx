/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { SessionProvider } from "next-auth/react";
import { HotelProvider } from "@/context/HotelContext";

export function Providers({ 
  children, 
  initialRooms 
}: { 
  children: React.ReactNode; 
  initialRooms: any[];
}) {
  return (
    <SessionProvider>
      <HotelProvider initialRooms={initialRooms}>
        {children}
      </HotelProvider>
    </SessionProvider>
  );
}