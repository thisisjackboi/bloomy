"use client";

import Image from "next/image";
import { flowers } from "../../data/data";
import { useBouquet } from "../../context/BouquetContext";

export default function BouquetCustomizer() {
  const { bouquet, setBouquet, setWrapper } = useBouquet();
  // Function to randomize the arrangement of flowers
  const randomizeFlowers = () => {
    // Calculate total number of individual flowers (not flower types)
    const totalFlowers = bouquet.flowers.reduce(
      (sum, flower) => sum + flower.count,
      0
    );
    // Create an array of indices from 0 to totalFlowers-1
    const indices = Array.from({ length: totalFlowers }, (_, i) => i);

    // Fisher-Yates shuffle algorithm to randomize the order
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setBouquet((prev) => ({
      ...prev,
      flowerOrder: indices,
    }));
  };

  const changeGreenery = () => {
    setBouquet((prev) => ({
      ...prev,
      greenery: (prev.greenery + 1) % 3,
    }));
  };

  // Helper function to get flower dimensions based on size
  const getFlowerDimensions = (size: string) => {
    switch (size) {
      case "small":
        return 80;
      case "large":
        return 160;
      default:
        return 120; // medium
    }
  };

  const wrappers = [
    { id: "wrapper-1", name: "Classic" },
    { id: "wrapper-2", name: "Elegant" },
    { id: "wrapper-3", name: "Natural" },
  ];

  return (
    <div className="flex flex-col mx-auto max-w-screen-lg animate-fade-in">
      {/* Controls section - Sticky */}
      <div className="sticky top-0 z-40 p-4 md:p-6 bg-white/30 backdrop-blur-sm rounded-[40px] border border-white/50 shadow-sm mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Bundle & Wrap</h2>

        <div className="flex flex-col gap-6 items-center">
          {/* Main Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={randomizeFlowers}
              className="px-8 py-4 bg-gradient-to-r from-pink-300 to-pink-400 text-gray-800 text-xs font-bold uppercase rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all animate-soft-glow"
            >
              Shuffle Arrangement
            </button>
            <button
              onClick={changeGreenery}
              className="px-8 py-4 bg-white text-gray-700 text-xs font-bold uppercase rounded-full border border-pink-100 shadow-sm hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              Change Greenery
            </button>
          </div>

          {/* Wrapper Selection */}
          <div className="w-full max-w-md">
            <p className="text-center text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Choose a Wrapper</p>
            <div className="grid grid-cols-3 gap-3">
              {wrappers.map((w) => {
                const isSelected = bouquet.wrapper === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => setWrapper(w.id)}
                    className={`relative px-4 py-3 text-[10px] font-bold uppercase rounded-2xl transition-all duration-300 border ${isSelected
                      ? "bg-pink-500 text-white border-pink-500 shadow-md transform -translate-y-1"
                      : "bg-white text-gray-500 border-pink-50 hover:border-pink-200 hover:bg-pink-50/30"
                      }`}
                  >
                    {w.name}
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center border border-pink-500">
                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Helper instruction text */}
      <div className="text-center mb-4 animate-fade-in">
        <p className="text-sm text-gray-600 italic">
          👆 Use the above filters to customize your bouquet
        </p>
      </div>

      {/* Visualization area */}
      <div className="flex relative justify-center items-center py-4 pb-40 lg:scale-110 overflow-hidden">
        <div className="relative w-full max-w-[500px] min-h-[410px] flex items-center justify-center scale-75 sm:scale-90 md:scale-100">
          {/* Wrapper layer */}
          {bouquet.wrapper && (
            <div className="absolute top-[52%] sm:top-[54%] md:top-[56%] left-1/2 z-0 transform -translate-x-1/2 w-full max-w-[550px] pointer-events-none drop-shadow-2xl">
              <Image
                src={`/color/wrapper/${bouquet.wrapper}.png`}
                alt="bouquet wrapper"
                width={800}
                height={600}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Bush background images */}
          <Image
            src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}.png`}
            alt="bush background"
            width={600}
            height={500}
            className="absolute top-[48%] left-1/2 z-[5] transform -translate-x-1/2 -translate-y-1/2 opacity-90 drop-shadow-xl w-full max-w-[600px] h-auto"
            priority
          />

          {/* Flower container */}
          <div className="flex flex-wrap justify-center items-center -space-x-8 -space-y-16 relative m-auto w-[280px] z-10 drop-shadow-lg">
            {bouquet.flowers.flatMap(
              (flower: { id: number; count: number }, flowerIndex: number) => {
                const flowerData = flowers.find((f) => f.id === flower.id);
                if (!flowerData) return [];

                return Array(flower.count)
                  .fill(null)
                  .map((_, instanceIndex) => {
                    const rotation = Math.random() * 20 - 10;
                    const index = bouquet.flowerOrder.length > 0
                      ? bouquet.flowerOrder[flowerIndex * flower.count + instanceIndex] ?? flowerIndex * flower.count + instanceIndex
                      : flowerIndex * flower.count + instanceIndex;

                    const dimensions = getFlowerDimensions(flowerData.size);

                    return (
                      <div
                        key={`${flowerIndex}-${instanceIndex}`}
                        className="flex relative justify-center items-center pt-2"
                        style={{ order: index }}
                      >
                        <Image
                          src={`/${bouquet.mode}/flowers/${flowerData.name}.png`}
                          alt={flowerData.name}
                          width={dimensions}
                          height={dimensions}
                          className="relative z-10 transition-transform hover:scale-110 drop-shadow-sm"
                          style={{ transform: `rotate(${rotation}deg)` }}
                          priority
                        />
                      </div>
                    );
                  });
              }
            )}
          </div>

          {/* Top bush layer */}
          <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-md">
            <Image
              src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}-top.png`}
              alt="bush top"
              width={600}
              height={500}
              className="w-full max-w-[600px] h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
