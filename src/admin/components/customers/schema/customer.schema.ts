import { z } from 'zod';

export const customerSchema = z.object({
  id: z.number(),
  loyalty_points: z.number().nullish().transform(val => val ?? 0),
  name: z.string().nullish().transform(val => val ?? 'Unknown Customer'),
  tax_number: z.string().nullish(),
  address: z.string().nullish(),
  contact_number: z.string().nullish().transform(val => val ?? ''),
  email: z.string().nullish().transform(val => val ?? ''),
  branch: z.string().nullish(),
});

export const customerListSchema = z.array(customerSchema);

export const customerFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  contact_number: z.string().min(1, 'Contact number is required'),
  address: z.string().nullable(),
  tax_number: z.string().nullable(),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;