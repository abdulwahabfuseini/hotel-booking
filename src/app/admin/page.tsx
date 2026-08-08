"use client";

import {
  DollarSign,
  BedDouble,
  CalendarDays,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useHotel } from "@/context/HotelContext";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatsCard } from "@/components/admin/StatsCard";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getRoomStatusColor } from "@/lib/utils";

export default function AdminDashboard() {
  const { getStats, bookings, rooms, getRoom, getGuest } = useHotel();
  const stats = getStats();

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const roomStatusCounts = rooms.reduce(
    (acc, room) => {
      acc[room.status] = (acc[room.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Overview of your hotel operations</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          trend={{ value: 12, positive: true }}
        />
        <StatsCard
          title="Occupancy Rate"
          value={`${stats.occupancyRate}%`}
          icon={TrendingUp}
          subtitle={`${rooms.length - stats.availableRooms} of ${rooms.length} rooms occupied`}
        />
        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={CalendarDays}
        />
        <StatsCard
          title="Active Guests"
          value={stats.activeGuests}
          icon={Users}
        />
        <StatsCard
          title="Available Rooms"
          value={stats.availableRooms}
          icon={BedDouble}
        />
        <StatsCard
          title="Pending Check-ins"
          value={stats.pendingCheckIns}
          icon={Clock}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-navy-900">Recent Bookings</h2>
          <BookingsTable
            bookings={recentBookings}
            getRoom={getRoom}
            getGuest={getGuest}
          />
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Room Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(roomStatusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <Badge className={getRoomStatusColor(status as "available")}>
                    {status}
                  </Badge>
                  <span className="font-semibold text-navy-900">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Today&apos;s Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBookings.slice(0, 3).map((booking) => {
                const guest = getGuest(booking.guestId);
                return (
                  <div key={booking.id} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-gold-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-navy-900">
                        {guest?.firstName} {guest?.lastName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatDate(booking.checkIn)} — {booking.status}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
