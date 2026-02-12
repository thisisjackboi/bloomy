// app/bouquet/[id]/page.tsx
import { supabase } from "@/lib/supabase"; // we'll make this below
import Bouquet from "../../../components/bouquet/Bouquet";
import Image from "next/image";
import Link from "next/link";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

import FloatingPetals from "@/components/FloatingPetals";

export default async function BouquetPage(props: Params) {
  const params = await props.params;
  const { id } = params;

  const { data, error } = await supabase
    .from("bouquets")
    .select()
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--warm-cream))]">
        <div className="text-center p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-pink-50 shadow-xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'cursive' }}>Oopsy!</h1>
          <p className="text-gray-500 italic">This bouquet seems to have wilted (or doesn't exist).</p>
          <Link href="/" className="mt-8 inline-block px-8 py-3 bg-pink-400 text-white rounded-full font-bold shadow-lg">Go to Bloomy</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center p-4 md:p-8 overflow-hidden bg-gradient-to-br from-[hsl(var(--warm-cream))] via-[hsl(var(--dusty-pink))] to-[hsl(var(--warm-cream))] paper-texture">
      {/* Floating petals background */}
      <FloatingPetals />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Logo/Branding */}
        <header className="mb-12 animate-fade-in">
          <Link href="/">
            <h1 className="text-4xl font-bold text-gray-800 hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'cursive' }}>
              Bloomy
            </h1>
          </Link>
        </header>

        <main className="w-full flex flex-col items-center animate-fade-in-up">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Someone sent you blooms!</h2>
            <p className="text-gray-500 font-light italic">A digital bundle made just for you</p>
          </div>

          <div className="w-full max-w-2xl transform hover:scale-[1.02] transition-transform duration-700">
            <Bouquet bouquet={data} />
          </div>

          <footer className="mt-16 mb-12 flex flex-col items-center gap-6">
            <div className="h-[1px] w-24 bg-pink-200" />
            <Link
              href="/"
              className="group px-10 py-4 bg-white text-gray-700 font-bold rounded-full shadow-lg border border-pink-50 hover:border-pink-300 hover:shadow-xl transition-all duration-300 flex items-center gap-3"
            >
              <span>Make one for someone else</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
