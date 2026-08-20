import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux';
import { selectIsAuthenticated, selectUser } from '@/redux/slices/authSlice';
import type { UserRole } from '@/auth/types/auth.types';

interface ProtectedRouteProps {
  redirectPath?: string;
  allowedRoles?: UserRole[];
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/login', //  unauthenticated users must go to /login
  allowedRoles,
  children,
}) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Bug fix: was allowedRoles.some(...) which redirected users WHO HAVE the role (inverted logic).
  // Correct: redirect if the user does NOT have ANY of the required roles.
  if (allowedRoles && (!user?.roles || !allowedRoles.some((role) => user.roles.includes(role)))) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
