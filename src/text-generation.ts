import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const testTextGeneration = async (): Promise<void> => {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-4o',
  });

  console.log(JSON.stringify(chatCompletion, null, 2));
};

export { testTextGeneration };
