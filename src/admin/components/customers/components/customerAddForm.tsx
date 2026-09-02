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

import { customerFormSchema, type CustomerFormValues } from '../schema/customer.schema';
import { useCreateCustomer } from '../hooks/useCreateCustomers';

interface CustomerAddFormProps {
  open: boolean;
  onClose: () => void;
}

export const CustomerAddForm = ({ open, onClose }: CustomerAddFormProps) => {
  const { mutate: createCustomer, isPending } = useCreateCustomer();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      contact_number: '',
      address: null,
      tax_number: null,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (values: CustomerFormValues) => {
    createCustomer(
      { payload: values, idempotencyKey: crypto.randomUUID() },
      { onSuccess: handleClose },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add customer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact_number">Contact number</Label>
            <Input id="contact_number" {...register('contact_number')} />
            {errors.contact_number && (
              <p className="text-xs text-red-500">{errors.contact_number.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              onChange={(e) => setValue('address', e.target.value || null)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tax_number">Tax number</Label>
            <Input
              id="tax_number"
              onChange={(e) => setValue('tax_number', e.target.value || null)}
            />
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
              {isPending ? 'Adding…' : 'Add customer'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};