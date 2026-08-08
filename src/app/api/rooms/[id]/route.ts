import { prisma } from "@/lib/Prismadb";
import { NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/options";

// GET: Fetch a specific room by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const room = await prisma.room.findUnique({
    where: { id },
    include: { reviews: true, bookings: true },
  });
  return NextResponse.json(room);
}

// PATCH: Update Room details (Admin Only)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (session?.user.role !== "ADMIN")
    return new NextResponse("Unauthorized", { status: 403 });

  const { id } = await params;
  const body = await req.json();

  const updatedRoom = await prisma.room.update({
    where: { id },
    data: { ...body },
  });

  return NextResponse.json(updatedRoom);
}

// DELETE: Delete a specific room
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (session?.user.role !== "ADMIN")
    return new NextResponse("Unauthorized", { status: 403 });

  const { id } = await params;
  await prisma.room.delete({ where: { id } });

  return NextResponse.json({ message: "Room deleted successfully" });
}
