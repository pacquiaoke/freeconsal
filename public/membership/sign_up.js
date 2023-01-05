import axios from "axios";

const API_URL = 'https://httpbin.org/#/HTTP_Methods/get_get';

export default instance;

function SignUp() {
    alert("メリクリ！！！");
}


// post https://sebs.jp/api/consultant
// リクエストボディ email,password
// レスポンスボディ　なし
//　ステータスコード
//  200　成功
//  400　バリデーションエラー
//  409　メアドが既に存在
//  500 インターナルサーバーエラー