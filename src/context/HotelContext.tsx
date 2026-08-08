/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface HotelContextType {
  rooms: any[];
  loading: boolean;
  refreshRooms: () => Promise<void>;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider = ({ 
  children, 
  initialRooms 
}: { 
  children: React.ReactNode; 
  initialRooms: any[] 
}) => {
  const [rooms, setRooms] = useState(initialRooms);
  const [loading, setLoading] = useState(false);

  // Use useCallback to prevent unnecessary re-renders of components using this function
  const refreshRooms = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/rooms');
      if (res.ok) {
        const data = await res.json();
        setRooms(data);
      }
    } catch (error) {
      console.error("Failed to sync rooms:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // We removed the useEffect that called refreshRooms() on mount.
  // The rooms are now provided by the server immediately.

  return (
    <HotelContext.Provider value={{ rooms, loading, refreshRooms }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};