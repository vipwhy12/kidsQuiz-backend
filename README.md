# ReadMe. BackEnd

COVID-19로 인한 유치원에서의 마스크착용으로 아이들의 언어와 인지발달이 늦어진다는 사회적 문제를 개선하고자 생겨난 온라인 화상교육 플랫폼입니다. 선생님이 수업에 필요한 이미지, 퍼즐놀이, 그림 퀴즈, 글자 퀴즈 등 교구를 직접 만들고, 아이들과 마스크 없이 얼굴을 마주하고 직접 만든 교구로 다양한 상호작용을 할 수 있습니다.

# API 명세서

[https://therapeutic-scallion-56a.notion.site/API-2b7695f372834849962a47b45a5ed2c8](https://www.notion.so/API-2b7695f372834849962a47b45a5ed2c8)

| No. | Method | URL | 기능 |
| --- | --- | --- | --- |
| 1 | POST | /login | 로그인 |
| 2 | POST | /join | 회원가입 |
| 3 | GET | /class | 클래스 목록 조회 |
| 4 | POST | /class/new | 신규 클래스 생성 |
| 5 | GET | /class/{id} | id 값을 가진 클래스 정보 조회 |
| 6 | POST | /class/{id} | id 값을 가진 클래스 정보 수정 |
| 7 | DELETE | /class/{id} | id 값을 가진 클래스 정보 삭제 |
| 8 | POST | /class/host?{room} | 사용자가 roomID의 호스트인지 확인 |
| 9 | GET | /class/material/{id} | 라이브 수업 생성시 자료 묶음 반환 |
| 10 | GET | /userInfo | 사용자의 회원정보 조회 |
| 11 | POST | /userInfo | 사용자의 회원정보 수정 |
| 12 | DELETE | /userInfo | 사용자의 회원정보 삭제 |
| 13 | POST | /userInfo/credential | 회원정보 수정 및 탈퇴 |
| 14 | POST | /user/id | 아이디 찾기 |
| 15 | POST | /user/pw | 비밀번호 찾기 |
| 16 | GET | /material | 사용자 만든 교구 조회 |
| 17 | POST | /material/puzzle | 교구 : 퍼즐 생성 |
| 18 | POST | /material/multipleChoice | 교구 : 객관식 생성 |
| 19 | POST | /material/image | 교구 : 이미지 생성 |
| 20 | GET | /classMaterial | 수업별 묶음 리스트 조회 |
| 21 | POST | /classMaterial | 수업별 묶음 자료 생성  |

# DB 스키마 
<img
  src="./스크린샷 2023-02-01 오전 3.09.50.png"
  width="400"
  height="300"
/>
