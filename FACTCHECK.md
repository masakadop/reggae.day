# ファクトチェック記録

## 全体カバレッジ（2026-07-01時点、57イベント中）

| 項目 | 件数 | 備考 |
|---|---|---|
| 画像URL (`image_url`) | 25件 | すべてHTTP到達性・Content-Type: image/*を検証済み |
| 主催団体名 (`organizer_name`) | 17件 | |
| 主催者URL/SNS (`organizer_url`/`organizer_sns`) | 16件 | |
| 過去開催履歴 (`past_events`) | 29件 | 各エントリに情報源URLを付記 |

画像URLが未設定のイベント・会場は、テンプレート側のフォールバック処理により
サイト共通画像 `https://reggae.day/og-card.jpg` が表示される（意図した挙動）。
主催団体・過去開催履歴が未設定の項目は、複数回の調査でも情報を確認できなかった
ことを意味する（下記「調査したが情報を確認できなかった項目」参照）。捏造は一切行っていない。

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

### 追加調査（サブエージェントによるWeb調査、2026-07-01実施）分の画像URL検証

| slug | 画像URL | 検証結果 | 判定 |
|---|---|---|---|
| chiba-jouvert-in-japan | https://static.wixstatic.com/media/4f46bb_.../4f46bb_...png | 200 image/png | 確認済み（ただし2019年版の画像である可能性あり、要留意） |
| chiba-yachirock-movement | https://yachirock.com/img/title.jpg | 200 image/jpeg | 確認済み |
| fukuoka-irie-music-with-jim-beam-summer-fes | https://lovefm.co.jp/jbsf/assets/img/2025.jpg | 200 image/jpeg | 確認済み |
| ishikawa-one-peace-ishikawa | https://www.redsun-knzw.com/cms/.../ONE-PEACE-ISHIKAWA.jpg | 200 image/jpeg | 確認済み |
| kanagawa-yokosuka-reggae-bash | https://yokosukareggaebash.com/img/ogp.png | 200 image/png | 確認済み（公式ドメインは`.com`と`.site`の2つが存在。`official_url`はフェーズ1で検証済みの`.site`を維持し、画像は`og:image`が確認できた`.com`のものを採用） |
| osaka-highest-mountain | https://graph.facebook.com/highestmountain.jp/picture?type=large | 200 image/jpeg（302経由でFacebook CDNへリダイレクト） | 確認済み。Facebook Graph APIのプロフィール画像エンドポイントは恒久的に有効なため、署名付きCDN URLではなくこのエンドポイントURL自体を採用 |
| shiga-irie-run-festival | https://takashima.city/wp-content/.../dl_img_001_...png | 200 image/png | 確認済み（高島市公式サイト掲載のチラシ画像） |
| tokyo-reggae-super-power | https://seata.jp/img/origin/2171334-S__32956493_0png.png | 200 image/png | 確認済み（会場・吉祥寺CLUB SEATA公式サイト掲載画像） |
| tokyo-the-do-over-tokyo | https://thedoover-jpn.net/wp/wp-content/.../DoTokyo2026_main.jpg | 200 image/jpeg | 確認済み |
| wakayama-yardman-vibes | https://www.jah-works.com/8-2019.04.jpg | 200 image/jpeg | 確認済み（主催JAH WORKS公式サイト内画像。イベント専用画像か断定はできないが、同一団体・同一テーマの画像であり誤りではない） |

### 検証したが不採用（不安定・信頼性の懸念により見送り）

| slug | 候補URL | 理由 |
|---|---|---|
| mie-2525-music-fes | Instagram CDN経由の署名付きURL | HTTP 200を確認したが、Instagram CDNの署名付きURLは期限切れで将来アクセス不能になる可能性が高いため不採用。サイト共通画像にフォールバック |

---

## 主催団体・過去開催履歴の検証ログ

2026-07-01、サブエージェントによるWeb検索・公式サイト・SNS調査で40イベント分の
主催団体・過去開催履歴を調査。断定できない項目はすべて「不明」として不採用とし、
front matterには記載していない（`organizer_name`等のフィールド自体を設定しない）。

採用した主催団体・過去開催履歴は、各イベントのfront matter (`organizer_name`,
`organizer_url`, `organizer_sns`, `past_events`) および `sources` に情報源URLとともに
記載済み。個別の情報源URLは各イベントの `.md` ファイルを参照。

### 要注意（矛盾・未確定の可能性がある情報）

- **kyoto-energy-camp / nara-energy-dance**: 開催頻度説明文に「2026年で20周年」と
  記載しているが、これは元情報源（REGGAE LIFE「全国のレゲエイベント」）の
  イベント副題「-sound energy 20th anniversary year-」をそのまま引用したもの
  （出典: https://reggaelife.jp/calendar/events.pl/area/0/）。追加のサブエージェント調査では、
  「SOUND ENERGY」の活動記録は2010年の開催情報が最古参照であり、周年表記との
  整合性を独立に裏付ける情報源は見つからなかった。虚偽の可能性は低いと考えられるが
  （イベント主催者自身が公表した副題であるため）、複数情報源による相互確認はできて
  いない点に留意。
- **kagoshima-both-wings**: 元情報源（REGGAE LIFE）には「鹿児島市中町1-2 ニュー中町ビル」
  「TEL: 099-227-7400」という具体的な住所・電話番号（099は鹿児島の市外局番）が
  記載されており、実在する鹿児島の会場・イベントである可能性が高い。
  一方、サブエージェント調査では「TRENCH TOWN」という名称が大阪のサウンドクルー
  「BAGDAD CAFE THE trench town」（MEETS THE REGGAE主催）と類似しており、
  独立した裏付け情報は見つけられなかった。「Trench Town」はジャマイカ・キングストンの
  地名に由来し、レゲエ文化圏で会場名やクルー名として世界的に広く使われる語であるため、
  大阪の団体と無関係に鹿児島に同名の会場が存在する可能性は十分にある。
  現時点では元情報源の具体的な住所・電話番号を優先し、データはそのまま維持している。
- **wakayama-yardman-vibes**: 採用した画像はJAH WORKS公式サイト内の2019年頃の
  ページに掲載されている画像であり、2026年開催回専用の画像である保証はない。
  同一主催団体・同一テーマの画像として採用。

### 調査したが情報を確認できなかった項目（不採用・記載なし）

以下は、公式サイト・SNS・Web検索を複数回試みたが、画像・主催団体・過去開催履歴の
いずれも確認できる情報源を発見できなかったイベント。front matterには該当フィールドを
追加しておらず、捏造は行っていない。

- **ehime-uwajima-up**（UWAJIMA UP、愛媛県）: 情報が非常に少ないローカルイベント。
  主催団体・過去開催履歴とも不明。
- **fukui-liberty-jam**（LIBERTY JAM、福井県）: 検索では無関係なイベントのみヒット。
  主催団体・過去開催履歴とも不明。
- **gifu-afrobeats-reggae-sounds-festival**（岐阜県）: 該当情報を発見できず。
  海外の同名イベントのみヒット。
- **okinawa-reggae-lounge**（REGGAE LOUNGE、沖縄県）: 会場「ダンスホール酒場サンキュー」の
  SNSは確認できたが、イベント固有の主催団体・過去開催履歴は確認できず。
- **nagasaki-vibes-weekend**（Vibes Weekend、長崎県）: 「VIBES GROUP」というアカウント名の
  存在のみ確認。イベント固有の主催団体・過去開催履歴は確認できず。
- **gifu-afrobeats-reggae-sounds-festival, aichi-zumzum-kitchencar-fes以外の一部イベント**
  についても、画像URLのみ確認でき主催団体・履歴が不明なもの、逆に主催団体は判明したが
  画像・履歴が不明なものが複数ある。詳細は各イベントのfront matterに反映済みの
  フィールドの有無で判別できる（未設定フィールド＝未確認）。

---

## 未検証・調査継続中の項目

以下は本ファイル作成時点でまだ画像URL・主催団体・履歴を調査中の項目。
別セッション（サブエージェント）による調査結果を追記予定。

- 残りのイベント約40件・会場約50件について、公式サイト/SNSからの画像・
  主催団体・過去開催履歴の調査を継続中。
