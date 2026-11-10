import { useEffect, useState } from 'react';
import { HomePage } from '@/pages/home/ui/HomePage';
import { FieldworkPage, type FieldworkSection } from '@/pages/fieldwork/ui/FieldworkPage';

function readSection(): FieldworkSection | null {
  const base = '#/projects/field-work';
  if (!location.hash.startsWith(base)) return null;
  const part = location.hash.slice(base.length).replace(/^\//, '');
  return part === 'performance' || part === 'codex' ? part : 'overview';
}
export function App() {
  const [section, setSection] = useState(readSection);
  useEffect(() => {
    const sync = () => setSection(readSection());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  useEffect(() => {
    if (section) window.scrollTo(0, 0);
    else if (location.hash === '#projects') requestAnimationFrame(() => document.getElementById('projects')?.scrollIntoView());
  }, [section]);
  return section ? <FieldworkPage section={section} /> : <HomePage />;
}
