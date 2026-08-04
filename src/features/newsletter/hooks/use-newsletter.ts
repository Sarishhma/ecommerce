import { useMutation } from "@tanstack/react-query";
import { newsletterService } from "../services/newsletter.service";
import type { NewsletterFormValues, NewsletterSubscribeResponse } from "../types/newsletter.types";

export const useSubscribeNewsletter = () => {
  return useMutation<NewsletterSubscribeResponse, Error, { data: NewsletterFormValues; idempotencyKey: string }>({
    mutationFn: ({ data, idempotencyKey }) => newsletterService.subscribe(data, idempotencyKey),
  });
};
