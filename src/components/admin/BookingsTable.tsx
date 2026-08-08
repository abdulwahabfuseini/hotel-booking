"use client";

import type { Booking, Guest, Room } from "@/lib/types";
import {
  formatCurrency,
  formatDate,
  getBookingStatusColor,
  getInitials,
} from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import type { BookingStatus } from "@/lib/types";

interface BookingsTableProps {
  bookings: Booking[];
  getRoom: (id: string) => Room | undefined;
  getGuest: (id: string) => Guest | undefined;
  onStatusChange?: (id: string, status: BookingStatus) => void;
}

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "checked-in", label: "Checked In" },
  { value: "checked-out", label: "Checked Out" },
  { value: "cancelled", label: "Cancelled" },
];

export function BookingsTable({
  bookings,
  getRoom,
  getGuest,
  onStatusChange,
}: BookingsTableProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-slate-500">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-navy-800">Guest</th>
              <th className="px-6 py-3 font-semibold text-navy-800">Room</th>
              <th className="px-6 py-3 font-semibold text-navy-800">Dates</th>
              <th className="px-6 py-3 font-semibold text-navy-800">Amount</th>
              <th className="px-6 py-3 font-semibold text-navy-800">Status</th>
              {onStatusChange && (
                <th className="px-6 py-3 font-semibold text-navy-800">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => {
              const guest = getGuest(booking.guestId);
              const room = getRoom(booking.roomId);

              return (
                <tr key={booking.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    {guest ? (
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-100 text-xs font-semibold text-navy-700">
                          {getInitials(guest.firstName, guest.lastName)}
                        </div>
                        <div>
                          <p className="font-medium text-navy-900">
                            {guest.firstName} {guest.lastName}
                          </p>
                          <p className="text-xs text-slate-500">{guest.email}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400">Unknown</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-navy-900">{room?.name || "—"}</p>
                    <p className="text-xs text-slate-500">{booking.guests} guests</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-navy-900">{formatDate(booking.checkIn)}</p>
                    <p className="text-xs text-slate-500">to {formatDate(booking.checkOut)}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-navy-900">
                    {formatCurrency(booking.totalAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getBookingStatusColor(booking.status)}>
                      {booking.status.replace("-", " ")}
                    </Badge>
                  </td>
                  {onStatusChange && (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Select
                          value={booking.status}
                          onChange={(e) =>
                            onStatusChange(booking.id, e.target.value as BookingStatus)
                          }
                          options={statusOptions}
                          className="min-w-[140px] py-1.5"
                        />
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
