import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCustomers } from '../hooks/useCustomers';

export const CustomerList = () => {
  const { data, isLoading, isError } = useCustomers();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
              <div className="h-3 w-32 rounded bg-slate-100" />
              <div className="h-3 w-48 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
        <p className="text-sm font-medium text-slate-800">Couldn't load customers</p>
        <p className="mt-1 text-sm text-slate-500">Check your connection and try again.</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
        <p className="text-sm font-medium text-slate-800">No customers yet</p>
        <p className="mt-1 text-sm text-slate-500">New customers will appear here once added.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 hover:bg-transparent">
            <TableHead className="uppercase tracking-wide text-[11px] font-medium text-slate-400 py-3">
              Name
            </TableHead>
            <TableHead className="uppercase tracking-wide text-[11px] font-medium text-slate-400">
              Contact
            </TableHead>
            <TableHead className="uppercase tracking-wide text-[11px] font-medium text-slate-400">
              Address
            </TableHead>
            <TableHead className="uppercase tracking-wide text-[11px] font-medium text-slate-400">
              Branch
            </TableHead>
            <TableHead className="uppercase tracking-wide text-[11px] font-medium text-slate-400 text-right">
              Loyalty points
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((customer) => (
            <TableRow key={customer.id} className="border-slate-100 hover:bg-slate-50/70 transition-colors">
              <TableCell className="py-3.5 font-medium text-slate-900 text-sm">
                {customer.name}
              </TableCell>
              <TableCell>
                <div className="text-sm text-slate-700">{customer.email}</div>
                <div className="text-xs text-slate-400 tabular-nums">{customer.contact_number}</div>
              </TableCell>
              <TableCell className="text-sm text-slate-500">
                {customer.address ?? <span className="text-slate-300">Not provided</span>}
              </TableCell>
              <TableCell className="text-sm text-slate-500">
                {customer.branch ?? <span className="text-slate-300">—</span>}
              </TableCell>
              <TableCell className="text-right text-sm tabular-nums text-slate-700">
                {customer.loyalty_points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};