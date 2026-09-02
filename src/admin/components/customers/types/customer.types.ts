
import type { z } from 'zod';
import type { customerListSchema, customerSchema } from '../schema/customer.schema';

export type Customer = z.infer<typeof customerSchema>;
export type CustomerList = z.infer<typeof customerListSchema>;