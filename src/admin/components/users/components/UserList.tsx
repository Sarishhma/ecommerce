import { useRef, useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUsers } from '../hooks/useUsers.hook';

import type { User } from '../types/user.types';
import { useUpdateUser } from '../hooks/userUpdatehook';

const initials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

interface UserListProps {
  onDelete: (user: User) => void;
  onEdit: (user: User) => void;
}

export const UserList = ({ onDelete, onEdit }: UserListProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useUsers({ page });
  const { mutate: updateUser, isPending, variables } = useUpdateUser();
  const idempotencyKeyRef = useRef<string>('');

  const handleToggleActive = (id: number, currentValue: boolean) => {
    idempotencyKeyRef.current = crypto.randomUUID();
    updateUser({
      id,
      payload: { is_active: !currentValue },
      idempotencyKey: idempotencyKeyRef.current,
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-white/60 backdrop-blur-sm p-6">
        <div className="divide-y divide-border/40">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4 animate-pulse">
              <div className="h-9 w-9 rounded-full bg-sand/50" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 rounded bg-sand/50" />
                <div className="h-2.5 w-48 rounded bg-sand/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-border bg-white/60 backdrop-blur-sm px-6 py-16 text-center">
        <p className="text-base font-display text-charcoal">Couldn't load staff members</p>
        <p className="mt-1 text-sm text-stone">Check your connection and try again.</p>
      </div>
    );
  }

  if (data.results.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white/60 backdrop-blur-sm px-6 py-16 text-center">
        <p className="text-base font-display text-charcoal">No staff members yet</p>
        <p className="mt-1 text-sm text-stone">New staff users will appear here once added.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white/60 backdrop-blur-sm overflow-hidden shadow-sm">
      <div className="overflow-x-auto custom-scrollbar">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow className="border-b border-border/60 bg-sand/30 hover:bg-transparent">
              <TableHead className="uppercase tracking-wider text-[10px] font-semibold text-stone py-3.5 pl-6">
                Staff Member
              </TableHead>
              <TableHead className="uppercase tracking-wider text-[10px] font-semibold text-stone">
                Contact
              </TableHead>
              <TableHead className="uppercase tracking-wider text-[10px] font-semibold text-stone">
                Address
              </TableHead>
              <TableHead className="uppercase tracking-wider text-[10px] font-semibold text-stone">
                Role
              </TableHead>
              <TableHead className="uppercase tracking-wider text-[10px] font-semibold text-stone">
                Status
              </TableHead>
              <TableHead className="uppercase tracking-wider text-[10px] font-semibold text-stone text-right pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border/40">
            {data.results.map((user) => {
              const isRowPending = isPending && variables?.id === user.id;

              return (
                <TableRow
                  key={user.id}
                  className="hover:bg-sand/20 transition-colors group"
                >
                  <TableCell className="py-3.5 pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border/50 ring-1 ring-terracotta/20">
                        <AvatarImage src={user.image ?? undefined} alt={user.full_name} />
                        <AvatarFallback className="bg-gradient-to-br from-terracotta to-copper text-ivory text-xs font-medium font-display">
                          {initials(user.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-charcoal text-sm group-hover:text-terracotta transition-colors">{user.full_name}</div>
                        <div className="text-[10px] uppercase tracking-wider text-stone">ID #{user.id}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm text-charcoal font-medium">{user.email}</div>
                    <div className="text-xs text-stone tabular-nums">{user.phone_number}</div>
                  </TableCell>

                  <TableCell className="text-sm text-charcoal/80">
                    {user.address ?? <span className="text-stone/60 italic text-xs">Not provided</span>}
                  </TableCell>

                  <TableCell>
                    {user.role ? (
                      <span className="inline-flex items-center rounded-lg border border-border/60 bg-sand/30 px-2.5 py-1 text-xs font-medium text-charcoal/80">
                        {user.role}
                      </span>
                    ) : (
                      <span className="text-sm text-stone/50">—</span>
                    )}
                  </TableCell>

                  <TableCell>
                    <button
                      onClick={() => handleToggleActive(user.id, user.is_active)}
                      disabled={isRowPending}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold disabled:opacity-50 hover:opacity-80 transition-opacity"
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          user.is_active ? 'bg-forest' : 'bg-stone/40'
                        }`}
                      />
                      <span className={user.is_active ? 'text-forest' : 'text-stone'}>
                        {isRowPending ? 'Updating…' : user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </button>
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(user)}
                        className="rounded-lg p-1.5 text-stone hover:bg-terracotta/10 hover:text-terracotta transition-colors"
                        aria-label={`Edit ${user.full_name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(user)}
                        className="rounded-lg p-1.5 text-stone hover:bg-red-50 hover:text-red-600 transition-colors"
                        aria-label={`Delete ${user.full_name}`}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 bg-sand/10 px-6 py-3.5">
        <span className="text-xs text-stone">
          {data.count} staff user{data.count !== 1 ? 's' : ''} total
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!data.previous}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-charcoal hover:bg-sand/60 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            Previous
          </button>
          <span className="px-2 text-xs font-semibold text-stone tabular-nums">{page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data.next}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-charcoal hover:bg-sand/60 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};