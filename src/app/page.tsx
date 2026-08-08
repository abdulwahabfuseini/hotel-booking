
"use client";

import { useHotel } from "@/context/HotelContext";
import { motion } from "framer-motion";

export default function HomePage() {
  const { rooms, loading } = useHotel();

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="animate-pulse text-gold-500 font-serif text-xl">Loading Experience...</div>
    </div>
  );

  return (
    <main className="pt-24 px-6">
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-6xl font-serif text-white text-center mb-12"
      >
        Discover Pure <span className="italic text-gold-500">Opulence</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {rooms.map((room) => (
          <div key={room.id} className="group relative overflow-hidden rounded-3xl bg-stone-900 border border-stone-800">
             {/* Room Card Content */}
             <div className="p-6">
                <h3 className="text-xl font-serif text-white">{room.type}</h3>
                <p className="text-gold-500">${room.pricePerNight} / night</p>
             </div>
          </div>
        ))}
      </div>
    </main>
  );
}