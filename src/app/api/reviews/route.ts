/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/options";
import { prisma } from "@/lib/Prismadb";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const { roomId, rating, comment } = await req.json();

  try {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId: session.user.id,
        roomId,
      },
    });
    return NextResponse.json({ data: review, message: "Review created successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Review creation failed" }, { status: 500 });
  }
}