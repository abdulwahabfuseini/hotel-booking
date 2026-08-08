import { QRCodeSVG } from 'qrcode.react';

export const RoomQRCode = ({ roomId }: { roomId: string }) => {
  const bookingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/booking/${roomId}?source=qr`;
  return (
    <div className="p-4 bg-white rounded-2xl shadow-2xl border border-gold-100">
      <QRCodeSVG value={bookingUrl} size={180} bgColor="#ffffff" fgColor="#1a1a1a" />
      <p className="mt-4 text-xs font-serif text-center uppercase tracking-widest">Express Scan to Book</p>
    </div>
  );
};