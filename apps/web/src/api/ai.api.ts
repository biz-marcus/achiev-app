import { apiRpc, getApiClient, InferRequestType } from "./client";

const $chat = apiRpc.ai.chat.$post;

export type ChatParams = InferRequestType<typeof $chat>["json"];

export async function sendChatMessage(params: ChatParams) {
  const client = await getApiClient();
  const response = await client.ai.chat.$post({ json: params });
  return response.json();
} 