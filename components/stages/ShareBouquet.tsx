import Image from "next/image";
import { flowers } from "../../data/data";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import Bouquet from "../bouquet/Bouquet";
import { useBouquet } from "../../context/BouquetContext";
import type { Bouquet as BouquetType } from "@/types/bouquet";

export default function ShareBouquet() {
  const { bouquet } = useBouquet();
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

  const router = useRouter();

  const handleCreateBouquet = async (bouquet: BouquetType) => {
    const short_id = nanoid(8);

    const { data, error } = await supabase
      .from("bouquets")
      .insert([
        {
          short_id: short_id,
          mode: bouquet.mode,
          flowers: bouquet.flowers,
          letter: bouquet.letter,
          timestamp: bouquet.timestamp,
          greenery: bouquet.greenery,
          flowerOrder: bouquet.flowerOrder,
          wrapper: bouquet.wrapper,
        },
      ])
      .select(); // returns inserted row(s)

    if (error || !data || data.length === 0) {
      console.error("Error creating bouquet:", error);
      return;
    }

    const bouquetId = data[0].id;
    
    // Create the shareable link
    const baseUrl = window.location.origin;
    const bouquetUrl = `${baseUrl}/bouquet/${bouquetId}`;
    
    // Create WhatsApp message
    const message = `🌸 I made a beautiful digital bouquet just for you! 💐\n\nClick here to see it: ${bouquetUrl}\n\nMade with love on Bloomy 🌺`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center animate-fade-in py-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Bouquet Ready!</h2>
        <p className="text-gray-500 font-light italic">One last look before it journeys to them</p>
      </div>

      <div className="w-full max-w-2xl transform hover:scale-[1.02] transition-transform duration-700">
        <Bouquet bouquet={bouquet} />
      </div>

      <div className="mt-12 mb-20 flex flex-col items-center gap-4">
        <button
          onClick={() => {
            console.log("Sending bouquet");
            handleCreateBouquet(bouquet);
          }}
          className="group relative px-12 py-5 bg-gradient-to-r from-pink-300 to-pink-500 text-gray-800 text-lg font-bold rounded-full shadow-2xl hover:shadow-pink-200/50 hover:scale-105 active:scale-95 transition-all duration-300 animate-soft-glow flex items-center gap-3"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="relative z-10">Send to Someone Special</span>
          <svg
            width="20" height="20" viewBox="0 0 24 24" fill="none"
            className="transform group-hover:translate-x-1 transition-transform"
          >
            <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Share via WhatsApp • Creates a magical link</p>
      </div>
    </div>
  );
}
