import React, { useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const ChatMessage = ({
  message,
  onSaveOutfit,
  onRequestAlternative,
  onUploadInspiration,
}) => {
  const [showActions, setShowActions] = useState(false);

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);
  
  const renderMessageContent = () => {
    switch (message?.type) {
      case "text":
        return (
          <div className="prose prose-sm max-w-none">
            <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
              <ReactMarkdown>{message?.content}</ReactMarkdown>{" "}
            </p>
          </div>
        );
      case "object":
        return (
          <div className="flex flex-col gap-4">
            {Array.isArray(message?.content) &&
              message?.content.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-card border border-border rounded-xl p-3 hover:shadow-md transition-all duration-200 space-x-3"
                >
                  <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                    <Image
                      src={item?.imageUrl}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-brand-text-primary line-clamp-2">
                      {item?.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-brand-text-secondary mt-1 capitalize border px-4 bg-green-50 border-green-500 rounded-2xl py-0.5 text-gray-600 font-semibold">
                        {item?.category}
                      </p>
                      <p className="text-xs text-brand-text-secondary mt-1 capitalize border px-4 bg-green-50 border-green-500 rounded-2xl py-0.5 text-gray-600 font-semibold">
                        {item?.occasion}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-semibold text-brand-gold">
                        ₹{item?.price}
                      </p>
                      <a
                        href={item?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-brand-cta hover:underline flex items-center gap-1"
                      >
                        Link{" "}
                        <Icon
                          name="ChevronRight"
                          size={12}
                          color="var(--color-brand-cta)"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        );

      case "outfit":
        return (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">{message?.content}</p>
            <div className="grid grid-cols-2 gap-4">
              {message?.outfits?.map((outfit, index) => (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden mb-3">
                    <Image
                      src={outfit?.image}
                      alt={outfit?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-sm text-brand-text-primary mb-1">
                    {outfit?.name}
                  </h4>
                  <p className="text-xs text-brand-text-secondary mb-2">
                    {outfit?.occasion}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="Heart"
                      onClick={() => onSaveOutfit(outfit)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Shuffle"
                      onClick={() => onRequestAlternative(outfit)}
                    >
                      Alt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "product_carousel":
        return (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">
              <ReactMarkdown>{message?.content}</ReactMarkdown>
            </p>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {message?.products?.map((product, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 bg-muted rounded-lg p-3"
                >
                  <div className="aspect-square bg-white rounded-lg overflow-hidden mb-2">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-xs font-medium text-brand-text-primary mb-1 line-clamp-2">
                    {product?.name}
                  </h5>
                  <p className="text-xs text-brand-gold font-semibold">
                    ${product?.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "mood_board":
        return (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">{message?.content}</p>
            <div className="grid grid-cols-3 gap-2">
              {message?.images?.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-muted rounded-lg overflow-hidden"
                >
                  <Image
                    src={image?.url}
                    alt={image?.description}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "image_analysis":
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="aspect-square  bg-white rounded-lg overflow-hidden mb-3">
                <Image
                  src={message?.analyzedImage}
                  alt="Analyzed image"
                  className="w-80 h-80 object-cover"
                />
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm leading-relaxed">{message?.content}</p>
            </div>
          </div>
        );

      default:
        return <p className="text-sm leading-relaxed">{message?.content}</p>;
    }
  };

  return (
    <div
      className={`flex ${
        message?.sender === "user" ? "justify-end" : "justify-start"
      } mb-6`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div
        className={`flex max-w-[80%] ${
          message?.sender === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 ${
            message?.sender === "user" ? "ml-3" : "mr-3"
          }`}
        >
          {message?.sender === "user" ? (
            user ? (
              <div className="w-8 h-8  rounded-full flex items-center justify-center">
                <Image src={user.avatar ? `http://localhost:5000/uploads/${user?.avatar}` : "https://github.com/shadcn.png"}/>
              </div>
            ) : (
              <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            )
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-brand-gold to-brand-cta rounded-full flex items-center justify-center">
              <Image src={'/logo.png'} className="w-10 h-8" alt="StyleMind"/>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div
          className={`flex-1 ${
            message?.sender === "user" ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`inline-block p-4 rounded-2xl shadow-subtle ${
              message?.sender === "user"
                ? "border border-gray-600/50 bg-violet-50 text-gray-600 rounded-br-md"
                : "bg-card border border-border rounded-bl-md"
            }`}
          >
            {renderMessageContent()}
          </div>

          {/* Timestamp and Actions */}
          <div
            className={`flex items-center mt-2 space-x-2 ${
              message?.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-xs text-brand-text-secondary">
              {formatTime(message?.timestamp)}
            </span>

            {/* Quick Actions for AI messages */}
            {message?.sender === "ai" && showActions && (
              <div className="flex space-x-1">
                <button className="p-1 rounded hover:bg-muted transition-smooth">
                  <Icon
                    name="ThumbsUp"
                    size={14}
                    color="var(--color-brand-text-secondary)"
                  />
                </button>
                <button className="p-1 rounded hover:bg-muted transition-smooth">
                  <Icon
                    name="ThumbsDown"
                    size={14}
                    color="var(--color-brand-text-secondary)"
                  />
                </button>
                <button className="p-1 rounded hover:bg-muted transition-smooth">
                  <Icon
                    name="Copy"
                    size={14}
                    color="var(--color-brand-text-secondary)"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
