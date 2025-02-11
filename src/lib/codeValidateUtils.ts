export const validateUserCode = (userCode: string, alteredASICode: string) => {
  const solutionRegex = /function\s+solution\s*\(\)\s*{([\s\S]*?)}/;
  const match = userCode.match(solutionRegex);

  const codeOutsideBeforeSolution =
    match && typeof match.index === 'number'
      ? userCode.slice(0, match.index).trim()
      : userCode.trim();

  const codeOutsideAfterSolution = match
    ? userCode.slice((match.index ?? 0) + match[0].length).trim()
    : '';

  if (
    codeOutsideBeforeSolution ||
    codeOutsideAfterSolution ||
    !alteredASICode
  ) {
    if (codeOutsideBeforeSolution || codeOutsideAfterSolution) {
      alert('함수내부에 코드를 입력 해주세요');
      return;
    }
    if (!alteredASICode) {
      alert('코드를 입력해주세요');
      return false;
    }
  }
  return true;
};
