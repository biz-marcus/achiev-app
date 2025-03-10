import OpenAI from 'openai';
import { AIProvider, ChatMessage, ChatOptions, CompletionOptions } from './types';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class OpenAIProvider implements AIProvider {
  async generateChat(messages: ChatMessage[], options: ChatOptions = {}): Promise<string> {
    const { temperature = 0.7, systemPrompt } = options;

    if (systemPrompt) {
      messages = [
        { role: 'system', content: systemPrompt },
        ...messages,
      ];
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages,
      temperature,
    });

    return response.choices[0]?.message?.content || '';
  }

  async generateCompletion(prompt: string, options: CompletionOptions = {}): Promise<string> {
    const { temperature = 0.7, maxTokens } = options;

    const response = await openai.completions.create({
      model: process.env.OPENAI_COMPLETION_MODEL || 'gpt-3.5-turbo-instruct',
      prompt,
      temperature,
      max_tokens: maxTokens,
    });

    return response.choices[0]?.text || '';
  }
}

export const openAIProvider = new OpenAIProvider(); 