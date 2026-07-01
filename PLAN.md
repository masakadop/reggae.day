# レゲエイベント・スケジュールページ 作業計画

このファイルはトークン切れ／セッション断絶後に作業を再開するための作業指示書です。
完了後（全都道府県のデータ整備・サイト公開まで完了した時点）に、このファイルと
`PROGRESS.md` は不要なmdとして削除するコミットを行うこと。

## ゴール（ユーザー指示の要約）

- 47都道府県で**定期開催**されるレゲエミュージックイベントとその会場を調査し、
  - 開催頻度（毎月/隔月/年1回 等）
  - 開催月・曜日（例: 毎月第3土曜）
  - 次回開催日
  を Markdown データとしてまとめる。
- スケジュールページ（一覧）を作成。`docs/index.html` からリンクは張らない。
- 会場・イベントそれぞれに個別ページを作成し、スケジュールページから辿れるようにする。
- 会場ページには住所・公式URLを記載。イベントページにはイベントURLを記載。
  **住所が不定の場合はその旨を明記する**（住所を捏造しない）。
- スケジュールページは **都道府県 / 地方 / 月 / 週** でフィルタリング可能にする。
- データは **Schema.org の `MusicVenue` / `MusicEvent`**（JSON-LD）としてマークアップする。
- **Jekyll** で自動生成する。
- `docs/` 直下は GitHub Pages 用に `.nojekyll` を置いているため、
  Jekyllソースは **別ディレクトリ**（`schedule-src/`）に置き、
  **GitHub Actions** でビルドして `docs/schedule/` に静的出力を書き出す
  （GitHub Pages 自体のJekyll処理とは独立させる）。
- 作業状況を .md に逐次コミット・プッシュしながら進める。
- 完了後、不要な作業用mdを削除するコミットを重ねる。

## データの正確性についての方針（重要）

- **実在しない住所・URL・イベント名を創作しない。** 存在確認できない情報は
  「情報未確認」「要確認」と明記し、確認できたソースがあれば併記する。
- 定期開催の小規模クラブイベントは公開情報が乏しく、確認が難しいものが多い。
  年1回開催の大型フェス・野外イベントなど**情報源が明確なものを優先**して収集し、
  クラブイベント等は分かる範囲で追加していく。
- 47都道府県すべてで実在する定期開催レゲエイベントを見つけられるとは限らない。
  見つからない都道府県は `PROGRESS.md` に「該当イベント未発見」として記録し、
  空データのまま放置しない（スケジュールページ側で「開催情報なし」等の表示にする）。

## ディレクトリ構成

```
reggae.day/
├── docs/                      # GitHub Pages 公開ディレクトリ（.nojekyll、既存。触らない）
│   ├── index.html
│   ├── og-card.jpg
│   ├── CNAME
│   ├── .nojekyll
│   └── schedule/              # ← GitHub Actionsが生成した静的HTMLの出力先（自動生成・要gitignore対象外でコミットする）
├── schedule-src/               # ← Jekyllソース（新規）
│   ├── _config.yml
│   ├── Gemfile
│   ├── _venues/                # 会場コレクション（1会場1ファイル）
│   ├── _events/                # イベントコレクション（1イベント1ファイル）
│   ├── _layouts/
│   │   ├── default.html
│   │   ├── schedule.html       # スケジュール一覧ページ用
│   │   ├── venue.html          # 会場個別ページ用（MusicVenue JSON-LD）
│   │   └── event.html          # イベント個別ページ用（MusicEvent JSON-LD）
│   ├── _includes/
│   │   ├── jsonld-venue.html
│   │   └── jsonld-event.html
│   ├── _data/
│   │   └── prefectures.yml     # 47都道府県と地方区分のマスタデータ
│   ├── assets/
│   │   ├── schedule.css
│   │   └── schedule.js         # フィルタリング(都道府県/地方/月/週)ロジック
│   └── index.md                 # スケジュールページ本体
├── .github/workflows/
│   └── schedule-pages.yml      # schedule-src/変更時にJekyllビルド→docs/schedule/へ出力しコミット
├── PLAN.md                     # このファイル（完了後削除）
└── PROGRESS.md                 # 47都道府県ごとの調査進捗（完了後削除）
```

## GitHub Actions ワークフローの設計

- トリガー: `push` かつ `paths: ["schedule-src/**", ".github/workflows/schedule-pages.yml"]`
  （`docs/schedule/**` への書き戻しコミットが再度ワークフローを起動しないようにするため）
- ビルド: `schedule-src/` で `bundle exec jekyll build -d ../_site_schedule`
- 出力: `_site_schedule` の中身を `docs/schedule/` に同期（rsync --delete）
- コミット: 変更があれば `docs/schedule/` を `git add` して
  `git commit -m "chore: rebuild schedule pages [skip ci-src]"` し、
  対象ブランチへ `git push`
- 権限: `permissions: contents: write` を workflow に付与
- ブランチ: 現在の作業ブランチ（`claude/reggae-day-countdown-w8dobl`）およびmainマージ後を想定。
  ワークフローファイル自体は汎用的に「pushされたブランチに書き戻す」設計にする。

## Schema.org マークアップ方針

- 会場ページ（venue）: `MusicVenue`
  - `name`, `address`(`PostalAddress` or 不定の場合は説明文のみ), `url`, `geo`(分かれば), `telephone`(分かれば)
- イベントページ（event）: `MusicEvent`
  - `name`, `location`(会場へのリンク/MusicVenue参照), `startDate`(次回開催日が分かる場合), `eventSchedule`または`description`内に頻度を明記, `url`
  - Schema.orgの`Event`には繰り返しルールの正式プロパティが限定的なため、
    `description`に人間可読な頻度（例:「毎月第3土曜開催」）を明記し、
    `startDate`は次回判明分のみ設定する（不明なら省略）。

## フィルタリングUI方針

- ビルド時に全イベント/会場情報を1つの `schedule.json`（Jekyllのdataファイル的ページ）として出力
- クライアントサイドJS（`schedule.js`）で
  - 都道府県セレクト
  - 地方（8地方区分: 北海道/東北/関東/中部/近畿/中国/四国/九州・沖縄）セレクト
  - 開催月セレクト（1-12月、不明含む）
  - 開催曜日/週セレクト
  を用いて `#schedule-list` をフィルタ表示する。外部ライブラリ不使用（軽量・オフライン動作）。

## 作業再開手順（トークン切れ後）

1. `git log --oneline -20` で直近のコミットを確認
2. 本ファイル `PLAN.md` と `PROGRESS.md` を読む
3. `PROGRESS.md` で未着手/未完了の都道府県から調査を再開
4. `schedule-src/` の既存ファイルを確認してから追記（上書き注意）
5. データ追加後は必ず `bundle exec jekyll build`（あるいはGitHub Actionsに任せる）で
   ビルドが通ることを確認してからコミット・プッシュ
6. 全47都道府県の調査状況が確定したら、スケジュールページ・フィルタ動作を確認し、
   最後に `PLAN.md` / `PROGRESS.md` を削除するコミットを行う
