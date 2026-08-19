import type { CommitLogEntry } from '../model/types';

/**
 * 실제 GitHub 커밋 연동용 함수 (지금은 사용되지 않음 — 필요할 때 연결하세요).
 *
 * 사용법:
 *   1. entities/project/model/data.ts 의 각 프로젝트에 repo: { owner, name } 채우기
 *   2. features/node-detail/ui/DetailModal.tsx 에서
 *      mockCommits[item.id] 대신 이 함수의 결과를 사용하도록 교체
 *
 * 공개 레포 기준으로는 별도 인증 없이도 동작하지만, GitHub API는 미인증 요청에
 * 시간당 60회 제한이 있으니 트래픽이 늘어나면 토큰 기반 요청이나 서버 프록시를 고려하세요.
 */
export async function fetchCommits(owner: string, repo: string, perPage = 3): Promise<CommitLogEntry[]> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`);
  if (!res.ok) throw new Error(`GitHub API 요청 실패: ${res.status}`);
  const data = (await res.json()) as Array<{
    sha: string;
    commit: { message: string; author: { date: string } };
  }>;
  return data.map((c) => ({
    hash: c.sha.slice(0, 7),
    msg: c.commit.message.split('\n')[0],
    time: new Date(c.commit.author.date).toLocaleDateString('ko-KR'),
  }));
}
