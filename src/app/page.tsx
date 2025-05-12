"use client"
import Tamagotchi from '@/components/Tamagotchi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWallet } from '@/context/WalletContext';
import Image from 'next/image';

export default function Home() {
  const { isConnected } = useWallet();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="max-w-6xl mx-auto w-full">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
           
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="relative">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg whitespace-nowrap bg-gradient-to-r from-[#4697ff] via-purple-500 to-[#4697ff] bg-clip-text text-transparent animate-gradient">
              Welcome to  GOTCHI
                </h1>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg whitespace-nowrap bg-gradient-to-r from-[#4697ff] via-purple-500 to-[#4697ff] bg-clip-text text-transparent animate-gradient">
                    
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 drop-shadow-lg bg-gradient-to-r from-purple-500 to-[#4697ff] bg-clip-text text-transparent">
                Take care of your digital pet
                </h2>
                <div className="space-y-6 text-gray-200 drop-shadow relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4697ff] to-purple-500 rounded-full"></div>
                
                  <p className="text-lg pl-4 hover:translate-x-1 transition-transform duration-300 mb-0">
                  Raise, nurture, and play with your very own Tamagotchi! Feed it, train it, and watch it grow — just like the classic pet you loved, but with a modern twist.
                  <br></br>

                  <br></br>
                  Stay Updated: Follow us on X for the latest news and updates!
                  </p>
                  <br></br>
                  
                </div>
                <br></br>

                <p className="text-lg font-medium pl-4 bg-gradient-to-r from-[#4697ff]/10 to-purple-500/10 p-4 rounded-lg border border-[#4697ff]/20 hover:border-[#4697ff]/40 transition-colors duration-300">
                    <b>What's Next:</b> The project is evolving! Soon, Tamagotchi will integrate with blockchain, making your pet unique and ownable.
                  </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
            {isConnected ? (    
               <Tamagotchi />
            ) : (
              <Image 
                className="max-w-full h-auto rounded-lg shadow-xl"
                src="/Cover-Image.png" 
                alt="Tamagotchi Cover" 
                width={500}
                height={500}
              />
            )}
            </div>
          </div>

        
        </div>
      </main>
      <Footer />
    </div>
  );
}
  
