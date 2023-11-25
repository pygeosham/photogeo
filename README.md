# photogeo
+ 作成の目的：画像撮影 → webmap化をリアルタイムで実現したい
+ 想定するユーザ：google forms をつくれるよってぐらいのPCユーザ
+ 考えられる用途：位置情報を伴う各種のフィールド調査の報告やマッピングを伴うイベント

## photogeo_from_gfroms.gs
### google forms からジオタグ付き画像を投稿し google spredsheet に位置情報(lat,lon)を格納
+ Google forms に GASを組み込んで実施
+ 元ネタは[この記事](https://hikari-program.com/solution/gasformexif/)

### google spredsheet に格納された位置情報(lat,lon)と各種の情報をもとに webmap にプロット
+ 近日アップ予定

公開日：2023/11/25
