/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/Prismadb";
import { NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/options";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { room: true }
  });

  // Security: Only the owner or an admin can see booking details
  if (booking?.userId !== session.user.id && session.user.role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.json(booking);
}

// PATCH: Update booking (Check-in/Check-out logic)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;
  const { status } = await req.json(); // e.g., "ACTIVE" (for check-in) or "COMPLETED"

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (booking?.userId !== session?.user.id && session?.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  // Ultramodern Check-In Logic
  const updateData: any = { status };
  
  if (status === "ACTIVE") {
    updateData.actualCheckIn = new Date();
    // Generate a 6-digit digital key for the room door
    updateData.digitalKey = Math.floor(100000 + Math.random() * 900000).toString();
  }

  const updatedBooking = await prisma.booking.update({
    where: { id },
    data: updateData
  });

  return NextResponse.json(updatedBooking);
}