# muratamodelと本プログラムについての説明

muratamodelは、村田悠(早稲田大学基幹理工学研究科数学応用数理専攻)@YUU-MURATA 執筆の2024年度修士論文『横断歩道における歩行者対向流の組合せ論的考察』において考案された、歩行者対向流を模式的に表したモデルである。

そしてこのプログラムは、村田修士論文におけるアルゴリズム1「膠着状態の発見」とアルゴリズム5「対向柵の発見」を鈴木彰人氏(早稲田大学基幹理工学部数学科)が実装したものである。

最初にユーザーは横断歩道上の歩行者の配置を自由に定めて入力する。プログラムは「膠着状態の有無の判定」と「対向柵の列挙」を行い、結果は視覚的に色分けされた状態で出力される。

## インストール手順

最初に、このリポジトリをローカルのPCにクローン(もしくはダウンロード)し、murata_model (1)/murata_modelに遷移してください。

次に、index.htmlをGoogle Chromeなどのウェブブラウザで開いてください。

<p align="center">
  <img src="https://github.com/hayamizum/muratamodel/assets/56569115/9a587499-57d4-4d58-a6a4-80bdedc3d185" width="50%">
</p>

上のようなページが出現したら、インストール成功です。

## 使い方
### 歩行者の配置と削除
歩行者の種類をクリックによって選択して、横断歩道上のマス目でもう一度クリックすると歩行者を配置できます。すでに配置した歩行者を消去したい場合、空白地点を表すアイコンをクリックし、消したい歩行者をクリックしてください。

https://github.com/hayamizum/muratamodel/assets/56569115/348d022b-2acb-4a22-938b-32106b43e287

## 機能
### 膠着状態の発見

## 対向柵の発見

<p align="center">
  <img src="https://github.com/hayamizum/muratamodel/assets/56569115/aea945df-52f4-4672-9096-47d3cb4d58c2" width="40%">
  <img src="https://github.com/hayamizum/muratamodel/assets/56569115/4d8ce4f4-4557-4273-ab3d-5c4f254e58a6" width="40%">
</p>


