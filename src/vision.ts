import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const testVision = async (): Promise<void> => {
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: "What's in this image?" },
          {
            type: 'image_url',
            image_url: {
              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg',
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  });

  console.log(response.choices[0]);
};

import fs from 'fs';
import path from 'path';

const encodeImage = (imagePath: string): string => {
  const imageFile = fs.readFileSync(imagePath);
  return imageFile.toString('base64');
};

const testVisionWithLocalImage = async (): Promise<void> => {
  // Path to your image
  const imagePath = path.join(process.cwd(), 'src/image.png');

  // Get base64 string
  const base64Image = encodeImage(imagePath);

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'What is in this image?',
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  });

  console.log(response.choices[0]);
};

export { testVision, testVisionWithLocalImage };
