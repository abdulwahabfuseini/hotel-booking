"use client";

import { useState } from "react";
import { useHotel } from "@/context/HotelContext";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

const tierColors: Record<string, string> = {
  bronze: "bg-amber-100 text-amber-800",
  silver: "bg-slate-200 text-slate-700",
  gold: "bg-yellow-100 text-yellow-800",
  platinum: "bg-purple-100 text-purple-800",
};

export default function AdminGuestsPage() {
  const { guests } = useHotel();
  const [search, setSearch] = useState("");

  const filteredGuests = guests.filter((guest) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      guest.firstName.toLowerCase().includes(q) ||
      guest.lastName.toLowerCase().includes(q) ||
      guest.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Guests</h1>
          <p className="text-sm text-slate-500">
            Guest directory and loyalty program ({guests.length} guests)
          </p>
        </div>
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search guests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 font-semibold text-navy-800">Guest</th>
                <th className="px-6 py-3 font-semibold text-navy-800">Contact</th>
                <th className="px-6 py-3 font-semibold text-navy-800">Nationality</th>
                <th className="px-6 py-3 font-semibold text-navy-800">Loyalty Tier</th>
                <th className="px-6 py-3 font-semibold text-navy-800">Total Stays</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-sm font-semibold text-navy-700">
                        {getInitials(guest.firstName, guest.lastName)}
                      </div>
                      <div>
                        <p className="font-medium text-navy-900">
                          {guest.firstName} {guest.lastName}
                        </p>
                        <p className="text-xs text-slate-500">ID: {guest.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-navy-900">{guest.email}</p>
                    <p className="text-xs text-slate-500">{guest.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-navy-700">{guest.nationality || "—"}</td>
                  <td className="px-6 py-4">
                    <Badge className={tierColors[guest.loyaltyTier]}>
                      {guest.loyaltyTier}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-semibold text-navy-900">
                    {guest.totalStays}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
