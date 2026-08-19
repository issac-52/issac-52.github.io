import { create } from 'zustand';

export type DetailTarget =
  | { kind: 'experience'; id: string }
  | { kind: 'project'; id: string }
  | { kind: 'person' }
  | null;

interface DetailModalState {
  target: DetailTarget;
  open: (target: Exclude<DetailTarget, null>) => void;
  close: () => void;
}

export const useDetailModalStore = create<DetailModalState>((set) => ({
  target: null,
  open: (target) => set({ target }),
  close: () => set({ target: null }),
}));
