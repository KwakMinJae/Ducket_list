# 프로젝트 명
- 로고와 상징인 오리(Duck) + bucket list
  => Ducket list

## 개발 의도
- react를 활용한 spa프로젝트입니다.
- 로고와 포인트인 Duck과 bucket list를 합쳐서Ducket list라는 페이지를 만들었습니다.
- CRUD를 구현함으로써 컴퓨터 소프트웨어가 가지는 기본적인 데이터 처리 기능을 이해함
- firebase auth와 database를 활용하여 로그인 기능과 데이터 저장 기능 구현하였습니다.
- 웹&앱으로 버킷 리스트를 만들어접근성을 높여 자주 찾아 볼 수 있게 하여 동기부여를 받을 수 있게 만들었습니다.

------------------------------------------------------------------------------------------------------------

###### 실행 방법 ######

# npm install
- 웹팩을 설치해주세요

## .env.local파일 생성
- root 디렉토리에 .env.local 파일을 생성해주세요
  내용은 다음과 같습니다.
  REACT_APP_FB_API_KEY= 파이어베이스 콘솔에서 전달받은 값 입력
  REACT_APP_FB_AUTH_DOMAIN= 파이어베이스 콘솔에서 전달받은 값 입력
  REACT_APP_FB_PROJECT_ID= 파이어베이스 콘솔에서 전달받은 값 입력
  REACT_APP_FB_STORAGE_BUCKET= 파이어베이스 콘솔에서 전달받은 값 입력
  REACT_APP_FB_MESSAGING_SENDER_ID= 파이어베이스 콘솔에서 전달받은 값 입력
  REACT_APP_FB_API_ID= 파이어베이스 콘솔에서 전달받은 값 입력

### npm start
- 로컬에서 볼 수 있습니다.