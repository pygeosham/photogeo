# photogeo 

## ジオタグ付き画像を投稿すると結果がwebmapに表示される..というものを GoogleForms & Google Spredsheet を用いて作成したものです

+ **作成の目的：** 画像撮影 → webmap化をリアルタイムで実現したい
+ **想定するユーザ：** google forms をつくれるよ,ってぐらいのPCユーザ
+ **考えられる用途：** 位置情報を伴う各種のフィールド調査の報告やマッピングを伴うイベント
+ **処理の流れ：**
  + **1)** GoogleFormsに**photogeo_from_gforms.gs** を仕込むことで，投稿されたジオタグ付き画像から位置情報を抽出する
  + **2)** 1)の投稿結果を位置情報とともにgoogle spredsheetに記録する
  + **3)** 2)を参照した leaflet ベースの webmap を **map_from_gsheet.html** で表示する 
  + **注意：** googleのアカウントにログインしたのち投稿するので**投稿画像のファイル名には投稿ユーザ名がサフィックスとして付与されます**。
    + こんな感じ → hogehoge_**username**.jpg

---

## photogeo_from_gfroms.gs
### GoogleForms からジオタグ付き画像を投稿し Google Spredsheet に位置情報(lat,lon)を格納
+ Google forms に GASを組み込んで実施
+ 元ネタは[この記事](https://hikari-program.com/solution/gasformexif/)
+ Google Forms は作ったことがあるけど、プログラミングはやったことがないよ！という方に向けた[具体的な手順解説](https://docs.google.com/document/d/1tZMw2GTCDKRR44Gd37sZbj4H_NW8Sob_rvwe_IbeJOw/edit?usp=sharing)
  + (ここにかいてもよかったけどせっかくだからgoogle縛りにしてみました)

---

## map_from_gsheet.html & constans.js
### Google Spredsheet に格納された位置情報(lat,lon)と各種の情報をもとに webmap にプロット
+ leaflet & OSM で作成
+ 元ネタは[この記事](https://qiita.com/marronest/items/4dcd753fb2b23f31666e)
+ photogeo_from_gfroms.gs の手順書に従って作成した forms や spredsheet に合わせて作成してあります
+ constants.js にformsやspredsheetの設定を記述してからお試しください。
+ Google Sheets API のみを利用します(Google Maps 関連の機能は使用しません)
  + APIの取得手順は近日中にアップします

公開日：2023/11
