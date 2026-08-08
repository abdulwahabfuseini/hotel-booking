import { prisma } from "@/lib/Prismadb";
import { NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/options";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  const { id } = await params;
  const { rating, comment } = await req.json();

  const review = await prisma.review.findUnique({ where: { id } });
  if (review?.userId !== session?.user.id) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const updatedReview = await prisma.review.update({
    where: { id },
    data: { rating, comment },
  });

  return NextResponse.json(updatedReview);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  const { id } = await params;

  const review = await prisma.review.findUnique({ where: { id } });
  if (review?.userId !== session?.user.id && session?.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ message: "Review removed" });
}
