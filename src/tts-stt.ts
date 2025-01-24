import fs from 'fs';
import OpenAI from 'openai';

export async function testTextToSpeech(): Promise<void> {
  const openai = new OpenAI();

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'echo',
    input:
      'Hallo! Ich heiße Felipe und ich bin hier, um dir zu helfen, die Welt der KI kennenzulernen!',
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile('text-to-speech.mp3', buffer);
}

export async function testSpeechToText(): Promise<void> {
  const openai = new OpenAI();

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream('text-to-speech.mp3'),
    model: 'whisper-1',
  });

  const translation = await openai.audio.translations.create({
    file: fs.createReadStream('text-to-speech.mp3'),
    model: 'whisper-1',
    prompt: 'translate to english',
  });

  console.log('Transcription: ', transcription.text);
  console.log('Translation: ', translation.text);
}
