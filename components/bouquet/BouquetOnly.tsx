import Image from "next/image";
import { flowers } from "../../data/data";
import type { BouquetReadOnlyProps } from "@/types/bouquet";

export default function BouquetOnly({ bouquet }: BouquetReadOnlyProps) {
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
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full aspect-[4/5] flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Bush background images */}
          <Image
            src={`/${bouquet.mode}/bush/bush-${bouquet.greenery + 1}.png`}
            alt=""
            width={600}
            height={500}
            className="absolute top-1/2 left-1/2 z-0 transform -translate-x-1/2 -translate-y-1/2 opacity-90 drop-shadow-xl"
            priority
          />

          {/* Flower container */}
          <div className="flex flex-wrap justify-center items-center -space-x-8 -space-y-16 relative m-auto w-[240px] z-10 drop-shadow-lg">
            {bouquet.flowers.flatMap(
              (flower: { id: number; count: number }, flowerIndex: number) => {
                const flowerData = flowers.find((f) => f.id === flower.id);
                if (!flowerData) return [];

                return Array(flower.count)
                  .fill(null)
                  .map((_, instanceIndex) => {
                    const rotation = Math.random() * 20 - 10;
                    const index = bouquet.flowerOrder?.length
                      ? bouquet.flowerOrder[
                      flowerIndex * flower.count + instanceIndex
                      ] ?? flowerIndex * flower.count + instanceIndex
                      : flowerIndex * flower.count + instanceIndex;

                    const dimensions = getFlowerDimensions(flowerData.size) * 0.8; // Slightly smaller for the grid

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
          <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-md">
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
    </div>
  );
}
