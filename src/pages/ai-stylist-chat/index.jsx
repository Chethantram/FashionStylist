import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/ui/Header";
import ChatSidebar from "./components/ChatSidebar";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import OutfitPanel from "./components/OutfitPanel";
import Icon from "../../components/AppIcon";
import {
  streamFashionAdvice,
  suggestOutfitAlternatives,
  handleGeminiError,
  getFashionAdvice,
} from "../../services/geminiStyleService";
import { useCancellableRequest } from "../../hooks/useCancellableRequest";
import { generateImageFromImage } from "services/HuggingFace";
import {motion} from 'framer-motion'
import Image from "components/AppImage";
import LoaderHanger from "components/Loader";

const AIStylistChat = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messages, setMessages] = useState([]);
  const [isOutfitPanelOpen, setIsOutfitPanelOpen] = useState(false);
  const [currentOutfit, setCurrentOutfit] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const {
    startRequest,
    cancelRequest,
    isProcessing,
    processingStage,
    processingProgress,
  } = useCancellableRequest();

  // Load messages from localStorage when conversation changes
  useEffect(() => {
    const savedMessages = localStorage.getItem(
      `chat_messages_${activeConversation}`
    );
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages(initialMessages);
    }
    setLoading(false);
  }, [activeConversation]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        `chat_messages_${activeConversation}`,
        JSON.stringify(messages)
      );
    }
  }, [messages, activeConversation]);


  // Initial welcome message with AI-powered greeting
  const initialMessages = [
    {
      id: 1,
      sender: "ai",
      type: "text",
      content: `Hello! I'm StyleMind AI, your personal fashion stylist powered by advanced AI technology. I'm here to help you discover your perfect style, create amazing outfits, and build confidence through fashion.

I can help you with:
• **Personalized outfit recommendations** for any occasion
• **Style analysis** based on your body type and preferences  
• **Color palette suggestions** that complement your skin tone
• **Wardrobe audit** and shopping guidance
• **Trend insights** and how to make them work for you
• **Budget-friendly styling** tips and alternatives

What can I help you style today? Feel free to ask me anything about fashion, or upload an inspiration photo to get started!`,
      timestamp: new Date(Date.now() - 1800000),
    },
  ];

  // Removed as we now handle this in the localStorage effect

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (content) => {
  const userMessage = {
    id: Date.now(),
    sender: "user",
    type: "text",
    content,
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, userMessage]);

  try {
    const aiMessageId = Date.now() + 1000;

    // Add placeholder
    const aiMessage = {
      id: aiMessageId,
      sender: "ai",
      type: "text",
      content: "Thinking...",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);

    // Fetch full AI response
    const response = await getFashionAdvice(
      content,
      messages
        ?.filter((msg) => msg?.sender === "user" || msg?.sender === "ai")
        ?.slice(-10)
        .filter((_, idx, arr) => !(idx === 0 && arr[0]?.sender === "ai"))
    );

    
    if (typeof response === "object") {
      // ✅ Parsed object (product data)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? { ...msg, type: "object", content: response }
            : msg
        )
      );
    } else {
      // ✅ Plain text fallback
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId ? { ...msg, type: "text", content: response } : msg
        )
      );
    }
  } catch (error) {
    console.error(error);
    const errorMessage = handleGeminiError(error);
    const aiErrorMessage = {
      id: Date.now() + 2000,
      sender: "ai",
      type: "text",
      content: `I apologize, but ${errorMessage}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiErrorMessage]);
  }
};


const handleUploadImage = async (file) => {
  // Add user's uploaded image
  const imageMessage = {
    id: Date.now(),
    sender: "user",
    type: "image_analysis",
    analyzedImage: URL.createObjectURL(file),
    content: "I uploaded this image for style inspiration",
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, imageMessage]);

  try {
    const generatedBlob = await generateImageFromImage(file);

    const generatedImageURL = URL.createObjectURL(generatedBlob);

    const analysisResponse = {
      id: Date.now() + 1000,
      sender: "ai",
      type: "image_analysis", // ✅ important: set type to 'image_analysis'
      analyzedImage: generatedImageURL, // URL for AI generated image
      content: "", // optional text
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, analysisResponse]);
  } catch (error) {
    const errorMessage = handleGeminiError(error);

    const aiErrorMessage = {
      id: Date.now() + 2000,
      sender: "ai",
      type: "text",
      content: `I had trouble analyzing that image. ${errorMessage}\n\nHowever, I'd love to help you recreate a similar look! Can you describe what you liked about the style? For example:\n• The colors or patterns\n• The silhouette or fit\n• The overall vibe or occasion\n• Any specific pieces that caught your eye`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiErrorMessage]);
  }
};


  const handleSaveOutfit = (outfit) => {
    // In a real app, this would save to user's collection
    const confirmationMessage = {
      id: Date.now(),
      sender: "ai",
      type: "text",
      content: `Great choice! I've saved "${outfit?.name}" to your style collection. You can find it in your Virtual Wardrobe anytime. Would you like me to suggest some variations of this look or help you plan accessories for it?`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, confirmationMessage]);
  };

  const handleRequestAlternative = async (outfit) => {
    try {
      const result = await startRequest(async (signal) => {
        return await suggestOutfitAlternatives(outfit, {
          favoriteColors: ["black", "white", "navy"], // Could get from user profile
          bodyType: "not specified",
          stylePreferences: ["classic", "modern"],
          budget: "moderate",
        });
      });

      const alternativeResponse = {
        id: Date.now(),
        sender: "ai",
        type: "outfit_alternatives",
        content: `Here are some fantastic alternatives to "${outfit?.name}" that I think you'll love:`,
        alternatives: result,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, alternativeResponse]);
    } catch (error) {
      const errorMessage = handleGeminiError(error);

      const aiErrorMessage = {
        id: Date.now() + 1000,
        sender: "ai",
        type: "text",
        content: `${errorMessage} But I can suggest some general alternatives to "${outfit?.name}":\n\n• Try switching the colors to your favorites\n• Add or remove layers for different seasons\n• Change the shoes to dress it up or down\n• Swap accessories for a different vibe\n\nWhat specific changes would you like to explore?`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiErrorMessage]);
    }
  };

  const handleNewChat = () => {
    const newConversationId = Date.now();
    setActiveConversation(newConversationId);
    setMessages([
      {
        id: 1,
        sender: "ai",
        type: "text",
        content: `Hello! I'm StyleMind AI, ready to start a fresh styling session with you. What's your fashion focus today?\n\nI can help with:\n• **Outfit planning** for specific events or daily wear\n• **Wardrobe optimization** and mix-and-match strategies\n• **Style discovery** to define or refine your personal aesthetic\n• **Shopping guidance** and budget-smart recommendations\n• **Trend translation** to make current styles work for you\n\nWhat would you like to explore together?`,
        timestamp: new Date(),
      },
    ]);
  };

  const handleCustomizeOutfit = (category, item) => {
    setCurrentOutfit((prev) => ({
      ...prev,
      [category]: item,
    }));
  };

  if(loading)
  {
    return <LoaderHanger/>
  }


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <motion.div  initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }} className="flex h-screen pt-16">
        {/* Sidebar */}
        <ChatSidebar
          // conversations={conversations}
          activeConversation={activeConversation}
          onConversationSelect={setActiveConversation}
          onNewChat={handleNewChat}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-card border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
             <Image src="/logo.png" alt="logo" className="w-10 h-10" />
              <div>
                <h2 className="text-lg font-semibold text-brand-charcoal">
                  StyleMind AI
                </h2>
                <p className="text-sm text-brand-text-secondary">
                  {isProcessing
                    ? processingStage
                    : "Your Personal Style Assistant"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsOutfitPanelOpen(true)}
                className="p-2 rounded-lg hover:bg-muted transition-smooth"
                title="Open Outfit Studio"
              >
                <Icon
                  name="Palette"
                  size={20}
                  color="var(--color-brand-text-secondary)"
                />
              </button>
              {isProcessing && (
                <button
                  onClick={cancelRequest}
                  className="p-2 rounded-lg hover:bg-red-50 transition-smooth text-red-600"
                  title="Cancel Request"
                >
                  <Icon name="X" size={20} />
                </button>
              )}
              {/* <button className="p-2 rounded-lg hover:bg-muted transition-smooth">
                <Icon
                  name="MoreVertical"
                  size={20}
                  color="var(--color-brand-text-secondary)"
                />
              </button> */}
            </div>
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="bg-muted p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-brand-text-secondary">
                  {processingStage}
                </span>
                <span className="text-xs text-brand-text-secondary">
                  {processingProgress}%
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-brand-gold to-brand-cta h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages?.map((message) => (
              <ChatMessage
                key={message?.id}
                message={message}
                onSaveOutfit={handleSaveOutfit}
                onRequestAlternative={handleRequestAlternative}
                onUploadInspiration={handleUploadImage}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            onUploadImage={handleUploadImage}
            isTyping={isProcessing}
            disabled={isProcessing}
          />
        </div>

        {/* Outfit Panel */}
        <OutfitPanel
          isOpen={isOutfitPanelOpen}
          onClose={() => setIsOutfitPanelOpen(false)}
          currentOutfit={currentOutfit}
          onCustomizeOutfit={handleCustomizeOutfit}
          onSaveOutfit={handleSaveOutfit}
        />
      </motion.div>
    </div>
  );
};

export default AIStylistChat;
