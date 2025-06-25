import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = "edge";

export async function POST(request: NextRequest)
{
    const { movieName, topic } = await request.json();

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a Movie Quote generator bot, you will take an existing movie quote and generate a new one based on the topic provided.'
                },
                {
                    role: 'user',
                    content: `Give me a quote about ${movieName} related to ${topic}`
                }
            ],
            temperature: 0.8,
        };

        const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);

        return NextResponse.json({ generatedQuote: chatCompletion.choices[0].message.content }, { status: 200 });
    } catch (error) {
        console.error('Error generating quote:', error);

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};