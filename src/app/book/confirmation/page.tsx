"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Calendar, MapPin, Mail } from "lucide-react";
import { useHotel } from "@/context/HotelContext";
import { HOTEL_INFO } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const { getBooking, getRoom, getGuest } = useHotel();

  const booking = bookingId ? getBooking(bookingId) : undefined;
  const room = booking ? getRoom(booking.roomId) : undefined;
  const guest = booking ? getGuest(booking.guestId) : undefined;

  if (!booking || !room || !guest) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-lg text-navy-900">Booking not found</p>
        <Link href="/book" className="mt-4 inline-block">
          <Button>Make a New Booking</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-navy-900">Booking Confirmed!</h1>
        <p className="mt-2 text-slate-600">
          Thank you, {guest.firstName}. Your reservation is confirmed.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-navy-50 p-4 text-center">
            <p className="text-sm text-slate-500">Confirmation Number</p>
            <p className="text-xl font-bold tracking-wider text-navy-900">
              {booking.id.toUpperCase().replace("BOOKING_", "GH-")}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 text-gold-600" />
              <div>
                <p className="font-semibold text-navy-900">{room.name}</p>
                <p className="text-sm text-slate-600">
                  {formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}
                </p>
                <p className="text-sm text-slate-500">{booking.guests} guests</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-gold-600" />
              <div>
                <p className="font-semibold text-navy-900">{HOTEL_INFO.name}</p>
                <p className="text-sm text-slate-600">{HOTEL_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-gold-600" />
              <div>
                <p className="text-sm text-slate-600">
                  Confirmation sent to {guest.email}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Paid</span>
              <span className="text-gold-600">{formatCurrency(booking.totalAmount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
        <Link href="/rooms">
          <Button>Browse More Rooms</Button>
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
