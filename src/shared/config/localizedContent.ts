import { experiences } from '@/entities/experience/model/data';
import { projects } from '@/entities/project/model/data';
import type { Experience } from '@/entities/experience/model/types';
import type { Language } from '@/shared/model/useLanguageStore';

const englishExperience: Record<string, Pick<Experience, 'name' | 'period' | 'role' | 'desc'>> = {
  'exp-0': {
    name: 'MG Credit Information · NCS Modernization TF',
    period: 'Jul 2026 – Present',
    role: 'Java API & Vue Application Development',
    desc: 'Joined a team migrating a PowerBuilder business system to a Java/Vue web application. Analyze existing source code and workflows, and translate requirements from the project manager and business users into APIs and screens.\n\nUsed MySQL 5.7 execution plans to identify full table scans and adjusted indexes and predicates. A single SELECT went from 55 seconds to 0.041 seconds on retest.',
  },
  'exp-1': {
    name: 'Connectwave · Danawa Division, Back-office Development Team',
    period: 'Aug 2022 – Mar 2026',
    role: 'Back-office Development · Unified Admin Platform TF',
    desc: 'Maintained core business logic for managing catalogs and products, in Java/Spring and PHP. Built and improved management APIs, database tables and PHP/Cron batch jobs for operations requests.\n\nFrom Jan 2025 to Jan 2026, in a four-person team, developed the frontend structure, member, permission and category screens, and shared components of a Next.js-based unified Enuri–Danawa admin platform. Also worked on GitLab CI/CD, Harbor and ArgoCD delivery and a blue-green deployment setup.',
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
    name: 'Connectwave · Danawa事業部 バックオフィス開発チーム',
    period: '2022年8月 – 2026年3月',
    role: 'バックオフィス開発・統合管理プラットフォームTF',
    desc: 'Java/SpringとPHPで、カタログや商品を管理する中核ビジネスロジックの保守を担当しました。運用要望に合わせて管理API、DBテーブル、PHP/Cronバッチを開発・改善しました。\n\n2025年1月〜2026年1月は4人のTFで、Next.jsベースのエヌリ・ダナワ統合管理プラットフォームのフロントエンド構成、会員・権限・カテゴリ画面、共通コンポーネントを開発しました。GitLab CI/CD・Harbor・ArgoCDのデプロイ連携とBlue-Greenデプロイ構成にも携わりました。',
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
  'ai-native-architecture': {
    name: 'AI-Native Architecture Lab',
    period: 'Research prototype · AI-agent trials not yet run',
    role: 'Personal research',
    desc: 'Implements the same order API in six structures (layered, DDD, hexagonal, vertical slice, modular monolith and domain co-location) and checks in CI that a shared HTTP contract suite passes for all of them. It is groundwork for comparing how code structure affects AI coding agents; so far only file-discovery benchmarks have been measured.',
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
  'ai-native-architecture': {
    name: 'AI-Native Architecture Lab', period: '研究プロトタイプ・AIエージェント実験は未実施', role: '個人研究',
    desc: '同じ注文APIをレイヤード、DDD、ヘキサゴナル、Vertical Slice、モジュラーモノリス、ドメイン中心の6つの構造で実装し、共通のHTTP契約テストで動作が同じかをCIで検証しています。コード構造がAIコーディングエージェントの作業にどう影響するかを比較するための実験基盤で、現時点ではファイル探索のベンチマークのみ測定しています。',
  },
  'weekly-blog': {
    name: 'Browinfo · 週刊マガジン', period: '非公開デプロイ・承認フロー運用', role: '個人開発',
    desc: '週刊記事の下書きについて出典を確認し、管理者が承認した記事のみを公開するマガジンです。Next.jsとSupabaseで構築し、重複投稿防止、出典確認、承認履歴を実装しました。',
  },
};
export const getProjects = (language: Language) => language === 'ja'
  ? projects.map(item => ({ ...item, ...japaneseProjects[item.id as keyof typeof japaneseProjects] })) : language === 'en'
  ? projects.map(item => ({ ...item, ...englishProjects[item.id as keyof typeof englishProjects] })) : projects;
