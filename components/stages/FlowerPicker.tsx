"use client";

import Image from "next/image";
import { flowers } from "../../data/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBouquet } from "../../context/BouquetContext";
import { createFlowerCountMap } from "@/lib/bouquet-utils";
import type { Flower } from "@/types/bouquet";

// Type the flowers data from the imported data file using the proper Flower interface
const flowersData = flowers as Flower[];

export default function FlowerPicker() {
  const { bouquet, totalFlowers, addFlower, removeFlower } = useBouquet();

  // Convert bouquet flowers array to a map for easier counting and display
  // This creates a lookup table: flowerId -> count using utility function
  const selectedFlowersMap = createFlowerCountMap(bouquet.flowers);

  return (
    <TooltipProvider disableHoverableContent delayDuration={0}>
      <div className="h-full text-center relative">
        {/* Fixed Flower Count Indicator - Always visible at top */}
        {totalFlowers > 0 && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white via-white/95 to-white/80 backdrop-blur-md py-4 shadow-md border-b border-pink-100">
            <div className="flex items-center justify-center gap-3 flex-wrap px-4">
              <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-50 to-pink-100/50 rounded-full border-2 border-pink-200 shadow-sm">
                <span className="text-base font-bold text-pink-600">{totalFlowers}</span>
                <span className="text-sm text-gray-500">/</span>
                <span className="text-base font-bold text-gray-400">10</span>
                <span className="text-xs text-gray-600 ml-1 font-medium">flowers selected</span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-pink-600 font-bold animate-pulse">
                {totalFlowers < 6 ? `Add ${6 - totalFlowers} more to bundle` : "✓ Bundle ready!"}
              </p>
            </div>
          </div>
        )}

        {/* Spacer to prevent content from being hidden under fixed header */}
        {totalFlowers > 0 && <div className="h-16" />}

        {/* Page title and description */}
        <div className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pick your Blooms</h2>
        </div>

        {/* Grid of available flowers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
          {flowersData.map((flower) => {
            const isSelected = selectedFlowersMap[flower.id] > 0;
            return (
              <Tooltip key={flower.id}>
                <TooltipTrigger asChild>
                  <button
                    className={`group relative flex flex-col items-center p-2 transition-all duration-300 ${isSelected
                      ? "scale-110"
                      : "hover:scale-110"
                      }`}
                    onClick={(event) => {
                      event.preventDefault();
                      if (totalFlowers < 10) addFlower(flower);
                    }}
                  >

                    {/* Flower image container */}
                    <div
                      className={`relative flex items-center justify-center transition-transform duration-500 ${isSelected ? "scale-110" : "group-hover:scale-110"
                        }`}
                    >
                      <Image
                        src={`/${bouquet.mode}/flowers/${flower.name}.png`}
                        alt={flower.name}
                        width={120}
                        height={120}
                        className="object-contain drop-shadow-md"
                        priority
                      />
                    </div>

                    {/* Flower Name */}
                    <span className="mt-3 text-xs font-semibold text-gray-700 uppercase tracking-wide">
                      {flower.name}
                    </span>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white animate-soft-glow">
                        {selectedFlowersMap[flower.id]}
                      </div>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  onPointerDownOutside={(e) => e.preventDefault()}
                  side="bottom"
                  sideOffset={10}
                  className="z-50 p-4 w-48 text-center bg-white/90 backdrop-blur-md border-pink-100 rounded-2xl shadow-2xl"
                >
                  <h3 className="font-bold uppercase text-xs text-pink-600 mb-1">{flower.name}</h3>
                  <p className="text-[10px] leading-relaxed text-gray-600 mb-2 italic">"{flower.meaning}"</p>
                  <div className="h-[1px] bg-pink-50 w-full mb-2" />
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter"> {flower.birthMonth} bloom</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Selected flowers summary list */}
        {totalFlowers > 0 && (
          <div className="animate-fade-in-up">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Your Selection</p>
            <div className="flex flex-wrap gap-2 justify-center pb-8 border-b border-white/20">
              {Object.entries(selectedFlowersMap).map(([id, count]) => {
                const flower = flowersData.find(
                  (f) => f.id === Number.parseInt(id)
                );
                if (!flower) return null;
                return (
                  <button
                    key={id}
                    className="group px-3 py-1 text-[10px] font-bold text-gray-500 hover:text-pink-500 transition-all flex items-center gap-2"
                    onClick={() => removeFlower(Number.parseInt(id))}
                  >
                    <span>{flower.name.toUpperCase()}</span>
                    <span className="text-pink-400">
                      {count}
                    </span>
                    <span className="text-gray-300 group-hover:text-pink-500 transition-colors">×</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
