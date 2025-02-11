export const alterASICode = (solutionFnBody: string | null) => {
  return solutionFnBody ? solutionFnBody.replace(/(\w+\(\))/g, '$1;') : '';
};
