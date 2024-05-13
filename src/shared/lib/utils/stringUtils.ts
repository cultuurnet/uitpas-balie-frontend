export const formatUitpasNumber = (uitpasNumber: string | undefined) => {
  if (!uitpasNumber) return "";

  return `${uitpasNumber.slice(0, 4)} 
  ${uitpasNumber.slice(4, 7)} 
  ${uitpasNumber.slice(7, 10)} 
  ${uitpasNumber.slice(10)}`;
};
