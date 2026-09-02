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
import { useCreateUser } from '../hooks/useCreateUsers';
import { userCreateFormSchema, type UserCreateFormValues } from '../schema/user.schema';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface UserAddFormProps {
  open: boolean;
  onClose: () => void;
}

export const UserAddForm = ({ open, onClose }: UserAddFormProps) => {
  const { mutate: createUser, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserCreateFormValues>({
    resolver: zodResolver(userCreateFormSchema),
    defaultValues: {
      username: '',
      full_name: '',
      email: '',
      phone_number: '',
      address: null,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

const onSubmit = (values: UserCreateFormValues) => {
  const payload: Partial<UserCreateFormValues> = { ...values };
  if (!payload.address) {
    delete payload.address;
  }

  createUser(
    { payload: payload as UserCreateFormValues, idempotencyKey: crypto.randomUUID() },
    { onSuccess: handleClose },
  );
};

    const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register('username')} />
            {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
          </div>
          <div className="space-y-1.5">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
    </div>

<div className="space-y-1.5">
  <Label htmlFor="role">Role</Label>
 <div className="space-y-1.5">
  <Label htmlFor="role">Role</Label>
  <select
    id="role"
    {...register('role')}
    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
  >
    <option value="">Select a role</option>
    <option value="admin">Admin</option>
    <option value="agent">Agent</option>
    <option value="billing_group">Billing group</option>
  </select>
  {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
</div>
  {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
</div>

          <div className="space-y-1.5">
            <Label htmlFor="full_name">Full name</Label>
            <Input id="full_name" {...register('full_name')} />
            {errors.full_name && <p className="text-xs text-red-500">{errors.full_name.message}</p>}
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

         

          <DialogFooter className="pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50 transition-colors"
            >
              {isPending ? 'Adding…' : 'Add user'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};