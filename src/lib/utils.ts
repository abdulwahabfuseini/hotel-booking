import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, format, parseISO, isAfter, isBefore, isEqual } from "date-fns";
import type { Booking, BookingStatus, Room, RoomStatus, RoomType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date, pattern = "MMM d, yyyy"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, pattern);
}

export function calculateNights(checkIn: string, checkOut: string): number {
  return Math.max(differenceInDays(parseISO(checkOut), parseISO(checkIn)), 1);
}

export function calculateTotal(price: number, checkIn: string, checkOut: string): number {
  return price * calculateNights(checkIn, checkOut);
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function isRoomAvailable(
  room: Room,
  checkIn: string,
  checkOut: string,
  bookings: Booking[],
  excludeBookingId?: string
): boolean {
  if (room.status === "maintenance") return false;

  const newCheckIn = parseISO(checkIn);
  const newCheckOut = parseISO(checkOut);

  return !bookings.some((booking) => {
    if (booking.roomId !== room.id) return false;
    if (excludeBookingId && booking.id === excludeBookingId) return false;
    if (booking.status === "cancelled" || booking.status === "checked-out") return false;

    const existingCheckIn = parseISO(booking.checkIn);
    const existingCheckOut = parseISO(booking.checkOut);

    const overlaps =
      (isBefore(newCheckIn, existingCheckOut) || isEqual(newCheckIn, existingCheckOut)) &&
      (isAfter(newCheckOut, existingCheckIn) || isEqual(newCheckOut, existingCheckIn));

    return overlaps;
  });
}

export function getRoomTypeLabel(type: RoomType): string {
  const labels: Record<RoomType, string> = {
    standard: "Standard",
    deluxe: "Deluxe",
    suite: "Suite",
    presidential: "Presidential",
  };
  return labels[type];
}

export function getBookingStatusColor(status: BookingStatus): string {
  const colors: Record<BookingStatus, string> = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-blue-100 text-blue-800",
    "checked-in": "bg-emerald-100 text-emerald-800",
    "checked-out": "bg-slate-100 text-slate-700",
    cancelled: "bg-red-100 text-red-800",
  };
  return colors[status];
}

export function getRoomStatusColor(status: RoomStatus): string {
  const colors: Record<RoomStatus, string> = {
    available: "bg-emerald-100 text-emerald-800",
    occupied: "bg-blue-100 text-blue-800",
    maintenance: "bg-red-100 text-red-800",
    cleaning: "bg-amber-100 text-amber-800",
  };
  return colors[status];
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}
