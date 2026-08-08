import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { HotelProvider } from "@/context/HotelContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HOTEL_INFO } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${HOTEL_INFO.name} — Luxury Hotel Booking`,
    template: `%s | ${HOTEL_INFO.name}`,
  },
  description:
    "Experience world-class hospitality at Grand Horizon Hotel. Book luxury rooms, suites, and penthouses with stunning ocean views.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-navy-900">
        <HotelProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </HotelProvider>
      </body>
    </html>
  );
}
