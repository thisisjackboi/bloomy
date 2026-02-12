import Image from "next/image";
import Link from "next/link";
import FloatingPetals from "../components/FloatingPetals";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 overflow-hidden bg-gradient-to-br from-[hsl(var(--warm-cream))] via-[hsl(var(--dusty-pink))] to-[hsl(var(--warm-cream))] paper-texture">
      {/* Floating petals background */}
      <FloatingPetals />

      <div className="relative z-10 p-4 md:p-16 mx-auto max-w-3xl text-center animate-fade-in-up">
        {/* Cute floral illustration with breathing animation */}
        <div className="mb-8 animate-breathe">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            {/* Center circle */}
            <circle cx="60" cy="60" r="12" fill="#FFD700" />

            {/* Petals */}
            <ellipse cx="60" cy="30" rx="15" ry="25" fill="#FFB6C1" />
            <ellipse cx="60" cy="90" rx="15" ry="25" fill="#FFB6C1" />
            <ellipse cx="30" cy="60" rx="25" ry="15" fill="#FFC0CB" />
            <ellipse cx="90" cy="60" rx="25" ry="15" fill="#FFC0CB" />

            {/* Diagonal petals */}
            <ellipse cx="40" cy="40" rx="18" ry="22" fill="#FFB6C1" transform="rotate(-45 40 40)" />
            <ellipse cx="80" cy="40" rx="18" ry="22" fill="#FFC0CB" transform="rotate(45 80 40)" />
            <ellipse cx="40" cy="80" rx="18" ry="22" fill="#FFC0CB" transform="rotate(45 40 80)" />
            <ellipse cx="80" cy="80" rx="18" ry="22" fill="#FFB6C1" transform="rotate(-45 80 80)" />

            {/* Sparkles */}
            <circle cx="20" cy="20" r="3" fill="#FFD700" className="animate-sparkle" />
            <circle cx="100" cy="25" r="2" fill="#FFD700" className="animate-sparkle" style={{ animationDelay: '0.5s' }} />
            <circle cx="95" cy="95" r="3" fill="#FFD700" className="animate-sparkle" style={{ animationDelay: '1s' }} />
          </svg>
        </div>

        {/* Brand name - elegant script style */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'cursive' }}>
          Bloomy
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 font-light" style={{ fontFamily: 'system-ui, sans-serif' }}>
          Send Happiness Digitally
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col justify-center items-center gap-4 mb-6">
          <Link
            href="/bouquet?mode=color"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-300 to-pink-400 text-gray-800 text-base font-semibold rounded-full shadow-lg animate-gentle-bounce hover:shadow-xl transition-all duration-300 animate-soft-glow"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
            </svg>
            Build a Bouquet
          </Link>

          <Link
            href="/bouquet?mode=mono"
            className="w-full md:w-auto px-8 py-4 border-2 border-gray-400 text-gray-700 text-base font-semibold rounded-full hover:bg-white/50 transition-all duration-300"
          >
            Build in Black & White
          </Link>

          <Link
            href="/garden"
            className="text-base text-gray-600 underline hover:text-gray-800 transition-colors"
          >
            View Garden
          </Link>
        </div>

        {/* Decorative leaves */}
        <div className="mt-12 flex justify-center gap-4">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-green-300">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.66-1.89C8 14 10 8 17 8z" fill="currentColor" opacity="0.6" />
          </svg>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-green-300 transform scale-x-[-1]">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.66-1.89C8 14 10 8 17 8z" fill="currentColor" opacity="0.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
