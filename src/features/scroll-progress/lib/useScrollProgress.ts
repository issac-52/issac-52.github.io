import { useEffect, useRef, useState } from 'react';

/**
 * 전달된 스크롤 컨테이너의 스크롤 진행률(0~1)을 반환합니다.
 * 배경 파티클 밀도처럼 "스크롤할수록 더 많은 걸 보여주는" 연출에 사용합니다.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    el.addEventListener('scroll', onScroll);
    update();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return { ref, progress };
}
