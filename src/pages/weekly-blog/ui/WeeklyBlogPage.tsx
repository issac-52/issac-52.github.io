import { CaseStudy, Choices, Decisions, Diagram, Flow, Prose, Section } from '@/widgets/case-study/ui/CaseStudy';

export function WeeklyBlogPage() {
  return <CaseStudy
    id="weekly-blog"
    title={{ ko: 'Browinfo · 주간 매거진', en: 'Browinfo · Weekly Magazine', ja: 'Browinfo · 週刊マガジン' }}
    status={{ ko: '비공개 배포 · 관리자 검토 흐름 운영', en: 'Private deployment · Editorial review in use', ja: '非公開デプロイ・承認フロー運用' }}
    summary={{
      ko: '주간 기사 초안을 받아 출처를 확인하고, 관리자가 승인한 글만 발행하는 매거진입니다. 기존 weekly-blog를 Next.js와 Supabase로 옮기면서 초안 접수와 공개 발행 사이에 검토 단계를 넣었습니다.',
      en: 'A weekly magazine that receives article drafts, checks their sources and publishes only what an administrator approves. While moving the old weekly-blog to Next.js and Supabase, I added a review stage between draft intake and publication.',
      ja: '週刊記事の下書きを受け取り、出典を確認し、管理者が承認した記事だけを公開するマガジンです。既存のweekly-blogをNext.jsとSupabaseへ移行する際、下書きの受信と公開の間にレビュー段階を追加しました。',
    }}
    role={{ ko: '개인 프로젝트 · 설계, 개발, 운영', en: 'Personal project · Design, development and operation', ja: '個人開発・設計、開発、運用' }}
    stack={['Next.js 16', 'TypeScript', 'Supabase', 'Vercel', 'OAuth / MCP']}
    links={[{ href: 'https://github.com/issac-52/weekly-blog', label: { ko: 'GitHub', en: 'GitHub' } }]}
  >
    <Section title={{ ko: '업무 흐름', en: 'Workflow', ja: '業務フロー' }}>
      <Flow steps={[
        { ko: 'ChatGPT에서 쓴 초안이 OAuth로 보호된 MCP/API로 들어옴', en: 'Drafts written in ChatGPT arrive through an OAuth-protected MCP/API', ja: 'ChatGPTで書いた下書きがOAuthで保護されたMCP/API経由で届く' },
        { ko: '검토 대기 상태로 저장', en: 'Saved in a pending-review state', ja: 'レビュー待ちとして保存' },
        { ko: '관리자가 출처 접근과 원문을 확인하고 체크리스트 작성', en: 'An administrator checks sources and originals and completes the checklist', ja: '管理者が出典と原文を確認し、チェックリストを完了' },
        { ko: '승인한 글만 공개 발행', en: 'Only approved articles are published', ja: '承認した記事のみ公開' },
        { ko: '수정과 상태 변경을 이력으로 기록', en: 'Edits and status changes are recorded', ja: '編集とステータス変更を履歴に記録' },
      ]}/>
    </Section>

    <Section title={{ ko: '시스템 구성', en: 'Architecture', ja: 'システム構成' }}>
      <Diagram
        path={[
          { name: 'ChatGPT', role: { ko: '초안 작성', en: 'Draft writing', ja: '下書き作成' } },
          { name: 'MCP / API', role: { ko: 'OAuth 인증 · 초안 수신', en: 'OAuth · draft intake', ja: 'OAuth・下書き受信' } },
          { name: 'Next.js', role: { ko: '관리자 화면 · 공개 페이지', en: 'Admin screens · public pages', ja: '管理画面・公開ページ' } },
        ]}
        stores={[
          { ko: 'Supabase PostgreSQL · 기사와 이력', en: 'Supabase PostgreSQL · articles and history', ja: 'Supabase PostgreSQL・記事と履歴' },
          { ko: 'Supabase Auth · 관리자 허용 목록', en: 'Supabase Auth · admin allowlist', ja: 'Supabase Auth・管理者許可リスト' },
          { ko: 'Vercel · 배포', en: 'Vercel · hosting', ja: 'Vercel・デプロイ' },
        ]}
        caption={{ ko: '공개 조회 API는 발행된 글만 돌려줍니다.', en: 'Public read APIs return published articles only.', ja: '公開APIは公開済みの記事だけを返します。' }}
      />
    </Section>

    <Section title={{ ko: '왜 이렇게 선택했나', en: 'Why these choices', ja: 'なぜこの選択をしたか' }}>
      <Choices items={[
        {
          choice: { ko: '글은 ChatGPT에서 쓰고, 사이트는 초안만 받기', en: 'Write in ChatGPT; the site only receives drafts', ja: '記事はChatGPTで書き、サイトは下書きを受け取るだけ' },
          over: { ko: '사이트가 유료 LLM API와 예약 작업으로 직접 생성', en: 'the site calling a paid LLM API on a schedule', ja: 'サイトが有料LLM APIと定期実行で直接生成' },
          why: { ko: '유료 API 호출과 예약 생성 코드를 없애 비용이 들지 않습니다. 연결 도구는 초안 생성만 할 수 있고 승인·발행 권한이 없어서, 사람이 검토하기 전에는 아무것도 공개되지 않습니다.', en: 'Removing paid API calls and scheduled generation removes that cost. The connected tool can only create drafts, with no approve or publish permission, so nothing goes public before a person reviews it.', ja: '有料APIの呼び出しと定期生成のコードをなくしたため、費用がかかりません。連携ツールは下書きの作成しかできず承認・公開の権限がないので、人が確認する前には何も公開されません。' },
          cost: { ko: 'ChatGPT 연결을 위해 OAuth 서버 설정이 필요하고, 사용한 Supabase 기능은 아직 베타입니다.', en: 'The ChatGPT connection needs an OAuth server setup, and the Supabase feature it uses is still in beta.', ja: 'ChatGPT連携のためにOAuthサーバーの設定が必要で、使っているSupabaseの機能はまだベータです。' },
        },
        {
          choice: { ko: 'Supabase Auth + 관리자 이메일 허용 목록', en: 'Supabase Auth with an admin email allowlist', ja: 'Supabase Auth＋管理者メールの許可リスト' },
          over: { ko: '공개 회원가입과 역할 관리', en: 'public sign-up with role management', ja: '一般会員登録とロール管理' },
          why: { ko: '쓰기 권한이 필요한 사람은 관리자뿐이라, 가입 기능 없이 허용 목록에 있는 계정만 관리 화면에 들어오게 했습니다.', en: 'Only administrators need write access, so there is no sign-up; only allowlisted accounts reach the admin screens.', ja: '書き込み権限が必要なのは管理者だけなので、登録機能を置かず、許可リストにあるアカウントだけが管理画面に入れるようにしました。' },
        },
      ]}/>
    </Section>

    <Section title={{ ko: '설계에서 중요하게 본 것', en: 'Key design decisions', ja: '設計で重視したこと' }}>
      <Decisions items={[
        {
          title: { ko: '자동 생성 글도 사람이 승인한다', en: 'Generated drafts still need a human', ja: '自動生成の記事も人が承認する' },
          body: { ko: '초안은 바로 공개되지 않고 검토 대기로 들어갑니다. 관리자는 내용을 고치거나 반려할 수 있고, 승인한 글만 공개 API에 나타납니다.', en: 'Drafts never go live directly. Administrators can edit or reject them, and only approved articles appear in the public API.', ja: '下書きはすぐには公開されず、レビュー待ちになります。管理者は編集や差し戻しができ、承認した記事だけが公開APIに表示されます。' },
        },
        {
          title: { ko: '재시도해도 중복되지 않는다', en: 'Retries never duplicate', ja: '再送しても重複しない' },
          body: { ko: '주간 실행 키를 멱등 키로 써서, 같은 주의 초안이 다시 들어와도 한 번만 저장됩니다.', en: 'A weekly run key acts as an idempotency key, so a retried submission for the same week is stored once.', ja: '週単位の実行キーを冪等キーとして使い、同じ週の下書きが再送されても一度だけ保存されます。' },
        },
        {
          title: { ko: '자동 확인과 사람의 확인을 나눈다', en: 'Automated checks and human review are separate', ja: '自動確認と人の確認を分ける' },
          body: { ko: '출처 도메인은 관리자 화면에서 추가·수정·비활성화합니다. 출처에 접근되는지는 자동으로, 원문 내용은 사람이 확인합니다.', en: 'Source domains are managed in the admin screen. Reachability is checked automatically; the original content is checked by a person.', ja: '出典ドメインは管理画面で追加・更新・無効化します。到達性は自動で、原文の内容は人が確認します。' },
        },
      ]}/>
      <Prose>{{ ko: '쓰기 기능은 Supabase Auth와 관리자 이메일 허용 목록으로 보호하고, 비공개 배포에는 사이트 접근 비밀번호를 둡니다.', en: 'Writes are protected by Supabase Auth and an admin email allowlist, and the private deployment sits behind an access password.', ja: '書き込みはSupabase Authと管理者メールの許可リストで保護し、非公開環境にはアクセスパスワードを設定しています。' }}</Prose>
    </Section>

  </CaseStudy>;
}
