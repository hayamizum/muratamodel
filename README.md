# muratamodelと本プログラムについての説明

muratamodelは、村田悠(早稲田大学基幹理工学研究科数学応用数理専攻、以下村田)@YUU-MURATA 執筆の2024年度修士論文『横断歩道における歩行者対向流の組合せ論的考察』において考案された、歩行者対向流を模式的に表したモデルである。

そして、このプログラムは村田修士論文におけるアルゴリズム1「膠着状態の発見」とアルゴリズム5「対向柵の発見」を鈴木彰人さん(早稲田大学基幹理工学部数学科、以下鈴木さん)が実装したものである。ただし、ReadMeファイルは村田執筆である。

最初にユーザーは横断歩道上の歩行者の配置を自由に定めて入力する。プログラムは「自己占拠集団の有無の判定」と「対向柵の列挙」を行い、結果は視覚的に色分けされた状態で出力される。

# インストール手順

最初に、このリポジトリをローカルのPCにクローン(もしくはダウンロード)し、murata_model (1)/murata_modelに遷移する。

次に、index.htmlをGoogle Chromeなどのウェブブラウザで開く。

<p align="center">
  <img src="https://github.com/hayamizum/muratamodel/assets/56569115/9a587499-57d4-4d58-a6a4-80bdedc3d185" width="50%">
</p>

上のようなページが出現したら、インストール成功である。

# 使い方
## 歩行者の配置と削除
歩行者の種類をクリックによって選択して、横断歩道上のマス目でもう一度クリックすると歩行者を配置できる。すでに配置した歩行者を消去したい場合、空白地点を表すアイコンをクリックし、消したい歩行者をクリックする。

https://github.com/hayamizum/muratamodel/assets/56569115/348d022b-2acb-4a22-938b-32106b43e287

## 横断歩道の大きさの変更
「縦横サイズ変更」の欄で横断歩道の大きさを変更できる。縦と横の長さを自然数値で入力し「反映」ボタンを押すと、横断歩道のサイズは変更される。

>[!CAUTION]
>ただし、すでに入力されている歩行者の配置は保存されない。

## jsonファイルのエクスポートとインポート
「エクスポート」ボタンをクリックすると、ブラウザ上の歩行者の配置をjsonファイルとして保存できる。また、「ファイルを選択」ボタンで選択したjsonファイルを「インポート」ボタンで入力すると、保存時の歩行者の配置が表示される。

>[!CAUTION]
>インポート時点ですでに入力されている歩行者の配置は保存されない。

# 機能
## 自己占拠集団の有無の判定
例として、左図のような歩行者の配置の配置を入力し自己占拠判定ボタンをクリックすると、右図のように自己占拠集団をなす歩行者が薄い黒色に色付けられる。

<p align="center">
  <img src="https://github.com/hayamizum/muratamodel/assets/56569115/c6b0fb41-924a-40bf-a2b5-81aabb55b758" width="40%">
  <img src="https://github.com/hayamizum/muratamodel/assets/56569115/60105f60-90fb-49aa-ae6b-8ddf8c78e7ef" width="40%">
</p>


## 対向柵の列挙
例として、左図のような歩行者の配置の配置を入力し柵判定ボタンをクリックすると、右図のように対向柵が列挙され、上向き柵部分が青に、下向き柵部分が赤に色分けされる。

<p align="center">
  <img src="https://github.com/hayamizum/muratamodel/assets/56569115/aea945df-52f4-4672-9096-47d3cb4d58c2" width="40%">
  <img src="https://github.com/hayamizum/muratamodel/assets/56569115/4d8ce4f4-4557-4273-ab3d-5c4f254e58a6" width="40%">
</p>

# 権利など
このファイルはmuratamodelを利用した学術的な研究において、早水研究室所属の学生のみにとどまらず広く利用されることを願って公開されるものである。

プログラムの改変は、早水研究室所属の教員または学生が行うものとし、学生が改変する場合は指導教員の許可を求めること。ただし、アルゴリズム開発者の村田とプログラム作成者の鈴木さんはその限りでない。

商用利用は不可とする。


