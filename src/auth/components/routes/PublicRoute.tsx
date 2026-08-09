import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';

interface PublicRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  redirectPath = '/account',
  children,
}) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};