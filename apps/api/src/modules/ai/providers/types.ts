export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CompletionOptions {
  temperature?: number;
  maxTokens?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface ChatOptions extends CompletionOptions {
  systemPrompt?: string;
}

export interface AIProvider {
  generateChat(messages: ChatMessage[], options?: ChatOptions): Promise<string>;
  generateCompletion(prompt: string, options?: CompletionOptions): Promise<string>;
} 