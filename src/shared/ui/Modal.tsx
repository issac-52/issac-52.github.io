import { useEffect, useRef } from 'react';
import { useLanguageStore } from '@/shared/model/useLanguageStore';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClassName?: string;
}

export function Modal({ open, onClose, children, maxWidthClassName = 'max-w-[480px]' }: ModalProps) {
  const en = useLanguageStore(s => s.language === 'en');
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      const elements = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], video[controls], [tabindex="0"]');
      if (!elements?.length) { e.preventDefault(); return; }
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center detail-scrim p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={en ? 'Details' : '상세 정보'} tabIndex={-1} className={`relative w-full ${maxWidthClassName} max-h-[86vh] overflow-y-auto detail-panel animate-modal-in`}>
        <button onClick={onClose} className="detail-close" aria-label={en ? 'Close details' : '상세 정보 닫기'}>×</button>
        {children}
      </div>
    </div>
  );
}
