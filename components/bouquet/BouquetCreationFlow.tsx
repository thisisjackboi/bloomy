"use client";

import { useState } from "react";
import FlowerPicker from "../stages/FlowerPicker";
import BouquetCustomizer from "../stages/BouquetCustomizer";
import CardWriter from "../stages/CardWriter";
import ShareBouquet from "../stages/ShareBouquet";
import Link from "next/link";
import { useBouquet } from "../../context/BouquetContext";
import FloatingPetals from "../FloatingPetals";

// Define the 4 steps of the bouquet creation process
const steps = ["Flowers", "Bundling", "Message", "Send"];

// Client component that uses the bouquet context
export default function BouquetCreationFlow() {
  const { bouquet, canProceed } = useBouquet();

  // Track which step the user is currently on (0-3)
  const [currentStep, setCurrentStep] = useState(0);

  // Navigation functions
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1)); // Move forward, but don't exceed max step
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0)); // Move backward, but don't go below 0

  return (
    <main className="relative min-h-screen flex flex-col p-4 md:p-8 overflow-hidden bg-gradient-to-br from-[hsl(var(--warm-cream))] via-[hsl(var(--dusty-pink))] to-[hsl(var(--warm-cream))] paper-texture">
      {/* Floating petals background */}
      <FloatingPetals />

      <div className="relative z-10 container flex flex-col flex-grow mx-auto max-w-4xl">
        {/* Logo/Branding */}
        <header className="flex flex-col items-center mb-8">
          <Link href="/">
            <h1 className="text-4xl font-bold text-gray-800 hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'cursive' }}>
              Bloomy
            </h1>
          </Link>
        </header>

        {/* Main content area - renders different components based on current step */}
        <div className="flex-grow py-4 animate-fade-in">
          {/* Step 0: Flower Selection */}
          {currentStep === 0 && <FlowerPicker />}

          {/* Step 1: Bouquet Customization */}
          {currentStep === 1 && <BouquetCustomizer />}

          {/* Step 2: Card Writing */}
          {currentStep === 2 && <CardWriter />}

          {/* Step 3: Sharing */}
          {currentStep === 3 && <ShareBouquet />}
        </div>

        {/* Navigation buttons */}
        <footer className="flex flex-row gap-4 justify-between items-center mt-12 mb-8 px-4 max-w-lg mx-auto w-full">
          {/* Back button */}
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`text-xs px-6 py-3 rounded-full border transition-all duration-300 ${currentStep > 0
              ? "border-gray-400 text-gray-600 hover:bg-white/50 px-8"
              : "opacity-0 pointer-events-none"
              }`}
          >
            PREVIOUS
          </button>

          {/* Next button */}
          {currentStep < steps.length - 1 && (
            <button
              onClick={nextStep}
              disabled={!canProceed}
              className={`text-xs px-10 py-3 rounded-full font-bold shadow-lg transition-all duration-300 ${canProceed
                ? "bg-gradient-to-r from-pink-300 to-pink-400 text-gray-800 hover:shadow-xl hover:scale-105 active:scale-95 animate-soft-glow"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                }`}
            >
              NEXT STEP
            </button>
          )}
        </footer>
      </div>
    </main>
  );
}
