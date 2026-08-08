"use client";

import { useState, useMemo } from "react";
import { useHotel } from "@/context/HotelContext";
import type { RoomFilters } from "@/lib/types";
import { RoomCard } from "@/components/rooms/RoomCard";
import { RoomFiltersBar } from "@/components/rooms/RoomFiltersBar";

export default function RoomsPage() {
  const { rooms } = useHotel();
  const [filters, setFilters] = useState<RoomFilters>({ type: "all" });

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      if (filters.type && filters.type !== "all" && room.type !== filters.type) return false;
      if (filters.capacity && room.capacity < filters.capacity) return false;
      if (filters.minPrice && room.price < filters.minPrice) return false;
      if (filters.maxPrice && room.price > filters.maxPrice) return false;
      if (filters.search) {
        const search = filters.search.toLowerCase();
        return (
          room.name.toLowerCase().includes(search) ||
          room.description.toLowerCase().includes(search) ||
          room.amenities.some((a) => a.toLowerCase().includes(search))
        );
      }
      return true;
    });
  }, [rooms, filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900">Our Rooms & Suites</h1>
        <p className="mt-2 text-slate-600">
          Choose from {rooms.length} beautifully appointed accommodations
        </p>
      </div>

      <div className="mb-8">
        <RoomFiltersBar filters={filters} onChange={setFilters} />
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
          <p className="text-lg font-medium text-navy-900">No rooms match your filters</p>
          <p className="mt-1 text-sm text-slate-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}
