# Eslint & Prettier 사용을 위한 초기 세팅하기

## VS code Extention 으로 Eslint 설치하기

---

## npm 으로 Eslint 설치하기

```
  $ npm install -g -d eslint
```

- `-g` : 전역으로 설치
- `-d` : 해당프로젝트에만 설치

---

## 설정파일(.eslintrc.json) 생성하기

```
  $ npm eslint init
```

## 포멧 설정하기

```json
// air-bnb 스타일 적용
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "airbnb-base",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error"
  }
}
```

- `airbnb 스타일` 관련 디펜던시 설치

```
$ npx install-peerdeps --dev eslint-config-airbnb-base
```

## eslint 실행

```
  $ eslint lintTest.js --fix
```

## Prettier 설치

```
  npm install --save-dev --save-exact prettier
```

## eslint 와 prettier 함께 사용하기

> 자바스크립트 문법은 린트가 검사하게 하고 코드 포멧팅은 프리티어에 맞긴다

### 추가 플러그인 설치하기

```
$ npm install eslint-plugin-prettier@latest --save-dev -g
$ npm install --save-dev eslint-config-prettier # prettier와 겹치는 eslint 룰 삭제
$ npm install --save-dev eslint-plugin-prettier # eslint 기본 포맷 대신 프리티어 룰과 동일한 포매팅을 이용함
```

### eslintrc.json 수정하기

```json
{
  "env": {
    "browser": true,
    "node": true,
    //eslint 최신버전으로 업데이트해야 인식함
    "es2020": true
  },
  "extends": [
    "eslint:recommended",
    "airbnb-base",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "rules": {
    //"prettier/prettier": "error"
  }
}
```

## 적용확인하기

```
    $eslint lintTest.js --fix # 린트에 프리티어 확장을 설치한 경우
    $prettier --check . # 프리티어로 체크했을때 문제가 있는 파일 목록 출력
    $prettier --write  test.js # test.js파일을 포맷팅해서 덮어쓴다
```

## .prettierrc 파일 만들기

```json
{
  "singleQuote": true, //싱글쿼트
  "semi": true, //구문 끝 세미콜론
  "trailingComma": "es5", // 키:벨류 뒤 항상 콤마
  "tabWidth": 2, //들여쓰기 간격
  "printWidth": 80, // 코드 한줄이 maximum 80칸
  "arrowParens": "avoid"
  // 화살표 함수가 하나의 매개변수를 받을 때 괄호를 생략하게 formatting
}
```

## eslint 포메팅 기능 끄기( prettier이 전담하도록)

```
  "eslint.format.enable": false
```

## 저장시 자동으로 작동하도록 설정

```json
"editor.formatOnSave": false,
"editor.codeActionsOnSave": {
     "source.fixAll.eslint": true
},
```
