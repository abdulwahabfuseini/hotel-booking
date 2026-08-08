import { auth } from "../../auth/[...nextauth]/options";
import { prisma } from "@/lib/Prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const { bookingId } = await req.json();

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId, userId: session.user.id },
  });

  if (!booking) return new NextResponse("Booking not found", { status: 404 });

  // Ultramodern: Generate a Digital Key (6-digit PIN) on Check-in
  const digitalKey = Math.floor(100000 + Math.random() * 900000).toString();

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "ACTIVE",
      actualCheckIn: new Date(),
      digitalKey: digitalKey,
    },
  });

  return NextResponse.json({ 
    message: "Welcome to your room!", 
    digitalKey: updatedBooking.digitalKey 
  });
}