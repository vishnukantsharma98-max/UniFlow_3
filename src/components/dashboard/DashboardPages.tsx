import React from 'react';
import { useTheme } from './ThemeSystem';
import { WorkspacePlaceholder } from './WorkspacePlaceholder';
import { Semester1View } from './semester1/Semester1View';
import { Semester2View } from './semester2/Semester2View';
import { Semester3View } from './semester3/Semester3View';
import { AIView } from './ai/AIView';
import { StudyResourcesView } from './studyResources/StudyResourcesView';
import { StudentAppsView } from './studentApps/StudentAppsView';
import { SocialMediaView } from './socialMedia/SocialMediaView';
import { BooksView } from './books/BooksView';
import { GamesView } from './games/GamesView';
import { EntertainmentView } from './entertainment/EntertainmentView';
import { Moon, Sun, Monitor } from 'lucide-react';

export const Semester1Page: React.FC = () => <Semester1View />;
export const Semester2Page: React.FC = () => <Semester2View />;
export const Semester3Page: React.FC = () => <Semester3View />;
export const StudyResourcesPage: React.FC = () => <StudyResourcesView />;
export const BooksPage: React.FC = () => <BooksView />;
export const EntertainmentPage: React.FC = () => <EntertainmentView />;
export const GamesPage: React.FC = () => <GamesView />;
export const AIPage: React.FC = () => <AIView />;
export const StudentAppsPage: React.FC = () => <StudentAppsView />;
export const SocialMediaAppsPage: React.FC = () => <SocialMediaView />;

export const SettingsPage: React.FC = () => {
  const { theme, setTheme, resolvedTheme, colors } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="w-full max-w-xl mx-auto flex-1 flex flex-col justify-center py-8 space-y-4">
      <div
        style={{
          backgroundColor: isDark ? 'rgba(17, 18, 26, 0.65)' : 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(20px)',
          borderColor: colors.borderSubtle,
        }}
        className="p-6 sm:p-8 rounded-3xl border shadow-xl space-y-5"
      >
        <div>
          <h3 style={{ color: colors.primaryText }} className="text-base font-bold tracking-tight">
            Theme Preference
          </h3>
          <p style={{ color: colors.mutedText }} className="text-xs mt-1">
            Choose your interface appearance or sync automatically with your system settings.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setTheme('dark')}
            style={{
              backgroundColor: theme === 'dark' ? colors.accent : (isDark ? '#171923' : '#F1F1F4'),
              color: theme === 'dark' ? '#FFFFFF' : colors.primaryText,
              borderColor: colors.borderSubtle,
            }}
            className="p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-xs font-semibold cursor-pointer transition-all duration-150 active:scale-95 shadow-xs"
          >
            <Moon className="w-4 h-4 text-violet-400" />
            <span>Dark</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme('light')}
            style={{
              backgroundColor: theme === 'light' ? colors.accent : (isDark ? '#171923' : '#F1F1F4'),
              color: theme === 'light' ? '#FFFFFF' : colors.primaryText,
              borderColor: colors.borderSubtle,
            }}
            className="p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-xs font-semibold cursor-pointer transition-all duration-150 active:scale-95 shadow-xs"
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Light</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme('system')}
            style={{
              backgroundColor: theme === 'system' ? colors.accent : (isDark ? '#171923' : '#F1F1F4'),
              color: theme === 'system' ? '#FFFFFF' : colors.primaryText,
              borderColor: colors.borderSubtle,
            }}
            className="p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-xs font-semibold cursor-pointer transition-all duration-150 active:scale-95 shadow-xs"
          >
            <Monitor className="w-4 h-4 text-cyan-400" />
            <span>System</span>
          </button>
        </div>
      </div>
    </div>
  );
};
