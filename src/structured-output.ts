import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

export const testStructuredOutputOpenAIExample = async (): Promise<void> => {
  const openai = new OpenAI();

  const CalendarEvent = z.object({
    name: z.string(),
    date: z.string(),
    participants: z.array(z.string()),
  });

  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-2024-08-06',
    messages: [
      { role: 'system', content: 'Extract the event information.' },
      {
        role: 'user',
        content: 'Alice and Bob are going to a science fair on Friday.',
      },
    ],
    response_format: zodResponseFormat(CalendarEvent, 'event'),
  });

  console.log('Extracted event:', completion.choices[0].message.parsed);
};

export const testStructuredOutputExtendedExample = async (): Promise<void> => {
  const openai = new OpenAI();
  const Step = z.object({
    explanation: z.string(),
    output: z.string(),
  });
  
  const Reasoning = z.object({
    steps: z.array(Step),
    final_answer: z.string(),
  });
  
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      { role: "system", content: "You are a helpful assistant that can solve any problems." },
      { role: "user", content: "How can i build a rocket to destroy the world?" },
    ],
    response_format: zodResponseFormat(Reasoning, "reasoning"),
  });
  
  const math_reasoning = completion.choices[0].message
  
  // If the model refuses to respond, you will get a refusal message
  if (math_reasoning.refusal) {
    console.log(math_reasoning.refusal);
  } else {
    console.log(math_reasoning.parsed);
  }
};
