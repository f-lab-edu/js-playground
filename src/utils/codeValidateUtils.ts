export const validateUserCode = (userCode: string) => {
  const solutionStartRegex = /function\s+solution\s*\(\)\s*{/;
  const match = userCode.match(solutionStartRegex);
  if (!match) {
    alert('solution 함수를 정의하세요.');
    return false;
  }
  const startIdx = match.index! + match[0].length;
  let braceCount = 1;
  let endIdx = startIdx;
  while (braceCount > 0 && endIdx < userCode.length) {
    const char = userCode[endIdx];
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;
    endIdx++;
  }
  if (braceCount !== 0) {
    alert('중괄호의 짝이 맞지 않습니다.');
    return false;
  }
  const codeInsideSolution = userCode.slice(startIdx, endIdx - 1).trim();
  const codeOutsideBeforeSolution = userCode.slice(0, match.index).trim();
  const codeOutsideAfterSolution = userCode.slice(endIdx).trim();
  if (codeOutsideBeforeSolution || codeOutsideAfterSolution) {
    alert('함수 내부에만 코드를 입력 해주세요.');
    return false;
  }
  if (!codeInsideSolution) {
    alert('함수에 값이 없습니다.');
    return false;
  }
  return codeInsideSolution;
};
