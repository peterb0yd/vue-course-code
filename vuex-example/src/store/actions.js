export const testAction = ({ commit }) => {
  console.log('test 1');
}

export const testAction2 = ({ commit }) => {
  setTimeout(() => {
    console.log('test 2!');
  }, 500)
}
