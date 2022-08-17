export const OAUTH_REDIRECT_URI = "http://localhost:3000/"

// 구글 로그인
export const GOOGLE_CLIENT_ID = "385866404278-vjjtkrdekth0ah60nap789n5kugf0ujj.apps.googleusercontent.com";
export const GOOGLE_CLIENT_SECRET = "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";
export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+GOOGLE_CLIENT_ID+"&redirect_uri="+OAUTH_REDIRECT_URI+"&response_type=code"+"&scope=https://www.googleapis.com/auth/userinfo.profile";
// https://accounts.google.com/o/oauth2/v2/auth?client_id=385866404278-vjjtkrdekth0ah60nap789n5kugf0ujj.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:3000/&scope=https://www.googleapis.com/auth/userinfo.profile