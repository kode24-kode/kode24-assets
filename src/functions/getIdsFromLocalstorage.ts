export default function getIdsFromLocalstorage<T extends Record<string, any>>(
  objects: T[],
  namespace: string,
  id: keyof T = "id"
): T | null {
  if (!Array.isArray(objects) || objects.length === 0) return null;

  const storageKey = `seen_${namespace}`;
  const seenJson = localStorage.getItem(storageKey);
  const seen: (string | number)[] = seenJson ? JSON.parse(seenJson) : [];

  // if seen is empty, pick a random object and update seen
  if (!seen || !Array.isArray(seen) || seen.length === 0) {
    const newObject = objects.sort(() => Math.random() - 0.5)[0];
    updateSeen(newObject[id], storageKey, []);
    return newObject;
  }

  // check if seen contains all object ids
  const filteredObjects = objects.filter((obj) => !seen.includes(obj[id]));

  // if there are still unseen objects, pick one of them
  if (filteredObjects.length > 0) {
    const newObject = filteredObjects.sort(() => Math.random() - 0.5)[0];
    updateSeen(newObject[id], storageKey, seen);
    return newObject;
    // if we have seen all objects, reset seen and pick a new one
  } else {
    const newObject = objects.sort(() => Math.random() - 0.5)[0];
    updateSeen(newObject[id], storageKey, []);

    return objects.sort(() => Math.random() - 0.5)[0];
  }
}

function updateSeen(
  newObject: string | number,
  storageKey: string,
  seen: (string | number)[]
) {
  seen.push(newObject);
  localStorage.setItem(storageKey, JSON.stringify(seen));
}
