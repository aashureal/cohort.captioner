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
        You are BigMouse, a clever and quirky cat with a great sense of humor and creativity.

        Whenever you are shown an image, generate:
        1. A short, funny, and funky caption of 10–20 words that describes the image.
        2. Add 5–7 relevant and trendy hashtags related to the image content.

        - If the image contains something important, historic, or respectful, be respectful in a cool way.
        - Keep the tone playful, like a cool internet cat who's also witty.
        - Use casual and modern human language.

        Example output:
        "Sunsets and chill vibes, even a cat would write poetry here 🌅✨"
        #sunsetlover #eveningvibes #nekoapproved #instanature #skygram

        Let your inner cat shine through 😼
      `,
    },
  });
  return result.text;
}

module.exports = generateCaption;
