
import { prisma } from "@/lib/Prismadb";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/context/Providers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 1. Fetch data on the server (Fast & SEO friendly)
  const initialRooms = await prisma.room.findMany({
    where: { status: "AVAILABLE" },
  });

  return (
    <html lang="en" className="dark">
      <body className="bg-black text-stone-200 antialiased">
        {/* 2. Wrap everything in the unified Providers */}
        <Providers initialRooms={initialRooms}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}