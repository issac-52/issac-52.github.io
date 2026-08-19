export interface Project {
  id: string;
  name: string;
  period: string;
  ongoing?: boolean;
  role: string;
  desc: string;
  tags: string[];
  repo?: { owner: string; name: string }; // 채워두면 실제 GitHub 커밋 API로 자동 연동됨
  videoUrl?: string; // 1분 시연영상 경로 (예: '/videos/lol-match-analyzer.mp4') — public/videos/ 에 파일을 넣으세요
  posterUrl?: string; // 영상 로드 전 보여줄 썸네일 (선택)
}
