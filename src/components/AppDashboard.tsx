import React from 'react';
import { User } from 'firebase/auth';
import { DashboardShell } from './dashboard/DashboardShell';

interface AppDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate?: (path: string) => void;
}

/**
 * UniFlow Student Dashboard Entry Wrapper
 * Hosts the pristine dark dashboard shell foundation at /app.
 */
export const AppDashboard: React.FC<AppDashboardProps> = ({ user, onLogout, onNavigate }) => {
  return <DashboardShell user={user} onLogout={onLogout} onNavigate={onNavigate} />;
};
