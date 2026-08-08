/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/Prismadb";
import { NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/options";


// 1. GET: Fetch rooms or a single room by slug
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const room = await prisma.room.findUnique({
        where: { slug },
        include: { reviews: true, bookings: true },
      });
      if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });
      return NextResponse.json(room);
    }

    const rooms = await prisma.room.findMany({
      where: { status: "AVAILABLE" },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({data: rooms, count: rooms.length, message: "Fetched all available rooms successfully"});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}

// 2. POST: Create a new luxury room (Admin Only)
export async function POST(req: Request) {
  try {
    const session = await auth();

    // Protection: Only ADMIN can add rooms
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const body = await req.json();
    const { 
      roomNumber, 
      slug, 
      type, 
      pricePerNight, 
      capacity, 
      description, 
      images, 
      amenities 
    } = body;

    // Basic validation
    if (!roomNumber || !slug || !pricePerNight) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newRoom = await prisma.room.create({
      data: {
        roomNumber,
        slug: slug.toLowerCase().replace(/\s+/g, '-'),
        type,
        pricePerNight: parseFloat(pricePerNight),
        capacity: parseInt(capacity),
        description,
        images,
        amenities,
        status: "AVAILABLE",
      },
    });

    return NextResponse.json({ message: "Room created successfully", data: newRoom }, { status: 201 });
  } catch (error: any) {
    console.error("ROOM_POST_ERROR", error);
    return NextResponse.json({ error: error.message || "Failed to create room" }, { status: 500 });
  }
}

// 3. DELETE: Wipe all rooms (Careful! Admin Only)
export async function DELETE(req: Request) {
  try {
    const session = await auth();

    // Critical Protection
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete all rooms (Note: This will also delete related reviews/bookings if not handled)
    const deleted = await prisma.room.deleteMany({});

    return NextResponse.json({ 
      message: `Success. Deleted ${deleted.count} rooms.`,
      count: deleted.count 
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete rooms" }, { status: 500 });
  }
}