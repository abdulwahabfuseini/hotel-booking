import { paystack } from "@/lib/paystack";
import { NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const { roomId, checkIn, checkOut, totalAmount } = await req.json();

  const response = await paystack.initialize(session.user.email!, totalAmount, {
    userId: session.user.id,
    roomId,
    checkIn,
    checkOut,
  });

  if (!response.status)
    return NextResponse.json({ error: response.message }, { status: 400 });

  return NextResponse.json({ url: response.data.authorization_url });
}
