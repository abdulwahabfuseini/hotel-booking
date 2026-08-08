"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { RoomFilters } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface RoomFiltersBarProps {
  filters: RoomFilters;
  onChange: (filters: RoomFilters) => void;
}

export function RoomFiltersBar({ filters, onChange }: RoomFiltersBarProps) {
  const [search, setSearch] = useState(filters.search || "");

  const handleSearch = (value: string) => {
    setSearch(value);
    onChange({ ...filters, search: value });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          label="Room Type"
          value={filters.type || "all"}
          onChange={(e) =>
            onChange({
              ...filters,
              type: e.target.value as RoomFilters["type"],
            })
          }
          options={[
            { value: "all", label: "All Types" },
            { value: "standard", label: "Standard" },
            { value: "deluxe", label: "Deluxe" },
            { value: "suite", label: "Suite" },
            { value: "presidential", label: "Presidential" },
          ]}
        />

        <Select
          label="Guests"
          value={String(filters.capacity || 0)}
          onChange={(e) =>
            onChange({
              ...filters,
              capacity: Number(e.target.value) || undefined,
            })
          }
          options={[
            { value: "0", label: "Any" },
            { value: "2", label: "2+ Guests" },
            { value: "3", label: "3+ Guests" },
            { value: "4", label: "4+ Guests" },
          ]}
        />

        <Select
          label="Price Range"
          value={`${filters.minPrice || 0}-${filters.maxPrice || 9999}`}
          onChange={(e) => {
            const [min, max] = e.target.value.split("-").map(Number);
            onChange({ ...filters, minPrice: min, maxPrice: max });
          }}
          options={[
            { value: "0-9999", label: "All Prices" },
            { value: "0-250", label: "Under $250" },
            { value: "250-500", label: "$250 - $500" },
            { value: "500-9999", label: "$500+" },
          ]}
        />
      </div>
    </div>
  );
}
