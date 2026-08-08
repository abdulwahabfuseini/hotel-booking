"use client";

import { useState } from "react";
import { useHotel } from "@/context/HotelContext";
import type { BookingStatus } from "@/lib/types";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { Select } from "@/components/ui/Select";

export default function AdminBookingsPage() {
  const { bookings, getRoom, getGuest, updateBookingStatus } = useHotel();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredBookings =
    statusFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  const sortedBookings = [...filteredBookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Bookings</h1>
          <p className="text-sm text-slate-500">
            Manage all reservations ({bookings.length} total)
          </p>
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "pending", label: "Pending" },
              { value: "confirmed", label: "Confirmed" },
              { value: "checked-in", label: "Checked In" },
              { value: "checked-out", label: "Checked Out" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
        </div>
      </div>

      <BookingsTable
        bookings={sortedBookings}
        getRoom={getRoom}
        getGuest={getGuest}
        onStatusChange={(id, status) => updateBookingStatus(id, status as BookingStatus)}
      />
    </div>
  );
}
