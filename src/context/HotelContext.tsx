"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type {
  Booking,
  BookingFormData,
  BookingStatus,
  DashboardStats,
  Guest,
  Room,
  RoomStatus,
} from "@/lib/types";
import {
  initialBookings,
  initialGuests,
  initialRooms,
} from "@/lib/data";
import {
  calculateTotal,
  generateId,
  isRoomAvailable,
} from "@/lib/utils";

interface HotelContextType {
  rooms: Room[];
  bookings: Booking[];
  guests: Guest[];
  addBooking: (data: BookingFormData) => Booking | null;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  updateRoomStatus: (id: string, status: RoomStatus) => void;
  getRoom: (id: string) => Room | undefined;
  getGuest: (id: string) => Guest | undefined;
  getBooking: (id: string) => Booking | undefined;
  getAvailableRooms: (checkIn: string, checkOut: string, guests?: number) => Room[];
  getStats: () => DashboardStats;
}

const HotelContext = createContext<HotelContextType | null>(null);

const STORAGE_KEY = "grand-horizon-hotel-data";

interface StoredData {
  rooms: Room[];
  bookings: Booking[];
  guests: Guest[];
}

const defaultData: StoredData = {
  rooms: initialRooms,
  bookings: initialBookings,
  guests: initialGuests,
};

function loadStoredData(): StoredData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistData(data: StoredData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let storeData: StoredData = defaultData;
let hydrated = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  listeners.forEach((listener) => listener());
}

function getSnapshot(): StoredData {
  if (typeof window !== "undefined" && !hydrated) {
    hydrated = true;
    const stored = loadStoredData();
    if (stored) {
      storeData = stored;
    }
  }
  return storeData;
}

function getServerSnapshot(): StoredData {
  return defaultData;
}

function updateStore(updater: (prev: StoredData) => StoredData) {
  storeData = updater(storeData);
  persistData(storeData);
  emit();
}

export function HotelProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { rooms, bookings, guests } = data;

  const getRoom = useCallback(
    (id: string) => rooms.find((r) => r.id === id),
    [rooms]
  );

  const getGuest = useCallback(
    (id: string) => guests.find((g) => g.id === id),
    [guests]
  );

  const getBooking = useCallback(
    (id: string) => bookings.find((b) => b.id === id),
    [bookings]
  );

  const getAvailableRooms = useCallback(
    (checkIn: string, checkOut: string, guestCount?: number) => {
      return rooms.filter((room) => {
        if (guestCount && room.capacity < guestCount) return false;
        return isRoomAvailable(room, checkIn, checkOut, bookings);
      });
    },
    [rooms, bookings]
  );

  const addBooking = useCallback(
    (formData: BookingFormData): Booking | null => {
      const room = rooms.find((r) => r.id === formData.roomId);
      if (!room) return null;
      if (!isRoomAvailable(room, formData.checkIn, formData.checkOut, bookings)) {
        return null;
      }

      let guest = guests.find((g) => g.email === formData.email);
      let nextGuests = guests;

      if (!guest) {
        guest = {
          id: generateId("guest"),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          loyaltyTier: "bronze",
          totalStays: 0,
          createdAt: new Date().toISOString(),
        };
        nextGuests = [...guests, guest];
      }

      const booking: Booking = {
        id: generateId("booking"),
        roomId: formData.roomId,
        guestId: guest.id,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        status: "confirmed",
        paymentStatus: "paid",
        totalAmount: calculateTotal(room.price, formData.checkIn, formData.checkOut),
        specialRequests: formData.specialRequests,
        createdAt: new Date().toISOString(),
      };

      nextGuests = nextGuests.map((g) =>
        g.id === guest!.id ? { ...g, totalStays: g.totalStays + 1 } : g
      );

      updateStore((prev) => ({
        ...prev,
        bookings: [...prev.bookings, booking],
        guests: nextGuests,
      }));

      return booking;
    },
    [rooms, bookings, guests]
  );

  const updateBookingStatus = useCallback(
    (id: string, status: BookingStatus) => {
      const booking = bookings.find((b) => b.id === id);
      if (!booking) return;

      updateStore((prev) => {
        const nextBookings = prev.bookings.map((b) =>
          b.id === id ? { ...b, status } : b
        );

        let nextRooms = prev.rooms;
        if (status === "checked-in") {
          nextRooms = prev.rooms.map((r) =>
            r.id === booking.roomId ? { ...r, status: "occupied" as RoomStatus } : r
          );
        } else if (status === "checked-out" || status === "cancelled") {
          nextRooms = prev.rooms.map((r) =>
            r.id === booking.roomId ? { ...r, status: "cleaning" as RoomStatus } : r
          );
        }

        return { ...prev, bookings: nextBookings, rooms: nextRooms };
      });
    },
    [bookings]
  );

  const updateRoomStatus = useCallback((id: string, status: RoomStatus) => {
    updateStore((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) => (r.id === id ? { ...r, status } : r)),
    }));
  }, []);

  const getStats = useCallback((): DashboardStats => {
    const activeBookings = bookings.filter(
      (b) => b.status !== "cancelled" && b.status !== "checked-out"
    );
    const occupiedRooms = rooms.filter((r) => r.status === "occupied").length;
    const totalRevenue = bookings
      .filter((b) => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + b.totalAmount, 0);

    return {
      totalRevenue,
      occupancyRate: Math.round((occupiedRooms / rooms.length) * 100),
      totalBookings: bookings.length,
      activeGuests: activeBookings.length,
      availableRooms: rooms.filter((r) => r.status === "available").length,
      pendingCheckIns: bookings.filter((b) => b.status === "confirmed").length,
    };
  }, [rooms, bookings]);

  return (
    <HotelContext.Provider
      value={{
        rooms,
        bookings,
        guests,
        addBooking,
        updateBookingStatus,
        updateRoomStatus,
        getRoom,
        getGuest,
        getBooking,
        getAvailableRooms,
        getStats,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotel must be used within a HotelProvider");
  }
  return context;
}

export function resetHotelStore() {
  storeData = defaultData;
  hydrated = true;
  persistData(defaultData);
  emit();
}
