import { handleApiError } from "@/lib/handleApiError";
import type { NewsletterFormValues, NewsletterSubscribeResponse } from "../types/newsletter.types";

export const newsletterService = {
  subscribe: async (_data: NewsletterFormValues, _idempotencyKey: string): Promise<NewsletterSubscribeResponse> => {
    try {
      // NOTE: Using mock data timeout for now as there's no real backend yet.
      // Replace with actual API call:
      // const response = await api.post<NewsletterSubscribeResponse>("/newsletter/subscribe", data, {
      //   headers: { "Idempotency-Key": idempotencyKey }
      // });
      // return response.data;
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, message: "Successfully subscribed to newsletter." });
        }, 1000);
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
