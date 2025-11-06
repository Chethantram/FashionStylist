import React, { useState, useRef } from 'react';

import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, onUploadImage, isTyping }) => {
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const fileInputRef = useRef(null);

  const quickActions = [
    { id: 'work', label: 'Work Outfit', icon: 'Briefcase' },
    { id: 'casual', label: 'Casual Look', icon: 'Coffee' },
    { id: 'date', label: 'Date Night', icon: 'Heart' },
    { id: 'formal', label: 'Formal Event', icon: 'Crown' },
  ];

  const styleSuggestions = [
    "minimalist chic",
    "bohemian style",
    "business casual",
    "street style",
    "vintage inspired",
    "modern classic",
    "edgy contemporary",
    "romantic feminine",
    "athleisure wear",
    "preppy look",
    "grunge fashion",
    "eco-friendly fashion",
    "monochrome outfit",
    "color blocking",
    "layered clothing",
    "accessorized look",
    "tailored fit",
    "casual elegance",
    "bold prints",
    "soft pastels",
  ];

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (message?.trim()) {
      onSendMessage(message?.trim());
      setMessage('');
      setShowSuggestions(false);
    }
  };

  const handleQuickAction = (action) => {
    const messages = {
      work: "I need a professional work outfit for today",
      casual: "Show me some casual weekend looks",
      date: "Help me choose a date night outfit",
      formal: "I need formal attire for an event"
    };
    onSendMessage(messages?.[action]);
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    
    if (file) {
      onUploadImage(file);
    }
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setMessage(value);
    setShowSuggestions(value?.length > 2);
  };

  const insertSuggestion = (suggestion) => {
    setMessage(prev => prev + suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="bg-card border-t border-border p-4">
      {/* Quick Actions */}
      <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            size="sm"
            iconName={action?.icon}
            iconPosition="left"
            onClick={() => handleQuickAction(action?.id)}
            className="flex-shrink-0 hover:bg-brand-gold hover:text-white transition-smooth"
          >
            {action?.label}
          </Button>
        ))}
      </div>
      {/* Style Suggestions */}
      {showSuggestions && (
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="text-xs text-brand-text-secondary mb-2">Style suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {styleSuggestions?.filter(suggestion => 
                suggestion?.toLowerCase()?.includes(message?.toLowerCase())
              )?.slice(0, 6)?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => insertSuggestion(suggestion)}
                  className="px-2 py-1 text-xs bg-brand-cream text-brand-text-primary rounded-full hover:bg-brand-gold hover:text-white transition-smooth"
                >
                  {suggestion}
                </button>
              ))}
          </div>
        </div>
      )}
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Image Upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          iconName="ImagePlus"
          onClick={() => fileInputRef?.current?.click()}
          className="flex-shrink-0 mb-2 bg-gray-200 rounded-full border-brand-gold border-2 hover:bg-brand-cta"
        />

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={handleInputChange}
            placeholder="Ask me about your style, upload an inspiration photo, or request an outfit..."
            className="w-full p-3 pr-12 border border-border rounded-3xl resize-none  focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent bg-background text-brand-text-primary placeholder-brand-text-secondary px-6"
            rows="1"
            style={{ minHeight: '44px', maxHeight: '120px' }}
            onKeyDown={(e) => {
              if (e?.key === 'Enter' && !e?.shiftKey) {
                e?.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          {/* Character Counter */}
          {message?.length > 200 && (
            <div className="absolute bottom-1 right-1 text-xs text-brand-text-secondary">
              {message?.length}/500
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          variant="default"
          size="icon"
          iconName="Send"
          disabled={!message?.trim() || isTyping}
          className="flex-shrink-0 bg-brand-cta hover:scale-105 mb-2 rounded-full"
        />
      </form>
      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-center space-x-2 mt-3 text-brand-text-secondary">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm">StyleMind AI is thinking...</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;