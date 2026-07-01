# ファクトチェック記録

このファイルは、レゲエイベント・スケジュールページに追加した情報（画像URL・
主催団体情報・過去開催履歴等）について、どのように検証したかを記録するものです。
**完了後も削除せず、エビデンスとして repo に残します。**

検証方針:
- 画像URL: 実際に `curl` でHTTPステータスとContent-Typeを確認し、
  `200 OK` かつ `image/*` であることを確認したもののみ採用。
- 主催団体・過去開催履歴: 公式サイト・公式SNS・第三者の信頼できる記事
  （RAG MUSIC、REGGAE LIFE等）で直接記載を確認できたもののみ採用。
  推測や一般的な相場観による記載は行わない。
- 判定は「確認済み」「推定（根拠あり）」「不明（未採用）」の3種類。

---

## 画像URL 検証ログ（2026-07-01 実施）

### 情報源: 各イベント公式サイトのOGP(`og:image`)を自動抽出→`curl`で到達性確認

検証コマンド例:
```
curl -sS -o /dev/null --max-time 15 -A "<Chrome UA>" -w "%{http_code} %{content_type}" <画像URL>
```

| イベント/会場 slug | 画像URL | 情報源ページ | 検証結果 | 判定 |
|---|---|---|---|---|
| aichi-moa-fes | https://moa-fes.com/wp-content/uploads/2026/05/moafes_2026_ogp.jpg | https://moa-fes.com/ | 200 image/jpeg | 確認済み |
| akita-omofes | https://www.omofes.jp/2026/omofes2026.jpg | https://www.omofes.jp/ | 200 image/jpeg | 確認済み |
| fukuoka-roots-festival | https://static.thebase.in/img/shop/ogp.png | https://rootsfes.official.ec/ | 200 image/png | 確認済み（BASEショップの汎用OGP画像の可能性あり、要留意） |
| fukushima-music-festival | https://shingjidai.com/wp-content/uploads/2026/03/ogp.jpg | https://shingjidai.com/ | 200 image/jpeg | 確認済み |
| gunma-event-10 | https://lionfes.com/wp-content/themes/lionfes/img/common/ogp02.jpg?ver=20250912 | https://lionfes.com/ | 200 image/jpeg | 確認済み |
| hyogo-awaji-parking-festival | https://cdn.peatix.com/event/4869876/cover-yeLWvInQgm33lgZDrzbFVG9GOc6v6ZX5.png | https://parkingawaji.peatix.com/ | 200 image/png | 確認済み（Peatixイベントページのカバー画像） |
| hyogo-one-love-kakogawa | https://harimania.com/wp-content/uploads/2026/06/cropped-cropped-logo6.png | https://harimania.com/event/one-love-kakogawa/ | 200 image/png | 確認済み（掲載サイト「はりまにあ」のロゴ画像。イベント専用画像ではない可能性あり） |
| ibaraki-venue-5 / ibaraki-event-5 | https://hitachi-fes.com/wp-content/uploads/2024/09/eyecatch_black.jpeg | https://hitachi-fes.com/ | 200 image/jpeg | 確認済み |
| iwate-event-47 | https://img2.mypl.net/image.php?id=...&p=s3-img-origin02&s=1000_1000&op= | https://oshu.mypl.net/article/jamaica-fes_oshu | 200 image/jpeg | 確認済み（まいぷれ記事内画像） |
| okayama-event-23 | https://www.oka.town/wp-content/uploads/2026/05/img_4985_720.jpg | https://www.oka.town/events/21537/ | 200 image/webp | 確認済み（玉野市公式サイト） |
| osaka-in / tokyo-in | https://static.wixstatic.com/media/6f23f8_bf6b6ee1633e45afb28ee68bae66010b~mv2.png/... | https://www.jamafes.com/ | 200 image/png | 確認済み（ジャマイカフェスティバル共通バナー） |
| osaka-wah-yah-festival | https://reallifemusic.co.jp/wp-content/uploads/2025/05/reallife_logo.jpg | https://reallifemusic.co.jp/wah-yah-festival-dx/ | 200 image/jpeg | 確認済み（主催「REAL LIFE MUSIC」のロゴ画像） |
| saitama-irie-time | https://static.camp-fire.jp/uploads/project_version/image/1600834/...jpeg | https://camp-fire.jp/projects/953745/view | 200 image/jpeg | 確認済み（CAMPFIREプロジェクトページ画像） |
| tochigi-deal-rock | https://www.nikko-kankou.org/images/ogp.png | https://www.nikko-kankou.org/notices/280 | 200 image/png | 確認済み（日光市観光協会サイトの汎用OGP画像の可能性あり、要留意） |
| kanagawa-club-citta（会場） | https://clubcitta.co.jp/front/common/img/ogp_club.jpg | https://clubcitta.co.jp/ | 200 image/jpeg | 確認済み（CLUB CITTA'公式サイトOGP画像） |

### 検証したが不採用（画像として利用不可）

| slug | 試行したURL | 結果 | 理由 |
|---|---|---|---|
| kanagawa-event-9 | https://shibuyareggaesai.com/2026/assets/images/og-image.png | 302 → text/html | 実際には画像ではなくページへのリダイレクト。og:imageタグの記載ミスの可能性。不採用、サイト共通画像にフォールバック |
| niigata-m-festival | http://static1.squarespace.com/... | 403 text/plain | Squarespace CDNのホットリンク拒否。リファラー付きでも403のため不採用 |
| osaka-daisen-music-festival | https://lh3.googleusercontent.com/sitesv/... | 403 text/html | Google Sites画像はリファラー制限があり直接参照不可。不採用 |

上記3件は `image_url` を設定せず、サイト共通画像 `https://reggae.day/og-card.jpg` に
フォールバックする（テンプレート側の `default` フィルタにより自動処理）。

---

## 主催団体・過去開催履歴の検証ログ

（このセクションは今後の調査結果をもとに随時追記する）

---

## 未検証・調査継続中の項目

以下は本ファイル作成時点でまだ画像URL・主催団体・履歴を調査中の項目。
別セッション（サブエージェント）による調査結果を追記予定。

- 残りのイベント約40件・会場約50件について、公式サイト/SNSからの画像・
  主催団体・過去開催履歴の調査を継続中。
