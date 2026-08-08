import { NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/options";
import { prisma } from "@/lib/Prismadb";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const { roomId, checkIn, checkOut } = await req.json();

  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) return new NextResponse("Room not found", { status: 404 });

  // Calculate nights
  const diffTime = Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime());
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalAmount = room.pricePerNight * nights;

  // Create Stripe Session
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `${room.type} Room ${room.roomNumber}` },
          unit_amount: totalAmount * 100, // cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${room.slug}?status=cancelled`,
    metadata: {
      userId: session.user.id,
      roomId: room.id,
      checkIn,
      checkOut,
    },
  });

  return NextResponse.json({ url: stripeSession.url });
}