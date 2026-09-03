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
      <DialogContent className="sm:max-w-md bg-ivory border border-border shadow-xl rounded-2xl">
        <DialogHeader className="border-b border-sand pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-terracotta/10 flex items-center justify-center">
              <span className="text-terracotta text-sm font-bold">C</span>
            </div>
            <DialogTitle className="font-display text-xl text-charcoal">Add Customer</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-stone">Name</Label>
            <Input id="name" {...register('name')} className="rounded-xl border-border bg-white/60 focus:border-terracotta focus:ring-terracotta/20" />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-stone">Email</Label>
            <Input id="email" type="email" {...register('email')} className="rounded-xl border-border bg-white/60 focus:border-terracotta focus:ring-terracotta/20" />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact_number" className="text-xs font-bold uppercase tracking-wider text-stone">Contact number</Label>
            <Input id="contact_number" {...register('contact_number')} className="rounded-xl border-border bg-white/60 focus:border-terracotta focus:ring-terracotta/20" />
            {errors.contact_number && (
              <p className="text-xs text-destructive">{errors.contact_number.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-stone">Address</Label>
            <Input
              id="address"
              onChange={(e) => setValue('address', e.target.value || null)}
              className="rounded-xl border-border bg-white/60 focus:border-terracotta focus:ring-terracotta/20"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tax_number" className="text-xs font-bold uppercase tracking-wider text-stone">Tax number</Label>
            <Input
              id="tax_number"
              onChange={(e) => setValue('tax_number', e.target.value || null)}
              className="rounded-xl border-border bg-white/60 focus:border-terracotta focus:ring-terracotta/20"
            />
          </div>

          <DialogFooter className="pt-2 border-t border-sand">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-charcoal hover:bg-sand/60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-terracotta px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-copper transition-colors shadow-sm disabled:opacity-50"
            >
              {isPending ? 'Adding…' : 'Add Customer'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};