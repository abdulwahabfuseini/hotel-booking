"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ArrowRight,
  Wifi,
  Waves,
  Sparkles,
  UtensilsCrossed,
  Dumbbell,
  Car,
  Headphones,
  Wine,
} from "lucide-react";
import { useHotel } from "@/context/HotelContext";
import { HOTEL_INFO, AMENITIES } from "@/lib/data";
import { RoomCard } from "@/components/rooms/RoomCard";
import { Button } from "@/components/ui/Button";

const amenityIcons: Record<string, React.ElementType> = {
  wifi: Wifi,
  pool: Waves,
  spa: Sparkles,
  dining: UtensilsCrossed,
  gym: Dumbbell,
  parking: Car,
  concierge: Headphones,
  bar: Wine,
};

export default function HomePage() {
  const { rooms } = useHotel();
  const featuredRooms = rooms.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
            alt="Grand Horizon Hotel"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 fill-gold-400 text-gold-400" />
              <span className="text-sm font-medium text-gold-400">
                {HOTEL_INFO.rating} · {HOTEL_INFO.reviewCount.toLocaleString()} reviews
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {HOTEL_INFO.tagline}
            </h1>
            <p className="mb-8 text-lg text-slate-300">
              Discover unparalleled luxury at {HOTEL_INFO.name}. Nestled on Miami Beach
              with breathtaking ocean views, world-class dining, and exceptional service.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book">
                <Button size="lg">
                  Book Your Stay
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/rooms">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Explore Rooms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-navy-900">World-Class Amenities</h2>
            <p className="mt-2 text-slate-600">Everything you need for an unforgettable stay</p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
            {AMENITIES.map((amenity) => {
              const Icon = amenityIcons[amenity.icon] || Sparkles;
              return (
                <div key={amenity.label} className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50">
                    <Icon className="h-6 w-6 text-navy-700" />
                  </div>
                  <span className="text-xs font-medium text-navy-800">{amenity.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-navy-900">Featured Rooms</h2>
              <p className="mt-2 text-slate-600">Handpicked accommodations for every traveler</p>
            </div>
            <Link href="/rooms" className="hidden sm:block">
              <Button variant="ghost">
                View All Rooms
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready for Your Escape?</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Book directly with us for the best rates, complimentary upgrades, and exclusive perks.
          </p>
          <Link href="/book" className="mt-8 inline-block">
            <Button size="lg">Reserve Your Room Today</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
