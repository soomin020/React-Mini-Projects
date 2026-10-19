# DragTrack
> 컨테이너와 카드를 만들고 드래그 앤 드롭으로 옮길 수 있는 간단한 칸반 보드

## 주요 기능
- 컨테이너 추가 / 삭제
- 컨테이너별 카드 추가
- 카드를 같은 컨테이너 안에서 순서 변경, 다른 컨테이너로 이동 (드래그 앤 드롭)

## 기술 스택
- React, Vite
- @hello-pangea/dnd
- CSS (+ MUI Button)

## 구현하면서 배운 점
- 불변성: React state는 직접 수정하지 않고, `[...]` 복사와 `map`/`filter`로 새 배열을 만들어 `setState`에 넘겨야 화면 갱신
- 드래그 앤 드롭 로직: `onDragEnd`의 `source`/`destination`으로 카드를 꺼내서 끼워 넣는 흐름을 구현
- 상태 설계: [어떤 구조로 state를 정했고 왜 그렇게 했는지 한두 줄]
- 모달 재사용: 하나의 Modal 컴포넌트를 props(`title`, `onSubmit`)로 컨테이너/카드 추가에 재사용

## 트러블슈팅
### 1. `Cannot read properties of null (reading 'useId')` 에러로 화면이 비어 있음
- 원인: node_modules에 React가 중복 설치되어, 드래그 라이브러리가 다른 React를 참조함
- 해결: `npm ls react react-dom`으로 중복을 확인하고, `node_modules`와 `package-lock.json`을 지운 뒤 재설치. 상위 폴더에 잘못 설치된 `package.json`도 삭제함
- 배운 점: 에러 메시지는 브라우저 Console에 먼저 나오고, 환경 문제도 코드만큼 자주 원인이 된다

### 2. [카드를 놓았는데 원래 자리로 돌아오는 문제]
- 원인: `onDragEnd`에서 state를 갱신하지 않고 `console.log`만 하고 있었음
- 해결: 컨테이너를 복사한 뒤 `splice`로 이동하고 `setContainers`로 저장
