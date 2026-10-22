export interface Project {
  id: string;
  name: string;
  period: string;
  ongoing?: boolean;
  role: string;
  desc: string;
  tags: string[];
  repo?: { owner: string; name: string };
  videoUrl?: string;
  posterUrl?: string;
}
