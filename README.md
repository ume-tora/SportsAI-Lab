# Sports AI Lab ブログ

スポーツとAI技術の融合を探求するブログサイトです。

## 技術スタック

- **Frontend**: Vite + React 19 + TypeScript
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **SEO**: react-helmet-async
- **Deployment**: Cloudflare Pages

## 主な機能

### ✨ 実装済み機能

- 📱 完全レスポンシブデザイン
- 🚀 パフォーマンス最適化（コード分割、画像遅延読み込み）
- 🔍 SEO最適化（構造化データ、メタタグ）
- 📝 Sanity.ioによるコンテンツ管理
- 🏷️ カテゴリとタグによる記事分類
- 👤 著者情報とプロフィール
- ⭐ 注目記事機能
- 📊 記事難易度レベル（初心者/中級者/上級者）
- 🖼️ 画像最適化（WebP対応、レスポンシブ）
- ⚡ APIレスポンスキャッシング

### 🔧 Sanity スキーマ設計（Gemini推奨）

- **Post**: 記事データ（タイトル、内容、画像、難易度等）
- **Category**: カテゴリ（スポーツ種別、AI技術分野）
- **Author**: 著者情報
- **Tag**: タグ管理

## セットアップ

### 1. 依存関係のインストール

```bash
npm install --legacy-peer-deps
```

### 2. 環境変数の設定

`.env`ファイルを作成し、以下の変数を設定：

```bash
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

## パフォーマンス最適化（Gemini連携）

### コード分割
- React.lazyによるページ単位の遅延読み込み
- Suspenseによるローディング状態の管理

### 画像最適化
- Sanity Image URLによる動的リサイズ
- WebP形式対応
- 遅延読み込み（loading="lazy"）
- レスポンシブ画像（srcset）

### キャッシング
- APIレスポンスの5-10分間キャッシング
- 個別記事は長時間キャッシュ

## ディレクトリ構造

```
src/
├── components/
│   ├── layout/          # ヘッダー、フッター、レイアウト
│   ├── blog/            # ブログ関連コンポーネント
│   └── common/          # 共通コンポーネント（SEO、Loading等）
├── pages/               # ページコンポーネント
├── lib/                 # ユーティリティ、Sanity設定
├── utils/               # ヘルパー関数
└── styles/              # スタイル関連
```

## デプロイ

### Cloudflare Pages

GitHub Actionsによる自動デプロイが設定済み。

必要なシークレット：
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`

### 手動デプロイ

```bash
npm run build
```

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# 型チェック
npm run type-check

# Lint
npm run lint
```

## Gemini CLI連携

CLAUDE.mdファイルに記載された指示に従い、「Geminiと相談しながら」という指示があった場合は、Gemini CLIと連携して開発を進めます。

### 連携実績
1. **Sanityスキーマ設計**: Geminiの推奨する正規化設計を採用
2. **パフォーマンス最適化**: コード分割、画像最適化、キャッシング戦略をGeminiと検討

## 今後の拡張予定

- [ ] 検索機能
- [ ] コメント機能
- [ ] ソーシャルシェア
- [ ] PWA対応
- [ ] ダークモード
- [ ] 多言語対応

## ライセンス

MIT License
