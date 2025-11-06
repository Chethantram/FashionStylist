import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  userId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    type: String,
    // required: true,
  },
  conversation: [
    {
      title: {
        type: String,
        required: true,
      },
      icon: {
        type: String, // e.g., "Briefcase", "Heart"
        required: true,
      },
      lastMessage: {
        preview: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
      outfitThumbnails: [
        {
          type: String, // store image URLs
        },
      ],
    },
  ],
},{timestamps:true});

const Conversation =  mongoose.model("Conversation", conversationSchema);
export default Conversation
