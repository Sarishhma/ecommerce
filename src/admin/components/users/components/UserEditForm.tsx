import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { userFormSchema, type UserFormValues } from '../schema/user.schema';
import type { User } from '../types/user.types';
import { useUpdateUser } from '../hooks/userUpdatehook';

interface UserEditFormProps {
  user: User | null;
  onClose: () => void;
}

export const UserEditForm = ({ user, onClose }: UserEditFormProps) => {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone_number: '',
      address: null,
      is_active: true,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
        is_active: user.is_active,
      });
    }
  }, [user, reset]);

  const onSubmit = (values: UserFormValues) => {
    if (!user) return;

    updateUser(
      {
        id: user.id,
        payload: values,
        idempotencyKey: crypto.randomUUID(),
      },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog open={!!user} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="full_name">Full name</Label>
            <Input id="full_name" {...register('full_name')} />
            {errors.full_name && (
              <p className="text-xs text-red-500">{errors.full_name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone_number">Phone number</Label>
            <Input id="phone_number" {...register('phone_number')} />
            {errors.phone_number && (
              <p className="text-xs text-red-500">{errors.phone_number.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register('address')}
              onChange={(e) => setValue('address', e.target.value || null, { shouldDirty: true })}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <Label htmlFor="is_active">Active</Label>
            <Switch
              id="is_active"
              checked={watch('is_active')}
              onCheckedChange={(checked) => setValue('is_active', checked, { shouldDirty: true })}
            />
          </div>

          <DialogFooter className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty || isPending}
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50 transition-colors"
            >
              {isPending ? 'Saving…' : 'Save changes'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};