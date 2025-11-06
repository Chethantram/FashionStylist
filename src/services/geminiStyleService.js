import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import genAI from "./geminiClient";

import newData from "./new.json"; // adjust path as needed
/**
 * Fashion Stylist AI Service using Google's Generative AI
 * Provides fashion advice, style analysis, and outfit recommendations
 */

const STYLE_SYSTEM_PROMPT = `You are StyleMind AI, a professional fashion stylist and personal style consultant. You provide expert fashion advice, outfit recommendations, and style guidance. Your responses should be:

1. Personalized and considerate of individual body types, lifestyles, and budgets
2. Fashion-forward yet practical and achievable
3. Inclusive and body-positive
4. Detailed with specific product suggestions when appropriate
5. Encouraging and confidence-boosting

Key areas of expertise:
- Personal styling and wardrobe building
- Color analysis and seasonal styling
- Body type considerations and flattering silhouettes
- Occasion-appropriate dressing
- Trend analysis and timeless pieces
- Budget-conscious fashion advice
- Sustainable fashion choices
- Accessory coordination and styling

Always maintain a warm, encouraging, and professional tone. Ask clarifying questions when needed and provide actionable advice.

analyse this json file data  

Reads new.json (your fashion items database).

Parses the user’s prompt (e.g., “suggest casual outfit for office”).

Filters products by category, occasion, or keywords (like “casual”, “formal”, “bottoms”, etc.).

Returns an object of recommended categories (tops, bottoms, etc.)

Limits to max 4 items per category.

If the user specifies something like “show only jeans” → only that category/subcategory is returned.

result should be in json object
`;

let chat;

/**
 * Initialize or return existing chat
 */
function getChat(conversationHistory = []) {
  if (!chat) {
    chat = genAI.chats.create({
      model: "gemini-2.5-flash",
      history: [
        {
          role: "user",
          parts: [{ text: "System instructions" }],
        },
        {
          role: "model",
          parts: [{ text: STYLE_SYSTEM_PROMPT }],
        },
        ...conversationHistory.map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ],
    });
  }
  return chat;
}


export async function streamFashionAdvice(
  prompt,
  onChunk,
  conversationHistory = []
) {
  try {
    // Use the imported JSON directly
    const dataset = JSON.stringify(newData);

    const contextMessage = `
You are StyleMind AI, a professional stylist.
You have access to the following dataset of fashion items (JSON):
${dataset.substring(0, 12000)}
Follow these rules:
1. Respond in JSON only (no markdown).
2. Show max 4 items per category.
3. Only recommend from dataset.
4. If prompt asks specific item (like jeans), only return that type.

User prompt: ${prompt}
`;

    const chat = getChat(conversationHistory);
    const stream = await chat.sendMessageStream({ message: contextMessage });

    for await (const chunk of stream) {
      if (chunk.text) {
        let cleaned = chunk.text
          .replace(/```json\s*/g, "")
          .replace(/```/g, "")
          .trim();
        onChunk(cleaned);
      }
    }
  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("Failed to stream fashion advice.");
  }
}

export async function getFashionAdvice(prompt, conversationHistory = []) {
  try {
    const dataset = JSON.stringify(newData);

    const contextMessage = `
You are StyleMind AI, a professional stylist.
You have access to the following dataset of fashion items (JSON):
${dataset.substring(0, dataset.length)}
Follow these rules:
1. Respond in JSON only (no markdown, no explanation).
2. Show max 4 items per category.
3. Only recommend from dataset.
4. If prompt asks specific item (like jeans), only return that type.
5. don't give the same outfit again at the same time.
6. don't add anything extra to response.give the same as file output with array


User prompt: ${prompt}
`;

    // const chat = getChat(conversationHistory);
    // const result = await chat.sendMessage({ message: contextMessage });
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [contextMessage],
    });

    // Extract and clean text
    const rawText = result.text || "";
    
    const cleaned = rawText
      .replace(/```json\s*/g, "")
      .replace(/```/g, "")
      .trim();

    // Try to parse into JS object
    try {
      const parsed = JSON.parse(cleaned);      
      return parsed;
    } catch (err) {
      console.error("JSON parse failed, returning text:", cleaned);
      return cleaned;
    }
  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("Failed to get fashion advice.");
  }
}

/**
 * Analyzes uploaded style inspiration images
 * @param {string} userPrompt - User's description or question about the image
 * @param {File} imageFile - Image file to analyze
 * @returns {Promise<string>} Style analysis and recommendations
 */
export async function analyzeStyleImage(userPrompt, imageFile) {
  try {
    // const model = genAI.models({
    //   model: "gemini-pro-vision",
    // });

    // Convert image to proper format for Gemini Vision API
    const base64EncodedImage = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Extract the base64 data (remove the data URL prefix)
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(imageFile);
    });

    const fashionPrompt = `As StyleMind AI, a professional fashion stylist, analyze this style inspiration image. ${
      userPrompt ? `The user asks: "${userPrompt}"` : ""
    }

Please provide:
1. A description of the overall aesthetic and style
2. Key style elements (colors, silhouettes, styling details)
3. What occasions this style would work for
4. How to recreate this look with accessible pieces
5. Styling tips and alternative approaches

Be specific, practical, and encouraging in your response.`;

    // Prepare the parts array with both text and image
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        fashionPrompt,
        {
          inlineData: {
            mimeType: imageFile.type,
            data: base64EncodedImage,
          },
        },
      ],
    });

    const response = result.text;
    return response;
  } catch (error) {
    console.error("Error analyzing style image:", error);
    throw new Error("Unable to analyze the image. Please try again.");
  }
}

/**
 * Generates personalized style analysis based on assessment data
 * @param {Object} assessmentData - User's style assessment responses
 * @returns {Promise<Object>} Detailed style profile and recommendations
 */
export async function generateStyleProfile(assessmentData) {
  try {
    const assessmentPrompt = `As StyleMind AI, analyze this comprehensive style assessment and create a personalized style profile:

ASSESSMENT DATA:
- Lifestyle scenarios: ${
      assessmentData?.selectedImages?.join(", ") || "Not specified"
    }
- Body type: ${assessmentData?.selectedBodyType || "Not specified"}
- Favorite colors: ${
      assessmentData?.selectedColors?.favorites?.join(", ") || "None specified"
    }
- Colors to avoid: ${
      assessmentData?.selectedColors?.avoid?.join(", ") || "None specified"
    }
- Liked outfit styles: ${
      assessmentData?.likedOutfits?.join(", ") || "Not specified"
    }
- Disliked outfit styles: ${
      assessmentData?.dislikedOutfits?.join(", ") || "Not specified"
    }
- Budget range: ${assessmentData?.budgetData?.budget || "Not specified"}
- Shopping frequency: ${
      assessmentData?.budgetData?.frequency || "Not specified"
    }
- Style priorities: ${
      assessmentData?.budgetData?.priorities?.join(", ") || "Not specified"
    }

Please provide a JSON response with the following structure:
{
  "styleArchetype": {
    "name": "A creative style archetype name",
    "description": "2-3 sentences describing their style personality",
    "traits": ["4 key style traits"],
    "motto": "An inspiring style motto"
  },
  "detailedAnalysis": "A comprehensive paragraph analyzing their style preferences and providing insights",
  "colorPalette": {
    "primary": ["3-4 primary colors that work best"],
    "accent": ["2-3 accent colors"],
    "neutral": ["2-3 neutral base colors"]
  },
  "outfitRecommendations": [
    {
      "title": "Outfit name",
      "occasion": "When to wear it",
      "description": "Why it works for them",
      "items": ["List of 4-5 specific clothing items"],
      "stylingTips": "How to style and accessorize"
    }
    // Include 3-4 different outfit recommendations
  ],
  "shoppingGuide": {
    "keyPieces": ["5-6 essential items to invest in"],
    "avoidItems": ["Items that won't work well"],
    "budgetTips": "Specific advice for their budget range"
  },
  "bodyTypeAdvice": "Specific styling advice for their body type (if provided)"
}

Make it personal, actionable, and encouraging. Focus on their specific preferences and lifestyle needs.`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [assessmentPrompt],
    });
    const text = result.text;
    // Parse JSON response
    try {
      const cleanedText = text
        ?.replace(/```json\n?/g, "")
        ?.replace(/```\n?/g, "")
        ?.trim();
      return JSON.parse(cleanedText);
    } catch (parseError) {
      // If JSON parsing fails, return a structured fallback
      return {
        styleArchetype: {
          name: "Your Unique Style",
          description:
            "Based on your assessment, you have a distinctive and personal style approach that combines practicality with individual expression.",
          traits: ["Individual", "Practical", "Confident", "Versatile"],
          motto: "Style is a way to say who you are without having to speak",
        },
        detailedAnalysis: text,
        colorPalette: {
          primary: assessmentData?.selectedColors?.favorites || [
            "Navy",
            "Black",
            "White",
          ],
          accent: ["Gold", "Burgundy"],
          neutral: ["Beige", "Grey"],
        },
        outfitRecommendations: [],
        shoppingGuide: {
          keyPieces: [
            "Well-fitted jeans",
            "Classic blazer",
            "White button-down",
            "Little black dress",
          ],
          avoidItems: ["Overly trendy pieces", "Poor quality fast fashion"],
          budgetTips: "Invest in quality basics and add trendy accessories",
        },
        bodyTypeAdvice:
          "Choose pieces that make you feel confident and comfortable",
      };
    }
  } catch (error) {
    console.error("Error generating style profile:", error);
    throw new Error("Unable to generate style profile. Please try again.");
  }
}

/**
 * Suggests outfit alternatives based on a given outfit
 * @param {Object} outfit - The original outfit to create alternatives for
 * @param {Object} userPreferences - User's style preferences
 * @returns {Promise<Array>} Array of alternative outfit suggestions
 */
export async function suggestOutfitAlternatives(outfit, userPreferences = {}) {
  try {
    const model = genAI?.getGenerativeModel({ model: "gemini-2.5-flash" });

    const alternativePrompt = `As StyleMind AI, suggest 3-4 alternative versions of this outfit:

ORIGINAL OUTFIT:
- Name: ${outfit?.name}
- Occasion: ${outfit?.occasion}
- Description: ${outfit?.description || "No description provided"}

USER PREFERENCES:
- Favorite colors: ${
      userPreferences?.favoriteColors?.join(", ") || "Not specified"
    }
- Body type: ${userPreferences?.bodyType || "Not specified"}
- Style preferences: ${
      userPreferences?.stylePreferences?.join(", ") || "Not specified"
    }
- Budget: ${userPreferences?.budget || "Not specified"}

Please provide alternative styling approaches that:
1. Maintain the same occasion appropriateness
2. Offer different aesthetic approaches (casual vs dressy, conservative vs bold, etc.)
3. Consider seasonal variations
4. Include budget-friendly options

Return as JSON array:
[
  {
    "name": "Alternative outfit name",
    "description": "How this version differs and why it works",
    "items": ["List of specific clothing items"],
    "priceRange": "Budget estimate (e.g., $50-100, $100-200, etc.)",
    "stylingTips": "Key styling advice"
  }
]`;

    const result = await model?.generateContent(alternativePrompt);
    const response = await result?.response;
    const text = response?.text();

    try {
      const cleanedText = text
        ?.replace(/```json\n?/g, "")
        ?.replace(/```\n?/g, "")
        ?.trim();
      return JSON.parse(cleanedText);
    } catch (parseError) {
      // Return fallback alternatives
      return [
        {
          name: `${outfit?.name} - Casual Alternative`,
          description: "A more relaxed take on the original look",
          items: [
            "Comfortable pieces",
            "Casual footwear",
            "Minimal accessories",
          ],
          priceRange: "$50-100",
          stylingTips: "Focus on comfort while maintaining style",
        },
        {
          name: `${outfit?.name} - Elevated Version`,
          description: "A more formal interpretation of the look",
          items: [
            "Structured pieces",
            "Professional footwear",
            "Statement accessories",
          ],
          priceRange: "$100-200",
          stylingTips: "Add polished details for a refined finish",
        },
      ];
    }
  } catch (error) {
    console.error("Error suggesting outfit alternatives:", error);
    throw new Error("Unable to suggest alternatives. Please try again.");
  }
}

/**
 * Handles common Gemini API errors with user-friendly messages
 * @param {Error} error - The error object from the API
 * @returns {string} User-friendly error message
 */
export function handleGeminiError(error) {
  console.error("Gemini API Error:", error);

  if (error?.message?.includes("429")) {
    return "I'm getting a lot of requests right now. Please wait a moment before trying again.";
  }

  if (error?.message?.includes("SAFETY")) {
    return "I can't provide advice on that topic. Let's focus on style and fashion instead!";
  }

  if (error?.message?.includes("cancelled")) {
    return "Request was cancelled. Feel free to ask me anything about fashion!";
  }

  if (error?.message?.includes("timeout")) {
    return "That took longer than expected. Please try asking again.";
  }

  if (error?.message?.includes("API key")) {
    return "There's a configuration issue. Please contact support.";
  }

  return "I encountered an issue. Please try rephrasing your question or ask something else about style!";
}

export async function analyzeOutfitDetails(outfit) {
  // outfit example: { tops: {...}, bottoms: {...}, accessories: null, shoes: null }

  // Edge case: nothing selected
  if (!outfit.tops && !outfit.bottoms && !outfit.shoes && !outfit.accessories) {
    return {
      error: true,
      message: "No items selected. Please choose at least one product.",
    };
  }

  // Collect selected items
  const selectedItems = Object.values(outfit).filter(Boolean);
  // Build AI prompt
  const prompt = `
You are StyleMind AI, a professional fashion stylist.

Analyze the following selected outfit items. Some categories may be null.

Items:
${JSON.stringify(selectedItems, null, 2)}

Return structured JSON ONLY with this schema:
{
  "styleCategory": "string",
  "occasion": "string", (give any one suitable for this outfit)
  "season": "string",
  "formalityLevel": "1-10",
  "stylingTips": ["tip1", "tip2", "tip3"],
  "colorPalette": ["#hex1", "#hex2", "#hex3"],
  "totalPrice": number,
}

Rules:
- Use item names, descriptions, and categories to decide style, occasion, season.
- If some categories are missing (null), still generate the best possible analysis.
- Extract dominant colors from the product images (if available).
- Sum prices of non-null items for totalPrice.
`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;
  const cleanedText = text
    ?.replace(/```json\n?/g, "")
    ?.replace(/```\n?/g, "")
    ?.trim();
  return JSON.parse(cleanedText);
}
