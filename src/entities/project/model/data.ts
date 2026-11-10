import type { Project } from './types';
export const projects: Project[] = [
  {
    id: 'meter-admin',
    name: '야장관리자',
    period: '실서비스 운영 중 · 유지보수',
    role: '사이드 프로젝트 · 외주',
    desc: '수용가·밸브 조사의 Excel 등록부터 현장 입력·사진·지도·결과 추출까지 연결한 관리 도구입니다. 재업로드 시 기존 수용가 조사값을 보존하고 원본 Excel 양식에 결과를 채웁니다. Claude Code 중심으로 설계·개발했으며, 현재 실서비스 운영과 유지보수를 담당합니다.',
    tags: ['Claude Code', 'Next.js', 'Supabase', 'Cloudflare R2', 'Naver Maps'],
    videoUrl: 'https://pub-049d78b7bcb44f5b9437538adca968a2.r2.dev/meter-admin.mp4',
    repo: { owner: 'issac-52', name: 'meter-admin' },
    caseStudyHref: '#/projects/meter-admin',
  },
  {
    id: 'field-work',
    name: '수도관리자',
    period: 'MVP 구현 · 운영 연결 · 성능 개선',
    ongoing: true,
    role: '사이드 프로젝트 · 외주',
    desc: '약 2만 수용가의 Excel 등록, 지도·좌표, START/END 검침, 사진, 정산과 HWPX 출력을 연결한 현장 업무 시스템입니다. Codex를 활용해 요구사항을 구현·검증하고 EC2와 Cloudflare를 연결했습니다. 가상 2만 건으로 조회 병목을 측정하고 개선 전후를 기록합니다.',
    tags: ['Java 21 / Spring Boot', 'PostgreSQL', 'React / Vite', 'AWS EC2', 'Codex'],
    repo: { owner: 'issac-52', name: 'field-worker' },
    caseStudyHref: '#/projects/field-work',
  },
];
