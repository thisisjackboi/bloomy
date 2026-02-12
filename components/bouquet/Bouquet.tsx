import Image from "next/image";
import { flowers } from "../../data/data";
import type { BouquetReadOnlyProps } from "@/types/bouquet";

export default function Bouquet({ bouquet }: BouquetReadOnlyProps) {
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

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      {/* Bouquet Visualization Wrapper */}
      <div className="relative w-full aspect-[4/5] flex items-center justify-center mb-16">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Wrapper layer */}
          {bouquet.wrapper && (
            <div className="absolute top-[60%] left-1/2 z-0 transform -translate-x-1/2 w-full max-w-[550px] pointer-events-none drop-shadow-2xl">
              <Image
                src={`/color/wrapper/${bouquet.wrapper}.png`}
                alt=""
                width={800}
                height={600}
                className="object-contain"
                priority
              />
            </div>
          )}

          {/* Bush background images */}
          <Image
            src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}.png`}
            alt=""
            width={600}
            height={500}
            className="absolute top-1/2 left-1/2 z-[5] transform -translate-x-1/2 -translate-y-1/2 opacity-90 drop-shadow-2xl"
            priority
          />

          {/* Flower container */}
          <div className="flex flex-wrap justify-center items-center -space-x-8 -space-y-16 relative m-auto w-[280px] z-10 drop-shadow-xl">
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
                          className="relative z-10 drop-shadow-sm"
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
          <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-lg">
            <Image
              src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}-top.png`}
              alt=""
              width={600}
              height={500}
              priority
            />
          </div>
        </div>
      </div>

      {/* The Message Card */}
      <div className="w-full px-6 z-20">
        <div className="relative bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl p-10 border border-pink-50 transform -rotate-2 hover:rotate-0 transition-transform duration-500 max-w-[360px] mx-auto">
          <div className="space-y-6 text-left">
            <p className="text-pink-400 font-bold uppercase text-[10px] tracking-[0.2em]">Message for you</p>

            <div className="space-y-4">
              <p className="font-semibold text-gray-800">Dear {bouquet.letter.recipient || "Friend"},</p>
              <p className="text-gray-600 font-light italic leading-relaxed text-lg">
                "{bouquet.letter.message || "Sending you these beautiful digital blooms to brighten your day!"}"
              </p>
              <div className="flex flex-col items-end pt-4 border-t border-pink-50">
                <p className="text-pink-400 font-bold uppercase text-[9px] tracking-widest mb-1">With love,</p>
                <p className="font-semibold text-gray-800">{bouquet.letter.sender || "Someone Special"}</p>
              </div>
            </div>
          </div>

          {/* Subtle Paper Texture */}
          <div className="absolute inset-0 pointer-events-none rounded-[32px] bg-[url('/paper-texture.png')] opacity-5 mix-blend-multiply" />
        </div>
      </div>
    </div>
  );
}
