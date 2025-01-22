import OpenAI from "openai";
const openai = new OpenAI();

const testImageGeneration = async (): Promise<void> => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: 'cool landscape',
    n: 1,
    size: '1024x1024',
  });

  console.log(response.data[0].url);
};

export { testImageGeneration }; 