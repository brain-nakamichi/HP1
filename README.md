# Blue Bridge Inc. — コーポレートサイト (Next.js)

単一HTMLだったコーポレートサイトを **Next.js (App Router) + TypeScript** に移植したものです。

## 必要環境

- Node.js 18.18 以降（未インストールの場合は https://nodejs.org からインストール）
- Supabase プロジェクト（データベース）

## セットアップ

### 1. Supabase のテーブル作成

Supabase ダッシュボード → SQL Editor で `supabase/schema.sql` の内容を実行します。
（テーブル作成・RLS 設定・初期データ投入が行われます）

### 2. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成し、値を設定します。

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=（service_role キー）
```

> 値は Supabase ダッシュボード → Project Settings → API から取得できます。
> `service_role` キーは秘匿情報です。サーバー側のみで使用し、公開しないでください。

### 3. 起動

```bash
npm install     # 依存パッケージのインストール
npm run dev     # 開発サーバー起動 → http://localhost:3000
```

その他のコマンド:

```bash
npm run build   # 本番ビルド
npm start       # ビルド結果を起動
```

## 管理画面

- 公開サイト: http://localhost:3000
- **管理画面: http://localhost:3000/admin** （認証なし）

管理画面から編集した内容は、簡易DB（`data/*.json`）に保存され、公開サイトに即時反映されます。

| 画面 | できること |
|---|---|
| ダッシュボード | 各コンテンツ件数・最近のお問い合わせ表示 |
| お問い合わせ | 一覧・詳細・対応状況の更新（未対応/対応中/対応済み）・削除 |
| 実績 | 追加・編集・削除 |
| サービス | 追加・編集・削除 |
| お知らせ | 追加・編集・削除・公開/下書きの切替 |

## 構成

```
app/
  layout.tsx        … 全体レイアウト・メタデータ (<html lang="ja">)
  page.tsx          … トップページ（DBから取得して各セクションを合成）
  actions.ts        … Server Actions（フォーム送信・CRUD）
  globals.css       … 公開サイトのスタイル
  admin/
    layout.tsx      … 管理画面レイアウト（サイドバー）
    admin.css       … 管理画面スタイル
    page.tsx        … ダッシュボード
    contacts/       … お問い合わせ管理
    works/          … 実績管理
    services/       … サービス管理
    news/           … お知らせ管理
components/
  Header / Hero / Services / About / Works / News / CTA / Contact / Footer
  ContactForm.tsx   … 入力フォーム（Server Action で送信）※client
  Reveal.tsx        … スクロール表示アニメーション用ラッパー ※client
lib/
  types.ts          … 型定義
  supabase.ts       … Supabase サーバークライアント（service_role・遅延生成）
  data.ts           … 各コンテンツの取得・更新（Supabase クエリ）
supabase/
  schema.sql        … テーブル定義・RLS・初期データ
.env.local          … Supabase 接続情報（自分で作成。gitignore 済み）
```

## データ構成（Supabase）

| テーブル | 用途 | 主なカラム |
|---|---|---|
| `contacts` | お問い合わせ | name, email, message, status, created_at |
| `works` | 実績 | tag, title, description |
| `services` | サービス | icon, title, description |
| `news` | お知らせ | title, body, published, date |

- 書き込みはすべてサーバー側（Server Action / Server Component）から `service_role` キーで実行します。
- RLS を有効化し、匿名キーからは `works` / `services` / 公開済み `news` の閲覧のみ許可、`contacts` は非公開です。

- インタラクティブな要素（スクロール検知・メニュー開閉・出現アニメ・フォーム送信）は
  `"use client"` を付けたクライアントコンポーネントに分離しています。
- 表示のみのセクションはサーバーコンポーネントのままにし、内容はデータ配列から生成しています。

> ℹ️ 移植前の `index.html` はそのまま残しています。不要になれば削除して構いません。
