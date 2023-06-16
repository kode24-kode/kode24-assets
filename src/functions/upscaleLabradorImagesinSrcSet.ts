/**
 * upscales images from labrador and patches them together again
 */
export function upscaleLabradorImagesinSrcSet(srcSet: string) {
  let sources = srcSet.split(', ');
  sources = sources.filter((source) => source !== '');
  const sourcesMap = sources.map((source) => {
    const urlObject = {
      url: new URL(source.split(' ')[0]),
      width: source.split(' ')[1].replace('w', ''),
    };
    const urlWidth: number =
      parseInt(urlObject?.url?.searchParams?.get('width') || '') ||
      900;
    const urlHeight: number =
      parseInt(urlObject?.url?.searchParams?.get('height') || '') ||
      500;
    urlObject.url.searchParams.set(
      'width',
      (urlWidth * 2).toString()
    );
    urlObject.url.searchParams.set(
      'height',
      (urlHeight * 2).toString()
    );
    return urlObject;
  });
  return sourcesMap
    .map((source) => `${source.url.toString()} ${source.width}w`)
    .join(', ');
}
