import z from "zod";
import { userSchema } from "./user.schema";

export const updateUserResponseSchema = z.object({
  email: z.string().email().optional(),
  full_name: z.string().optional(),
  phone_number: z.string().optional(),
  address: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
  role: z.string().nullable().optional(),
});

export const updateUserSchema = userSchema
  .pick({
    full_name: true,
    email: true,
    phone_number: true,
    address: true,
    is_active: true,
    role: true,
  })
  .partial();