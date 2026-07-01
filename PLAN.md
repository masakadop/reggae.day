# レゲエスケジュールページ 拡張作業計画（フェーズ2）

このファイルはトークン切れ／セッション断絶後に作業を再開するための作業指示書です。
完了後（全項目の作業が完了した時点）に、このファイルと `PROGRESS.md` / `FACTCHECK.md` は
**削除しない**（今回はファクトチェックのエビデンスとして`FACTCHECK.md`は残す方針。
`PLAN.md`/`PROGRESS.md`は前回同様、全作業完了後に削除コミットを行う）。

## 対象範囲

フェーズ1（47都道府県レゲエイベント・会場スケジュールページ）は完了・マージ済み
（PR #6）。本フェーズでは既存の `schedule-src/_venues/*.md`（56件）・
`schedule-src/_events/*.md`（57件）に対し、以下を追加する。

1. **サムネイル画像**
   - 会場ページ・イベントページそれぞれに画像を設定。
   - **画像はリポジトリにダウンロードして保持しない。** 公式サイト・公式SNS等で
     見つけた画像の**オリジナルURL**を front matter (`image_url`) に記載し、
     `<meta property="og:image">` 等はそのURLを直接参照する。
   - 画像が見つからない場合は、サイト全体のデフォルトカード画像
     (`https://reggae.day/og-card.jpg`) にフォールバックする。
   - 画像URLが実際に画像として取得できるか（Content-Type: image/*, 200 OK）を検証する。

2. **SNS／検索エンジン向けメタタグ**
   - 各会場・イベントページに Open Graph (`og:title`, `og:description`, `og:image`,
     `og:url` 等) と X (Twitter) Card (`twitter:card=summary_large_image` 等) を設定。
   - `docs/index.html` で使ったパターンを踏襲しつつ、ページごとの内容を反映する。
   - 検索エンジン向けに `meta description` / `canonical` も設定する
     （フェーズ1で `docs/index.html` の canonical はXキャッシュ問題により削除した
     経緯があるため、スケジュール配下のページでは個別ページURLが安定しているため
     canonical を設定してよいか都度検討する。基本的に個別ページは並行して複数の
     クエリパラメータで共有されることは想定しにくいためcanonical設定は許容する）。

3. **カード表示の実機検証**
   - GitHub Pages反映後、ライブページ・画像URLへの到達性、`Content-Type`、
     第三者パーサー（Microlink等）でのメタ抽出結果を確認する。
   - 問題があれば原因を特定し修正する。

4. **過去の開催情報（履歴）の追加調査**
   - 各イベントについて、確認できる限り過去の開催年・回数・日付を調査し、
     イベントページに履歴セクションとして記載する（Schema.orgの`MusicEvent`は
     単一イベントのみを表すため、履歴は本文とfront matterの`past_events`配列で
     人間可読に記載するに留め、JSON-LDは現在/次回開催分のみとする）。
   - 捏造禁止。確認できたものだけ記載し、情報源を明記する。

5. **主催団体情報の追加**
   - 主催団体名、公式サイトURL、SNSリンク（X/Instagram/Facebook等）が判明した場合、
     front matter (`organizer_name`, `organizer_url`, `organizer_sns`) に追加し、
     イベントページに表示する。

6. **ファクトチェック**
   - 追加した情報（画像URL、履歴、主催団体情報等）について、検証した内容と
     判定（確認済み/推定/不明）、情報源URLを `FACTCHECK.md` に記録する。
   - `FACTCHECK.md` は完了後も**削除せず残す**（エビデンスとして）。

## データの正確性についての方針（重要・フェーズ1から継続）

- 実在しない画像URL・団体名・SNSアカウント・過去開催日を創作しない。
- 確認できない場合は該当フィールドを空にし、本文にも記載しない
  （フェーズ1同様、「情報未確認」等の表記でごまかさず、単に記載しないことで
  過剰な断定を避ける）。
- 画像URLは、取得できたページ上で実際にその会場・イベントに対応する画像で
  あることを確認する（無関係な画像を誤って設定しない）。

## ディレクトリ・実装方針

```
schedule-src/
├── _venues/*.md      # image_url, organizer_name, organizer_url, organizer_sns を追加
├── _events/*.md       # image_url, organizer_name, organizer_url, organizer_sns,
│                       # past_events(配列: year, note, source) を追加
├── _layouts/
│   ├── default.html   # 変更なし（個別ページ側でOGP/Twitter Cardブロックをcontentに含める）
│   ├── venue.html      # OGP/Twitter Card追加、image_url表示
│   └── event.html      # OGP/Twitter Card追加、image_url表示、過去開催履歴セクション追加
├── _includes/
│   ├── jsonld-venue.html  # "image"プロパティ追加
│   └── jsonld-event.html  # "image"プロパティ追加
```

- Jekyllの `page.url` は自動生成される予約変数のため、front matter に
  独自の `url` キーは使わない（フェーズ1と同様 `official_url` を使用）。
- og:image / twitter:image は `page.image_url | default: "https://reggae.day/og-card.jpg"`
  のように、個別画像が無い場合はサイト共通画像にフォールバックする。

## 画像調査の情報源候補

- 各イベント・会場の `official_url`（公式サイト）のOGP画像
- 公式X(Twitter)/Instagramのプロフィール画像・投稿画像
- RAG MUSIC / REGGAE LIFE 記事内に掲載されている画像（会場・イベントの外観等）
- 上記で見つからない場合は空欄のままにし、サイト共通画像にフォールバックさせる

## 作業再開手順（トークン切れ後）

1. `git log --oneline -20` で直近のコミットを確認
2. 本ファイル `PLAN.md` と `PROGRESS.md` を読む
3. `PROGRESS.md` で未着手の会場・イベントから作業を再開
4. `schedule-src/` の既存ファイルを確認してから追記（上書き注意）
5. 画像URL追加時は必ず `curl -I` 等で到達性・Content-Typeを確認してから採用する
6. データ追加後は `bundle exec jekyll build` でビルドが通ることを確認してからコミット・プッシュ
7. プッシュ前に必ず `git fetch && git rebase origin/claude/reggae-day-countdown-w8dobl`
   を実行し、GitHub Actionsが生成する `docs/schedule/` コミットと衝突しないようにする
8. 全項目完了したら、ライブサイトでカード表示・タグを最終検証し、
   `FACTCHECK.md` を残したまま `PLAN.md` / `PROGRESS.md` を削除するコミットを行う
