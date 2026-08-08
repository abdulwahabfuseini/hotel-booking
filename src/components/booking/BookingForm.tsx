"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, User, MessageSquare } from "lucide-react";
import type { Room, BookingFormData } from "@/lib/types";
import { useHotel } from "@/context/HotelContext";
import {
  calculateNights,
  calculateTotal,
  formatCurrency,
  formatDate,
} from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface BookingFormProps {
  room?: Room;
  initialCheckIn?: string;
  initialCheckOut?: string;
}

function getTomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function getDayAfter(date: string): string {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export function BookingForm({ room, initialCheckIn, initialCheckOut }: BookingFormProps) {
  const router = useRouter();
  const { rooms, addBooking, getAvailableRooms } = useHotel();

  const tomorrow = getTomorrow();
  const [checkIn, setCheckIn] = useState(initialCheckIn || tomorrow);
  const [checkOut, setCheckOut] = useState(initialCheckOut || getDayAfter(tomorrow));
  const [guests, setGuests] = useState(2);
  const [selectedRoomId, setSelectedRoomId] = useState(room?.id || "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const availableRooms = getAvailableRooms(checkIn, checkOut, guests);
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || room;
  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const total = selectedRoom ? calculateTotal(selectedRoom.price, checkIn, checkOut) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedRoomId && !room) {
      setError("Please select a room");
      return;
    }

    if (!firstName || !lastName || !email || !phone) {
      setError("Please fill in all guest details");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Check-out must be after check-in");
      return;
    }

    setLoading(true);

    const data: BookingFormData = {
      roomId: selectedRoomId || room!.id,
      checkIn,
      checkOut,
      guests,
      firstName,
      lastName,
      email,
      phone,
      specialRequests: specialRequests || undefined,
    };

    const booking = addBooking(data);

    if (booking) {
      router.push(`/book/confirmation?id=${booking.id}`);
    } else {
      setError("This room is no longer available for the selected dates");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gold-600" />
              Stay Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <Input
                label="Check-in"
                type="date"
                value={checkIn}
                min={tomorrow}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (e.target.value >= checkOut) {
                    setCheckOut(getDayAfter(e.target.value));
                  }
                }}
                required
              />
              <Input
                label="Check-out"
                type="date"
                value={checkOut}
                min={getDayAfter(checkIn)}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
              <Select
                label="Guests"
                value={String(guests)}
                onChange={(e) => setGuests(Number(e.target.value))}
                options={[
                  { value: "1", label: "1 Guest" },
                  { value: "2", label: "2 Guests" },
                  { value: "3", label: "3 Guests" },
                  { value: "4", label: "4 Guests" },
                ]}
              />
            </div>

            {!room && (
              <Select
                label="Select Room"
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                options={[
                  { value: "", label: "Choose a room..." },
                  ...availableRooms.map((r) => ({
                    value: r.id,
                    label: `${r.name} — ${formatCurrency(r.price)}/night`,
                  })),
                ]}
              />
            )}

            {availableRooms.length === 0 && !room && (
              <p className="text-sm text-amber-600">
                No rooms available for the selected dates and guest count.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-gold-600" />
              Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <div>
              <label className="mb-1.5 flex items-center gap-1 text-sm font-medium text-navy-800">
                <MessageSquare className="h-4 w-4" />
                Special Requests
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                placeholder="Early check-in, dietary requirements, etc."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedRoom ? (
              <>
                <div>
                  <p className="font-semibold text-navy-900">{selectedRoom.name}</p>
                  <p className="text-sm text-slate-500">
                    {formatDate(checkIn)} — {formatDate(checkOut)}
                  </p>
                </div>
                <div className="space-y-2 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">
                      {formatCurrency(selectedRoom.price)} × {nights} nights
                    </span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Taxes & fees</span>
                    <span>{formatCurrency(Math.round(total * 0.12))}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-bold">
                    <span>Total</span>
                    <span className="text-gold-600">
                      {formatCurrency(total + Math.round(total * 0.12))}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">Select dates and a room to see pricing</p>
            )}

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading || !selectedRoom}>
              {loading ? "Processing..." : "Confirm Booking"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
