"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hotel, MapPin, Phone, Mail } from "lucide-react";
import { HOTEL_INFO } from "@/lib/data";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto border-t border-slate-200 bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-600">
                <Hotel className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">{HOTEL_INFO.name}</span>
            </div>
            <p className="text-sm text-slate-400">{HOTEL_INFO.tagline}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/rooms" className="text-sm text-slate-400 hover:text-white transition-colors">
                Browse Rooms
              </Link>
              <Link href="/book" className="text-sm text-slate-400 hover:text-white transition-colors">
                Make a Reservation
              </Link>
              <Link href="/admin" className="text-sm text-slate-400 hover:text-white transition-colors">
                Staff Portal
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Contact
            </h4>
            <div className="space-y-3">
              <p className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {HOTEL_INFO.address}
              </p>
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="h-4 w-4 text-gold-500" />
                {HOTEL_INFO.phone}
              </p>
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4 text-gold-500" />
                {HOTEL_INFO.email}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {HOTEL_INFO.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
