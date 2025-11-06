import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);

  const chatMessages = [
    {
      id: 1,
      user: "Sarah",
      message: "I have a job interview tomorrow. What should I wear?",
      response:
        "For a professional interview, I recommend a navy blazer with tailored trousers and a crisp white blouse. This creates confidence while staying approachable.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 2,
      user: "Mike",
      message: "Date night outfit for a casual restaurant?",
      response:
        "Try dark jeans with a well-fitted henley and a casual blazer. Add clean white sneakers for a relaxed but put-together look.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 3,
      user: "Emma",
      message: "Weekend brunch with friends - what's trendy?",
      response:
        "A midi dress with denim jacket and ankle boots is perfect! Add delicate jewelry for that effortless chic vibe.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
  ];

  const outfitCarousel = [
    {
      id: 1,
      title: "Professional Power",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_jikuf3i4PriA4byuKgmAs35smmDBwAaiSw&s",
      tags: ["Business", "Confident", "Classic"],
    },
    {
      id: 2,
      title: "Casual Chic",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop",
      tags: ["Weekend", "Relaxed", "Trendy"],
    },
    {
      id: 3,
      title: "Date Night Glam",
      image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSgeNE7Lma28NI0KjiWIzsqvzQ0XdPSq4cJX_2rhkFfVYOoVv0l5OKrZASl_XOk",
      tags: ["Evening", "Elegant", "Romantic"],
    },
  ];

  useEffect(() => {
    const chatInterval = setInterval(() => {
      setCurrentChatIndex((prev) => (prev + 1) % chatMessages?.length);
    }, 4000);

    const outfitInterval = setInterval(() => {
      setCurrentOutfitIndex((prev) => (prev + 1) % outfitCarousel?.length);
    }, 3000);

    return () => {
      clearInterval(chatInterval);
      clearInterval(outfitInterval);
    };
  }, []);

  const currentChat = chatMessages?.[currentChatIndex];
  const currentOutfit = outfitCarousel?.[currentOutfitIndex];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-brand-canvas via-brand-cream to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-cta rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[80vh]">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6 ">
              <div className="inline-flex items-center space-x-2 bg-brand-cream px-4 py-2 rounded-full border border-brand-gold/20">
                <Icon name="Sparkles" size={16} className="text-brand-gold" />
                <span className="text-sm font-medium text-brand-text-primary">
                  AI-Powered Personal Styling
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-charcoal leading-tight text-center lg:text-start">
                Your Personal Style,
                <span className="bg-gradient-to-r from-brand-gold to-brand-cta bg-clip-text text-transparent font-accent">
                  Intelligently Enhanced
                </span>
              </h1>

              <p className="text-xl text-brand-text-secondary leading-relaxed lg:max-w-lg text-center lg:text-start">
                Discover your unique style DNA with AI that understands your
                preferences, lifestyle, and body type. Get personalized outfit
                recommendations that make you feel confident and authentic.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row md:justify-center lg:justify-start gap-4">
              <Link to="/style-assessment">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-brand-gold to-brand-cta hover:from-brand-cta hover:to-brand-gold text-white font-semibold px-8 py-4 rounded-xl shadow-brand-modal transition-all duration-300 transform hover:scale-105"
                  iconName="Zap"
                  iconPosition="left"
                  fullWidth
                >
                  Start Style Quiz
                </Button>
              </Link>

              <Link to="/ai-stylist-chat">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                  iconName="MessageCircle"
                  iconPosition="left"
                  fullWidth
                >
                  Chat with AI Stylist
                </Button>
              </Link>
            </div>

            {/* AI Chat Preview */}
            <div className="bg-white rounded-2xl shadow-brand p-6 border border-brand-cream">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-gold to-brand-cta rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <span className="font-semibold text-brand-text-primary">
                  Live AI Styling Session
                </span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Image
                    src={currentChat?.avatar}
                    alt={currentChat?.user}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="bg-brand-cream rounded-lg px-4 py-2 max-w-xs">
                    <p className="text-sm text-brand-text-primary">
                      {currentChat?.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-gradient-to-r from-brand-gold to-brand-cta rounded-lg px-4 py-2 max-w-xs">
                    <p className="text-sm text-white">
                      {currentChat?.response}
                    </p>
                  </div>
                  <Image src="/logo.png" alt="logo" className="w-8 h-8" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Dynamic Outfit Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Main Outfit Display */}
              <div className="relative overflow-hidden mt-32 rounded-3xl shadow-brand-modal">
                <Image
                  src={currentOutfit?.image}
                  alt={currentOutfit?.title}
                  className="w-full h-96 object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {currentOutfit?.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentOutfit?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outfit Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {outfitCarousel?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentOutfitIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentOutfitIndex
                        ? "bg-brand-gold scale-125"
                        : "bg-brand-cream hover:bg-brand-gold/50"
                    }`}
                  />
                ))}
              </div>

              {/* Floating Style Tags */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-brand">
                <Icon name="Heart" size={20} className="text-brand-gold" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
