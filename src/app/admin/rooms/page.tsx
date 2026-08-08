"use client";

import { useState } from "react";
import { useHotel } from "@/context/HotelContext";
import type { RoomStatus } from "@/lib/types";
import { RoomsTable } from "@/components/admin/RoomsTable";
import { Select } from "@/components/ui/Select";

export default function AdminRoomsPage() {
  const { rooms, updateRoomStatus } = useHotel();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredRooms =
    statusFilter === "all"
      ? rooms
      : rooms.filter((r) => r.status === statusFilter);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Rooms</h1>
          <p className="text-sm text-slate-500">
            Manage room inventory and status ({rooms.length} rooms)
          </p>
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "available", label: "Available" },
              { value: "occupied", label: "Occupied" },
              { value: "cleaning", label: "Cleaning" },
              { value: "maintenance", label: "Maintenance" },
            ]}
          />
        </div>
      </div>

      <RoomsTable
        rooms={filteredRooms}
        onStatusChange={(id, status) => updateRoomStatus(id, status as RoomStatus)}
      />
    </div>
  );
}
