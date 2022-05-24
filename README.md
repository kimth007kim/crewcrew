# 크루크루(Crewcrew 🧸

<h6 align="center">

<!--   <img alt="banner" src="README_image/team-title.png"> -->

![License](https://img.shields.io/badge/License-MIT-red)
<!-- ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/woowa-techcamp-2021/store-2?color=green&label=Version) -->

</h6>

<h2 align="center">
  <a href="https://crewcrew.org/">🎁 크루크루(웹 어플리케이션)</a>
</h2>
  
<p align="center">취미와 스터디원을 <b>빠르게</b>모집해주는 <b></b> 프로젝트 - 크루크루</p>

## Contributors

| Contributor                              | Role | Introduce        |
| ---------------------------------------- | -------- | ---------------- |
| [김경동](https://github.com/kimth007kim)     | Backend   |        |
| [김도희](https://github.com/Slowth-KIM)   | Backend   |  |
| [이하늘](https://github.com/belowalways) | Backend |     |
| [박한결](http://phk9436.pe.kr/)      | Publisher |      |
| [유재영](http://nicole-yoo.com/) | Designer |    |
| [오주영](https://github.com/ohjooyeong) | Frontend |     |

## Stacks

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Project Structure

<h4 align="center">

</h3>

```
🔥 client🔥
├─src
│ ├─assets (이미지, 폰트 등)
│ ├─atoms (recoil atom)
│ ├─components (컴포넌트)
│ ├─pages (페이지)
│ ├─hooks (커스텀 훅)
│ ├─utils (공통 유틸 함수)
│ ├─index.js
│ ├─index.html
│ └─App.js
├─webpack.config.js
├─package.json
├─jsconfig.json
├─.babelrc
├─.eslintrc.js
└─.prettierrc

🔥 server🔥
├── src
│ ├─config (db설정, dotenv 등)
│ ├─loaders (설정 불러오기)
│ ├─middlewares (미들웨어)
│ ├─routes (라우트)
│ ├─controllers (컨트롤러 / controller)
│ ├─services (데이터 가공 / service)
│ ├─repositories (쿼리문 / dao)
│ ├─models (모델 / dto)
│ ├─validation (req.body query parameter 값 검증)
│ ├─types (ts 공통 타입, 인터페이스)
│ ├─utils (공통되는 작은 함수)
│ │ └─error (에러 처리)
│ └─app.ts
├─package.json
├─tsconfig.json
├─.eslintrc.json
├─.prettierrc
└─.env
```

## Database ERD

![ERD](README_image/ERD.png)

## Getting Started

### Prerequisites

`frontend` 디렉토리의 `.env` 파일을 생성하여 크루크루 api서버와 연결해주세요.(공개 x)

### 웹 어플리케이션

```bash
# Frontend

# Development
$ cd frontend && npm start

# Production
$ cd frontend && npm run build
```

### API 서버

```bash
# Development
?

# Production
?
```

## Preview

### Main Page & Login



### Post Search


### Post Detail



### My Page



### Mobile Also



## See Also

- [WiKi](#)
- [Project Kanban Board](#)
- [Figma](https://www.figma.com/file/rW7LcNcg8OWsfHvWB3gXXp/Untitled)

## LICENSE

[MIT License](#) © 김경동 김도희 이하늘 박한결 유재영 오주영
