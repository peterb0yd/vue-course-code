
export const usedEditGuard = (to, from, next) => {
  console.log('used edit guard!!!');
  next();
}
