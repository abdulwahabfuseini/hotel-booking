// src/app/api/webhook/paystack/route.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { paystack } from "@/lib/paystack";
import { prisma } from "@/lib/Prismadb";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { ReceiptPDF } from "@/components/luxury/ReceiptPDF";
import { ReceiptEmail } from "@/lib/emails";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature") || "";

    // 1. Verify Paystack Signature (Security First)
    if (!paystack.verifySignature(body, signature)) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const { metadata, amount, customer, reference } = event.data;

      // 2. Database Update
      const booking = await prisma.booking.create({
        data: {
          userId: metadata.userId,
          roomId: metadata.roomId,
          checkIn: new Date(metadata.checkIn),
          checkOut: new Date(metadata.checkOut),
          totalPrice: amount / 100, // Convert Kobo/Cents to Main Currency
          status: "CONFIRMED",
          paymentIntentId: reference,
        },
        include: { 
          room: true, 
          user: true 
        },
      });

      // 3. Generate PDF Buffer (The "Ultramodern" touch)
      const pdfBuffer = await renderToBuffer(<ReceiptPDF booking={booking} />);

      // 4. Send Professional Email with PDF Attachment
      await resend.emails.send({
        from: "The Grand Luxe <concierge@yourhotel.com>",
        to: customer.email,
        subject: `Booking Confirmed: Room ${booking.room.roomNumber}`,
        react: <ReceiptEmail booking={booking} />,
        attachments: [
          {
            filename: `receipt-${booking.id.slice(-8).toUpperCase()}.pdf`,
            content: pdfBuffer,
          },
        ],
      });

      return NextResponse.json({ message: "Success" }, { status: 200 });
    }

    return NextResponse.json({ message: "Event ignored" }, { status: 200 });
  } catch (error: any) {
    console.error("WEBHOOK_ERROR:", error);
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}