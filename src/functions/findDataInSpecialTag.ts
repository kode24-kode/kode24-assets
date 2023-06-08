/**
 * Looks through tags from Labrador and extracts
 * data where the tag is in the format "tagname:data"
 */
export function findDataInSpecialTag(tag, tagname) {
  if (tag.indexOf(tagname + ':') > -1) {
    return tag.split(tagname + ':')[1];
  }
  return false;
}
