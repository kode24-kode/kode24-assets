/**
 * Algorithm to shuffle array in place (not great)
 * @param {*} array
 */
export function shuffleArray(array: unknown[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // eslint-disable-line no-param-reassign
  }
  return newArray;
}
