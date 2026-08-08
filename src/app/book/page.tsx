"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useHotel } from "@/context/HotelContext";
import { BookingForm } from "@/components/booking/BookingForm";

function BookPageContent() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const { getRoom } = useHotel();
  const room = roomId ? getRoom(roomId) : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900">
          {room ? `Book ${room.name}` : "Make a Reservation"}
        </h1>
        <p className="mt-2 text-slate-600">
          Complete your booking in just a few steps
        </p>
      </div>
      <BookingForm room={room} />
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12">Loading...</div>}>
      <BookPageContent />
    </Suspense>
  );
}
