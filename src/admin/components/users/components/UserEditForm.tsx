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
      <DialogContent className="sm:max-w-md bg-ivory border border-border shadow-xl rounded-2xl">
        <DialogHeader className="border-b border-sand pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-terracotta/10 flex items-center justify-center">
              <span className="text-terracotta text-sm font-bold">U</span>
            </div>
            <DialogTitle className="font-display text-xl text-charcoal">Edit Staff User</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="full_name" className="text-xs font-bold uppercase tracking-wider text-stone">Full name</Label>
            <Input id="full_name" {...register('full_name')} className="rounded-xl border-border bg-white/60 focus:border-terracotta focus:ring-terracotta/20" />
            {errors.full_name && (
              <p className="text-xs text-destructive">{errors.full_name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-stone">Email</Label>
            <Input id="email" type="email" {...register('email')} className="rounded-xl border-border bg-white/60 focus:border-terracotta focus:ring-terracotta/20" />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone_number" className="text-xs font-bold uppercase tracking-wider text-stone">Phone number</Label>
            <Input id="phone_number" {...register('phone_number')} className="rounded-xl border-border bg-white/60 focus:border-terracotta focus:ring-terracotta/20" />
            {errors.phone_number && (
              <p className="text-xs text-destructive">{errors.phone_number.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-stone">Address</Label>
            <Input
              id="address"
              {...register('address')}
              onChange={(e) => setValue('address', e.target.value || null, { shouldDirty: true })}
              className="rounded-xl border-border bg-white/60 focus:border-terracotta focus:ring-terracotta/20"
            />
          </div>

          <div className="flex items-center justify-between pt-1 px-1">
            <Label htmlFor="is_active" className="text-xs font-bold uppercase tracking-wider text-stone">Active</Label>
            <Switch
              id="is_active"
              checked={watch('is_active')}
              onCheckedChange={(checked) => setValue('is_active', checked, { shouldDirty: true })}
            />
          </div>

          <DialogFooter className="pt-2 border-t border-sand">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-charcoal hover:bg-sand/60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty || isPending}
              className="rounded-xl bg-terracotta px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-copper transition-colors shadow-sm disabled:opacity-50"
            >
              {isPending ? 'Saving…' : 'Save changes'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};