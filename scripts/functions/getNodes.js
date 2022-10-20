/**
 * Takes a selector and an array of numbered nodes and returns the node for `nodeNumber`.
 */
export function getNodes(selector, nodeNumbersArray) {
  const nodes = [...document.querySelectorAll(selector)];
  let nodeList = nodes.filter((nodeNumber, index) => {
    return nodeNumbersArray.includes(index + 1);
  });
  return nodeList;
}
