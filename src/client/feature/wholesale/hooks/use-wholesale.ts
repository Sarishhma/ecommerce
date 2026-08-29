import { useMutation } from "@tanstack/react-query";
import { wholesaleService } from "../services/wholesale.service";
import type { WholesaleFormValues, WholesaleInquiryResponse } from "../types/wholesale.types";

export const useSubmitWholesaleInquiry = () => {
  return useMutation<WholesaleInquiryResponse, Error, { data: WholesaleFormValues; idempotencyKey: string }>({
    mutationFn: ({ data, idempotencyKey }) => wholesaleService.submitInquiry(data, idempotencyKey),
  });
};
