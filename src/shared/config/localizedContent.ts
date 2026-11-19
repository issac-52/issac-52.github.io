import { experiences } from '@/entities/experience/model/data';
import { projects } from '@/entities/project/model/data';
import type { Experience } from '@/entities/experience/model/types';
import type { Language } from '@/shared/model/useLanguageStore';

const englishExperience: Record<string, Pick<Experience, 'name' | 'period' | 'role' | 'desc'>> = {
  'exp-0': {
    name: 'MG Credit Information · NCS Modernization TF',
    period: 'Jul 2026 – Present',
    role: 'Java API & Vue Application Development',
    desc: 'Joined a team migrating a PowerBuilder business system to a Java/Vue web application. Analyze existing source code and workflows, and translate requirements from the project manager and business users into APIs and screens.\n\nDevelop and integrate assigned Java APIs and Vue screens using the established project environment and existing database schema.\n\nAnalyzed a shared SQL bottleneck across three parallel queries using EXPLAIN. Identified full table scans on tables with approximately 2.4M and 8.9M estimated rows, and planned a predicate adjustment to use an existing composite index plus a new index for the other table. The individual-query baseline was 55 seconds; a subsequent single-query measurement was approximately 0.041 seconds (not the combined response time of all three queries).',
  },
  'exp-1': {
    name: 'Connectwave · Danawa Division',
    period: '2022 – Mar 2026',
    role: 'Back-office Development · Unified Administration Platform TF',
    desc: 'Developed Java/Spring management APIs, database tables and PHP/Cron batch jobs for product and catalog operations. Extended an existing RabbitMQ consumer with failed-product lookup and compensation logic to address Elasticsearch–Altibase consistency errors.\n\nIn a four-person team, developed the Next.js frontend structure, GraphQL integration, permissions and menu interfaces, and reusable components for a unified Enuri–Danawa administration platform. Configured blue-green deployment for the New Office frontend using Docker Compose, shell scripts and Nginx. Also worked on application delivery integration with GitLab CI/CD, Harbor and ArgoCD, and a shared Storybook environment.',
  },
};
const japaneseExperience: Record<string, Pick<Experience, 'name' | 'period' | 'role' | 'desc'>> = {
  'exp-0': {
    name: 'MG信用情報 · 業務システム刷新TF',
    period: '2026年7月 – 現在',
    role: 'Java API・Vue業務画面開発',
    desc: 'PowerBuilderベースの業務システムをJava / VueのWebアプリケーションへ移行するプロジェクトに参画しています。既存ソースコードと業務フローを分析し、担当APIと画面の開発を行っています。\n\nMySQL 5.7のEXPLAINで並列実行される3本の類似SQLに共通するボトルネックを調査しました。既存複合インデックスの活用と追加インデックスを検討し、単一クエリの実行時間を約55秒から再測定値約0.041秒へ改善しました。3本の合計応答時間とは異なります。',
  },
  'exp-1': {
    name: 'Connectwave · Danawa事業部',
    period: '2022年 – 2026年3月',
    role: 'バックオフィス開発・統合管理プラットフォームTF',
    desc: 'Java / Springによる管理API、DBテーブル、PHP / Cronバッチ処理を開発しました。RabbitMQ Consumerに補償・復旧処理を追加し、ElasticsearchとAltibase間の商品データ整合性の問題に対応しました。\n\n4人のTFではNext.jsベースの統合管理プラットフォームの画面構成、GraphQL連携、権限・メニューUI、共通コンポーネントを担当しました。Docker Compose・Shell・NginxによるBlue-Greenデプロイや、GitLab CI/CD・Harbor・ArgoCDの連携、Storybook共有環境にも取り組みました。',
  },
};
export const getExperiences = (language: Language) => language === 'ja'
  ? experiences.map(item => ({ ...item, ...japaneseExperience[item.id] })) : language === 'en'
  ? experiences.map(item => ({ ...item, ...englishExperience[item.id] })) : experiences;

const englishProjects = {
  'meter-admin': {
    name: 'Field Survey Manager',
    period: 'Live in production · Maintenance',
    role: 'Side project · Client work',
    desc: 'Connects Excel imports, field entry, photos, maps and exports for consumer and valve surveys. Consumer reimports preserve existing survey values, while exports fill the original Excel template. Designed and developed with Claude Code as the primary coding tool; I operate the production service and handle maintenance.',
  },
  'weekly-blog': {
    name: 'Browinfo · Weekly Magazine',
    period: 'Privately deployed · Editorial review in use',
    role: 'Side project',
    desc: 'A weekly magazine where incoming drafts are checked against sources and published after administrator approval. Migrated weekly-blog to Next.js and Supabase, with duplicate-submission protection, source checks and an approval history.',
  },
  'field-work': {
    name: 'Water Operations Manager',
    period: 'MVP implemented · Deployment connected · Performance work',
    role: 'Side project · Client work',
    desc: 'A field operations system covering Excel imports, maps and geocoding, START/END readings, photos, settlement and HWPX exports for roughly 20,000 sites. Built and verified with Codex assistance, with EC2 and Cloudflare integration. Synthetic 20k-site benchmarks document query bottlenecks and before/after results.',
  },
};
const japaneseProjects = {
  'meter-admin': {
    name: '現地調査管理システム', period: '本番運用中・保守', role: '個人開発・受託',
    desc: 'Excelの取り込み、現場での入力、写真、地図、結果出力を一元管理するツールです。再取り込み時にも既存の調査値を保持し、元のExcelテンプレートに結果を出力します。',
  },
  'field-work': {
    name: '水道現場業務管理システム', period: 'MVP実装・性能改善', role: '個人開発・受託',
    desc: '約2万件の対象を想定し、Excel登録、地図・位置情報、検針、写真、精算、HWPX出力を連携する現場向け業務システムです。Java / Spring Boot、React、PostgreSQLを使用しています。',
  },
  'weekly-blog': {
    name: 'Browinfo · 週刊マガジン', period: '非公開デプロイ・承認フロー運用', role: '個人開発',
    desc: '週刊記事の下書きについて出典を確認し、管理者が承認した記事のみを公開するマガジンです。Next.jsとSupabaseで構築し、重複投稿防止、出典確認、承認履歴を実装しました。',
  },
};
export const getProjects = (language: Language) => language === 'ja'
  ? projects.map(item => ({ ...item, ...japaneseProjects[item.id as keyof typeof japaneseProjects] })) : language === 'en'
  ? projects.map(item => ({ ...item, ...englishProjects[item.id as keyof typeof englishProjects] })) : projects;
