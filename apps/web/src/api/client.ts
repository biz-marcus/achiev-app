import { hc } from "hono/client";
import { HTTPException } from "hono/http-exception";
import type { AppType } from "@repo/api/src";

export type { InferRequestType, InferResponseType } from "hono/client";

const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004';
  }
  // Client-side
  return window.location.origin.replace(':3000', ':3004');
};

export const apiRpc = hc<AppType>(getBaseUrl());

export async function getApiClient() {
  return apiRpc;
}

export const getServerClient = () => {
  return hc<AppType>(getBaseUrl(), {
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      const response = await fetch(input, {
        ...init,
        headers,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new HTTPException(response.status as any, {
          message: "Network response was not ok",
        });
      }

      return response;
    },
  }).api;
};
