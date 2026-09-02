import { useRef, useState } from 'react';
import { Delete, Eye, Pencil, Trash } from 'lucide-react';
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
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
              <div className="h-9 w-9 rounded-full bg-slate-100" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 rounded bg-slate-100" />
                <div className="h-2.5 w-48 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
        <p className="text-sm font-medium text-slate-800">Couldn't load users</p>
        <p className="mt-1 text-sm text-slate-500">Check your connection and try again.</p>
      </div>
    );
  }

  if (data.results.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
        <p className="text-sm font-medium text-slate-800">No users yet</p>
        <p className="mt-1 text-sm text-slate-500">New users will appear here once added.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 hover:bg-transparent">
            <TableHead className="uppercase tracking-wide text-[11px] font-medium text-slate-400 py-3">
              User
            </TableHead>
            <TableHead className="uppercase tracking-wide text-[11px] font-medium text-slate-400">
              Contact
            </TableHead>
            <TableHead className="uppercase tracking-wide text-[11px] font-medium text-slate-400">
              Address
            </TableHead>
            <TableHead className="uppercase tracking-wide text-[11px] font-medium text-slate-400">
              Role
            </TableHead>
            <TableHead className="uppercase tracking-wide text-[11px] font-medium text-slate-400">
              Status
            </TableHead>
            <TableHead className="uppercase tracking-wide text-[11px] font-medium text-slate-400 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.results.map((user) => {
            const isRowPending = isPending && variables?.id === user.id;

            return (
              <TableRow
                key={user.id}
                className="border-slate-100 hover:bg-slate-50/70 transition-colors"
              >
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 ring-1 ring-slate-200">
                      <AvatarImage src={user.image ?? undefined} alt={user.full_name} />
                      <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-medium">
                        {initials(user.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-900 text-sm">{user.full_name}</div>
                      <div className="text-xs text-slate-400">ID #{user.id}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm text-slate-700">{user.email}</div>
                  <div className="text-xs text-slate-400 tabular-nums">{user.phone_number}</div>
                </TableCell>

                <TableCell className="text-sm text-slate-500">
                  {user.address ?? <span className="text-slate-300">Not provided</span>}
                </TableCell>

                <TableCell>
                  {user.role ? (
                    <span className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {user.role}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-300">—</span>
                  )}
                </TableCell>

                <TableCell>
                  <button
                    onClick={() => handleToggleActive(user.id, user.is_active)}
                    disabled={isRowPending}
                    className="inline-flex items-center gap-1.5 text-xs font-medium disabled:opacity-50 hover:opacity-70 transition-opacity"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        user.is_active ? 'bg-orange-500' : 'bg-slate-300'
                      }`}
                    />
                    <span className={user.is_active ? 'text-orange-600' : 'text-slate-400'}>
                      {isRowPending ? 'Updating…' : user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </button>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onDelete(user)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                      aria-label={`Delete ${user.full_name}`}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-orange-600 transition-colors"
                      aria-label={`Edit ${user.full_name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3.5">
        <span className="text-xs text-slate-400">
          {data.count} user{data.count !== 1 ? 's' : ''} total
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!data.previous}
            className="rounded-lg px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            Previous
          </button>
          <span className="px-2 text-sm text-slate-400 tabular-nums">{page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data.next}
            className="rounded-lg px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};