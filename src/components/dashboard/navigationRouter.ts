import { DashboardPageId } from './types';

export interface RouteState {
  path: string;
  page: DashboardPageId;
  sem1State?: {
    mode: 'sem1Home' | 'testsMenu' | 'testDetail' | 'syllabusSubjects' | 'subjects' | 'assignments' | 'swayamNotes';
    context: {
      semester?: string;
      subject?: string;
      testTitle?: string;
    };
  };
  sem2State?: {
    mode: 'sem2Home' | 'assignmentsMenu' | 'assignmentDetail' | 'examVaultMenu' | 'examVaultDetail' | 'ihvpe' | 'constitution';
    context: {
      subject?: string;
      testId?: 'in-sem-1' | 'in-sem-2' | 'in-sem-3' | 'end-sem';
    };
  };
  sem3State?: {
    mode: 'sem3Home' | 'syllabusSubjects';
    context: {
      subject?: string;
    };
  };
  aiState?: {
    mode: 'aiHome' | 'category';
    context: {
      category?: 'chatbots' | 'video' | 'image' | 'presentation' | 'website';
    };
  };
  studyResourcesState?: {
    mode: 'studyHome' | 'category';
    context: {
      category?: string;
    };
  };
  booksState?: {
    mode: 'booksHome' | 'category';
    context: {
      category?: string;
    };
  };
}

// Slug Helpers
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Parses the current pathname into a structured RouteState.
 */
export function parseRoute(pathname: string): RouteState {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  
  if (cleanPath === '/admin' || cleanPath.startsWith('/admin/')) {
    return { path: cleanPath, page: 'admin' };
  }

  // Dashboard paths start with /app
  if (!cleanPath.startsWith('/app')) {
    return { path: '/app', page: 'home' };
  }

  const segments = cleanPath.split('/').filter(Boolean); // ['app', ...]
  const section = segments[1] || 'home';

  // Semester 1 Routing
  if (section === 'semester-1') {
    const sub = segments[2];
    const detail = segments[3];

    if (!sub) {
      return {
        path: cleanPath,
        page: 'semester-1',
        sem1State: { mode: 'sem1Home', context: {} },
      };
    }

    if (sub === 'exam-vault') {
      if (detail) {
        let testTitle = 'In-Sem 1';
        if (detail === 'in-sem-2') testTitle = 'In-Sem 2';
        else if (detail === 'end-sem') testTitle = 'End Sem';
        return {
          path: cleanPath,
          page: 'semester-1',
          sem1State: { mode: 'testDetail', context: { semester: 'Semester - I', testTitle } },
        };
      }
      return {
        path: cleanPath,
        page: 'semester-1',
        sem1State: { mode: 'testsMenu', context: { semester: 'Semester - I' } },
      };
    }

    if (sub === 'assignments') {
      if (detail) {
        // Map slug back to subject
        const subjectMap: Record<string, string> = {
          'em-i': 'EM-I',
          'mathematics': 'EM-I',
          'applied-physics': 'Applied Physics',
          'applied-physics-lab': 'Applied Physics Lab',
          'cplt': 'CPLT',
          'cplt-lab': 'CPLT Lab',
          'ai': 'AI',
          'communication-skills': 'Communication Skills',
          'communication-skills-lab': 'Communication Skills Lab',
        };
        const subject = subjectMap[detail] || detail;
        return {
          path: cleanPath,
          page: 'semester-1',
          sem1State: { mode: 'assignments', context: { subject } },
        };
      }
      return {
        path: cleanPath,
        page: 'semester-1',
        sem1State: { mode: 'subjects', context: {} },
      };
    }

    if (sub === 'syllabus') {
      return {
        path: cleanPath,
        page: 'semester-1',
        sem1State: { mode: 'syllabusSubjects', context: { semester: '1st Semester' } },
      };
    }

    if (sub === 'evs-swayam') {
      return {
        path: cleanPath,
        page: 'semester-1',
        sem1State: { mode: 'swayamNotes', context: {} },
      };
    }

    return {
      path: cleanPath,
      page: 'semester-1',
      sem1State: { mode: 'sem1Home', context: {} },
    };
  }

  // Semester 2 Routing
  if (section === 'semester-2') {
    const sub = segments[2];
    const detail = segments[3];

    if (!sub) {
      return {
        path: cleanPath,
        page: 'semester-2',
        sem2State: { mode: 'sem2Home', context: {} },
      };
    }

    if (sub === 'assignments') {
      if (detail) {
        const subjectMap: Record<string, string> = {
          'advanced-excel': 'Advanced Excel',
          'c-plus-plus': 'C++',
          'c': 'C++',
          'dsa': 'DSA',
          'maths-for-ai': 'Maths for AI',
          'engineering-workshop': 'Engineering Workshop',
          'professional-skills': 'Professional Skills',
        };
        const subject = subjectMap[detail] || detail;
        return {
          path: cleanPath,
          page: 'semester-2',
          sem2State: { mode: 'assignmentDetail', context: { subject } },
        };
      }
      return {
        path: cleanPath,
        page: 'semester-2',
        sem2State: { mode: 'assignmentsMenu', context: {} },
      };
    }

    if (sub === 'exam-vault') {
      if (detail && ['in-sem-1', 'in-sem-2', 'in-sem-3', 'end-sem'].includes(detail)) {
        return {
          path: cleanPath,
          page: 'semester-2',
          sem2State: {
            mode: 'examVaultDetail',
            context: { testId: detail as 'in-sem-1' | 'in-sem-2' | 'in-sem-3' | 'end-sem' },
          },
        };
      }
      return {
        path: cleanPath,
        page: 'semester-2',
        sem2State: { mode: 'examVaultMenu', context: {} },
      };
    }

    if (sub === 'ihvpe') {
      return {
        path: cleanPath,
        page: 'semester-2',
        sem2State: { mode: 'ihvpe', context: {} },
      };
    }

    if (sub === 'indian-constitution') {
      return {
        path: cleanPath,
        page: 'semester-2',
        sem2State: { mode: 'constitution', context: {} },
      };
    }

    return {
      path: cleanPath,
      page: 'semester-2',
      sem2State: { mode: 'sem2Home', context: {} },
    };
  }

  // Semester 3 Routing
  if (section === 'semester-3') {
    const sub = segments[2];

    if (!sub) {
      return {
        path: cleanPath,
        page: 'semester-3',
        sem3State: { mode: 'sem3Home', context: {} },
      };
    }

    if (sub === 'syllabus') {
      return {
        path: cleanPath,
        page: 'semester-3',
        sem3State: { mode: 'syllabusSubjects', context: {} },
      };
    }

    return {
      path: cleanPath,
      page: 'semester-3',
      sem3State: { mode: 'sem3Home', context: {} },
    };
  }

  // AI Routing
  if (section === 'ai') {
    const sub = segments[2];

    if (!sub) {
      return {
        path: cleanPath,
        page: 'ai',
        aiState: { mode: 'aiHome', context: {} },
      };
    }

    const validCategories = ['chatbots', 'video', 'image', 'presentation', 'website'] as const;
    const foundCategory = validCategories.find((c) => c === sub);

    if (foundCategory) {
      return {
        path: cleanPath,
        page: 'ai',
        aiState: { mode: 'category', context: { category: foundCategory } },
      };
    }

    return {
      path: cleanPath,
      page: 'ai',
      aiState: { mode: 'aiHome', context: {} },
    };
  }

  // Study Resources Routing
  if (section === 'study-resources') {
    const sub = segments[2];

    if (!sub) {
      return {
        path: cleanPath,
        page: 'study-resources',
        studyResourcesState: { mode: 'studyHome', context: {} },
      };
    }

    return {
      path: cleanPath,
      page: 'study-resources',
      studyResourcesState: { mode: 'category', context: { category: sub } },
    };
  }

  // Books Routing
  if (section === 'books') {
    const sub = segments[2];

    if (!sub) {
      return {
        path: cleanPath,
        page: 'books',
        booksState: { mode: 'booksHome', context: {} },
      };
    }

    return {
      path: cleanPath,
      page: 'books',
      booksState: { mode: 'category', context: { category: sub } },
    };
  }

  // Other Dashboard Pages
  const validPages: DashboardPageId[] = [
    'home',
    'semester-1',
    'semester-2',
    'semester-3',
    'study-resources',
    'books',
    'entertainment',
    'games',
    'ai',
    'student-apps',
    'social-media-apps',
    'settings',
    'admin',
  ];

  if (validPages.includes(section as DashboardPageId)) {
    return { path: cleanPath, page: section as DashboardPageId };
  }

  return { path: '/app', page: 'home' };
}

/**
 * Initializes state in history if not already set.
 * Ensures a top-level sidebar section entered directly has /app behind it in history
 * so browser back/phone back returns to Home cleanly.
 */
export function initializeHistory() {
  if (typeof window === 'undefined') return;
  const current = window.location.pathname;
  if (!window.history.state || !window.history.state.path) {
    if (current !== '/app' && current !== '/' && !current.startsWith('/admin')) {
      window.history.replaceState({ path: '/app' }, '', '/app');
      window.history.pushState({ path: current }, '', current);
    } else {
      window.history.replaceState({ path: current }, '', current);
    }
  }
}

/**
 * Navigates to a path using history.pushState or history.replaceState.
 */
export function navigate(toPath: string, options: { replace?: boolean } = {}) {
  if (typeof window === 'undefined') return;
  const currentPath = window.location.pathname;
  if (currentPath === toPath) return;

  if (options.replace) {
    window.history.replaceState({ path: toPath }, '', toPath);
  } else {
    window.history.pushState({ path: toPath }, '', toPath);
  }

  // Trigger popstate so all reactive listeners re-sync immediately
  window.dispatchEvent(new PopStateEvent('popstate', { state: { path: toPath } }));
}

/**
 * Global synchronized back action.
 */
export function goBack(fallbackPath: string = '/app') {
  if (typeof window === 'undefined') return;
  if (window.history.length > 1) {
    window.history.back();
  } else {
    navigate(fallbackPath, { replace: true });
  }
}
