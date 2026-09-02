
import api from '@/lib/api';
import { createUserResponseSchema, userListResponseSchema, type CreateUserResponse, type UserCreateFormValues } from '../schema/user.schema';
import type { UpdateUserPayload, UpdateUserResponse, UserListResponse } from '../types/user.types';
import { updateUserResponseSchema } from '../schema/userUpdate.schema';

export const getUsers = async (params?: {
  page?: number;
  search?: string;
}): Promise<UserListResponse> => {
  const { data } = await api.get('/user-lists/', { params });
  return userListResponseSchema.parse(data);
};

export const updateUser = async (
  id: number,
  payload: UpdateUserPayload,
  idempotencyKey: string,
): Promise<UpdateUserResponse> => {
  const { data } = await api.patch(`/users/${id}/`, payload, {
    headers: { 'Idempotency-Key': idempotencyKey },
  });
  const result = updateUserResponseSchema.safeParse(data);
  if (!result.success) {
    console.error('Update user response validation failed:', JSON.stringify(result.error.format(), null, 2));
    throw result.error;
  }
  return result.data;
};


export const createUser = async (
  payload: UserCreateFormValues,
  idempotencyKey: string,
): Promise<CreateUserResponse> => {
  const { data } = await api.post('/users/', payload, {
    headers: { 'Idempotency-Key': idempotencyKey },
  });
  const result = createUserResponseSchema.safeParse(data);
  if (!result.success) {
    console.error('Create user response validation failed:', JSON.stringify(result.error.format(), null, 2));
    throw result.error;
  }
  return result.data;
};