/**
 * Looks through tags from Labrador and extracts
 * data where the tag is in the format "tagname:data"
 */

export function findTagInCommaSeparatedString(tagString, tagname) {
  const tags = tagString.split(",");
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    if (tag.indexOf(tagname + ":") > -1) {
      return tag.split(tagname + ":")[1];
    }
  }
  return false;
}
