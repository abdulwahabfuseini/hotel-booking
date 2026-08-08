"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Users, Maximize } from "lucide-react";
import type { Room } from "@/lib/types";
import { formatCurrency, getRoomTypeLabel } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface RoomCardProps {
  room: Room;
  showBookButton?: boolean;
}

export function RoomCard({ room, showBookButton = true }: RoomCardProps) {
  return (
    <Card hover className="group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3">
          <Badge className="bg-white/90 text-navy-800 backdrop-blur-sm">
            {getRoomTypeLabel(room.type)}
          </Badge>
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
          <span className="text-xs font-semibold text-navy-900">{room.rating}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-1 text-lg font-semibold text-navy-900">{room.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-slate-600">{room.description}</p>

        <div className="mb-4 flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {room.capacity} guests
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            {room.size} m²
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-navy-900">
              {formatCurrency(room.price)}
            </span>
            <span className="text-sm text-slate-500"> / night</span>
          </div>
          <div className="flex gap-2">
            <Link href={`/rooms/${room.id}`}>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </Link>
            {showBookButton && (
              <Link href={`/book?room=${room.id}`}>
                <Button size="sm">Book</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
