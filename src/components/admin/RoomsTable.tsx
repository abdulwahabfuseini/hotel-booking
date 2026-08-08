"use client";

import Image from "next/image";
import type { Room } from "@/lib/types";
import {
  formatCurrency,
  getRoomStatusColor,
  getRoomTypeLabel,
} from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import type { RoomStatus } from "@/lib/types";

interface RoomsTableProps {
  rooms: Room[];
  onStatusChange?: (id: string, status: RoomStatus) => void;
}

const statusOptions = [
  { value: "available", label: "Available" },
  { value: "occupied", label: "Occupied" },
  { value: "cleaning", label: "Cleaning" },
  { value: "maintenance", label: "Maintenance" },
];

export function RoomsTable({ rooms, onStatusChange }: RoomsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-navy-800">Room</th>
              <th className="px-6 py-3 font-semibold text-navy-800">Type</th>
              <th className="px-6 py-3 font-semibold text-navy-800">Price</th>
              <th className="px-6 py-3 font-semibold text-navy-800">Capacity</th>
              <th className="px-6 py-3 font-semibold text-navy-800">Floor</th>
              <th className="px-6 py-3 font-semibold text-navy-800">Status</th>
              {onStatusChange && (
                <th className="px-6 py-3 font-semibold text-navy-800">Update</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 overflow-hidden rounded-lg">
                      <Image
                        src={room.images[0]}
                        alt={room.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-navy-900">{room.name}</p>
                      <p className="text-xs text-slate-500">{room.size} m²</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className="bg-navy-100 text-navy-800">
                    {getRoomTypeLabel(room.type)}
                  </Badge>
                </td>
                <td className="px-6 py-4 font-semibold text-navy-900">
                  {formatCurrency(room.price)}/night
                </td>
                <td className="px-6 py-4 text-navy-700">{room.capacity}</td>
                <td className="px-6 py-4 text-navy-700">{room.floor}</td>
                <td className="px-6 py-4">
                  <Badge className={getRoomStatusColor(room.status)}>
                    {room.status}
                  </Badge>
                </td>
                {onStatusChange && (
                  <td className="px-6 py-4">
                    <Select
                      value={room.status}
                      onChange={(e) =>
                        onStatusChange(room.id, e.target.value as RoomStatus)
                      }
                      options={statusOptions}
                      className="min-w-[130px] py-1.5"
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
