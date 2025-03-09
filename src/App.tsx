import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';
import { Wallet, Shield, Coins, ArrowUpRight, ExternalLink, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CryptoPrice {
  id: string;
  name: string;
  price: number;
  change24h: number;
}

function App() {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Simulated crypto price data - In production, replace with real API
    const mockData = [
      { id: 'bitcoin', name: 'Bitcoin', price: 65000, change24h: 2.5 },
      { id: 'ethereum', name: 'Ethereum', price: 3500, change24h: 1.8 },
      { id: 'cardano', name: 'Cardano', price: 1.2, change24h: -0.5 },
      // Add more cryptocurrencies...
    ];
    setCryptoPrices(mockData);

    // Simulate price updates
    const interval = setInterval(() => {
      setCryptoPrices(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.002),
        change24h: crypto.change24h + (Math.random() - 0.5),
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white">
      {/* Crypto Price Ticker */}
      <div className="bg-[#111217] border-b border-gray-800">
        <div className="container mx-auto py-2 px-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView="auto"
            autoplay={{ delay: 3000 }}
            loop={true}
            className="crypto-ticker"
          >
            {cryptoPrices.map((crypto) => (
              <SwiperSlide key={crypto.id} className="!w-auto">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{crypto.name}</span>
                  <span className="text-gray-400">${crypto.price.toLocaleString()}</span>
                  <span className={crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {crypto.change24h > 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 grid-bg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 text-gradient">
              Welcome to Exodus Wallet
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Your Gateway to the Future of Digital Asset Management
            </p>
            <div className="flex justify-center gap-4">
              <a href="#download" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 glow">
                Download Now
              </a>
              <a href="#learn-more" className="border border-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-600/10 transition-all duration-300">
                Learn More
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0d0e12]" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
              Why Choose Exodus Wallet?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Wallet className="w-8 h-8 text-indigo-400" />,
                  title: "Multi-Asset Support",
                  description: "Manage 200+ cryptocurrencies in one beautiful, easy-to-use wallet."
                },
                {
                  icon: <Shield className="w-8 h-8 text-indigo-400" />,
                  title: "Bank-Grade Security",
                  description: "Your private keys never leave your device. You have full control."
                },
                {
                  icon: <Coins className="w-8 h-8 text-indigo-400" />,
                  title: "Built-in Exchange",
                  description: "Swap cryptocurrencies instantly without leaving your wallet."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-[#161719] p-6 rounded-xl hover:glow transition-all duration-300"
                >
                  {feature.icon}
                  <h3 className="text-xl font-bold mt-4 mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <article className="prose prose-invert max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-gradient">Understanding Exodus Wallet</h2>
            
            <p className="text-lg text-gray-300 mb-6">
              Exodus Wallet stands at the forefront of cryptocurrency innovation, offering a seamless and secure platform for managing digital assets. As the cryptocurrency landscape evolves, Exodus continues to adapt and improve, providing users with cutting-edge features while maintaining its commitment to security and user experience.
            </p>

            <h3 className="text-2xl font-bold mt-12 mb-4">Key Features and Benefits</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-indigo-400 mt-1 mr-2" />
                <span>Advanced security protocols protecting your digital assets</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-indigo-400 mt-1 mr-2" />
                <span>Intuitive interface designed for both beginners and experts</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-5 h-5 text-indigo-400 mt-1 mr-2" />
                <span>Built-in exchange functionality for seamless trading</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mt-12 mb-4">Security First Approach</h3>
            <p className="text-lg text-gray-300 mb-6">
              Security is paramount in the cryptocurrency world, and Exodus Wallet implements multiple layers of protection to ensure your assets remain safe. From encrypted private keys to secure backup solutions, every aspect of the wallet is designed with security in mind.
            </p>

            <div className="bg-[#161719] p-6 rounded-xl mt-8 mb-8">
              <h4 className="text-xl font-bold mb-4">Security Features:</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Private key encryption</li>
                <li>• Automatic backup systems</li>
                <li>• Password-protected wallet</li>
                <li>• Secure recovery phrase system</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-4">Integration and Compatibility</h3>
            <p className="text-lg text-gray-300 mb-6">
              Exodus Wallet seamlessly integrates with various blockchain networks and supports a wide range of cryptocurrencies. This compatibility ensures users can manage their entire crypto portfolio from a single platform.
            </p>

            <div className="flex items-center justify-between bg-[#161719] p-6 rounded-xl mt-8">
              <div>
                <h4 className="text-xl font-bold mb-2">Ready to get started?</h4>
                <p className="text-gray-400">Download Exodus Wallet and join millions of users worldwide</p>
              </div>
              <a href="#download" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center">
                Download Now
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            <div className="mt-12 space-y-4">
              <h3 className="text-2xl font-bold">External Resources</h3>
              <div className="space-y-2">
                <a href="https://www.exodus.com/security" className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Security Documentation
                </a>
                <a href="https://support.exodus.com" className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Support Center
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default App;