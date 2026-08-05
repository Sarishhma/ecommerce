import type { z } from "zod";
import { wholesaleSchema } from "../schema/wholesale.schema";

export type WholesaleFormValues = z.infer<typeof wholesaleSchema>;

export interface WholesaleInquiryResponse {
  success: boolean;
  message: string;
}
