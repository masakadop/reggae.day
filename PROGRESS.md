# フェーズ2 作業進捗（画像・SNSタグ・履歴・主催団体・ファクトチェック）

凡例: 画像=image_url設定, 主催=organizer情報, 履歴=past_events, FC=ファクトチェック記録
すべて `未` / `済` / `該当なし` で管理する。

最終更新: 2026-07-01（フェーズ2開始時点）

## サイト全体（インフラ）進捗

- [x] `_layouts/venue.html` にOGP/Twitter Card追加
- [x] `_layouts/event.html` にOGP/Twitter Card追加（過去開催履歴セクション含む）
- [x] `_includes/jsonld-venue.html` に `image` 追加
- [x] `_includes/jsonld-event.html` に `image` 追加
- [x] ローカルビルド確認（警告なし）
- [x] GitHub Actions成功確認（継続success）
- [x] ライブサイトでのカード表示・タグ検証（第三者クローラー Microlink で画像解決・JSON-LD構文を確認、フォールバックも正常動作を確認）
- [x] 全項目完了後、PLAN.md / PROGRESS.md 削除コミット（FACTCHECK.mdは残す）

## イベント別 進捗（57件）

| # | 都道府県 | イベント | 画像 | 主催 | 履歴 | FC |
|---|----------|----------|------|------|------|----|
| 1 | 愛知県 | MOA FES (aichi-moa-fes) | 済 | 未 | 未 | 未 |
| 2 | 愛知県 | ZUMZUM KITCHENCAR FES (aichi-zumzum-kitchencar-fes) | 不明 | 済 | 済 | 未 |
| 3 | 秋田県 | OMOFES (akita-omofes) | 済 | 未 | 未 | 未 |
| 4 | 千葉県 | J’ouvert in Japan (chiba-jouvert-in-japan) | 済 | 済 | 済 | 未 |
| 5 | 千葉県 | YACHIROCK MOVEMENT (chiba-yachirock-movement) | 済 | 済 | 済 | 未 |
| 6 | 愛媛県 | UWAJIMA UP (ehime-uwajima-up) | 不明 | 不明 | 不明 | 未 |
| 7 | 福井県 | LIBERTY JAM (fukui-liberty-jam) | 不明 | 不明 | 不明 | 未 |
| 8 | 福岡県 | IRIE MUSIC with JIM BEAM SUMMER FES (fukuoka-irie-music-with-jim-beam-summer-fes) | 済 | 済 | 済 | 未 |
| 9 | 福岡県 | ROOTS FESTIVAL (fukuoka-roots-festival) | 済 | 未 | 未 | 未 |
| 10 | 福島県 | MUSIC FESTIVAL 新時代 (fukushima-music-festival) | 済 | 未 | 未 | 未 |
| 11 | 岐阜県 | AFROBEATS &REGGAE SOUNDS FESTIVAL (gifu-afrobeats-reggae-sounds-festival) | 不明 | 不明 | 不明 | 未 |
| 12 | 群馬県 | 雷音フェス (gunma-event-10) | 済 | 未 | 未 | 未 |
| 13 | 広島県 | SHIMANAMI Beach FES (hiroshima-shimanami-beach-fes) | 不明 | - | 済 | 未 |
| 14 | 北海道 | 室蘭SUPER BASH (hokkaido-super-bash) | 不明 | - | 済 | 未 |
| 15 | 兵庫県 | AWAJI PARKING FESTIVAL (hyogo-awaji-parking-festival) | 済 | 未 | 未 | 未 |
| 16 | 兵庫県 | 播州ごじゃフェス (hyogo-event-19) | 不明 | - | 済 | 未 |
| 17 | 兵庫県 | 肉レゲエフェスティバル〜加古川〜 (hyogo-event-20) | 不明 | - | 済 | 未 |
| 18 | 兵庫県 | 姫路お城まつり サウンドフェスティバル (hyogo-event-38) | 不明 | 済 | 済 | 未 |
| 19 | 兵庫県 | ONE LOVE KAKOGAWA (hyogo-one-love-kakogawa) | 済 | 未 | 未 | 未 |
| 20 | 兵庫県 | SWEET RIVER ROCK (hyogo-sweet-river-rock) | 不明 | - | 済 | 未 |
| 21 | 茨城県 | 日立音楽祭 (ibaraki-event-5) | 済 | 未 | 未 | 未 |
| 22 | 石川県 | ONE PEACE ISHIKAWA (ishikawa-one-peace-ishikawa) | 済 | - | 済 | 未 |
| 23 | 岩手県 | 奥州岩手ジャマイカフレンドシップフェスティバル (iwate-event-47) | 済 | 未 | 未 | 未 |
| 24 | 香川県 | MARUGAME SEASIDE FEVER (kagawa-marugame-seaside-fever) | 不明 | 済 | 済 | 未 |
| 25 | 鹿児島県 | BOTH WINGS (kagoshima-both-wings) | 未 | 未 | 未 | 未 |
| 26 | 神奈川県 | 渋谷レゲエ祭 (kanagawa-event-9) | 未 | 未 | 未 | 未 |
| 27 | 神奈川県 | YOKOSUKA REGGAE BASH (kanagawa-yokosuka-reggae-bash) | 済 | 済 | 済 | 未 |
| 28 | 熊本県 | DANCEHALL JOURNEY in 阿蘇 (kumamoto-dancehall-journey-in) | 不明 | - | 済 | 未 |
| 29 | 京都府 | ENERGY CAMP (kyoto-energy-camp) | 不明 | 済 | - | 未 |
| 30 | 三重県 | 2525 MUSIC FES (mie-2525-music-fes) | 未 | 未 | 未 | 未 |
| 31 | 宮崎県 | 宮崎シーサイドフェス (miyazaki-event-26) | 不明 | 済 | 済 | 未 |
| 32 | 長崎県 | Vibes Weekend (nagasaki-vibes-weekend) | 不明 | 不明 | 不明 | 未 |
| 33 | 奈良県 | ENERGY DANCE (nara-energy-dance) | 未 | 未 | 未 | 未 |
| 34 | 新潟県 | M Festival (niigata-m-festival) | 未 | 未 | 未 | 未 |
| 35 | 岡山県 | 玉野レゲエ祭 (okayama-event-23) | 済 | 未 | 未 | 未 |
| 36 | 岡山県 | SAVE The TSUYAMA STREET (okayama-save-the-tsuyama-street) | 不明 | - | 済 | 未 |
| 37 | 沖縄県 | REGGAE LOUNGE (okinawa-reggae-lounge) | 不明 | 不明 | 不明 | 未 |
| 38 | 大阪府 | DAISEN MUSIC FESTIVAL (osaka-daisen-music-festival) | 不明 | - | 済 | 未 |
| 39 | 大阪府 | HIGHEST MOUNTAIN (osaka-highest-mountain) | 済 | 済 | 済 | 未 |
| 40 | 大阪府 | ジャマイカフェスティバル レゲエ&キュイジーヌ in 大阪 (osaka-in) | 済 | 未 | 未 | 未 |
| 41 | 大阪府 | MEETS THE REGGAE (osaka-meets-the-reggae) | 不明 | 済 | 済 | 未 |
| 42 | 大阪府 | 二色の浜 SUMMER BEACH BASH (osaka-summer-beach-bash) | 不明 | - | 済 | 未 |
| 43 | 大阪府 | WAH YAH FESTIVAL (osaka-wah-yah-festival) | 済 | 未 | 未 | 未 |
| 44 | 埼玉県 | みど村レゲエ祭 (saitama-event-44) | 不明 | - | 済 | 未 |
| 45 | 埼玉県 | IRIE TIME (saitama-irie-time) | 済 | 未 | 未 | 未 |
| 46 | 滋賀県 | ソトヂカラ (shiga-event-33) | 不明 | - | 済 | 未 |
| 47 | 滋賀県 | 滋賀作 – Irie Run Festival (shiga-irie-run-festival) | 済 | 済 | 済 | 未 |
| 48 | 静岡県 | 宴-en- (shizuoka-en) | 不明 | - | 済 | 未 |
| 49 | 栃木県 | 五龍王祭 DEAL ROCK (tochigi-deal-rock) | 済 | 未 | 未 | 未 |
| 50 | 栃木県 | Splash Mountain (tochigi-splash-mountain) | 不明 | 済 | - | 未 |
| 51 | 東京都 | カリブ・ラテンアメリカストリート (tokyo-event-34) | 不明 | 済 | 済 | 未 |
| 52 | 東京都 | ジャマイカフェスティバル レゲエ&キュイジーヌ in 東京 (tokyo-in) | 済 | 未 | 未 | 未 |
| 53 | 東京都 | REGGAE SUPER POWER キセキ (tokyo-reggae-super-power) | 済 | - | 済 | 未 |
| 54 | 東京都 | The Do-Over Tokyo (tokyo-the-do-over-tokyo) | 済 | 済 | 済 | 未 |
| 55 | 和歌山県 | YARDMAN VIBES (wakayama-yardman-vibes) | 済 | 済 | 済 | 未 |
| 56 | 山形県 | FRIDAY REGGAE LIVE (yamagata-friday-reggae-live) | 不明 | 済 | - | 未 |
| 57 | 山梨県 | BONJOVI盆踊り (yamanashi-bonjovi) | 不明 | - | 済 | 未 |
