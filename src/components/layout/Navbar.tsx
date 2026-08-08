"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { User, QrCode } from "lucide-react";

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/20 backdrop-blur-md border-b border-white/5">
      <Link
        href="/"
        className="font-serif text-2xl tracking-tighter text-white"
      >
        GRAND<span className="text-gold-500 font-light italic">LUXE</span>
      </Link>

      <div className="flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
        <Link href="/rooms" className="hover:text-gold-400 transition-colors">
          Suites
        </Link>
        <Link
          href="/scanner"
          className="flex items-center gap-2 text-gold-500 border border-gold-500/30 px-4 py-2 rounded-full hover:bg-gold-500/10 transition-all"
        >
          <QrCode size={16} /> Scan QR
        </Link>
        {session ? (
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full hover:bg-stone-200"
          >
            <User size={16} /> Portal
          </Link>
        ) : (
          <Link href="/auth/login" className="text-white hover:text-gold-400">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};
