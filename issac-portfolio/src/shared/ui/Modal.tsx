import { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm p-5"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-[480px] max-h-[86vh] overflow-y-auto bg-card border border-cardline rounded-2xl p-7 text-ink animate-modal-in">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-xs text-dim hover:text-ink transition-colors"
        >
          ✕ 닫기
        </button>
        {children}
      </div>
    </div>
  );
}
