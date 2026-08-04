import type { z } from "zod";
import { newsletterSchema } from "../schema/newsletter.schema";

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export interface NewsletterSubscribeResponse {
  success: boolean;
  message: string;
}
