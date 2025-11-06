import Conversation from "../models/conversation.models.js";
import conversationModels from "../models/conversation.models.js";

export const createConversation = async (req, res) => {
  try {
    const { userId, conversation } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Add timestamps if not provided
    const conversationWithTimestamps = conversation.map(conv => ({
      ...conv,
      lastMessage: {
        ...conv.lastMessage,
        timestamp: conv.lastMessage.timestamp || Date.now()
      }
    }));

    // Try to find existing user conversations
    let userConversations = await conversationModels.findOne({ userId });

    if (userConversations) {
      // If user exists, add new conversations to their array
      userConversations.conversation.push(...conversationWithTimestamps);
      await userConversations.save();
    } else {
      // If user doesn't exist, create new document
      userConversations = await conversationModels.create({
        userId,
        conversation: conversationWithTimestamps
      });
    }

    res.status(201).json({data:userConversations,message: "Conversation(s) created/added successfully" });
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ 
      message: "Server error while creating conversation",
      error: error.message 
    });
  }
};


export const getConversationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: "userId parameter is required" });
    }
    const conversations = await conversationModels.find({ userId
    });
    if (!conversations) {
        return res.status(404).json({ message: "No conversations found for this userId" });
    }
    res.status(200).json(conversations);
    } catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({
        message: "Server error while fetching conversations",
        error: error.message
    });
  }
};



export const deleteConversation = async (req, res) => {
  try {
    const {userId} = req;
    const {conversationId } = req.body;

    if (!userId || !conversationId) {
      return res
        .status(400)
        .json({ message: "userId and conversationId are required" });
    }

    const conversationDoc = await Conversation.findOne({ userId });
    if (!conversationDoc) {
      return res.status(404).json({ message: "No conversations found for this user" });
    }

    // Filter out the deleted conversation
    conversationDoc.conversation = conversationDoc.conversation.filter(
      (conv) => conv._id.toString() !== conversationId
    );

    await conversationDoc.save();

    return res.status(200).json({
      message: "Conversation deleted successfully",
      remaining: conversationDoc.conversation,
    });
  } catch (err) {
    console.error("Error deleting conversation:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
