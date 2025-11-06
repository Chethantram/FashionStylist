import React from "react";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import SocialProofSection from "./components/SocialProofSection";
import HowItWorksSection from "./components/HowItWorksSection";
import Features from "./components/Features";
import { motion } from "framer-motion";
import Image from "components/AppImage";

const Homepage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-background text-gray-800"
    >
      <Header />
      <main>
        <HeroSection />
        <Features />
        <SocialProofSection />
        <HowItWorksSection />
      </main>
      {/* Footer */}
      <footer className="bg-brand-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Image src="/logo.png" alt="logo" className="w-10 h-10 rounded-full" />

                <span className="text-xl font-semibold font-accent">
                  StyleMind AI
                </span>
              </div>
              <p className="text-white/80 mb-6 max-w-md">
                Your intelligent style companion that understands your unique
                preferences and helps you express your authentic self through
                fashion.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/Chethantram"  target="_blank" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                  <span className="text-sm font-bold">G</span>
                </a>
                <a href="https://modernportfolio-lilac.vercel.app/" target="_blank" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                  <span className="text-sm font-bold">P</span>
                </a>
                <a href="https://www.linkedin.com/in/chethant/" target="_blank" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                  <span className="text-sm font-bold">in</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a
                    href="/ai-stylist-chat"
                    className="hover:text-white transition-colors duration-300"
                  >
                    AI Stylist Chat
                  </a>
                </li>
                <li>
                  <a
                    href="/style-assessment"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Style Assessment
                  </a>
                </li>
                
                <li>
                  <a
                    href="/shopping-assistant"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Shopping Assistant
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-white transition-colors duration-300"
                  >
                    About us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © {new Date()?.getFullYear()} StyleMind AI. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-4 md:mt-0">
              Made with ❤️ for style enthusiasts worldwide
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Homepage;
