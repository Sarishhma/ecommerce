import api from '@/lib/api';
import { customerListSchema, customerSchema, type CustomerFormValues } from '../schema/customer.schema';
import type { Customer, CustomerList } from '../types/customer.types';

export const getCustomers = async (): Promise<CustomerList> => {
  const { data } = await api.get('/customer/');
  const result = customerListSchema.safeParse(data);
  if (!result.success) {
    console.error('Customer list validation failed:', JSON.stringify(result.error.format(), null, 2));
    throw result.error;
  }
  return result.data;
};

export const createCustomer = async (
  payload: CustomerFormValues,
  idempotencyKey: string,
): Promise<Customer> => {
  const { data } = await api.post('/customer/', payload, {
    headers: { 'Idempotency-Key': idempotencyKey },
  });
  const result = customerSchema.safeParse(data);
  if (!result.success) {
    console.error('Create customer response validation failed:', JSON.stringify(result.error.format(), null, 2));
    throw result.error;
  }
  return result.data;
};