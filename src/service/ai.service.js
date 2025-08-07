const { GoogleGenAI } = require("@google/genai");

async function generateCaption(imageUrl) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await fetch(imageUrl);
  const imageArrayBuffer = await response.arrayBuffer();

  const mimeType = response.headers.get("Content-Type") || "image/jpeg";
  const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType,
          data: base64ImageData,
        },
      },
      { text: "Caption this image in 30 words" },
    ],
    config: {
      systemInstruction: `
        A concise, creative caption of 10–20 words that describes the image in an engaging and relevant way.

        Add 5–7 popular and meaningful hashtags that suit the image’s content and current social media trends.

        If the image contains something important, historic, or respectful, adopt a tone that’s suitably thoughtful and appropriate.

        Keep the language friendly, modern, and relatable.

        Avoid references to animals or fictional personalities.

        Example output:
        "Catching the perfect golden hour—nature’s artwork on full display 🌅✨"
        #sunsetmagic #goldenhour #cityviews #momentcaptured #modernlife #urbanvibes
      `,
    },
  });
  return result.text;
}

module.exports = generateCaption;
