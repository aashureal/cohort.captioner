const { GoogleGenAI } = require("@google/genai");

async function generateCaptionWithTags(imageBuffer, mimeType) {
  if (!imageBuffer || !Buffer.isBuffer(imageBuffer)) {
    throw new Error("Invalid image buffer");
  }
  if (!mimeType || typeof mimeType !== "string") {
    throw new Error("Invalid mime type");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const base64Image = imageBuffer.toString("base64");

  if (!base64Image) {
    throw new Error("Base64 conversion resulted in empty string");
  }

  // IMPORTANT: Gemini v2 expects 'mime_type' (underscore), NOT camelCase
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            inline_data: {
              mime_type: mimeType.toLowerCase(), // ensure lowercase and correct
              data: base64Image,
            },
          },
          {
            text: "Look at this image and generate a fun, creative caption (1-2 lines) in an Instagram style. Include 4-5 relevant hashtags (for example: #nature, #animal, #farm etc) at the end of the caption. Caption and hashtags both should be in the output.",
          },
        ],
      },
    ],
  });

  return (
    response?.candidates?.[0]?.content?.parts?.[0]?.text || response.text || ""
  );
}

module.exports = { generateCaptionWithTags };
