import fs from 'fs';
import OpenAI from 'openai';

export async function testTextToSpeech(): Promise<void> {
  const openai = new OpenAI();

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'echo',
    input:
      '¡Hola! Me llamo Felipe y estoy aquí para ayudarte a aprender sobre el mundo de la IA!',
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile('text-to-speach.mp3', buffer);
}

export async function testSpeechToText(): Promise<void> {
  
}
