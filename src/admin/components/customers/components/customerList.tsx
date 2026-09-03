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
      <div className="rounded-2xl border border-border bg-white/60 backdrop-blur-sm p-6">
        <div className="divide-y divide-border/40">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4 animate-pulse">
              <div className="h-3 w-32 rounded bg-sand/50" />
              <div className="h-3 w-48 rounded bg-sand/30" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-border bg-white/60 backdrop-blur-sm px-6 py-16 text-center">
        <p className="text-base font-display text-charcoal">Couldn't load customers</p>
        <p className="mt-1 text-sm text-stone">Check your connection and try again.</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white/60 backdrop-blur-sm px-6 py-16 text-center">
        <p className="text-base font-display text-charcoal">No customers yet</p>
        <p className="mt-1 text-sm text-stone">New customers will appear here once registered.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white/60 backdrop-blur-sm overflow-hidden shadow-sm">
      <div className="overflow-x-auto custom-scrollbar">
        <Table className="min-w-[650px]">
          <TableHeader>
            <TableRow className="border-b border-border/60 bg-sand/30 hover:bg-transparent">
              <TableHead className="uppercase tracking-wider text-[10px] font-semibold text-stone py-3.5 pl-6">
                Customer Name
              </TableHead>
              <TableHead className="uppercase tracking-wider text-[10px] font-semibold text-stone">
                Contact
              </TableHead>
              <TableHead className="uppercase tracking-wider text-[10px] font-semibold text-stone">
                Address
              </TableHead>
              <TableHead className="uppercase tracking-wider text-[10px] font-semibold text-stone">
                Branch
              </TableHead>
              <TableHead className="uppercase tracking-wider text-[10px] font-semibold text-stone text-right pr-6">
                Loyalty Points
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border/40">
            {data.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-sand/20 transition-colors group">
                <TableCell className="py-3.5 pl-6 font-medium text-charcoal text-sm group-hover:text-terracotta transition-colors">
                  {customer.name}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-charcoal font-medium">{customer.email}</div>
                  <div className="text-xs text-stone tabular-nums">{customer.contact_number}</div>
                </TableCell>
                <TableCell className="text-sm text-charcoal/80">
                  {customer.address ?? <span className="text-stone/60 italic text-xs">Not provided</span>}
                </TableCell>
                <TableCell className="text-sm text-charcoal/80">
                  {customer.branch ?? <span className="text-stone/50">—</span>}
                </TableCell>
                <TableCell className="text-right pr-6 text-base font-display font-semibold tabular-nums text-charcoal">
                  {customer.loyalty_points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};