-- ============================================================
-- Blue Bridge コーポレートサイト : Supabase スキーマ
-- Supabase ダッシュボードの SQL Editor に貼り付けて実行してください。
-- ============================================================

-- 拡張（uuid 生成用。多くの環境では既定で有効）
create extension if not exists "pgcrypto";

-- ---------- contacts（お問い合わせ） ----------
create table if not exists public.contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  status     text not null default 'new'
             check (status in ('new', 'in_progress', 'done')),
  created_at timestamptz not null default now()
);

-- ---------- works（実績） ----------
create table if not exists public.works (
  id          uuid primary key default gen_random_uuid(),
  tag         text not null,
  title       text not null,
  description text not null,
  created_at  timestamptz not null default now()
);

-- ---------- services（サービス） ----------
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  icon        text not null default '✨',
  title       text not null,
  description text not null,
  created_at  timestamptz not null default now()
);

-- ---------- news（お知らせ） ----------
create table if not exists public.news (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text not null,
  published  boolean not null default true,
  date       date not null default current_date,
  created_at timestamptz not null default now()
);

-- ============================================================
-- RLS（行レベルセキュリティ）
-- 書き込みはサーバーの service_role キー経由のみ。
-- service_role は RLS をバイパスするため、公開用の匿名 SELECT だけ許可し、
-- anon からの書き込みは許可しない（＝ポリシーを作らない）。
-- ============================================================
alter table public.contacts enable row level security;
alter table public.works    enable row level security;
alter table public.services enable row level security;
alter table public.news     enable row level security;

-- 公開サイトが匿名キーで参照する可能性に備え、閲覧のみ許可（任意）
drop policy if exists "public read works" on public.works;
create policy "public read works" on public.works for select using (true);

drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services for select using (true);

drop policy if exists "public read news" on public.news;
create policy "public read news" on public.news for select using (published = true);

-- contacts は匿名での閲覧を許可しない（ポリシー無し = anon から不可）。

-- ============================================================
-- 初期データ（seed）
-- ============================================================
insert into public.services (icon, title, description) values
  ('🧭', 'DXコンサルティング', '現状分析とロードマップ策定を通じて、成果につながるデジタル戦略を描きます。経営と現場の両視点で伴走します。'),
  ('💻', 'システム・アプリ開発', 'Webサービス、業務システム、モバイルアプリを設計から開発まで。アジャイルで素早く価値を届けます。'),
  ('📈', 'グロース支援・運用', 'データ分析と改善施策で、リリース後の成長を継続的にサポート。安定運用と成果最大化を両立します。')
on conflict do nothing;

insert into public.works (tag, title, description) values
  ('Retail', 'ECプラットフォーム刷新', '売上前年比140%を達成した大規模ECサイトのリニューアル。'),
  ('Finance', '業務システム自動化', '手作業を80%削減した基幹業務のデジタル化プロジェクト。'),
  ('Healthcare', '予約アプリ開発', '月間10万件の予約を支えるモバイルアプリの新規開発。')
on conflict do nothing;

insert into public.news (title, body, published, date) values
  ('コーポレートサイトをリニューアルしました', 'この度、株式会社ブルーブリッジのコーポレートサイトを全面リニューアルいたしました。', true, '2026-06-01'),
  ('DX支援サービスの提供を開始しました', '企業のデジタル変革を戦略から運用まで一気通貫で支援する新サービスを開始しました。', true, '2026-05-15')
on conflict do nothing;
