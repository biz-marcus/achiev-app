import { openAIProvider } from './providers/openai';
import type { ChatMessage } from './providers/types';

export interface ChatParams {
  messages: ChatMessage[];
  userId: string;
}

export const aiService = {
  async generateChatResponse({ messages, userId }: ChatParams) {
    // TODO: In the future, we can add user context here
    // const userContext = await getUserContext(userId);
    
    return openAIProvider.generateChat(messages, {
      systemPrompt: "You are a helpful AI assistant for the Achiev app, which helps users set and track their goals.",
    });
  },
}; 