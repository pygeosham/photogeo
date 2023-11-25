//フォームのスクリプトエディタに以下を貼り付けてください

//ここで e はイベントオブジェクト
//formで送信された内容が{key:value}形式で情報が格納されている
//ここではトリガを「formが送信されたとき」としているので
//eには新しく送信されたのformの内容が格納される

function getFiles(e){

//アクティブなform(このスクリプトが設置されているform)を取得
FormApp.getActiveForm();

//スプレッドシートをIDおよびシートの名前を指定し開く
var sheet = SpreadsheetApp.openById("ここにあなたのspredsheetIDを入力").getSheetByName("ここにあなたのシートの名前を入力");

//最新回答が記録されるスプレッドシートの最終行の情報を取得
var lastrow = sheet.getLastRow();

//タイトル、回答などを取得し変数 itemResponses に格納
var itemResponses = e.response.getItemResponses();

//forms本体でgoogleのアカウントへログインすることを求めているので
//formsを送ったユーザのメールアドレスを取得し変数 userId に格納
var userId = e.response.getRespondentEmail();

//　空の配列を用意
var answers = [];

// フォームの回答を配列でanswersに格納
for(var i in itemResponses){
var itemResponse = itemResponses[i];
answers.push(itemResponse.getResponse())
}

//配列answersの中身をログに出力
Logger.log(answers);

//画像URLが格納されている配列番号をanswers[]の角カッコ内に指定する 
//今回のサンプルにおいてformsでは画像アップロードは2番目の設問として設置されている
//配列内の要素を示すindexは0から始まる。
//ゆえに2番目の設問情報を指定する際には「1」と指定する。
//formsの設問順を変更した場合はそれに合わせて変更する。
//今回のサンプルにおいてforms上でファイルのアップロード数を1個に制限している
//そのため本来繰り返し不要だが，
//# 1個に制限しても配列として記録される
//# 複数投稿を許容するケースに対応
//という理由で繰り返しを行う形で記述しておく
//変数 answer に格納される配列の中身を例を挙げると，
//以下のように配列の要素には 画像のfileIdが格納された配列が記録されている
//[国立競技場, [hogehogehogehogehogehogehogehoge], ACLの試合]

for(var i in answers[1]){

//画像ファイルのIDを取得しfileIdに格納
var fileId = answers[1][i];

//下部で定義されているgetPhotoExif関数を呼び出し画像のExif情報を取得
//->そのなかから場所の情報(location)を取り出し変数exifに格納
//locationには　longitude, latitude, altitude が格納されている
var exif = getPhotoExif(fileId).location;

//変数exifの中身(緯度経度)をログに出力
Logger.log(exif);

//変数exif(緯度経度)に位置情報が格納されていれば
//経度,緯度情報を それぞれ変数longitude,latitude に格納
if(exif != null){
var longitude = exif.longitude;//経度
var latitude = exif.latitude;//緯度
}
}

//緯度,経度のみの配列を作成し 変数 array に格納
var array = [latitude,longitude];

//回答が格納される最後の列の隣の列番号を lastrow, 以降に指定する 
//今回のサンプルにおいてformsの回答が格納されるspredsheetの列は
//タイムスタンプ,タイトル,画像ファイルの指定,解説
//の4つです。ゆえにそのあとの5列目以降に緯度経度情報を格納するため
//sheet.getRange()の2つ目の引数を「5」と指定しています
sheet.getRange(lastrow,5,1,array.length).setValues([array]);
}

//画像からExif情報を取得する関数
function getPhotoExif(fileId) {
 
var file = Drive.Files.get(fileId);
var metaData = file.imageMediaMetadata;
Logger.log(metaData);
return metaData;
}