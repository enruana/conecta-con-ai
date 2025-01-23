import { writeFileSync } from "node:fs";
import OpenAI from "openai";

const openai = new OpenAI();

export const testAudio = async (): Promise<void> => {
  // Generate an audio response to the given prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o-audio-preview",
    modalities: ["text", "audio"],
    audio: { voice: "alloy", format: "wav" },
    messages: [
      {
        role: "user",
        content: "¿Es un golden retriever un buen perro para la familia?"
      }
    ],
    store: true,
  });
  
  // Inspect returned data
  console.log(response.choices[0]);
  
  // Write audio data to a file
  writeFileSync(
    "golden-retriever.wav",
    Buffer.from(response.choices[0].message.audio.data, 'base64'),
    { encoding: "utf-8" }
  );
};


