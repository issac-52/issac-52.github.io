import type { Project } from './types';
export const projects: Project[] = [
  {
    id: 'meter-admin',
    name: '야장관리자',
    period: '실서비스 운영 중 · 유지보수',
    role: '사이드 프로젝트 · 외주',
    desc: '수도 계량기 현장 조사 업무를 위한 관리 도구입니다. 프로젝트 전반을 Claude Code 중심으로 설계·개발한 AI 위주의 개발 프로젝트입니다. 개발을 완료해 프로덕션에서 실서비스를 운영 중이며, 현재 유지보수를 담당합니다. 현장 사진과 위치 정보를 함께 관리합니다.',
    tags: ['Claude Code', 'Next.js', 'Supabase', 'Cloudflare R2', 'Naver Maps'],
    videoUrl: 'https://pub-049d78b7bcb44f5b9437538adca968a2.r2.dev/meter-admin.mp4',
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
