export const alterASICode = (solutionFnBody: string | boolean) => {
  if (typeof solutionFnBody === 'boolean') {
    return;
  }
  return solutionFnBody ? solutionFnBody.replace(/(\w+\(\))/g, '$1;') : '';
};
