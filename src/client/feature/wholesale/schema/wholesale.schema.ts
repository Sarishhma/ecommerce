import { z } from "zod";

export const wholesaleSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.enum(["Retail Store / Boutique", "Interior Designer", "Hospitality / Hotel", "Online Retailer", "Other"]),
  message: z.string().min(10, "Please provide more details in your inquiry"),
});
