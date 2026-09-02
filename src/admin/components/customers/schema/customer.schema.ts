import { z } from 'zod';

export const customerSchema = z.object({
  id: z.number(),
  loyalty_points: z.number(),
  name: z.string(),
  tax_number: z.string().nullable(),
  address: z.string().nullable(),
  contact_number: z.string(),
  email: z.string().email(),
  branch: z.string().nullable(),
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