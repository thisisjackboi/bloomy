import Image from "next/image";
import { useBouquet } from "../../context/BouquetContext";

export default function CardWriter() {
  const { bouquet, setBouquet } = useBouquet();
  return (
    <div className="flex flex-col items-center animate-fade-in py-8">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Write your Heart out</h2>
        <p className="text-gray-500 font-light italic">Your words are the secret ingredient</p>
      </div>

      <div className="relative w-full max-w-2xl px-4">
        {/* Decorative background flowers */}
        <div className="absolute -top-12 -left-12 opacity-40 animate-breathe pointer-events-none">
          <Image src="/color/flowers/peony.png" alt="" width={120} height={120} />
        </div>
        <div className="absolute -bottom-12 -right-12 opacity-40 animate-breathe-reverse pointer-events-none">
          <Image src="/color/flowers/lily.png" alt="" width={150} height={150} />
        </div>

        {/* The Card */}
        <div className="relative bg-white/90 backdrop-blur-md rounded-[40px] shadow-2xl p-8 md:p-12 border border-pink-50 transform hover:rotate-1 transition-transform duration-500">
          <div className="space-y-8">
            {/* Recipient */}
            <div className="flex items-center gap-3 border-b border-pink-50 pb-2">
              <label htmlFor="recipient" className="text-pink-400 font-bold uppercase text-[10px] tracking-widest">To:</label>
              <input
                id="recipient"
                value={bouquet.letter.recipient || ""}
                onChange={(e) =>
                  setBouquet((prev: any) => ({
                    ...prev,
                    letter: { ...prev.letter, recipient: e.target.value },
                  }))
                }
                placeholder="Name or nickname"
                className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 placeholder:text-gray-300 font-medium"
              />
            </div>

            {/* Message Area */}
            <div className="relative">
              <textarea
                id="message"
                value={bouquet.letter.message || ""}
                onChange={(e) =>
                  setBouquet((prev: any) => ({
                    ...prev,
                    letter: { ...prev.letter, message: e.target.value.slice(0, 500) },
                  }))
                }
                placeholder="Type your message here... tell them why you chose these flowers."
                rows={6}
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 placeholder:text-gray-300 resize-none font-light leading-relaxed text-lg italic"
              />
              <div className="absolute bottom-0 right-0 text-[10px] text-gray-300 font-bold">
                {bouquet.letter.message?.length || 0}/500
              </div>
            </div>

            {/* Sender */}
            <div className="flex items-center justify-end gap-3 border-t border-pink-50 pt-6">
              <label htmlFor="sender" className="text-pink-400 font-bold uppercase text-[10px] tracking-widest text-right">With love,</label>
              <input
                id="sender"
                value={bouquet.letter.sender || ""}
                onChange={(e) =>
                  setBouquet((prev: any) => ({
                    ...prev,
                    letter: { ...prev.letter, sender: e.target.value },
                  }))
                }
                placeholder="Your name"
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 placeholder:text-gray-300 font-medium text-right w-40"
              />
            </div>
          </div>

          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-[40px] bg-[url('/paper-texture.png')] opacity-10 mix-blend-multiply" />
        </div>
      </div>
    </div>
  );
}
