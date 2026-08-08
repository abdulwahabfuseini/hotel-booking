
import { prisma } from "@/lib/Prismadb";
import { StayTimeWidget } from "@/components/stay/StayTimeWidget";
import { KeyRound, Wind, Coffee, Zap } from "lucide-react";
import { auth } from "@/app/api/auth/[...nextauth]/options";

export default async function GuestDashboard() {
  const session = await auth();
  const booking = await prisma.booking.findFirst({
    where: { userId: session?.user.id, status: "ACTIVE" },
    include: { room: true }
  });

  if (!booking) return (
    <div className="p-20 text-center">
      <h1 className="font-serif text-4xl mb-4">No Active Stay</h1>
      <p className="text-stone-500">Your upcoming reservations will appear here.</p>
    </div>
  );

  return (
    <main className="min-h-screen pt-24 pb-12 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Real-time Countdown */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-serif text-4xl text-white">Welcome Home, {session?.user.name?.split(' ')[0]}</h2>
          <StayTimeWidget checkOut={booking.checkOut} />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-900 p-6 rounded-3xl border border-stone-800">
              <Zap className="text-gold-500 mb-4" />
              <p className="text-xs uppercase tracking-widest text-stone-500">Room Number</p>
              <p className="text-2xl text-white font-light">{booking.room.roomNumber}</p>
            </div>
            <div className="bg-stone-900 p-6 rounded-3xl border border-stone-800">
              <KeyRound className="text-gold-500 mb-4" />
              <p className="text-xs uppercase tracking-widest text-stone-500">Digital Key</p>
              <p className="text-2xl text-white font-mono tracking-widest">{booking.digitalKey}</p>
            </div>
          </div>
        </div>

        {/* Right: Room Controls / Services */}
        <div className="space-y-6">
          <div className="bg-white text-black p-8 rounded-3xl">
            <h3 className="font-serif text-xl mb-4 text-center">Room Concierge</h3>
            <div className="space-y-4">
              <button className="w-full flex justify-between items-center bg-stone-100 p-4 rounded-xl hover:bg-stone-200 transition-colors">
                <span className="text-sm font-semibold">Climate Control</span>
                <Wind size={18} />
              </button>
              <button className="w-full flex justify-between items-center bg-stone-100 p-4 rounded-xl hover:bg-stone-200 transition-colors">
                <span className="text-sm font-semibold">Order Service</span>
                <Coffee size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center mt-6 text-stone-400 uppercase tracking-widest">Tap to interact</p>
          </div>
        </div>

      </div>
    </main>
  );
}