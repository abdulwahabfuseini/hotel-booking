"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Users, Maximize, ArrowLeft, Check } from "lucide-react";
import { useHotel } from "@/context/HotelContext";
import { formatCurrency, getRoomTypeLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getRoom } = useHotel();
  const room = getRoom(id);

  if (!room) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/rooms"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-gold-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Rooms
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={room.images[0]}
              alt={room.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {room.images.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {room.images.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={img}
                    alt={`${room.name} ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex items-center gap-3">
            <Badge className="bg-navy-100 text-navy-800">{getRoomTypeLabel(room.type)}</Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
              <span className="text-sm font-semibold">{room.rating}</span>
              <span className="text-sm text-slate-500">({room.reviewCount} reviews)</span>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-navy-900">{room.name}</h1>
          <p className="mb-6 text-slate-600 leading-relaxed">{room.description}</p>

          <div className="mb-6 flex flex-wrap gap-6 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5 text-navy-600" />
              Up to {room.capacity} guests
            </span>
            <span className="flex items-center gap-2">
              <Maximize className="h-5 w-5 text-navy-600" />
              {room.size} m²
            </span>
            <span className="text-navy-700">Floor {room.floor}</span>
          </div>

          <Card className="mb-6">
            <CardContent>
              <h3 className="mb-3 font-semibold text-navy-900">Room Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-emerald-500" />
                    {amenity}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <span className="text-3xl font-bold text-navy-900">
                {formatCurrency(room.price)}
              </span>
              <span className="text-slate-500"> / night</span>
            </div>
            <Link href={`/book?room=${room.id}`}>
              <Button size="lg">Book This Room</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
