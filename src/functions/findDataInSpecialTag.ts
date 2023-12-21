/**
 * Looks through tags from Labrador and extracts
 * data where the tag is in the format "tagname:data"
 */

/** this funnctions needs to look through all tags in a comma separated list and return the first instance that includes the tag given in format tagname:tagdata */
export function findDataInSpecialTag(tags: string, tagname: string) {
  const foundTag = tags
    .split(', ')
    .find((tag) => tag.indexOf(tagname + ':') > -1);
  if (!foundTag) return null;
  return foundTag.split(tagname + ':')[1];
}
