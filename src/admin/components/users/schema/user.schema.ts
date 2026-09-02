import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  email: z.string().email(),
  image: z.string().nullable(),
  phone_number: z.string(),
  address: z.string().nullable(),
  organization: z.number(),
  is_active: z.boolean(),
 role: z.string().nullable().optional(),
});

export const userListResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(userSchema),
});


export const userFormSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  phone_number: z.string().min(1, 'Phone number is required'),
  address: z.string().nullable(),
  is_active: z.boolean(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

export const createUserResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  full_name: z.string(),
  phone_number: z.string(),
  address: z.string().nullable(),
});

export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
import type { UserRole } from '@/auth/types/auth.types';
export const userCreateFormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  phone_number: z.string().min(1, 'Phone number is required'),
  address: z.string().nullable(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['admin', 'agent', 'billing_group']), // matches confirmed backend choices
});
export type UserCreateFormValues = z.infer<typeof userCreateFormSchema>;

