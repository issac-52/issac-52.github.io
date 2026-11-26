import { CaseStudy, Choices, Decisions, Diagram, Flow, Section } from '@/widgets/case-study/ui/CaseStudy';

export function WeeklyBlogPage() {
  return <CaseStudy
    id="weekly-blog"
    title={{ ko: 'Browinfo · 주간 매거진', en: 'Browinfo · Weekly Magazine', ja: 'Browinfo · 週刊マガジン' }}
    status={{ ko: '공개 운영 중 · browinfo.com', en: 'Live at browinfo.com', ja: '公開運用中・browinfo.com' }}
    summary={{
      ko: 'ChatGPT로 작성한 주간 기사를 받아 출처를 자동으로 검사하고, 통과한 글은 바로 발행하는 매거진입니다. 처음에는 모든 글을 관리자가 승인했지만, 운영해 보니 글마다 수정·출처 재검사·저장·발행을 반복하느라 발행이 밀려서 자동 검사를 통과한 글은 즉시 발행하도록 바꿨습니다.',
      en: 'A weekly magazine that takes articles written in ChatGPT, checks their sources automatically and publishes the ones that pass. Every article used to need administrator approval, but in practice editing, re-checking sources, saving and publishing each one delayed issues, so articles that pass the automated checks now go live immediately.',
      ja: 'ChatGPTで書いた週刊記事を受け取り、出典を自動で検査し、通過した記事をすぐに公開するマガジンです。当初はすべての記事を管理者が承認していましたが、運用してみると記事ごとに修正・出典の再検査・保存・公開を繰り返すために公開が遅れたため、自動検査を通過した記事は即時公開するように変えました。',
    }}
    role={{ ko: '개인 프로젝트 · 설계, 개발, 운영', en: 'Personal project · Design, development and operation', ja: '個人開発・設計、開発、運用' }}
    stack={['Next.js 16', 'TypeScript', 'Supabase', 'Vercel', 'OAuth / MCP']}
    links={[
      { href: 'https://www.browinfo.com/', label: { ko: '사이트', en: 'Website', ja: 'サイト' } },
      { href: 'https://github.com/issac-52/weekly-blog', label: { ko: 'GitHub', en: 'GitHub' } },
    ]}
  >
    <Section title={{ ko: '업무 흐름', en: 'Workflow', ja: '業務フロー' }}>
      <Flow steps={[
        { ko: 'ChatGPT에서 쓴 초안이 OAuth로 보호된 MCP/API로 들어옴', en: 'Drafts written in ChatGPT arrive through an OAuth-protected MCP/API', ja: 'ChatGPTで書いた下書きがOAuthで保護されたMCP/API経由で届く' },
        { ko: '출처 접근, 문단별 근거 표시, 요약·본문 분량을 자동 검사', en: 'Source access, per-section citations and length are checked automatically', ja: '出典へのアクセス、段落ごとの根拠表示、要約・本文の分量を自動検査' },
        { ko: '모두 통과하면 즉시 발행', en: 'Articles that pass are published immediately', ja: 'すべて通過すれば即時公開' },
        { ko: '하나라도 실패하면 검토 대기로 남기고 보류 사유 기록', en: 'Anything that fails waits for review with the reason recorded', ja: '一つでも失敗すればレビュー待ちとし、保留理由を記録' },
        { ko: '발행된 글도 관리자가 반려하면 사이트에서 내려감', en: 'Administrators can still reject a published article to take it down', ja: '公開済みの記事も管理者が差し戻せばサイトから外れる' },
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
          why: { ko: '유료 API 호출과 예약 생성 코드를 없애 비용이 들지 않습니다. 연결 도구에는 승인·발행 도구가 없고, 발행 여부는 서버의 자동 검사가 정합니다.', en: 'Removing paid API calls and scheduled generation removes that cost. The connected tool has no approve or publish tools; the server’s automated checks decide what gets published.', ja: '有料APIの呼び出しと定期生成のコードをなくしたため、費用がかかりません。連携ツールには承認・公開のツールがなく、公開するかどうかはサーバーの自動検査が決めます。' },
          cost: { ko: 'ChatGPT 연결을 위해 OAuth 서버 설정이 필요하고, 사용한 Supabase 기능은 아직 베타입니다.', en: 'The ChatGPT connection needs an OAuth server setup, and the Supabase feature it uses is still in beta.', ja: 'ChatGPT連携のためにOAuthサーバーの設定が必要で、使っているSupabaseの機能はまだベータです。' },
        },
        {
          choice: { ko: '자동 검사를 통과하면 즉시 발행', en: 'Publish immediately when automated checks pass', ja: '自動検査を通過すれば即時公開' },
          over: { ko: '모든 글을 관리자가 승인', en: 'administrator approval for every article', ja: 'すべての記事を管理者が承認' },
          why: { ko: '운영해 보니 글마다 수정, 출처 재검사, 저장, 발행 네 단계를 거쳐야 해서 발행이 계속 밀렸습니다. 사람이 하던 확인 중 기계가 판단할 수 있는 출처 접근·문단 근거·분량만 남기고, 통과한 글은 바로 발행합니다.', en: 'In practice every article needed four steps — edit, re-check sources, save, publish — and issues kept slipping. I kept only the checks a machine can decide (source access, citations, length) and publish whatever passes.', ja: '運用してみると、記事ごとに修正・出典の再検査・保存・公開の4段階が必要で、公開が遅れ続けました。人が行っていた確認のうち機械で判断できる出典へのアクセス・段落の根拠・分量だけを残し、通過した記事はすぐに公開します。' },
          cost: { ko: '사실·맥락·이용 조건을 사람이 보지 않은 글이 공개될 수 있습니다. 그래서 자동 발행에서는 이미지·표를 쓰지 않고 인용을 최소로 하도록 작성 지침을 바꿨고, 문제가 있는 글은 관리 화면에서 반려해 내립니다.', en: 'Articles can go live without a person checking facts, context or usage terms. To limit that, the writing instructions now forbid images and tables and keep quotes minimal, and problem articles are rejected from the admin screen.', ja: '事実・文脈・利用条件を人が確認していない記事が公開され得ます。そのため自動公開では画像や表を使わず引用を最小限にするよう執筆指示を変え、問題のある記事は管理画面で差し戻して取り下げます。' },
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
          title: { ko: '검사를 통과하지 못한 글은 공개하지 않는다', en: 'Nothing that fails the checks goes live', ja: '検査を通過しない記事は公開しない' },
          body: { ko: '출처 링크에 접근할 수 없거나 문단에 출처 표시가 빠졌으면 검토 대기로 남기고, 어떤 검사에서 보류됐는지 기록합니다. 출처로 쓸 수 있는 도메인은 관리 화면에서 추가·수정·비활성화합니다.', en: 'If a source link is unreachable or a section has no citation, the article waits for review with the failed check recorded. Allowed source domains are managed in the admin screen.', ja: '出典リンクにアクセスできない、または段落に出典表示がない場合はレビュー待ちとし、どの検査で保留になったかを記録します。出典に使えるドメインは管理画面で追加・更新・無効化します。' },
        },
        {
          title: { ko: '자동 발행은 켜고 끌 수 있게', en: 'Auto-publish can be switched off', ja: '自動公開はオン・オフできるように' },
          body: { ko: '자동 발행은 환경변수로 켜고 끕니다. 꺼 두면 모든 글이 예전처럼 검토 대기로 들어가고, 초안을 저장하는 DB 함수는 발행 외의 상태를 모두 검토 대기로 저장합니다.', en: 'Auto-publish is controlled by an environment variable. When it is off, every article goes to review as before, and the database ingest function stores any status other than published as review.', ja: '自動公開は環境変数でオン・オフします。オフにするとすべての記事が以前のようにレビュー待ちとなり、下書きを保存するDB関数は公開以外のステータスをすべてレビュー待ちとして保存します。' },
        },
        {
          title: { ko: '재시도해도 중복되지 않는다', en: 'Retries never duplicate', ja: '再送しても重複しない' },
          body: { ko: '주간 실행 키를 멱등 키로 써서, 같은 주의 초안이 다시 들어와도 한 번만 저장됩니다.', en: 'A weekly run key acts as an idempotency key, so a retried submission for the same week is stored once.', ja: '週単位の実行キーを冪等キーとして使い、同じ週の下書きが再送されても一度だけ保存されます。' },
        },
      ]}/>
    </Section>

  </CaseStudy>;
}
