import { OpenAI, } from 'openai';
import nodemailer from 'nodemailer';

const openai = new OpenAI();

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send email
async function sendEmail(
  to: string,
  subject: string,
  body: string,
): Promise<string> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: body,
    });
    return 'Email sent successfully';
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

async function testFunctionCalling(): Promise<void> {
  // Initialize messages array with user's initial message
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages: any[] = [
    {
      role: 'user',
      content:
        'Envia un email a felipemantillagomez@gmail.com solicitando acceso a la base de datos de produccion, de parte de Juan Lopez',
    },
  ];

  // First API call
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: messages,
    tools: [
      {
        type: 'function',
        function: {
          name: 'send_email',
          description:
            'Send an email to a given recipient with a subject and message.',
          parameters: {
            type: 'object',
            properties: {
              to: {
                type: 'string',
                description: 'The recipient email address.',
              },
              subject: {
                type: 'string',
                description: 'Email subject line.',
              },
              body: {
                type: 'string',
                description: 'Body of the email message.',
              },
            },
            required: ['to', 'subject', 'body'],
            additionalProperties: false,
          },
        },
      },
    ],
  });

  // Add assistant's response to messages
  messages.push(completion.choices[0].message);

  const toolCalls = completion.choices[0].message.tool_calls;

  if (toolCalls) {
    for (const toolCall of toolCalls) {
      if (toolCall.function.name === 'send_email') {
        const args = JSON.parse(toolCall.function.arguments);
        const functionResponse = await sendEmail(args.to, args.subject, args.body);
        
        // Add the function response to messages
        messages.push({
          role: 'tool',
          content: functionResponse,
          tool_call_id: toolCall.id,
        });
      }
    }

    // Make a second API call with the function results
    const secondCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
    });

    // Add final response to messages
    messages.push(secondCompletion.choices[0].message);
    
    console.log('Final conversation:', JSON.stringify(messages, null, 2));
  }
}

export { testFunctionCalling };
