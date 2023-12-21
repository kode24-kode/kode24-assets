/**
 * Looks through tags from Labrador and extracts
 * data where the tag is in the format "tagname:data"
 * this returns several data points in an array
 */
export function findDataInSpecialTags(tags: string, tagname: string) {
  let tagsArray: string[] = tags.split(', ');
  tagsArray = tagsArray.filter(
    (tag) => tag.indexOf(tagname + ':') > -1
  );

  tagsArray = tagsArray.map((tag) => tag.split(tagname + ':')[1]);
  return tagsArray;
}
