import type z from 'zod';
import type { userListResponseSchema, userSchema } from '../schema/user.schema';
import type { updateUserResponseSchema, updateUserSchema } from '../schema/userUpdate.schema';

export type User = z.infer<typeof userSchema>;
export type UserListResponse = z.infer<typeof userListResponseSchema>;
export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;
export type UpdateUserPayload = z.infer<typeof updateUserSchema>;