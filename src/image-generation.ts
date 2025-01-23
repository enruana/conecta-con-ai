import OpenAI from "openai";
import * as fs from 'fs';
const openai = new OpenAI();

const testImageGeneration = async (): Promise<void> => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: 'cool landscape',
    n: 1,
    size: '1024x1024',
    response_format: 'b64_json',
  });

  const image = response.data[0].b64_json;
  if (!image) {
    throw new Error('No image data received');
  }

  // Convert base64 to buffer and save to file
  const buffer = Buffer.from(image, 'base64');
  fs.writeFileSync('generated-image.png', buffer);
  console.log('Image saved successfully!');
};

const testImageEdit = async (): Promise<void> => {
  const response = await openai.images.edit({
    model: 'dall-e-2',
    image: fs.createReadStream('generated-image.png'),
    mask: fs.createReadStream('generated-image-mask.png'),
    prompt: 'landscape with a big balloon ',
    n: 1,
    size: '1024x1024',
    response_format: 'b64_json',
  });

  const image = response.data[0].b64_json;
  if (!image) {
    throw new Error('No image data received');
  }

  // Convert base64 to buffer and save to file
  const buffer = Buffer.from(image, 'base64');
  fs.writeFileSync('generated-image-edited.png', buffer);
  console.log('Image saved successfully!');

};

const testImageVariation = async (): Promise<void> => {
  const response = await openai.images.createVariation({
    image: fs.createReadStream('generated-image.png'),
    n: 1,
    size: '1024x1024',
    response_format: 'b64_json',
  });

  const image = response.data[0].b64_json;
  if (!image) {
    throw new Error('No image data received');
  }

  // Convert base64 to buffer and save to file
  const buffer = Buffer.from(image, 'base64');
  fs.writeFileSync('generated-image-varied.png', buffer);
  console.log('Image saved successfully!');
};

export { testImageGeneration, testImageEdit, testImageVariation };  

