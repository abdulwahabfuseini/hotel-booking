/* eslint-disable @typescript-eslint/no-explicit-any */

import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReceiptEmail = async (email: string, bookingData: any) => {
  await resend.emails.send({
    from: 'Concierge <bookings@yourluxuryhotel.com>',
    to: email,
    subject: `Your Stay at The Grand Luxe - Confirmation #${bookingData.id}`,
    html: `<h1>Welcome to Paradise, ${bookingData.userName}</h1><p>Find your receipt attached.</p>`,
    // You can attach the PDF buffer here using @react-pdf/renderer
    attachments: [
       { filename: 'receipt.pdf', content: bookingData.pdfBuffer }
    ]
  });
};