export const formatNumber = (num, fixed = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: fixed,
    maximumFractionDigits: fixed,
  });
};
