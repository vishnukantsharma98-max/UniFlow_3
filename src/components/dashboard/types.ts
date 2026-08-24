import { User } from 'firebase/auth';

export type DashboardPageId = 
  | 'home' 
  | 'semester-1' 
  | 'semester-2' 
  | 'semester-3' 
  | 'study-resources' 
  | 'books' 
  | 'entertainment' 
  | 'games' 
  | 'ai' 
  | 'student-apps' 
  | 'social-media-apps' 
  | 'settings' 
  | 'admin';

export type ThemeMode = 'dark' | 'light' | 'system';

export interface DashboardShellProps {
  user: User;
  onLogout: () => void;
  onNavigate?: (path: string) => void;
}

export interface NavItemConfig {
  id: DashboardPageId;
  label: string;
  mobileBottom?: boolean;
}
