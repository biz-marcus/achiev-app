import { apiRpc, getApiClient, InferRequestType } from "./client";

const $chat = apiRpc.ai.chat.$post;

export type ChatParams = InferRequestType<typeof $chat>["json"];

interface ChatResponse {
  success: boolean;
  response?: string;
  error?: string;
}

export async function sendChatMessage(params: ChatParams): Promise<ChatResponse> {
  console.log('Sending chat message:', params);
  
  try {
    // Use direct fetch instead of the RPC client
    const response = await fetch('http://localhost:3004/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to get AI response');
    }
    
    return data;
  } catch (error) {
    console.error('Error in sendChatMessage:', error);
    throw error;
  }
} 