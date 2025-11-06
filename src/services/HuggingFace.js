import { InferenceClient } from "@huggingface/inference";

const huggingFaceApiKey = import.meta.env?.VITE_HUGGINGFACE_API_KEY;
const client = new InferenceClient(huggingFaceApiKey);

export const generateImageFromImage = async (inputFile) => {
  try {
    // Pass the File object directly
    const image = await client.imageToImage({
      provider: "replicate",
      model: "ovi054/virtual-tryon-kontext-lora",
      inputs: inputFile, // <-- File or Blob
      parameters: { prompt: "Fit the clothes to that character" },
    });
    return image; // Usually a Blob or URL
  } catch (error) {
    console.error("Error generating image:", error);
  }
};
