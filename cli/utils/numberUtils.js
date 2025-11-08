export const formatNumber = (num, fixed = 1) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: fixed,
    maximumFractionDigits: fixed,
  });
};
