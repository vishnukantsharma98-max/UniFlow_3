export interface EcosystemItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  accentColor: string; // 'violet' | 'magenta' | 'amber' | 'cyan'
  tags: string[];
  positionDesktop: {
    top: string;
    left?: string;
    right?: string;
  };
  delay: number;
}

export interface CategoryCardData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  gradientClass: string;
  items: string[];
  badge?: string;
  highlightText: string;
}

export interface FlowStage {
  step: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface PlatformFeature {
  icon: string;
  title: string;
  description: string;
  status: 'AVAILABLE' | 'COMING SOON';
  glowColor: string;
}

export interface StudentReview {
  id: string;
  name: string;
  college: string;
  year: string;
  quote: string;
  rating: number;
  avatarSeed: string;
  avatarUrl?: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  category: string;
  type: string;
  link: string;
  badge?: string;
}

export type AdminRole = 'primaryAdmin' | 'secondaryAdmin' | 'user';

export interface AdminRecord {
  id: string;
  email: string;
  role: 'primaryAdmin' | 'secondaryAdmin';
  addedBy: string;
  addedAt: string;
  status: 'active' | 'revoked';
}

export interface AuthUserRecord {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  provider: string;
  creationTime: string;
  lastSignInTime: string;
  emailVerified: boolean;
  disabled: boolean;
  role: AdminRole;
}
