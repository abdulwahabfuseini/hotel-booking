
"use client";
import { Scanner } from '@yudiel/react-qr-scanner';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function QRScannerPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <h1 className="font-serif text-3xl text-white mb-2">Instant Experience</h1>
        <p className="text-stone-400 mb-8 text-sm uppercase tracking-widest">Scan the code at your door</p>
        
        <div className="relative aspect-square rounded-[3rem] overflow-hidden border-2 border-gold-500/50 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
          <Scanner
            onScan={(result) => {
              if (result) router.push(result[0].rawValue);
            }}
            styles={{ container: { width: '100%', height: '100%' } }}
          />
          {/* Decorative Corner Borders */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-gold-500 rounded-tl-2xl" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-gold-500 rounded-tr-2xl" />
        </div>

        <button 
          onClick={() => router.back()}
          className="mt-12 text-stone-500 hover:text-white uppercase tracking-tighter text-xs"
        >
          Cancel and return to browsing
        </button>
      </motion.div>
    </div>
  );
}