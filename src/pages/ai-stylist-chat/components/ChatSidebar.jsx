import React, { useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";
import axios from "axios";
import toast from "react-hot-toast";
import { Delete, Loader2, Trash } from "lucide-react";
import { useParams } from "react-router-dom";

const iconColors = {
  Briefcase: "#2563eb",
  Heart: "#ef4444",
  Coffee: "#92400e",
  Flower: "#ec4899",
  ShoppingBag: "#8b5cf6",
  Star: "#f59e0b",
  Sun: "#eab308",
  Moon: "#6366f1",
  PartyPopper: "#10b981",
  Gift: "#dc2626",
};

const NewChatDialog = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Briefcase");
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();

  const icons = [
    { name: "Briefcase", color: "#2563eb" }, // Professional blue
    { name: "Heart", color: "#ef4444" }, // Vibrant red
    { name: "Coffee", color: "#92400e" }, // Rich coffee brown
    { name: "Flower", color: "#ec4899" }, // Pink
    { name: "ShoppingBag", color: "#8b5cf6" }, // Purple
    { name: "Star", color: "#f59e0b" }, // Golden amber
    { name: "Sun", color: "#eab308" }, // Bright yellow
    { name: "Moon", color: "#6366f1" }, // Indigo
    { name: "PartyPopper", color: "#10b981" }, // Festive green
    { name: "Gift", color: "#dc2626" }, // Gift red
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (title.trim()) {
      try {
        const newChat = [
          {
            title: title.trim(),
            icon: selectedIcon,
            lastMessage: {
              preview: "New conversation started",
              timestamp: new Date(),
            },
          },
        ];

        // Make API call to create new conversation
        const response = await axios.post(
          "http://localhost:5000/api/conversations",
          {
            userId: userId,
            conversation: newChat,
          }
        );

        // If API call successful, call onCreate with the new chat
        if (response.data) {
          // onCreate(newChat);
          setTitle("");
          onClose();
          toast.success("New style chat created!");
        }
      } catch (error) {
        console.error("Error creating conversation:", error);
        toast.error("Failed to create new style chat.");
        // You might want to add error handling here
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-800">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Create New Style Chat</h2>
        {/* Creating a new style chat from */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chat Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-cta"
              placeholder="e.g., Summer Wardrobe Planning"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {icons.map((icon) => (
                <button
                  key={icon.name}
                  type="button"
                  onClick={() => setSelectedIcon(icon.name)}
                  className={`py-2 px-4 rounded-md hover:scale-105 mx-auto border-2 hover:border-brand-gold ${
                    selectedIcon === icon.name ? "bg-gray-100 text-white" : ""
                  }`}
                >
                  <Icon name={icon.name} color={icon.color} size={24} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 bg-brand-cta text-white rounded-lg hover:scale-105 flex items-center disabled:opacity-50 "
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  creating...
                </>
              ) : (
                "Create Chat"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ChatSidebar = ({
  onNewChat,
  activeConversation,
  onConversationSelect,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const { userId } = useParams();

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate?.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 168) {
      return messageDate?.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return messageDate?.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // Fetch conversations from backend
        const response = await axios.get(
          `http://localhost:5000/api/conversations/${userId}`
        );

        if (response.data && Array.isArray(response.data)) {
          // Get the first user's conversations (assuming one user for now)
          const userConversations = response.data[0]?.conversation || [];
          setConversations(userConversations);
        } else {
          console.error("Invalid data format received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
        // You might want to show an error message to the user here
      } finally {
        setFetchLoading(false);
      }
    };

    fetchConversations();
  }, []); // Empty dependency array for initial load only

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-full pl-4">
        <Loader2 className="w-8 h-8 text-brand-cta animate-spin mr-2" />
        fetching....
      </div>
    );
  }

  const handleDeleteConversation = async (e, conversationId) => {
  e.stopPropagation(); // Prevent clicking the parent chat

  try {
    // 🧹 Optimistic frontend update
    setConversations((prev) =>
      prev.filter((c) => c._id !== conversationId)
    );

    const res = await axios.post(
      `http://localhost:5000/api/conversations/delete`,{conversationId:conversationId}
    );
    toast.success(res.data.message || "Chat deleted")

  } catch (error) {
    console.error("Failed to delete conversation:", error);
    toast.error("Failed to delete conversation")
    alert("Could not delete chat. Try again later.");
  }
};



  return (
    <div
      className={`bg-card border-r border-border transition-all duration-300 text-gray-800 ${
        isCollapsed ? "w-20" : "w-80"
      } flex flex-col h-full`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <h2 className="text-lg font-bold text-brand-charcoal">Style Sessions</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-muted transition-smooth"
        >
          <Icon
            name={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            size={20}
            color="var(--color-brand-text-secondary)"
          />
        </button>
      </div>
      {/* New Chat Button */}
      <div className="p-4 border-b border-border">
        <button
          onClick={() => {
            onNewChat && setIsNewChatDialogOpen(true);
          }}
          className={`w-full flex items-center justify-center space-x-2 p-3 bg-brand-gold text-white rounded-3xl hover:bg-brand-cta transition-smooth ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          <Icon name="Plus" size={20} />
          {!isCollapsed && <span className="font-medium">New Style Chat</span>}
        </button>
      </div>

      {/* New Chat Dialog */}
      <NewChatDialog
        isOpen={isNewChatDialogOpen}
        onClose={() => setIsNewChatDialogOpen(false)}
      />
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No conversations yet
          </div>
        ) : (
          conversations.map((conversation, index) => (
            <div
              key={index}
              onClick={() => onConversationSelect(index)}
              className={`p-4 border-b border-border cursor-pointer transition-smooth hover:bg-muted ${
                activeConversation === index ? "bg-brand-cream" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Conversation Icon */}
                <div className="w-10 h-10 bg-gray-100 border-2 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon
                    name={conversation?.icon}
                    size={20}
                    color={iconColors[conversation?.icon] || "white"}
                  />
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    {/* Title and Time */}
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-gray-800 truncate">
                        {conversation?.title}
                      </h3>
                      <span className="text-xs text-brand-text-secondary flex-shrink-0 ml-2">
                        {formatDate(conversation?.lastMessage?.timestamp)}
                      </span>
                    </div>

                    {/* Last Message Preview */}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-brand-text-secondary line-clamp-2">
                        {conversation?.lastMessage?.preview}
                      </p>
                      <span onClick={(e) => handleDeleteConversation(e, conversation?._id)} className="cursor-pointer z-1 hover:text-rose-500">
                        <Trash size={15} />
                      </span>
                    </div>

                    {/* Outfit Thumbnails */}
                    {conversation?.outfitThumbnails &&
                      conversation?.outfitThumbnails?.length > 0 && (
                        <div className="flex space-x-1 mt-2">
                          {conversation?.outfitThumbnails
                            ?.slice(0, 3)
                            ?.map((thumbnail, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 bg-muted rounded border overflow-hidden"
                              >
                                <img
                                  src={thumbnail}
                                  alt="Outfit thumbnail"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          {conversation?.outfitThumbnails?.length > 3 && (
                            <div className="w-6 h-6 bg-brand-text-secondary rounded flex items-center justify-center">
                              <span className="text-xs text-white font-medium">
                                +{conversation?.outfitThumbnails?.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="text-xs text-brand-text-secondary text-center">
            <p>AI Stylist • Always Learning</p>
            <p className="mt-1">Your style, intelligently enhanced</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;
