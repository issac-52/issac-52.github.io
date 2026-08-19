import { create } from 'zustand';

type Branch = 'connectwave' | 'mgsinyong' | 'personal' | null;

interface MigrationState {
  migrated: boolean;
  expandedBranch: Branch;
  migrate: () => void;
  reset: () => void;
  toggleBranch: (branch: Exclude<Branch, null>) => void;
}

export const useMigrationStore = create<MigrationState>((set, get) => ({
  migrated: false,
  expandedBranch: null,
  migrate: () => set({ migrated: true }),
  reset: () => set({ migrated: false, expandedBranch: null }),
  toggleBranch: (branch) =>
    set({ expandedBranch: get().expandedBranch === branch ? null : branch }),
}));
