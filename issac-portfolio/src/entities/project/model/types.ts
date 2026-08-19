export interface Project {
  id: string;
  name: string;
  period: string;
  ongoing?: boolean;
  role: string;
  desc: string;
  tags: string[];
  repo?: { owner: string; name: string }; // 채워두면 실제 GitHub 커밋 API로 자동 연동됨
}
