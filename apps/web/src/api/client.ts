import { hc } from "hono/client";
import { HTTPException } from "hono/http-exception";
import type { AppType } from "@repo/api/src";
import { getToken } from "@/lib/clerk";

export type { InferRequestType, InferResponseType } from "hono/client";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL!;
};

export const apiRpc = hc<AppType>("http://localhost:3004");

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
