import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'proj-0',
    name: 'LoL Match Analyzer',
    period: '2026.03 - 진행중',
    ongoing: true,
    role: '개인 프로젝트 · 프론트엔드 전담',
    desc: 'SSR로 렌더링되는 소환사 프로필 페이지와 CSR 폴링 기반 실시간 전적 화면을 구현했습니다. Jotai로 클라이언트 상태를 관리하고, Next.js Route Handler를 Riot API 프록시 겸 Redis 캐시 레이어로 활용했습니다. Zod로 API 응답을 런타임 검증하고 k6로 부하 테스트까지 진행했습니다.',
    tags: ['Next.js', 'Jotai', 'Redis', 'Zod', 'k6'],
    // repo: { owner: 'username', name: 'lol-match-analyzer' },
  },
  {
    id: 'proj-1',
    name: 'meter-admin',
    period: '2025.11 - 2026.01',
    role: '개인 프로젝트 · 풀스택',
    desc: '수도 계량기 현장 조사를 위한 내부 관리 도구입니다. FSD(Feature-Sliced Design) 구조로 전면 리팩토링했고, profiles 테이블 기반 역할별(admin/viewer) 이름 마스킹을 서버사이드에서만 처리하도록 설계했습니다. Cloudflare R2로 현장 사진을 저장하고 Naver Maps로 위치를 표시합니다.',
    tags: ['Next.js', 'Supabase', 'Cloudflare R2', 'Naver Maps'],
    // repo: { owner: 'username', name: 'meter-admin' },
  },
  {
    id: 'proj-2',
    name: 'bandcast',
    period: '2025.08 - 2025.10',
    role: '개인 프로젝트 · 풀스택',
    desc: '5인조 밴드의 곡 선정을 위한 웹앱입니다. 멤버들이 유튜브 링크를 등록하고 장르 태그, 별점, 익명 리뷰를 남길 수 있습니다. Supabase SECURITY DEFINER RPC 함수로 익명성을 서버 레벨에서 보장했고, 폐쇄망 개발 환경을 고려해 오프라인 mockDb를 함께 구성했습니다.',
    tags: ['Vue 3', 'Pinia', 'Supabase', 'Vercel'],
    // repo: { owner: 'username', name: 'bandcast' },
  },
];
