import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import BouquetOnly from "../../components/bouquet/BouquetOnly";
import FloatingPetals from "@/components/FloatingPetals";

export default async function AllBouquetsPage() {
  // Try fetching bouquets. If created_at fails, we'll just get them without order first.
  const { data, error } = await supabase
    .from("bouquets")
    .select("*")
    .order("id", { ascending: false }); // Using id as it's almost always present

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--warm-cream))]">
        <div className="text-center p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-pink-50 shadow-xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'cursive' }}>Oopsy!</h1>
          <p className="text-gray-500 italic">The garden seems to be resting right now.</p>
          <Link href="/" className="mt-8 inline-block px-8 py-3 bg-pink-400 text-white rounded-full font-bold shadow-lg">Go Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center p-4 md:p-8 overflow-hidden bg-gradient-to-br from-[hsl(var(--warm-cream))] via-[hsl(var(--dusty-pink))] to-[hsl(var(--warm-cream))] paper-texture">
      {/* Floating petals background */}
      <FloatingPetals />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* Header */}
        <header className="mb-12 animate-fade-in text-center">
          <Link href="/">
            <h1 className="text-4xl font-bold text-gray-800 hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'cursive' }}>
              Bloomy
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">Our Public Garden</h2>
          <p className="text-gray-500 font-light italic">A collection of blooms shared with the world</p>
        </header>

        {/* Garden Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full animate-fade-in-up">
          {data.map((bouquet) => (
            <div key={bouquet.id} className="group flex flex-col items-center">
              <div className="w-full transform group-hover:scale-[1.02] transition-transform duration-500">
                <BouquetOnly bouquet={bouquet} />
              </div>
              <div className="mt-6 flex flex-col items-center gap-2">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Planted on {new Date(bouquet.created_at || bouquet.timestamp).toLocaleDateString()}
                </p>
                <Link
                  href={`/bouquet/${bouquet.id}`}
                  className="text-xs text-pink-400 hover:text-pink-600 font-bold transition-colors"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <footer className="mt-20 mb-12 flex flex-col items-center">
          <div className="h-[1px] w-24 bg-pink-200 mb-8" />
          <Link
            href="/bouquet?mode=color"
            className="px-10 py-4 bg-gradient-to-r from-pink-300 to-pink-400 text-gray-800 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Plant your own Bloom
          </Link>
        </footer>
      </div>
    </div>
  );
}
