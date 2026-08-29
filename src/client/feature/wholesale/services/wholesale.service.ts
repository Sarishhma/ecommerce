import { handleApiError } from "@/lib/handleApiError";
import type { WholesaleFormValues, WholesaleInquiryResponse } from "../types/wholesale.types";

export const wholesaleService = {
  submitInquiry: async (_data: WholesaleFormValues, _idempotencyKey: string): Promise<WholesaleInquiryResponse> => {
    try {
      // NOTE: Using mock data timeout for now as there's no real backend yet.
      // Replace with actual API call:
      // const response = await api.post<WholesaleInquiryResponse>("/wholesale/inquiry", data, {
      //   headers: { "Idempotency-Key": idempotencyKey }
      // });
      // return response.data;
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, message: "Thank you for your inquiry. Our team will get back to you within 48 hours." });
        }, 1000);
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
