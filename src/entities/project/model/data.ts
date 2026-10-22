import type { Project } from './types';
export const projects: Project[] = [
  {
    id: 'meter-admin',
    name: '야장관리자',
    period: '실서비스 운영 중 · 유지보수',
    role: '사이드 프로젝트 · 외주',
    desc: '수도 계량기 현장 조사 업무를 위한 관리 도구입니다. 개발을 완료하고 실서비스를 운영 중이며, 현재 유지보수를 담당합니다. 현장 사진과 위치 정보를 함께 관리합니다.',
    tags: ['Next.js', 'Supabase', 'Cloudflare R2', 'Naver Maps'],
    videoUrl: 'https://pub-049d78b7bcb44f5b9437538adca968a2.r2.dev/meter-admin.mp4',
  },
  {
    id: 'field-work',
    name: '수도관리자',
    period: '설계 중',
    ongoing: true,
    role: '사이드 프로젝트 · 외주',
    desc: '현장 검침·작업 관리 업무를 위한 별도의 신규 프로젝트입니다. 모바일 위치 확인, 입력·사진 기록, 완료 처리로 이어지는 업무 흐름을 설계하고 있습니다. 현재 설계 단계이며 실서비스 운영 전입니다.',
    tags: ['Spring Boot', 'PostgreSQL', 'React / Vite', 'AWS EC2', 'Docker'],
  },
];
