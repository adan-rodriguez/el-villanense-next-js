export const getCurrentYear = () => {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  return year;
};
