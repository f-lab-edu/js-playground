export const quizData = [
  {
    id: 1,
    title: '첫 번째 퀴즈',
    description: '가데이터로 제공되는 첫 번째 퀴즈 설명입니다.',
    codeTemplate: "function example() {\n  console.log('Hello, world!');\n}",
    answer: 'Hello, world!',
    hint: '코드를 작성하고 결과를 확인하세요.',
    grid: [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 0],
    ],
    startPosition: { x: 0, y: 0 },
    commands: [
      { name: 'forward', animation: 'move-forward' },
      { name: 'shoot', animation: 'shoot-animation' },
    ],
  },
  {
    id: 2,
    title: '조건문과 반복문',
    description: '조건문과 반복문을 사용하여 로직을 구현해봅시다.',
  },
  {
    id: 3,
    title: '함수와 스코프',
    description: 'JavaScript 함수와 스코프에 대해 알아봅시다.',
  },
  {
    id: 4,
    title: 'ES6+ 문법',
    description: '최신 JavaScript 문법(ES6+)을 학습합니다.',
  },
];
