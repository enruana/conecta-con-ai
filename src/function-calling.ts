import { OpenAI } from 'openai';
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
): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: body,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

async function testFunctionCalling(): Promise<void> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content:
          'Envia un email a felipemantillagomez@gmail.com solicitando acceso a la base de datos de produccion',
      },
    ],
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

  console.log(JSON.stringify(completion.choices[0].message, null, 2));

  const toolCalls = completion.choices[0].message.tool_calls;

  if (toolCalls) {
    for (const toolCall of toolCalls) {
      if (toolCall.function.name === 'send_email') {
        const args = JSON.parse(toolCall.function.arguments);
        await sendEmail(args.to, args.subject, args.body);
      }
    }
  }
}

export { testFunctionCalling };

