export const checkForEnv = (variable: string | undefined) => {
  if (!variable) {
    throw new Error('Missing variable');
  }

  return variable;
};
